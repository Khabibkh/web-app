var express = require("express");
var router = express.Router();
const db = require("../conf/database");
const UserError = require("../helpers/error/UserError");
const bcrypt = require("bcrypt");

//Method : POST
//localhost:3000/users/register
router.post("/register", function (req, res, next) {
  const { fname, email, password1 } = req.body;

  //server side validation
  //check for duplicates
  db.query("select id from users where username=?", [fname])
    .then(function ([results, fields]) {
      if (results && results.length == 0) {
        return db.query("select id from users where email=?", [email]);
      } else {
        throw new Error("username already exists");
      }
    })
    .then(function ([results, fields]) {
      if (results && results.length == 0) {
        return bcrypt.hash(password1, 2);
      } else {
        throw new Error("email already exists");
      }
    })
    .then(function (hashedPassword) {
      return db.execute(
        "insert into users (username, email, password) value (?,?,?)",
        [fname, email, hashedPassword]
      );
    })
    .then(function (results, fields) {
      if (results && results[0].affectedRows === 1) {
        res.redirect("/login");
      } else {
        throw new Error("user could not be made");
      }
    })
    .catch(function (err) {
      next(err);
    });

  //insert into db
  //respond
});

//Method : POST
//localhost:3000/users/login
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query("select id, username, password from users where username=? ", [
    username,
  ])
    .then(function ([results, fields]) {
      if (results && results.length == 1) {
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);
      } else {
        throw new UserError(
          "Failed Login: Invalid user credentials",
          "/login",
          200
        );
      }
    })
    .then(function (passwordMatched) {
      if (passwordMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now logged in`);
        req.session.save(function (saveError) {
          res.redirect("/");
        });
      } else {
        throw new UserError(
          "Failed Login: Invalid user credentials",
          "/login",
          200
        );
      }
    })
    .catch(function (err) {
      if (err instanceof UserError) {
        req.flash("error", err.getMessage());
        req.session.save(function (saveError) {
          res.redirect(err.getRedirectURL()); 
        })
      } else {

        next(err);
      }
    });
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (destroyError) {
    if (destroyError) {
      next(err);
    } else {
      res.json({
        status: 200,
        messages: "You have been logged out",
      });
    }
  });
});

module.exports = router;
