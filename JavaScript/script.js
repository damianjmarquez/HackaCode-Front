const form = document.querySelector("form");
const passwordInput = document.querySelector("input#password");
const signinButton = document.querySelector("button#signin");
const togglePasswordButton = document.querySelector("button#toggle-password");

togglePasswordButton.addEventListener("click", togglePassword);

function togglePassword() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Hide password";
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Show password";
  };
};

passwordInput.addEventListener("input", validatePassword);

function validatePassword() {
  let message = "";
  if (!/.{8,}/.test(passwordInput.value)) {
    message = "At least eight characters. ";
  } else if (!/.*[A-Z].*/.test(passwordInput.value)) {
    message += "\nAt least one uppercase letter. ";
  } else if (!/.*[a-z].*/.test(passwordInput.value)) {
    message += "\nAt least one lowercase letter.";
  } else {
    // message += '\nPassword is incorrect. Please try again.';
  };

  passwordInput.setCustomValidity(message);
};

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  console.log("submit");
  if (form.checkValidity() === false) {
    console.log("not valid");
    event.preventDefault();
  } else {
    alert("Signing in!");
    signinButton.disabled = "true";
    event.preventDefault();
  };
};