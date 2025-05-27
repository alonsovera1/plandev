// Inicializacion de Firebase con Web SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDHwaKPrLl2MfbWH4c-7yIe-0zMScW43T0",
  authDomain: "plandev-c106c.firebaseapp.com",
  projectId: "plandev-c106c",
  storageBucket: "plandev-c106c.firebasestorage.app",
  messagingSenderId: "400013192102",
  appId: "1:400013192102:web:dfeaab3a811ce4cce97d67"
};

// Inicializa Firebase y exporta la instancia de la app
export const app = initializeApp(firebaseConfig);
