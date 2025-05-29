// Definir la Configuración Firebase

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { auth } from "./firebase-config.js";
import "./ui.js";
import "./modal.js"; 

// Inicializar Firebase
// const firebaseAuth = getAuth(app);

// Monitorizar el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
    // Aquí se podría redirigir al dashboard (home.html) o cargar la vista correspondiente.
  } else {
    console.log("No hay usuario autenticado");
    // Se podria redirigir al landing page o mostrar la opción de iniciar sesión.
  }
});
