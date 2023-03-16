var validUsername = false;

document.getElementById("input-field").addEventListener("input", (ev) => {
  var letters = /^[A-Za-z]+$/;

  let currentElement = ev.target.value;

  //Enter a username that is 3 or more alphanumeric characters
  if (currentElement.length >= 1 && currentElement[0].match(letters)) {
    document.getElementById("user-start-char-span").style.color = "green";
    document.getElementById("user-start-char-li").style.color = "green";
    validUsername = true;
  } else {
    document.getElementById("user-start-char-span").style.color = "red";
    document.getElementById("user-start-char-li").style.color = "red";
    validUsername = false;
  }

  // Enter a username that begins with a character ([a-zA-Z])
  if (currentElement.length >= 3) {
    document.getElementById("user-three-char-span").style.color = "green";
    document.getElementById("user-three-char-li").style.color = "green";
  } else {
    document.getElementById("user-three-char-span").style.color = "red";
    document.getElementById("user-three-char-li").style.color = "red";
  }
});

// PASSWORD
document.getElementById("password").addEventListener("input", (ev) => {
  let numbers = /[0-9]/;
  let upperCaseLetters = /[A-Z]/;
  let specialCharactersArr = [
    "/",
    "*",
    "-",
    "+",
    "!",
    "@",
    "#",
    "$",
    "^",
    "&",
    "~",
    "[",
    "]",
  ];
  let currentElement = ev.target.value;
  // Enter a password that is 8 or more characters
  if (currentElement.length >= 8) {
    document.getElementById("password-eight-char-span").style.color = "green";
    document.getElementById("password-eight-char-li").style.color = "green";
  } else {
    document.getElementById("password-eight-char-span").style.color = "red";
    document.getElementById("password-eight-char-li").style.color = "red";
  }

  // At least 1 upper case letter
  if (currentElement.length >= 1 && upperCaseLetters.test(currentElement)) {
    document.getElementById("password-uppercase-char-span").style.color =
      "green";
    document.getElementById("password-uppercase-char-li").style.color = "green";
  } else {
    document.getElementById("password-uppercase-char-span").style.color = "red";
    document.getElementById("password-uppercase-char-li").style.color = "red";
  }

  // At least 1 number
  if (currentElement.length >= 1 && numbers.test(currentElement)) {
    document.getElementById("password-number-char-span").style.color = "green";
    document.getElementById("password-number-char-li").style.color = "green";
  } else {
    document.getElementById("password-number-char-span").style.color = "red";
    document.getElementById("password-number-char-li").style.color = "red";
  }

  // At least 1 of the these: / * - + ! @ # $ ^ & ~ [ ]
  function countSpecial(str) {
    // initialize count
    let count = 0;

    for (let char of str.toLowerCase()) {
      if (specialCharactersArr.includes(char)) {
        count++;
      }
    }
    // return number of specialChars
    return count;
  }
  let countHolder = countSpecial(currentElement);

  if (currentElement.length >= 1 && countHolder >= 1) {
    document.getElementById("password-special-char-span").style.color = "green";
    document.getElementById("password-special-char-li").style.color = "green";
  } else {
    document.getElementById("password-special-char-span").style.color = "red";
    document.getElementById("password-special-char-li").style.color = "red";
  }
});

// CONFIRM PASSWORD
document.getElementById("confirm-password1").addEventListener("input", (ev) => {
  let currentElement = ev.target.value;
  let password = document.getElementById("password").value;

  if (currentElement === password) {
    document.getElementById("confirm-password-char-span").style.color = "green";
    document.getElementById("confirm-password-char-li").style.color = "green";
  } else {
    document.getElementById("confirm-password-char-span").style.color = "red";
    document.getElementById("confirm-password-char-li").style.color = "red";
  }
});

document.getElementById("input-field").addEventListener("mousedown", (ev) => {
  document.getElementById("error-box-registration").style.visibility =
    "visible";
  document.getElementById("password-box-registration").style.visibility =
    "hidden";
  document.getElementById("confirm-password-registration").style.visibility =
    "hidden";
});

