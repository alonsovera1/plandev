import { methodologies } from "./methodologies.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { db } from "./firebase-config.js";
import { loadProjects } from "./projects.js";

let currentStep = 1;
let selectedProjectName = "";
let selectedMethodology = "";
let selectedRole = "";

// Renderizar el flujo de creación basado en `methodologies.js`
function renderProjectCreationFlow() {
  const container = document.getElementById("projectCreationContainer");
  container.innerHTML = ""; // Limpiar contenido previo

  if (currentStep === 1) {
    container.innerHTML = `
      <h2>Agrega un nuevo proyecto</h2>
      <label>Nombre del proyecto:</label>
      <input type="text" id="projectName" placeholder="Escribe el nombre">
      <button id="nextStep">Siguiente →</button>
    `;
    document.getElementById("nextStep").addEventListener("click", () => {
      selectedProjectName = document.getElementById("projectName").value.trim();
      if (!selectedProjectName) {
        alert("Ingresa un nombre válido.");
        return;
      }
      currentStep++;
      renderProjectCreationFlow();
    });
  } else if (currentStep === 2) {
    container.innerHTML = `<h2>Selecciona una metodología</h2>`;
    Object.keys(methodologies).forEach(methodKey => {
      const btn = document.createElement("button");
      btn.textContent = methodologies[methodKey].title;
      btn.addEventListener("click", () => {
        selectedMethodology = methodKey;
        currentStep++;
        renderProjectCreationFlow();
      });
      container.appendChild(btn);
    });
  } else if (currentStep === 3) {
    const roles = methodologies[selectedMethodology]?.roles || [];
    container.innerHTML = `<h2>Selecciona un rol</h2>`;
    roles.forEach(role => {
      const btn = document.createElement("button");
      btn.textContent = role.name;
      btn.addEventListener("click", () => {
        selectedRole = role.name;
        finalizeProjectCreation();
      });
      container.appendChild(btn);
    });
  }
}

// Guardar proyecto en Firebase
async function finalizeProjectCreation() {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Error: Usuario no autenticado.");
      return;
    }

    try {
      const newProject = {
        name: selectedProjectName,
        methodology: selectedMethodology,
        role: selectedRole,
        owner: user.uid,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, "projects"), newProject);
      loadProjects();
      document.getElementById("projectCreationContainer").style.display = "none";
    } catch (error) {
      alert("Error al guardar el proyecto.");
    }
  });
}

export function initProjectCreationFlow() {
  document.getElementById("projectCreationContainer").style.display = "block";
  currentStep = 1;
  renderProjectCreationFlow();
}
