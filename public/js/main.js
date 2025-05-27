// Definir la Configuración Firebase

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { app } from './firebase-config.js';
import * as auth from './auth.js';
import './ui.js';
import './modal.js';


// Inicializar Firebase
const firebaseAuth = getAuth(app);

// Monitorizar el estado de autenticación del usuario
onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
    // Aquí se podría redirigir al dashboard (home.html) o cargar la vista correspondiente.
  } else {
    console.log("No hay usuario autenticado");
    // Se podria redirigir al landing page o mostrar la opción de iniciar sesión.
  }
});
