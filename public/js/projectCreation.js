import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { db } from "./firebase-config.js";
import { loadProjects } from "./projects.js";

// Definición de los enfoques de desarrollo
const developmentApproaches = ["Agile", "Waterfall", "DevOps", "Lean"];

// Definir los roles
const approachRoles = {
  Agile: ["Product Owner", "Scrum Master", "Development Team"],
  Waterfall: ["Project Manager", "Developer", "QA"],
  DevOps: ["Developer", "Operations Engineer", "Automation Specialist"],
  Lean: ["Process Optimizer", "Developer", "QA"]
};

// Variables de control del flujo
let currentStep = 1;
let selectedProjectName = "";
let selectedProjectDescription = "";
let selectedApproach = "";
let selectedRoles = [];

// Función que renderiza el formulario según el paso actual
function renderProjectCreationFlow() {
  const container = document.getElementById("projectCreationContainer");
  container.innerHTML = ""; // Limpiar el contenido previo

  if (currentStep === 1) {
    // --- Paso 1: Nombre y Descripción ---
    container.innerHTML = `
      <h2>Crear Proyecto</h2>
      <label for="projectName">Nombre del proyecto:</label>
      <input type="text" id="projectName" placeholder="Nombre del proyecto">
      <label for="projectDesc">Descripción:</label>
      <textarea id="projectDesc" placeholder="Describe tu proyecto..."></textarea>
      <button id="nextStep">Siguiente →</button>
    `;
    document.getElementById("nextStep").addEventListener("click", () => {
      const nameInput = document.getElementById("projectName").value.trim();
      const descInput = document.getElementById("projectDesc").value.trim();
      if (!nameInput) {
        alert("Ingresa un nombre para el proyecto.");
        return;
      }
      selectedProjectName = nameInput;
      selectedProjectDescription = descInput; // Descripción opcional
      currentStep++;
      renderProjectCreationFlow();
    });
  } else if (currentStep === 2) {
    // --- Paso 2: Seleccionar Enfoque de Desarrollo (único) ---
    container.innerHTML = `<h2>Selecciona el enfoque de desarrollo</h2>`;
    developmentApproaches.forEach(approach => {
      const btn = document.createElement("button");
      btn.textContent = approach;
      btn.addEventListener("click", () => {
        selectedApproach = approach;
        currentStep++;
        renderProjectCreationFlow();
      });
      container.appendChild(btn);
    });
    // Botón anterior
    const prevDiv = document.createElement("div");
    prevDiv.style.marginTop = "20px";
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Anterior";
    prevBtn.addEventListener("click", () => {
      currentStep--;
      renderProjectCreationFlow();
    });
    prevDiv.appendChild(prevBtn);
    container.appendChild(prevDiv);
  } else if (currentStep === 3) {
    // --- Paso 3: Seleccionar Roles ---
    container.innerHTML = `<h2>Selecciona uno o varios roles</h2>`;
    selectedRoles = []; // reiniciar selección
    const roles = approachRoles[selectedApproach] || [];
    roles.forEach(role => {
      const label = document.createElement("label");
      label.style.display = "block";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = role;
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          selectedRoles.push(e.target.value);
        } else {
          selectedRoles = selectedRoles.filter(r => r !== e.target.value);
        }
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + role));
      container.appendChild(label);
    });
    // Botones de navegación
    const navDiv = document.createElement("div");
    navDiv.style.marginTop = "20px";
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Anterior";
    prevBtn.addEventListener("click", () => {
      currentStep--;
      renderProjectCreationFlow();
    });
    navDiv.appendChild(prevBtn);
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Crear Proyecto";
    finishBtn.style.marginLeft = "10px";
    finishBtn.addEventListener("click", () => {
      if (selectedRoles.length === 0) {
        alert("Selecciona al menos un rol.");
        return;
      }
      finalizeProjectCreation();
    });
    navDiv.appendChild(finishBtn);
    container.appendChild(navDiv);
  }
}

// Función para finalizar y registrar el proyecto en Firebase
async function finalizeProjectCreation() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    alert("Error: Usuario no autenticado.");
    return;
  }
  try {
    const projectData = {
      name: selectedProjectName,
      description: selectedProjectDescription,
      approach: selectedApproach,
      roles: selectedRoles,
      owner: user.uid,
      createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "projects"), projectData);
    // Actualizar el dashboard con el nuevo proyecto
    loadProjects();
    // Ocultar el formulario de creación
    document.getElementById("projectCreationContainer").style.display = "none";
    // Reiniciar para próximos proyectos
    currentStep = 1;
  } catch (error) {
    alert("Error al crear el proyecto. Revisa la conexión o permisos en Firebase.");
    console.error("Error en finalizeProjectCreation:", error);
  }
}

// Función exportada para iniciar el flujo. Se invoca desde home.js.
export function initProjectCreationFlow() {
  const container = document.getElementById("projectCreationContainer");
  if (container) {
    container.style.display = "block";
    currentStep = 1;
    renderProjectCreationFlow();
  } else {
    console.error("No se encontró el contenedor 'projectCreationContainer'.");
  }
}
