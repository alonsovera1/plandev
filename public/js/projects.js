// cargar y mostrar los proyectos en el dashboard principal
//  Lógica para funcionalidades CRUD y actualización de proyectos

import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./firebase-config.js";

export async function loadProjects() {
  try {
    // Consulta todos los documentos de la colección "projects"
    // se pueden agregar filtros (por ejemplo, que pertenezcan al usuario actual)
    const querySnapshot = await getDocs(collection(db, "projects"));
    
    // Selecciona el contenedor donde se cargarán las tarjetas de proyectos
    const cardsContainer = document.getElementById("project-cards");
    if (cardsContainer) {
      cardsContainer.innerHTML = ""; // Limpiar el contenido previo

      querySnapshot.forEach((docSnap) => {
        const project = docSnap.data();
        // Crear elemento de la tarjeta del proyecto
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description ? project.description : ""}</p>
          <small>Creado el: ${new Date(project.createdAt.seconds * 1000).toLocaleDateString()}</small>
        `;

        // Agregar un event listener para navegar a la vista de detalles del proyecto
        card.addEventListener("click", () => {
          // Ejemplo: redirigir a la página de detalles del proyecto
          window.location.href = `/project/${docSnap.id}`;
        });

        // Agregar la tarjeta al contenedor
        cardsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error al cargar proyectos:", error);
    // Aquí puedes mostrar una notificación o alerta al usuario si lo deseas
  }
}
