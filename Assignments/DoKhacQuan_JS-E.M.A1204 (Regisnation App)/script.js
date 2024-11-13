// query
const form = document.querySelector(".register__form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");

const nameError = document.querySelector(".name-error");
const passwordError = document.querySelector(".password-error");
const confirmError = document.querySelector(".confirm-error");

const success = document.querySelector(".success");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let errors = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (username.value === "") {
    errors.username = "Username is required";
  }

  if (password.value === "") {
    errors.password = "Password is required";
  }

  if (confirmPassword.value === "") {
    errors.confirmPassword = "Confirm password is required";
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = "Password does not match";
  }

  nameError.innerText = errors.username;
  passwordError.innerText = errors.password;
  confirmError.innerText = errors.confirmPassword;

  if (
    errors.username === "" &&
    errors.password === "" &&
    errors.confirmPassword === ""
  ) {
    success.innerText = "You have registed successfully";
  }
});
