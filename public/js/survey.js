// Obtener elementos del DOM
const modal = document.getElementById('questionModal');
const closeModalBtn = modal.querySelector('.close');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const questions = document.querySelectorAll('.question');
let currentQuestionIndex = 0;

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

// Función para mostrar la siguiente pregunta
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        questions[currentQuestionIndex].style.display = 'none';
        currentQuestionIndex++;
        questions[currentQuestionIndex].style.display = 'block';

        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        }
    }
}

// Abrir el modal inicial
openModal();

// Cerrar el modal al hacer clic en el botón de cierre
closeModalBtn.onclick = closeModal;

// Mostrar la siguiente pregunta al hacer clic en el botón "Siguiente"
nextBtn.onclick = showNextQuestion;

// Manejar la selección de las opciones
const optionCards = document.querySelectorAll('.option-card');
optionCards.forEach(card => {
    card.onclick = function() {
        this.classList.toggle('selected');
    };
});
