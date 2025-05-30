// Reestablecer contraseña

import { resetPassword } from "./auth.js";

const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  try {
    await resetPassword(email);
    alert("Se ha enviado un correo de recuperación a " + email);
  } catch (error) {
    console.error("Error enviando el correo:", error);
    alert("Error al enviar el correo: " + error.message);
  }
});
