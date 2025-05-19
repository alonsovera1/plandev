// Definir la Configuración Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Configuración pública de Firebase (reemplazar datos)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_MENSAJE_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Monitorizar el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
    // Aquí podrías, por ejemplo, redirigir al dashboard (home.html) o cargar la vista correspondiente.
  } else {
    console.log("No hay usuario autenticado");
    // Podrías redirigir al landing page o mostrar la opción de iniciar sesión.
  }
});
