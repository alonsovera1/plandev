import { logoutUser } from "./auth.js";
import { loadProjects } from "./projects.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { db } from "./firebase-config.js";

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

// Función para abrir/contraer el menú del perfil ??
function setupProfileMenu() {
  const profileIcon = document.querySelector('.profile-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!profileIcon || !dropdownMenu) {
    console.error("No se encontró el icono de perfil o el menú desplegable.");
    return;
  }

  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el clic cierre inmediatamente el menú
    dropdownMenu.classList.toggle("active");
  });

  // Cerrar el menú si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });
}

// Llamar a la función en `initHome()` para asegurar que se ejecuta al cargar
document.addEventListener("DOMContentLoaded", () => {
  setupProfileMenu();
});


// Función principal que inicializa la UI del Home
export function initHome() {
  console.log("Inicializando la vista Home...");

  // Configurar el botón de guía de inicio
    const guideBtn = document.getElementById("btn-start-guide");
    if (guideBtn) {
        guideBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Aquí se iniciaría la guía de inicio.");
            // Se puede redirigir a otra vista o mostrar contenido dinámico
        });
    }

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

  // Inicialización del dashboard: Cargar proyectos
  loadProjects().catch(err => {
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

  // Configurar botón de Inicio (agregado al panel lateral)
  const homeBtn = document.getElementById("btn-home");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "home.html";
    });
  }

  // Llamar a la función para abrir/contraer el menú de perfil
  setupProfileMenu();

  
}

// Un único listener para DOMContentLoaded
document.addEventListener("DOMContentLoaded", initHome);


// Crear un nuevo proyecto: Invocar el flujo de creación
import { initProjectCreationFlow } from "./projectCreation.js";

const createProjectBtn = document.getElementById("btn-create-project");
if (createProjectBtn) {
  createProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Opcional: ocultar el contenido actual del dashboard (por ejemplo, el estado vacío)
    const emptyDashboard = document.getElementById("empty-dashboard");
    if (emptyDashboard) {
      emptyDashboard.style.display = "none";
    }
    // Inicia el flujo de creación (el contenedor "projectCreationContainer" debe existir en el HTML)
    initProjectCreationFlow();
  });
}