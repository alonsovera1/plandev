// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
    
//     // Manejo de cookies
//     const cookieBanner = document.createElement('div');
//     cookieBanner.innerHTML = `
//         <div class="cookie-banner">
//             <p>Este sitio usa cookies. ¿Aceptar?</p>
//             <button id="accept-cookies">Aceptar</button>
//             <button id="decline-cookies">Rechazar</button>
//         </div>`;
//     document.body.appendChild(cookieBanner);

//     document.getElementById('accept-cookies').addEventListener('click', () => {
//         document.cookie = "userAcceptedCookies=true; path=/";
//         cookieBanner.style.display = 'none';
//     });

//     document.getElementById('decline-cookies').addEventListener('click', () => {
//         document.cookie = "userAcceptedCookies=false; path=/";
//         cookieBanner.style.display = 'none';
//     });
// });

// Menú de hamburguesa
const hamburgerMenu = document.querySelector('.hamburger-menu');
const headerNav = document.querySelector('.header-nav');
const headerActions = document.querySelector('.header-actions');

hamburgerMenu.addEventListener('click', () => {
    headerNav.classList.toggle('active');
    headerActions.classList.toggle('active');
});


// Mostrar/Ocultar el botón de volver al principio
window.addEventListener('scroll', function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Función para volver al principio de la página
document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

