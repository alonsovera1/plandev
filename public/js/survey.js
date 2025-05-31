// Encuesta

import { doc, getDoc, updateDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  // Espera el estado de autenticación usando onAuthStateChanged
  auth.onAuthStateChanged(async (currentUser) => {
    if (!currentUser) {
      // Si no hay usuario, redirige a index.html
      window.location.href = "index.html";
      return;
    }
    
    // Consultar el perfil del usuario en Firestore
    const userProfileRef = doc(db, "userProfiles", currentUser.uid);
    const userProfileSnap = await getDoc(userProfileRef);

    if (userProfileSnap.exists()) {
      const profileData = userProfileSnap.data();
      if (profileData.surveyCompleted) {
        // Si ya completó la encuesta, redirige a home.html
        window.location.href = "home.html";
        return;
      }
    } else {
      console.error("Perfil de usuario no encontrado");
      window.location.href = "index.html";
      return;
    }

    // Agregar event listeners a cada opción para gestionar la selección
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', function () {
        const parentQuestion = this.closest('.question');
        // Selecciona todas las opciones de la pregunta
        const allOptionCards = parentQuestion.querySelectorAll('.option-card');
        
        // Si la pregunta tiene más de 4 opciones, permite selección múltiple:
        if (allOptionCards.length > 4) {
          // Simplemente alterna la clase "selected"
          this.classList.toggle('selected');
        } else {
          // Si la pregunta tiene 4 o menos opciones, permite solo selección única:
          allOptionCards.forEach(el => el.classList.remove('selected'));
          this.classList.add('selected');
        }
        
        // Manejo del input "otro"
        if (this.getAttribute('data-value').toLowerCase() === 'otro') {
          // Si la opción "otro" está seleccionada, muestra el campo de texto asociado; en modo múltiple, solo se muestra si se selecciona
          const otherInput = parentQuestion.querySelector('.other-input');
          if (otherInput) {
            if (this.classList.contains('selected')) {
              otherInput.style.display = 'block';
            } else {
              otherInput.style.display = 'none';
            }
          }
        } else {
          // En preguntas con selección múltiple, si se hace clic en otra opción, se oculta el input "otro"
          const otherInput = parentQuestion.querySelector('.other-input');
          if (otherInput) {
            otherInput.style.display = 'none';
          }
        }
      });
    });



    // Si el usuario está autenticado y es nuevo (no completó la encuesta), continúa con la configuración de la encuesta
    const questions = Array.from(document.querySelectorAll(".question"));
    let currentIdx = 0;
    const total = questions.length;
    const progressFill = document.querySelector(".progress-fill");
    const currentQuestionDisplay = document.getElementById("currentQuestion");
    const totalQuestionsDisplay = document.getElementById("totalQuestions");
    totalQuestionsDisplay.textContent = total;

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");

    function showQuestion(idx) {
      questions.forEach((q, i) => {
        q.style.display = (i === idx) ? "block" : "none";
      });
      currentQuestionDisplay.textContent = idx + 1;
      progressFill.style.width = (((idx + 1) / total) * 100) + "%";

      const navigation = document.querySelector(".survey-navigation");
      navigation.style.justifyContent = (idx === 0) ? "flex-end" : "space-between";

      nextBtn.style.display = (idx === total - 1) ? "none" : "inline-block";
      submitBtn.style.display = (idx === total - 1) ? "inline-block" : "none";
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

    submitBtn.addEventListener("click", async () => {
      let responses = {};
      questions.forEach((q) => {
        const qid = q.id;
        let selected = [];
        q.querySelectorAll(".option-card.selected").forEach((opt) => {
          let val = opt.getAttribute("data-value");
          if (val.toLowerCase().includes("otro")) {
            const inpt = q.querySelector("input[type='text']");
            if (inpt && inpt.style.display === "block") {
              val = inpt.value;
            }
          }
          selected.push(val);
        });
        responses[qid] = selected;
      });

      try {
        await addDoc(collection(db, "surveyResponses"), {
          userId: currentUser.uid,
          responses: responses,
          createdAt: new Date()
        });
        // Actualiza el perfil para marcar que la encuesta fue completada
        await updateDoc(userProfileRef, { surveyCompleted: true });
        window.location.href = "home.html";
      } catch (error) {
        console.error("Error al guardar la encuesta:", error);
        // Aquí puedes mostrar un mensaje de error
      }
    });
  });
});
