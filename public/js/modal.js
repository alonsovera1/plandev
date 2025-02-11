// Modal para signup

const modal = document.getElementById('signupModal');
const openModalBtns = document.querySelectorAll('.open-signup-modal');
const closeModalBtn = document.getElementsByClassName('close')[0];

// Función para abrir el modal con transición
function openModal() {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10); 
}

// Función para cerrar el modal con transición
function closeModal() {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); 
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



// Modal para signin

const loginModal = document.getElementById('loginModal');
const openLoginModalBtns = document.querySelectorAll('.open-login-modal');
const closeLoginModalBtn = loginModal.getElementsByClassName('close')[0];

// Función para abrir el modal con transición
function openLoginModal() {
    loginModal.style.display = 'block';
    setTimeout(() => {
        loginModal.style.opacity = '1';
        loginModal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
}

// Función para cerrar el modal con transición
function closeLoginModal() {
    loginModal.style.opacity = '0';
    loginModal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    setTimeout(() => {
        loginModal.style.display = 'none';
    }, 500); // Tiempo que dura la transición
}

// Abrir el modal al hacer clic en cualquiera de los botones con la clase "open-login-modal"
openLoginModalBtns.forEach(btn => {
    btn.onclick = openLoginModal;
});

// Cerrar el modal al hacer clic en el botón de cierre
closeLoginModalBtn.onclick = closeLoginModal;

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == loginModal) {
        closeLoginModal();
    }
}

