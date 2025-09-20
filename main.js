// ================= SignUp  ==================
document.addEventListener("DOMContentLoaded", function () {
  var signupForm = document.getElementById("signupForm");
  var signupMessage = document.getElementById("signupMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var password = document.getElementById("password").value.trim();

      if (name && email && password) {
        if (localStorage.getItem("user_" + email)) {
          signupMessage.textContent = "Email already registered!";
            signupMessage.classList.remove("text-success");
          signupMessage.classList.add("text-danger");
        } else {
          var user = { name, email, password };
          localStorage.setItem("user_" + email, JSON.stringify(user));
          signupMessage.textContent = "Sign up successful!";
          signupMessage.classList.remove("text-danger");
          signupMessage.classList.add("text-success");
          signupForm.reset();
        }
      } else {
        signupMessage.textContent = "Please fill all fields!";
        signupForm.classList.remove("text-success");
        signupMessage.classList.add("text-danger");
      }
    });
  }
});


// ================= Login ==================

var loginForm = document.getElementById("loginForm");
var loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value.trim();

    if (email && password) {
      var storedUser = localStorage.getItem("user_" + email);
      if (storedUser) {
        var user = JSON.parse(storedUser);

        if (user.password === password) {
          loginMessage.textContent = "Login successful!";
            loginMessage.classList.remove("text-danger");
          loginMessage.classList.add("text-success");

          localStorage.setItem("currentUser", JSON.stringify(user));

           setTimeout(function () {
            window.location.href = "welcome.html";
          }, 1000);
        } else {
          loginMessage.textContent = "Incorrect password!";
            loginMessage.classList.remove("text-success");
          loginMessage.classList.add("text-danger");
        }
      } else {
        loginMessage.textContent = "Email not registered!";
            loginMessage.classList.remove("text-success");
        loginMessage.classList.add("text-danger");
      }
    } else {
      loginMessage.textContent = "Please fill all fields!";
        loginMessage.classList.remove("text-success");
      loginMessage.classList.add("text-danger");
    }
  });
}

// ================= Welcome Page ==================

document.addEventListener("DOMContentLoaded", function () {

  var welcomeBox = document.querySelector(".welcome-box");

  if (welcomeBox) {
   
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.name) {
      welcomeBox.textContent = `Welcome ${currentUser.name}! `;
    } else {
      
      window.location.href = "login.html";
    }

     if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html"; 
    });
  }
  }
});

