import { auth, db } from "./firebase-config.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { logoutUser } from "./auth.js";
import { loadProjects } from "./projects.js";
import { initProjectCreationFlow } from "./projectCreation.js";

// Obtener iniciales del correo para el ícono de perfil
function getInitialsFromEmail(email) {
  if (!email) return "";
  const parts = email.split('@')[0].split(/[._]/);
  return parts.map(p => p[0]?.toUpperCase()).join("");
}

// Configura el menú desplegable de perfil
function setupProfileMenu() {
  const profileIcon = document.querySelector('.profile-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!profileIcon || !dropdownMenu) {
    console.warn("No se encontró el icono de perfil o el menú desplegable.");
    return;
  }

  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });
}

// Inicializa la vista principal de Home y verifica estado de encuesta
export function initHome() {
  console.log("Inicializando la vista Home...");

  // Cierre de sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (confirm("¿Estás seguro de cerrar sesión?")) {
        try {
          await logoutUser();
          window.location.href = "index.html";
        } catch (err) {
          console.error("Error al cerrar sesión:", err);
          alert("No se pudo cerrar la sesión.");
        }
      }
    });
  }

  // Verificación del usuario y su perfil
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.warn("No hay usuario autenticado.");
      return;
    }
    const profileRef = doc(db, "userProfiles", user.uid);
    const profileSnap = await getDoc(profileRef);
    if (!profileSnap.exists()) {
      console.warn("Perfil no existe para usuario:", user.uid);
      window.location.href = "survey.html";
      return;
    }
    const data = profileSnap.data();
    if (!data.surveyCompleted) {
      console.log("Encuesta no completada, redirigiendo a encuesta.");
      window.location.href = "survey.html";
      return;
    }

    const emailElem = document.querySelector(".user-email");
    if (emailElem) emailElem.textContent = user.email;

    const iconElem = document.querySelector(".profile-icon");
    if (iconElem) iconElem.textContent = getInitialsFromEmail(user.email);

    try {
      await loadProjects();
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      const emptyDashboard = document.getElementById("empty-dashboard");
      if (emptyDashboard) emptyDashboard.style.display = "block";
    }
  });

  // Alternar modo oscuro
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("dark-mode");
      modeToggle.innerHTML = document.body.classList.contains("dark-mode")
        ? `<i class="fas fa-sun"></i> Modo claro`
        : `<i class="fas fa-moon"></i> Modo oscuro`;
    });
  }

  // Botón de sugerencias
  const feedbackBtn = document.getElementById("btn-feedback");
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Formulario de sugerencias.");
    });
  }

  // Botón de equipos
  const teamsBtn = document.getElementById("btn-teams");
  if (teamsBtn) {
    teamsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Vista de equipos.");
    });
  }

  // Botón para volver a home
  const homeBtn = document.getElementById("btn-home");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "home.html";
    });
  }

  // Crear nuevo proyecto
  const createProjectBtn = document.getElementById("btn-create-project");
  if (createProjectBtn) {
    createProjectBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const emptyDashboard = document.getElementById("empty-dashboard");
      if (emptyDashboard) emptyDashboard.style.display = "none";
      initProjectCreationFlow();
    });
  }
}

// Inicia todo al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  initHome();
  setupProfileMenu();
});
