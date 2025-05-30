import { registerUser, loginUser, signInWithGoogle } from "./auth.js";

// Registro con correo y contraseña
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value;
    if (password.length < 6) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'La contraseña debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }
    try {
      const user = await registerUser(email, password);
      // Establece la bandera para mostrar el toast de bienvenida en survey.html
      sessionStorage.setItem("showWelcome", "true");
      // Redirige inmediatamente a survey.html
      window.location.href = "survey.html";
    } catch (error) {
      console.error("Error al registrar:", error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'El correo ya está en uso',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    }
  });
}

// Inicio de sesión con correo y contraseña
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("username-signin").value.trim();
    const password = document.getElementById("password-signin").value;
    try {
      const user = await loginUser(email, password);
      sessionStorage.setItem("showWelcome", "true");
      window.location.href = "survey.html";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  });
}

// Inicio de sesión con Google
const googleButtons = document.querySelectorAll(".google-signin");
if (googleButtons) {
  googleButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const user = await signInWithGoogle();
        sessionStorage.setItem("showWelcome", "true");
        window.location.href = "survey.html";
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'El correo ya está en uso',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      }
    });
  });
}
