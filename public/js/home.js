/* Archivo: public/js/home.js */

import { logoutUser } from "./auth.js";
import { loadProjects } from "./projects.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Función utilitaria para extraer las iniciales de un email
function getInitialsFromEmail(email) {
  if (!email) return "";
  const parts = email.split('@')[0].split(/[._]/);
  let initials = "";
  parts.forEach((part) => {
    if (part.length > 0) {
      initials += part[0].toUpperCase();
    }
  });
  return initials;
}

// -------------------------
// Función para retraer/expandir el panel lateral
// -------------------------
function setupAsideCollapse() {
  const asideCollapseBtn = document.getElementById("asideCollapse");
  const sideTools = document.querySelector(".side-tools");

  if (!asideCollapseBtn || !sideTools) {
    console.error("No se encontró o el botón o el contenedor lateral");
    return;
  }

  asideCollapseBtn.addEventListener("click", () => {
    // Alternamos la clase "collapsed"
    sideTools.classList.toggle("collapsed");

    // Actualizamos el ícono del botón según el estado
    if (sideTools.classList.contains("collapsed")) {
      asideCollapseBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
    } else {
      asideCollapseBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
    }
  });
}

// -------------------------
// Función para abrir/contraer el menú del perfil
// -------------------------
function setupProfileMenu() {
  const profileIcon = document.querySelector('.profile-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!profileIcon || !dropdownMenu) {
    console.error("No se encontró el icono de perfil o el menú desplegable");
    return;
  }

  profileIcon.addEventListener("click", (e) => {
    // Cancelar la propagación para evitar que se cierre inmediatamente
    e.stopPropagation();
    // Alterna la clase "active"
    dropdownMenu.classList.toggle("active");
  });

  // Cerrar el menú si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });
}

// -------------------------
// Función principal que inicializa la UI del Home
// -------------------------
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

  // Actualizar la información del perfil usando onAuthStateChanged
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmailElem = document.querySelector('.dropdown-menu .user-email');
      if (userEmailElem) {
        userEmailElem.textContent = user.email;
      }
      const profileIcon = document.querySelector('.profile-icon');
      if (profileIcon) {
        // Usar la función para extraer las iniciales
        profileIcon.textContent = getInitialsFromEmail(user.email);
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  });

  // Inicialización del dashboard
  loadProjects().then(projectsExist => {
    const emptyDashboard = document.getElementById('empty-dashboard');
    if (projectsExist) {
      emptyDashboard.style.display = 'none';
    } else {
      emptyDashboard.style.display = 'block';
    }
  }).catch(err => {
    console.error("Error al cargar proyectos: ", err);
    document.getElementById('empty-dashboard').style.display = 'block';
  });

  // Lógica para cambiar al modo oscuro/claro
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        modeToggle.innerHTML = `<i class="fas fa-sun"></i> Modo claro`;
      } else {
        modeToggle.innerHTML = `<i class="fas fa-moon"></i> Modo oscuro`;
      }
    });
  }

  // Crear un nuevo proyecto
  const createProjectBtn = document.getElementById("btn-create-project");
  if (createProjectBtn) {
    createProjectBtn.addEventListener("click", (e) => {
      e.preventDefault();
      startProjectCreationFlow();
    });
  }
  function startProjectCreationFlow() {
    console.log("Iniciando flujo de creación de proyecto...");
    const projectsSection = document.getElementById("projectsSection");
    const createProjectPanel = document.getElementById("createProjectPanel");
    if (projectsSection && createProjectPanel) {
      projectsSection.style.display = "none";
      createProjectPanel.style.display = "block";
    }
  }

  // Botones adicionales: Equipos y Sugerencias
  const teamsBtn = document.getElementById("btn-teams");
  if (teamsBtn) {
    teamsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Vista Equipos");
    });
  }
  const feedbackBtn = document.getElementById("btn-feedback");
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Formulario de sugerencias se abriría aquí.");
    });
  }

  // Llamadas a nuestras nuevas funciones para el panel lateral y el menú de perfil
  setupAsideCollapse();
  setupProfileMenu();
}

// Un único listener para DOMContentLoaded
document.addEventListener("DOMContentLoaded", initHome);
