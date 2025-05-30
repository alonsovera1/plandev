document.addEventListener("DOMContentLoaded", () => {
  const questions = Array.from(document.querySelectorAll(".question"));
  let currentIdx = 0;
  const total = questions.length;
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const progressFill = document.querySelector(".progress-fill");
  const currentQuestionDisplay = document.getElementById("currentQuestion");
  const totalQuestionsDisplay = document.getElementById("totalQuestions");

  totalQuestionsDisplay.textContent = total;
  
  function showQuestion(idx) {
    questions.forEach((q, i) => { q.style.display = i === idx ? "block" : "none"; });
    currentQuestionDisplay.textContent = idx + 1;
    progressFill.style.width = (((idx + 1) / total) * 100) + "%";
    nextBtn.style.display = (idx === total - 1) ? "none" : "inline-block";
    submitBtn.style.display = (idx === total - 1) ? "inline-block" : "none";
    
    // Si es la primera pregunta, alinear la navegación a la derecha; caso contrario, usar espacio entre botones.
    if (idx === 0) {
        document.querySelector(".survey-navigation").style.justifyContent = "flex-end";
    } else {
        document.querySelector(".survey-navigation").style.justifyContent = "space-between";
    }
    
    prevBtn.style.display = (idx === 0) ? "none" : "inline-block";
    }

  
  showQuestion(currentIdx);
  
  nextBtn.addEventListener("click", () => {
    if (currentIdx < total - 1) {
      currentIdx++;
      showQuestion(currentIdx);
    }
  });
  
  prevBtn.addEventListener("click", () => {
    if (currentIdx > 0) {
      currentIdx--;
      showQuestion(currentIdx);
    }
  });

  // Para lograr efecto inmediato de selección se usa mousedown
  const optionCards = document.querySelectorAll(".option-card");
  optionCards.forEach(card => {
    card.addEventListener("mousedown", () => {
      const questionDiv = card.closest(".question");
      // Define preguntas de selección simple (por id) para las cuales se permite solo una opción
      const singleSelectIds = ["q3", "q5", "q9", "q11", "q12", "q13", "q14", "q15"];
      if (singleSelectIds.includes(questionDiv.id)) {
        questionDiv.querySelectorAll(".option-card").forEach(opt => opt.classList.remove("selected"));
        card.classList.add("selected");
      } else {
        card.classList.toggle("selected");
      }
      // Si se selecciona "otro", mostrar el input correspondiente
      if (card.getAttribute("data-value").toLowerCase().includes("otro")) {
        const otherInput = card.parentElement.querySelector("input[type='text']");
        if (otherInput) {
          otherInput.style.display = card.classList.contains("selected") ? "block" : "none";
        }
      }
    });
  });
  
  submitBtn.addEventListener("click", () => {
    let responses = {};
    questions.forEach(q => {
      const qid = q.id;
      let selected = [];
      q.querySelectorAll(".option-card.selected").forEach(opt => {
        let val = opt.getAttribute("data-value");
        if (val.toLowerCase().includes("otro")) {
          const inpt = q.querySelector("input[type='text']");
          if (inpt && inpt.style.display === "block") { val = inpt.value; }
        }
        selected.push(val);
      });
      responses[qid] = selected;
    });
    console.log("Survey responses:", responses);
    // Aquí se enviarían los datos a la base de datos; luego se redirige a home.html
    window.location.href = "home.html";
  });
});
