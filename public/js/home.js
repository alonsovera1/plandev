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




// Declarar variables globales para el flujo de creación
let currentStep = 1;
const totalSteps = 3;
let selectedProjectName = "";
let selectedMethodology = "";
let selectedRole = "";

// Lista de metodologías y roles (según la encuesta)
const methodologies = {
  "Scrum": ["Product Owner", "Scrum Master", "Development Team"],
  "Kanban": ["Gestor de Flujo", "Equipo de Desarrollo", "Stakeholders"],
  "XP": ["Coach", "Programador", "Tester"],
  "Design Thinking": ["Investigador", "Diseñador", "Facilitador"]
};

// Función para renderizar el flujo de creación de proyecto
function renderProjectCreationFlow() {
  // Asegurarse de limpiar el contenedor y evitar duplicados:
  const container = document.getElementById("projectCreationContainer");
  container.style.display = "block";
  container.innerHTML = ""; // Limpiar contenido previo

  // Dependiendo del paso actual se muestra contenido distinto:
  if (currentStep === 1) {
    // Paso 1: Nombre del Proyecto
    const step1 = document.createElement("div");
    step1.id = "step1";
    step1.innerHTML = `
      <h2>Agrega un nuevo proyecto</h2>
      <label for="projectName">Nombre del proyecto:</label>
      <input type="text" id="projectName" placeholder="Escribe el nombre del proyecto...">
    `;
    container.appendChild(step1);
  } else if (currentStep === 2) {
    // Paso 2: Seleccionar Metodología
    const step2 = document.createElement("div");
    step2.id = "step2";
    step2.innerHTML = `
      <h2>Selecciona una metodología de desarrollo</h2>
      <div id="methodologyList"></div>
    `;
    container.appendChild(step2);
    const methodologyList = document.getElementById("methodologyList");
    methodologyList.innerHTML = "";
    Object.keys(methodologies).forEach(method => {
      const btn = document.createElement("button");
      btn.textContent = method;
      btn.classList.add("methodology-btn");
      btn.addEventListener("click", () => {
        selectedMethodology = method;
        // Puedes agregar estilos para resaltar la selección
      });
      methodologyList.appendChild(btn);
    });
  } else if (currentStep === 3) {
    // Paso 3: Seleccionar Rol (según la metodología)
    const step3 = document.createElement("div");
    step3.id = "step3";
    step3.innerHTML = `<h2>Selecciona un rol</h2>
      <div id="rolesList"></div>`;
    container.appendChild(step3);
    const rolesList = document.getElementById("rolesList");
    rolesList.innerHTML = "";
    if (selectedMethodology && methodologies[selectedMethodology]) {
      methodologies[selectedMethodology].forEach(role => {
        const btn = document.createElement("button");
        btn.textContent = role;
        btn.classList.add("role-btn");
        btn.addEventListener("click", () => {
          selectedRole = role;
          // Puedes resaltar la selección
        });
        rolesList.appendChild(btn);
      });
    }
  }

  // Añadir controles de navegación (flechas)
  const navDiv = document.createElement("div");
  navDiv.style.marginTop = "20px";
  // Botón "Anterior" (disponible si no es el primer paso)
  if (currentStep > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Anterior";
    prevBtn.addEventListener("click", () => {
      currentStep--;
      renderProjectCreationFlow();
    });
    navDiv.appendChild(prevBtn);
  }
  // Botón "Siguiente" (disponible si no es el último paso)
  if (currentStep < totalSteps) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Siguiente →";
    nextBtn.style.marginLeft = "10px";
    nextBtn.addEventListener("click", () => {
      // Validar cada paso antes de avanzar
      if (currentStep === 1) {
        const projectNameInput = document.getElementById("projectName");
        if (!projectNameInput.value.trim()) {
          alert("Por favor, ingresa un nombre para el proyecto.");
          return;
        }
        selectedProjectName = projectNameInput.value.trim();
      }
      if (currentStep === 2) {
        if (!selectedMethodology) {
          alert("Por favor, selecciona una metodología.");
          return;
        }
      }
      currentStep++;
      renderProjectCreationFlow();
    });
    navDiv.appendChild(nextBtn);
  }
  // Botón "Finalizar" en el último paso
  if (currentStep === totalSteps) {
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Finalizar";
    finishBtn.style.marginLeft = "10px";
    finishBtn.addEventListener("click", () => {
      if (!selectedRole) {
        alert("Por favor, selecciona un rol.");
        return;
      }
      finalizeProjectCreation();
    });
    navDiv.appendChild(finishBtn);
  }
  container.appendChild(navDiv);
}

// Función para finalizar el flujo de creación
function finalizeProjectCreation() {
  alert(`Proyecto "${selectedProjectName}" creado con metodología "${selectedMethodology}" y rol "${selectedRole}"`);
  // Limpia el contenedor de creación para evitar duplicación
  const container = document.getElementById("projectCreationContainer");
  if (container) {
    container.innerHTML = "";
    container.style.display = "none";
  }
  // Reiniciar variables para el próximo flujo
  currentStep = 1;
  selectedProjectName = "";
  selectedMethodology = "";
  selectedRole = "";
  // Aquí también podrías actualizar el dashboard o limpiar otros mensajes, evitando que se sobreponga el mensaje de bienvenida.
}

// Agregar el listener al botón "Crear un proyecto" para iniciar el flujo
const createProjectBtn = document.getElementById("btn-create-project");
if (createProjectBtn) {
  createProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Limpiar el dashboard. Por ejemplo, ocultar el estado de bienvenida:
    const emptyDashboard = document.getElementById("empty-dashboard");
    if (emptyDashboard) {
      emptyDashboard.style.display = "none";
      emptyDashboard.innerHTML = ""; // Limpiar para evitar superposición
    }
    // Reiniciar variables en caso de que se inicie un flujo nuevo
    currentStep = 1;
    selectedProjectName = "";
    selectedMethodology = "";
    selectedRole = "";
    // Mostrar el contenedor de creación (se crea dinámicamente si no existe)
    let container = document.getElementById("projectCreationContainer");
    if (!container) {
      container = document.createElement("section");
      container.id = "projectCreationContainer";
      container.style.display = "none"; // inicialmente oculto
      document.querySelector('.dashboard').appendChild(container);
    }
    renderProjectCreationFlow();
  });
}

