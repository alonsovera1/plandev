/* Archivo: public/js/guide.js */

document.addEventListener('DOMContentLoaded', () => {
  const guideModal = document.getElementById('guideModal');
  const btnStartGuide = document.getElementById('btn-start-guide');
  const closeModal = document.querySelector('.close-modal');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');
  const slides = document.querySelectorAll('.modal-slides .slide');
  let currentSlide = 0;

  // Función para mostrar la slide en el índice indicado
  function showSlide(index) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    // Actualizar el estado de los botones de navegación
    if (prevSlide) prevSlide.disabled = index === 0;
    if (nextSlide) nextSlide.disabled = index === slides.length - 1;
  }

  // Abrir el modal al hacer clic en el botón "Guía de inicio"
  if (btnStartGuide) {
    btnStartGuide.addEventListener('click', () => {
      guideModal.style.display = 'block';
      currentSlide = 0;
      showSlide(currentSlide);
    });
  }

  // Cerrar el modal al pulsar la "X"
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      guideModal.style.display = 'none';
    });
  }

  // Si existe un botón "Salir" dentro del último slide, también lo cierra
  const exitButton = document.querySelector('.exit-guide');
  if (exitButton) {
    exitButton.addEventListener('click', () => {
      guideModal.style.display = 'none';
    });
  }

  // Navegación: botón "Anterior"
  if (prevSlide) {
    prevSlide.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      }
    });
  }

  // Navegación: botón "Siguiente"
  if (nextSlide) {
    nextSlide.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    });
  }

  // Cerrar el modal si se hace clic fuera del contenido del modal
  window.addEventListener('click', (event) => {
    if (event.target === guideModal) {
      guideModal.style.display = 'none';
    }
  });
});
