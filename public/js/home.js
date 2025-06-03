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

  
    // Crear un nuevo proyecto
    const createProjectBtn = document.getElementById("btn-create-project");
    if (createProjectBtn) {
    createProjectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        startProjectCreationFlow();
    });
    }

    // Función que inicia el flujo de creación de proyecto
    function startProjectCreationFlow() {
    console.log("Iniciando flujo de creación de proyecto...");
    // Aquí se puede ocultar el dashboard actual y mostrar el panel de selección de metodología,
    // o iniciar la lógica que guíe al usuario por el proceso.
    alert("Flujo de creación de proyecto iniciado.");
    }

    // Boton Equipos
    const teamsBtn = document.getElementById("btn-teams");
    if (teamsBtn) {
    teamsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Lógica para redirigir o mostrar la vista de Equipos
        alert("Vista Equipos");
    });

    // Boton Sugerencias
    const feedbackBtn = document.getElementById("btn-feedback");
    if (feedbackBtn) {
    feedbackBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Lógica para abrir un formulario modal de sugerencias o feedback
        alert("Formulario de sugerencias se abriría aquí.");
    });
    }

}
    // Retraer panel
    const asideCollapseBtn = document.getElementById("asideCollapse");
    const sideTools = document.querySelector(".side-tools");
    if (asideCollapseBtn && sideTools) {
    asideCollapseBtn.addEventListener("click", () => {
        sideTools.classList.toggle("collapsed");
        // Cambiar el ícono según el estado
        if (sideTools.classList.contains("collapsed")) {
        asideCollapseBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
        // Opcional: ajustar el ancho del panel – puede hacerse con CSS
        } else {
        asideCollapseBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
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



// Función que inicia el flujo de creación de un proyecto
function startProjectCreationFlow() {
  console.log("Iniciando flujo de creación de proyecto...");
  // Supongamos que el flujo implica ocultar la sección de proyectos y mostrar el panel de metodologías.
  const projectsSection = document.getElementById("projectsSection");
  const createProjectPanel = document.getElementById("createProjectPanel");
  if (projectsSection && createProjectPanel) {
    projectsSection.style.display = "none";
    createProjectPanel.style.display = "block";
  }
  // Aquí continuar con la lógica para filtrar y seleccionar la metodología.
}
