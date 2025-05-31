import { registerUser, loginUser, signInWithGoogle } from "./auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM para el registro (signup)
  const signupForm = document.getElementById("signupForm");
  const passwordSignupInput = document.getElementById("password-signup");
  const togglePasswordBtn = document.getElementById("togglePassword");

  // Elementos del DOM para el inicio de sesión (signin)
  const signinForm = document.getElementById("signinForm");
  const passwordSigninInput = document.getElementById("password-signin");
  const togglePasswordSigninBtn = document.getElementById("togglePasswordSignin");

  // Google sign-in buttons
  const googleButtons = document.querySelectorAll(".google-signin");

  /* -----------------------------------------------------------------
      Mostrar/ocultar la contraseña en Signup
  ------------------------------------------------------------------ */
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

  /* -----------------------------------------------------------------
      Mostrar/ocultar la contraseña en Signin
  ------------------------------------------------------------------ */
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

  /* -----------------------------------------------------------------
      Validación en tiempo real para el formulario de Signup
  ------------------------------------------------------------------ */
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

  /* -----------------------------------------------------------------
      Manejador del formulario de Registro (signup)
  ------------------------------------------------------------------ */
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!passwordSignupInput.checkValidity()) {
        passwordSignupInput.reportValidity();
        return;
      }
      const email = document.getElementById("email-signup").value.trim();
      const password = passwordSignupInput.value;
      try {
        const user = await registerUser(email, password);
        // Crea el perfil del usuario en Firestore y marca surveyCompleted:false
        await setDoc(doc(db, "userProfiles", user.uid), {
          surveyCompleted: false,
          email: user.email,
          createdAt: new Date()
        });
        // Establece el flag y redirige a survey.html
        sessionStorage.setItem("firstTime", "true");
        sessionStorage.setItem("showWelcome", "true");
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
            timerProgressBar: true
          });
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      }
    });
  }

  /* -----------------------------------------------------------------
      Manejador para el formulario de inicio de sesión (signin)
  ------------------------------------------------------------------ */
  if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("username-signin").value.trim();
      const password = document.getElementById("password-signin").value;
      
      if (password.length < 6) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'La contraseña debe tener al menos 6 caracteres.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }
      
      try {
        const user = await loginUser(email, password);
        // Consultar el perfil del usuario para decidir la redirección
        const profileSnap = await getDoc(doc(db, "userProfiles", user.uid));
        if (profileSnap.exists()) {
          const profile = profileSnap.data();
          console.log("Perfil del usuario:", profile);
          if (profile.surveyCompleted === true) {
            window.location.href = "home.html";
          } else {
            window.location.href = "survey.html";
          }
        } else {
          // Si el perfil no existe, asumimos que es nuevo y lo enviamos a la encuesta
          window.location.href = "survey.html";
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  /* -----------------------------------------------------------------
      Manejador para inicio de sesión con Google
  ------------------------------------------------------------------ */
  if (googleButtons) {
    googleButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          const user = await signInWithGoogle();
          // Consulta el perfil del usuario para determinar la redirección
          const profileSnap = await getDoc(doc(db, "userProfiles", user.uid));
          sessionStorage.setItem("showWelcome", "true");
          if (profileSnap.exists() && profileSnap.data().surveyCompleted === true) {
            window.location.href = "home.html";
          } else {
            window.location.href = "survey.html";
          }
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
              timerProgressBar: true
            });
          } else {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: error.message,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
          }
        }
      });
    });
  }
});
