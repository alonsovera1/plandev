// home.js
import { logoutUser } from "./auth.js";
import { loadProjects } from "./projects.js";

export function initHome() {
  console.log("Inicializando la vista Home...");

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      // Evita que se modifique el hash o se realice una acción por defecto
      e.preventDefault();
      if (confirm("¿Estás seguro de cerrar sesión?")) {
        logoutUser()
          .then(() => {
            // Opcionalmente, se puede limpiar el hash o reemplazar el estado
            history.replaceState(null, "", "index.html");
            window.location.href = "index.html";
          })
          .catch(err => {
            console.error("Error al cerrar sesión:", err);
            alert("No se pudo cerrar la sesión. Intenta nuevamente.");
          });
      }
    });
  }

  // Inicializa otras funcionalidades (ej. carga de proyectos)
  loadProjects();
}
