import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./firebase-config.js";
import { methodologies } from "./methodologies.js";

const projectsContainer = document.getElementById("projectsContainer");

if (!projectsContainer) {
  console.error("Error: No se encontró el elemento projectsContainer en el DOM.");
} else {
  projectsContainer.innerHTML = ""; // Limpiar antes de agregar proyectos
}

export async function loadProjects() {
  const auth = getAuth();

  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      console.error("Error: Usuario no autenticado.");
      return;
    }

    try {
      // Consulta los proyectos del usuario, ordenados de forma descendiente por "createdAt"
      const projectsQuery = query(
        collection(db, "projects"),
        where("owner", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(projectsQuery);

      // Si no hay documentos, mostramos el estado de bienvenida.
      const emptyDashboard = document.getElementById("empty-dashboard");
      if (querySnapshot.empty && emptyDashboard) {
        emptyDashboard.style.display = "block";
        projectsContainer.style.display = "none";
      } else if (emptyDashboard) {
        // Si hay proyectos, se oculta la bienvenida
        emptyDashboard.style.display = "none";
        projectsContainer.style.display = "block";
      }

      // Limpiar el dashboard antes de mostrar proyectos
      projectsContainer.innerHTML = "";

      querySnapshot.forEach(doc => {
        const projectData = doc.data();
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
          <h3>${projectData.name}</h3>
          <p>Metodología: ${methodologies[projectData.methodology]?.title || "Desconocida"}</p>
          <p>Rol: ${Array.isArray(projectData.roles) ? projectData.roles.join(", ") : projectData.role}</p>
        `;
        // Con el orden descendente, el primer card será el más reciente
        projectsContainer.appendChild(projectCard);
      });

      console.log("Proyectos cargados correctamente.");
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
    }
  });
}