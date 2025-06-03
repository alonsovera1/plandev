// Modal para signup

const signupModal = document.getElementById('signupModal');
const openSignupBtns = document.querySelectorAll('.open-signup-modal');
const closeSignupBtn = signupModal.getElementsByClassName('close')[0];


// Abrir signup
function openModal() {
    if (signupModal) {
        signupModal.style.display = 'block';
        setTimeout(() => {
            signupModal.style.opacity = '1';
            signupModal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }
}

// Cerrar signup
function closeModal() {
    if (signupModal) {
        signupModal.style.opacity = '0';
        signupModal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        setTimeout(() => {
            signupModal.style.display = 'none';
        }, 500);
    }
}

if (openSignupBtns && openSignupBtns.length > 0) {
    openSignupBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
}

if (closeSignupBtn) {
    closeSignupBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', function(event) {
    if (event.target === signupModal) {
        closeModal();
    }
});




// Modal de inicio de sesion
const loginModal = document.getElementById('loginModal');
const openLoginBtns = document.querySelectorAll('.open-login-modal');
const closeLoginBtn = loginModal ? loginModal.getElementsByClassName('close')[0] : null;

// Abrir signin
function openLoginModal() {
    if (loginModal) {
        loginModal.style.display = 'block';
        setTimeout(() => {
            loginModal.style.opacity = '1';
            loginModal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }
}

// Cerrar signin
function closeLoginModal() {
    if (loginModal) {
        loginModal.style.opacity = '0';
        loginModal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        setTimeout(() => {
            loginModal.style.display = 'none';
        }, 500);
    }
}

// Evento en cada boton que abra el modal de inicio de sesión
if (openLoginBtns && openLoginBtns.length > 0) {
    openLoginBtns.forEach(btn => {
        btn.addEventListener('click', openLoginModal);
    });
}

if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', closeLoginModal);
}

// Cierra el modal si se hace click fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        closeLoginModal();
    }
});



// Combiar entre modales

// Enlace en el modal de registro para cambiar a inicio de sesión.
const switchToLoginLink = document.querySelector('.switch-to-login');
if (switchToLoginLink) {
    switchToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
        openLoginModal();
    });
}

// Enlace en el modal de inicio de sesión para cambiar a registro.
const switchToSignupLink = document.querySelector('.switch-to-signup');
if (switchToSignupLink) {
    switchToSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeLoginModal();
        openModal();
    });
}

