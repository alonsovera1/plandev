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
    prevSlide.disabled = index === 0; // Deshabilitar "Anterior" en la primera slide
    nextSlide.disabled = index === slides.length - 1; // Deshabilitar "Siguiente" en la última slide
  }

  // Abrir modal al hacer clic en "Guía de inicio"
  if (btnStartGuide) {
    btnStartGuide.addEventListener('click', () => {
      guideModal.style.display = 'block';
      currentSlide = 0;
      showSlide(currentSlide);
    });
  }

  // Cerrar modal al hacer clic en la X
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      guideModal.style.display = 'none';
    });
  }

  // Botón "Anterior"
  if (prevSlide) {
    prevSlide.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      }
    });
  }

  // Botón "Siguiente"
  if (nextSlide) {
    nextSlide.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === guideModal) {
      guideModal.style.display = 'none';
    }
  });
});
