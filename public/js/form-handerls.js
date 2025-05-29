// Capturar el envio de los formularios y llamar a las funciones definidas en auth.js

import { registerUser, loginUser } from "./auth.js";

// --- Manejador de Registro ---
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Recoger valores del formulario
    // const username = document.getElementById("username-signup").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value;
    // const confirmPassword = document.getElementById("confirm-password-signup").value;

    // Validaciones básicas
    /* if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    } */
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

    // Recoger valores
    const identifier = document.getElementById("username-signin").value.trim();
    const password = document.getElementById("password-signin").value;

    // Si usamos nombre de usuario O correo, aquí se puede convertir usuario a correo consultando el backend
    // let emailToUse = identifier;
    // if (!identifier.includes("@")) {
    //   const res = await fetch("/api/usernameToEmail", {  // Asegúrate de definir este endpoint en el backend
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username: identifier })
    //   });
    //   const data = await res.json();
    //   if (data.success && data.email) {
    //     emailToUse = data.email;
    //   } else {
    //     alert("El nombre de usuario no existe.");
    //     return;
    //   }
    // }

    try {
      const user = await loginUser(emailToUse, password);
      alert("Inicio de sesión exitoso. ¡Bienvenido, " + user.email + "!");
      // Opcional: redirigir al dashboard o cerrar el modal.
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}
