var express = require("express");
const { isLoggedIn } = require("../middleware/protectors");
const { getRecentPosts, getPostById, getCommentsForPostById} = require("../middleware/posts");
var router = express.Router();

/* GET home page. */
router.get("/", getRecentPosts, function (req, res, next) {
  res.render("index", {
    title: "CSC 317 App",
    name: " Khabibullo Khujamberdiev",
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/postimage", isLoggedIn, function (req, res) {
  res.render("postimage");
});

//Method: Get
//localhost:3000/register
router.get("/register", function (req, res) {
  res.render("Registration", {js: ["validation.js"]});
});

router.get("/posts/:id(\\d+)", getPostById,getCommentsForPostById,function (req, res) {
  console.log('req.params',req.params);
  res.render("viewpost", {js:["viewpost.js"]});
});
module.exports = router;
