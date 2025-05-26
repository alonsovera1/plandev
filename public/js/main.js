// Definir la Configuración Firebase

import * as auth from './auth.js';
import './ui.js';
import './modal.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


// Configuración pública de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDHwaKPrLl2MfbWH4c-7yIe-0zMScW43T0",
  authDomain: "plandev-c106c.firebaseapp.com",
  projectId: "plandev-c106c",
  storageBucket: "plandev-c106c.firebasestorage.app",
  messagingSenderId: "400013192102",
  appId: "1:400013192102:web:dfeaab3a811ce4cce97d67"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
