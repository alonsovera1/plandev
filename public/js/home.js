// home.js
import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("Usuario no autenticado, redirigiendo a index.html");
      window.location.href = "index.html";
    }
  });

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await signOut(auth);
        console.log("Sesión cerrada exitosamente.");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    });
  } else {
    console.error("No se encontró el botón de cerrar sesión (ID: logoutButton)");
  }
});
