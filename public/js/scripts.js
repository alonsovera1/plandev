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