document.getElementById("password").addEventListener("mousedown", (ev) => {
  document.getElementById("error-box-registration").style.visibility = "hidden";
  document.getElementById("password-box-registration").style.visibility =
    "visible";
  document.getElementById("confirm-password-registration").style.visibility =
    "hidden";
});

document.getElementById("email").addEventListener("mousedown", (ev) => {
  document.getElementById("error-box-registration").style.visibility = "hidden";
  document.getElementById("password-box-registration").style.visibility =
    "hidden";
  document.getElementById("confirm-password-registration").style.visibility =
    "hidden";
});

document
  .getElementById("confirm-password1")
  .addEventListener("mousedown", (ev) => {
    document.getElementById("confirm-password-registration").style.visibility =
      "visible";
    document.getElementById("error-box-registration").style.visibility =
      "hidden";
    document.getElementById("password-box-registration").style.visibility =
      "hidden";
  });

document
  .getElementById("confirm-password1")
  .addEventListener("mousedown", (ev) => {
    document.getElementById("error-box-registration").style.visibility =
      "hidden";
    document.getElementById("password-box-registration").style.visibility =
      "hidden";
  });

/*ALERT VALIDATION*/
function userNameValidation(event) {
  console.log(event);
  var letters = /^[A-Za-z]+$/;

  let usernameInput = document.myForm.fname.value;

  if (usernameInput == "") {
    alert("Username can not be blank");
    document.myForm.fname.focus();
    return false;
  }

  if (!usernameInput[0].match(letters)) {
    alert("Please start your username with non-numeric character");
    document.myForm.fname.focus();
    return false;
  }

  if (usernameInput.length < 3) {
    alert("Username should be more than 3 characters");
    document.myForm.fname.focus();
    return false;
  }

  let emailInput = document.myForm.email.value;

  if (emailInput == "") {
    alert("Email can not be blank");
    document.myForm.fname.focus();
    return false;
  }

  let upperCaseLetters = /[A-Z]/;
  let numbers = /[0-9]/;
  let specialCharacters = /[$&+,:;=?@#|'<>.-^*()%!]/;

  let passwordInput = document.myForm.password1.value;

  if (passwordInput == "") {
    alert("Password can not be blank");
    document.myForm.password1.focus();
    return false;
  }

  if (passwordInput.length < 8) {
    alert("Password should be at least 8 characters");
    document.myForm.password1.focus();
    return false;
  }

  if (!upperCaseLetters.test(passwordInput)) {
    alert("Password should have at least 1 uppercase letter");
    document.myForm.password1.focus();
    return false;
  }

  if (!numbers.test(passwordInput)) {
    alert("Password should have at least 1 number");
    document.myForm.password1.focus();
    return false;
  }

  let specialCharactersArr = [
    "/",
    "*",
    "-",
    "+",
    "!",
    "@",
    "#",
    "$",
    "^",
    "&",
    "~",
    "[",
    "]",
  ];

  function countSpecial(str) {
    // initialize count
    let count = 0;

    for (let char of str.toLowerCase()) {
      if (specialCharactersArr.includes(char)) {
        count++;
      }
    }
    // return number of specialChars
    return count;
  }
  let countHolder = countSpecial(passwordInput);

  if (countHolder === 0) {
    alert("Password should have at least 1 special character");
    document.myForm.password1.focus();
    return false;
  }

  var confirmPasswordInput = document.getElementById("confirm-password1").value;
  var passwordInputInput = document.getElementById("password").value;

  if (confirmPasswordInput == "") {
    alert("Confirm password can not be empty");
    document.myForm.confirm - password.focus();
    return false;
  }

  if (passwordInputInput !== confirmPasswordInput) {
    alert("Confirm password should be same with password");
    document.myForm.confirm - password.focus();
    return false;
  }
}
