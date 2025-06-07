/* Archivo: public/js/projects.js */

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./firebase-config.js";
import { methodologies } from "./methodologies.js";

const projectsContainer = document.getElementById("projectsContainer");

if (!projectsContainer) {
  console.error("Error: No se encontró el elemento projectsContainer en el DOM.");
  // En lugar de return, podrías lanzar un error opcionalmente:
  // throw new Error("No se encontró el elemento projectsContainer en el DOM.");
} else {
  projectsContainer.innerHTML = ""; // Limpiar antes de agregar proyectos
}


projectsContainer.innerHTML = ""; // Limpiar antes de agregar proyectos

export async function loadProjects() {
  const auth = getAuth();

  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      console.error("Error: Usuario no autenticado.");
      return;
    }

    try {
      // Filtrar proyectos para que cada usuario solo vea los suyos
      const projectsQuery = query(collection(db, "projects"), where("owner", "==", currentUser.uid));
      const querySnapshot = await getDocs(projectsQuery);

      // Limpiar el dashboard antes de mostrar proyectos
      projectsContainer.innerHTML = "";

      querySnapshot.forEach(doc => {
        const projectData = doc.data();
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
          <h3>${projectData.name}</h3>
          <p>Metodología: ${methodologies[projectData.methodology]?.title || "Desconocida"}</p>
          <p>Rol: ${projectData.role}</p>
        `;
        projectsContainer.appendChild(projectCard);
      });

      console.log("Proyectos cargados correctamente.");
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
    }
  });
}
