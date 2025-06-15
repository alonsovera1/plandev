// form-handlers.js
import { registerUser, loginUser, signInWithGoogle } from "./auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  // Manejo de mostrar/ocultar contraseña
  const passwordSignupInput = document.getElementById("password-signup");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordSigninInput = document.getElementById("password-signin");
  const togglePasswordSigninBtn = document.getElementById("togglePasswordSignin");
  const signupForm = document.getElementById("signupForm");
  const signinForm = document.getElementById("signinForm");

  if (passwordSignupInput && togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      passwordSignupInput.type = passwordSignupInput.type === "password" ? "text" : "password";
    });
  }

  if (passwordSigninInput && togglePasswordSigninBtn) {
    togglePasswordSigninBtn.addEventListener("click", () => {
      passwordSigninInput.type = passwordSigninInput.type === "password" ? "text" : "password";
    });
  }

  if (passwordSignupInput) {
    passwordSignupInput.addEventListener("input", () => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
      passwordSignupInput.setCustomValidity(
        regex.test(passwordSignupInput.value)
          ? ""
          : "La contraseña debe tener al menos 6 caracteres, un número y un símbolo."
      );
    });
  }

  // Registro de nuevo usuario y creación del perfil en Firestore
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email-signup").value.trim();
      const password = passwordSignupInput.value;
      try {
        const user = await registerUser(email, password);
        console.log("Usuario registrado:", user.email);

        // Crear perfil en Firestore
        await setDoc(doc(db, "userProfiles", user.uid), {
          email: user.email,
          surveyCompleted: false,
          createdAt: new Date()
        });
        console.log("Perfil creado en Firestore para UID:", user.uid);

        window.location.href = "survey.html";

      } catch (error) {
        console.error("Error en el registro o creación de perfil:", error);
        alert("Hubo un problema al registrar. Intenta nuevamente.");
      }
    });
  }

  // Inicio de sesión y redirección según estado de la encuesta
  if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("username-signin").value.trim();
      const password = passwordSigninInput.value;

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      try {
        const user = await loginUser(email, password);
        console.log("Usuario inició sesión:", user.email);
        const profileRef = doc(db, "userProfiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const profile = profileSnap.data();
          console.log("Estado encuesta:", profile.surveyCompleted);
          window.location.href = profile.surveyCompleted ? "home.html" : "survey.html";
        } else {
          // Crear perfil si no existe
          await setDoc(profileRef, {
            surveyCompleted: false,
            email: user.email,
            createdAt: new Date()
          });
          console.log("Perfil creado por login para UID:", user.uid);
          window.location.href = "survey.html";
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales incorrectas o error de conexión.");
      }
    });
  }

  // Inicio de sesión con Google y creación del perfil si no existe
  const googleButtons = document.querySelectorAll(".google-signin");
  if (googleButtons) {
    googleButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          const user = await signInWithGoogle();
          console.log("Usuario Google:", user.email);
          const profileRef = doc(db, "userProfiles", user.uid);
          const profileSnap = await getDoc(profileRef);

          if (!profileSnap.exists()) {
            await setDoc(profileRef, {
              surveyCompleted: false,
              email: user.email,
              createdAt: new Date()
            });
            console.log("Perfil creado para usuario Google UID:", user.uid);
          }

          const profile = (await getDoc(profileRef)).data();
          window.location.href = profile.surveyCompleted ? "home.html" : "survey.html";

        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
          alert("Error al iniciar sesión con Google");
        }
      });
    });
  }
});

