// Verificar el estado de autenticacion al ingresar en index.html

import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { auth } from "./firebase-config.js";

// Asegura la persistencia local en el navegador
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario ya está autenticado, redirige a home.html
        window.location.href = "home.html";
      }
      // Si no hay usuario, se queda en index.html
    });
  })
  .catch((error) => {
    console.error("Error al establecer persistencia:", error);
  });
