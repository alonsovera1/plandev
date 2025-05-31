import { registerUser, loginUser, signInWithGoogle } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM para el registro (signup)
  const signupForm = document.getElementById("signupForm");
  const passwordSignupInput = document.getElementById("password-signup");
  const togglePasswordBtn = document.getElementById("togglePassword");

  // Elementos del DOM para el inicio de sesión (signin)
  const passwordSigninInput = document.getElementById("password-signin");
  const togglePasswordSigninBtn = document.getElementById("togglePasswordSignin");

  // Google sign-in buttons
  const googleButtons = document.querySelectorAll(".google-signin");

  //  Mostrar/ocultar la contraseña en Signup
  if (passwordSignupInput && togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      if (passwordSignupInput.type === "password") {
        passwordSignupInput.type = "text";
        togglePasswordBtn.innerHTML = '<img src="images/eye-off-icon.svg" alt="Ocultar contraseña">';
      } else {
        passwordSignupInput.type = "password";
        togglePasswordBtn.innerHTML = '<img src="images/eye-icon.svg" alt="Mostrar contraseña">';
      }
    });
  }

  //  Mostrar/ocultar la contraseña en Signin
  if (passwordSigninInput && togglePasswordSigninBtn) {
    togglePasswordSigninBtn.addEventListener("click", () => {
      if (passwordSigninInput.type === "password") {
        passwordSigninInput.type = "text";
        togglePasswordSigninBtn.innerHTML = '<img src="images/eye-off-icon.svg" alt="Ocultar contraseña">';
      } else {
        passwordSigninInput.type = "password";
        togglePasswordSigninBtn.innerHTML = '<img src="images/eye-icon.svg" alt="Mostrar contraseña">';
      }
    });
  }

  //  Validación para el signup
  if (signupForm && passwordSignupInput) {
    passwordSignupInput.addEventListener("input", () => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
      if (!regex.test(passwordSignupInput.value)) {
        passwordSignupInput.setCustomValidity(
          "La contraseña debe tener al menos 6 caracteres, incluir un número y un símbolo (!@#$%^&*)."
        );
      } else {
        passwordSignupInput.setCustomValidity("");
      }
    });
  }

  //  Manejador del formulario de Registro (signup) 
  //  Se combina la validación y el registro en un solo submit.
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Validar el input; si falla reporta el error y evita el envío.
      if (!passwordSignupInput.checkValidity()) {
        passwordSignupInput.reportValidity();
        return;
      }
      const email = document.getElementById("email-signup").value.trim();
      const password = passwordSignupInput.value;
      try {
        const user = await registerUser(email, password);
        // Establece un flag en sessionStorage para mostrar el toast en survey.html
        sessionStorage.setItem("showWelcome", "true");
        // Redirige inmediatamente a survey.html
        window.location.href = "survey.html";
      } catch (error) {
        console.error("Error al registrar:", error);
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "El correo ya está en uso",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  }

  // Manejador para inicio de sesión con Google
  if (googleButtons) {
    googleButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          const user = await signInWithGoogle();
          sessionStorage.setItem("showWelcome", "true");
          window.location.href = "survey.html";
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
          if (error.code === "auth/email-already-in-use") {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "El correo ya está en uso",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: error.message,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        }
      });
    });
  }
});
