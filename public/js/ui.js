/* Lógica de la interfaz (index.html) */

document.addEventListener('DOMContentLoaded', () => {
  // Menú de hamburguesa
  const hamburger = document.querySelector('.hamburger-menu');
  const headerNav = document.querySelector('.header-nav');
  const headerActions = document.querySelector('.header-actions');

  if (hamburger && headerNav && headerActions) {
    hamburger.addEventListener('click', () => {
      headerNav.classList.toggle('open');
      headerActions.classList.toggle('open');
    });
  }

  // Botón de volver al inicio
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});




/* Navegación SPA mediante hash routing (home)*/

document.addEventListener("DOMContentLoaded", () => {
  // Determinar la ruta por defecto según el archivo actual
  let defaultRoute = "index";
  if (window.location.pathname.includes("home.html")) {
    defaultRoute = "home";
  }
  
  // Función para cargar una vista específica mediante import dinámico
  function loadView(view) {
    switch (view) {
      case "home":
        import("./home.js")
          .then(module => module.initHome())
          .catch(e => console.error("Error al cargar el módulo Home:", e));
        break;
      // Agrega más casos según las vistas a manejar
      case "index":
      default:
        console.log("Cargando vista Index (landing)...");
        // Aquí se puede cargar la lógica para la landing, o simplemente dejarlo vacío.
        break;
    }
  }

  // Extraer la ruta actual del hash, o usar el default según la página.
  const route = window.location.hash ? window.location.hash.substring(1) : defaultRoute;
  loadView(route);

  // Escuchar cambios en el hash para actualizar la vista sin recargar.
  window.addEventListener("hashchange", () => {
    const newRoute = window.location.hash ? window.location.hash.substring(1) : defaultRoute;
    loadView(newRoute);
  });
});



// Contraer el aside de home

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

}

//   // Abrir y cerrar el menú de perfil con clic
// document.addEventListener("DOMContentLoaded", () => {
//   const profileIcon = document.querySelector('.profile-icon');
//   const dropdownMenu = document.querySelector('.dropdown-menu');

//   if (profileIcon && dropdownMenu) {
//     profileIcon.addEventListener('click', (e) => {
//       e.stopPropagation();
//       dropdownMenu.classList.toggle('active');
//     });

//     document.addEventListener('click', (e) => {
//       if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
//         dropdownMenu.classList.remove('active');
//       }
//     });
//   }
// });