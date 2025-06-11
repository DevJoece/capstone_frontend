//show Password Toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle effect
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");

  // Add animation class
  this.classList.add("animate");

  // Remove it after animation completes (400ms matches the CSS transition)
  setTimeout(() => {
    this.classList.remove("animate");
  }, 400);
});




// Email & Password Validation and API Login
const form = document.getElementById("loginForm");
const typeEmail = document.getElementById("email");
const typePassword = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginButton = document.querySelector(".btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = typeEmail.value.trim();
  const password = typePassword.value.trim();
  let isValid = true;

  if (!email) {
    showError(emailError, "Email is required", typeEmail);
    isValid = false;
  }

  if (!password) {
    showError(passwordError, "Password is required", typePassword);
    isValid = false;
  }

  if (isValid) {
    // Disable button and show loading text
    loginButton.textContent = "Logging in...";
    loginButton.disabled = true;

    fetch("https://my-style-mag-backend.onrender.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        showError(passwordError, "Invalid email or password", typePassword);
      })
      .finally(() => {
        // Reset button state
        loginButton.textContent = "Log In";
        loginButton.disabled = false;
      });
  }
});

// Show error function
function showError(element, message, input) {
  element.textContent = message;
  element.classList.add("show");
  input.classList.add("input-error");
}

// Clear error when typing again
typeEmail.addEventListener("input", () => {
  emailError.textContent = "";
  emailError.classList.remove("show");
  typeEmail.classList.remove("input-error");
});

typePassword.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordError.classList.remove("show");
  typePassword.classList.remove("input-error");
});










//THE PREVIOUS CODE
//Email Validation Code
// const form = document.getElementById('loginForm');
// const typeEmail = document.getElementById('email');
// const typePassword = document.getElementById('password');
// const emailError = document.getElementById('emailError');
// const passwordError = document.getElementById('passwordError');

//   form.addEventListener('submit', function (e) {
//     e.preventDefault(); // prevent form submission

//     const email = typeEmail.value.trim();
//     const password = typePassword.value.trim();
//     let isValid = true;

//     if (email !== 'user@example.com') {
//       showError(emailError, 'Invalid email!', typeEmail);
//       isValid = false;
//     }

//     if (password !== '123456') {
//       showError(passwordError, 'Incorrect password', typePassword);
//       isValid = false;
//     }

//     if (isValid) {
//       alert('Login Successful!');
//     }
//   });

//   function showError(element, message, input) {
//     element.textContent  = message;
//     element.classList.add('show');
//     input.classList.add('input-error');
//   };

//   //clear error when typing again
//   typeEmail.addEventListener('input', () => {
//     emailError.textContent = '';
//     emailError.classList.remove('show');
//     typeEmail.classList.remove('input-error');
//   });

//   typePassword.addEventListener('input', () => {
//     passwordError.textContent = '';
//     passwordError.classList.remove('show');
//     typePassword.classList.remove('input-error');
//   });