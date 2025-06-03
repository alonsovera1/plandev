import { logoutUser } from "./auth.js";
import { loadProjects } from "./projects.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

export function initHome() {
  console.log("Inicializando la vista Home...");

  // Configurar el botón de cerrar sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("¿Estás seguro de cerrar sesión?")) {
        logoutUser()
          .then(() => {
            window.location.href = "index.html";
          })
          .catch(err => {
            console.error("Error al cerrar sesión:", err);
            alert("No se pudo cerrar la sesión. Intenta nuevamente.");
          });
      }
    });
  }

  // Cargar proyectos (u otras funcionalidades)
  loadProjects();

  // Actualizar la información del perfil usando onAuthStateChanged
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmailElem = document.querySelector('.dropdown-menu .user-email');
      if (userEmailElem) {
        userEmailElem.textContent = user.email;
      }
      // Actualizar las iniciales en el icono del perfil
      const profileIcon = document.querySelector('.profile-icon');
      if (profileIcon) {
        profileIcon.textContent = getInitialsFromEmail(user.email);
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  });

  // Lógica para abrir y cerrar el menú de perfil con clic
  const profileIcon = document.querySelector('.profile-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (profileIcon && dropdownMenu) {
    profileIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });
  }
  document.addEventListener('click', (e) => {
    if (dropdownMenu && !dropdownMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      dropdownMenu.classList.remove('active');
    }
  });

  // Lógica para cambiar al modo oscuro/claro
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("dark-mode");
      // Opcional: Cambiar el texto o ícono según el estado
      if (document.body.classList.contains("dark-mode")) {
        modeToggle.innerHTML = `<i class="fas fa-sun"></i> Modo claro`;
      } else {
        modeToggle.innerHTML = `<i class="fas fa-moon"></i> Modo oscuro`;
      }
    });
  }
}

// Función que extrae las iniciales del email
function getInitialsFromEmail(email) {
  if (!email) return "";
  const parts = email.split('@')[0].split(/[._]/);
  let initials = "";
  parts.forEach(part => {
    if (part.length > 0) {
      initials += part[0].toUpperCase();
    }
  });
  return initials;
}
