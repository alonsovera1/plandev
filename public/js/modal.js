// Obtener elementos del DOM
const modal = document.getElementById('signupModal');
const openModalBtns = document.querySelectorAll('.open-signup-modal');
const closeModalBtn = document.getElementsByClassName('close')[0];

// Función para abrir el modal con transición
function openModal() {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10); // Retraso para permitir que el navegador procese el cambio de display
}

// Función para cerrar el modal con transición
function closeModal() {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Tiempo que dura la transición
}

// Abrir el modal al hacer clic en cualquiera de los botones con la clase "open-signup-modal"
openModalBtns.forEach(btn => {
    btn.onclick = openModal;
});

// Cerrar el modal al hacer clic en el botón de cierre
closeModalBtn.onclick = closeModal;

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
