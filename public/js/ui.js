// Lógica de la interfaz

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
