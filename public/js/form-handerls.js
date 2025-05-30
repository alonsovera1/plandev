// Capturar el envio de los formularios y llamar a las funciones definidas en auth.js

import { registerUser, loginUser, signInWithGoogle } from "./auth.js";

// --- Manejador de Registro ---
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Recoger valores del formulario
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value;
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      // Registrar al usuario en Firebase
      const user = await registerUser(email, password);
      console.log("Usuario creado en Firebase:", user);
      // Enviar datos adicionales al Backend para guardar perfil (opcional)
      const response = await fetch("http://localhost:3000/api/signup", { // "/api/signup" M
        // const response = await fetch("http://localhost:3000/api/signup", { ... });
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          // username: username
        })
      });
      const result = await response.json();
      if (result.success) {
        alert("Registro exitoso. ¡Bienvenido, " + user.email + "!");
        // Opcional: cerrar el modal o redirigir.
      } else {
        alert("Error en el registro: " + result.error);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar: " + error.message);
    }
  });
}

// --- Manejador de Inicio de Sesión ---
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Recoger valores; asumimos que el campo "username-signin" es, en realidad, el email
    const email = document.getElementById("username-signin").value.trim();
    const password = document.getElementById("password-signin").value;
    try {
      const user = await loginUser(email, password);
      alert("Inicio de sesión exitoso. ¡Bienvenido, " + user.email + "!");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}

// --- Manejador de Inicio de Sesión con Google ---
const googleSignInButtons = document.querySelectorAll(".google-signin");
if (googleSignInButtons) {
  googleSignInButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle();
        alert("Inicio de sesión con Google exitoso. ¡Bienvenido, " + user.email + "!");
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        alert("Error al iniciar sesión con Google: " + error.message);
      }
    });
  });
}
