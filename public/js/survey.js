// Logica de la encuesta

import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged(async (currentUser) => {
    if (!currentUser) {
      window.location.href = "index.html";
      return;
    }

    const profileRef = doc(db, "userProfiles", currentUser.uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      const data = profileSnap.data();
      if (data.surveyCompleted) {
        window.location.href = "home.html";
        return;
      }
    } else {
      await setDoc(profileRef, {
        surveyCompleted: false,
        email: currentUser.email,
        createdAt: new Date()
      });
    }

    const questions = Array.from(document.querySelectorAll(".question"));
    let currentIdx = 0;
    const total = questions.length;
    const progressFill = document.querySelector(".progress-fill");
    const currentQuestionDisplay = document.getElementById("currentQuestion");
    const totalQuestionsDisplay = document.getElementById("totalQuestions");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");

    totalQuestionsDisplay.textContent = total;

    // Lista de preguntas de selección única
    const singleSelectionQuestions = ['q3', 'q5', 'q9', 'q11', 'q12', 'q13', 'q14', 'q15'];

    // Función para mostrar la pregunta actual y manejar botones
    function showQuestion(idx) {
      questions.forEach((q, i) => {
        q.style.display = (i === idx) ? "block" : "none";
      });
      currentQuestionDisplay.textContent = idx + 1;
      progressFill.style.width = `${((idx + 1) / total) * 100}%`;

      // Mostrar/ocultar botones de navegación
      nextBtn.style.display = (idx === total - 1) ? "none" : "inline-block";
      submitBtn.style.display = (idx === total - 1) ? "inline-block" : "none";
      prevBtn.style.display = (idx === 0) ? "none" : "inline-block";

    }

    showQuestion(currentIdx);

    // Función para manejar selección de opciones en todas las preguntas
    questions.forEach((question) => {
      const options = Array.from(question.querySelectorAll(".option-card"));

      // Determinar selección única o múltiple según id de pregunta
      const isSingleSelection = singleSelectionQuestions.includes(question.id);

      options.forEach((option) => {
        option.addEventListener("click", () => {
          const selectedValue = option.getAttribute("data-value");

          if (isSingleSelection) {
            // Selección única: deseleccionar todas, seleccionar la opción clickeada
            options.forEach(opt => {
              opt.classList.remove("selected");
            });
            option.classList.add("selected");
          } else {
            // Selección múltiple: alternar selección del botón
            option.classList.toggle("selected");
          }

          // Manejo especial para la opción "Otro"
          if (selectedValue && selectedValue.toLowerCase() === "otro") {
            const otherInput = question.querySelector(".other-input");
            if (otherInput) {
              if (option.classList.contains("selected")) {
                // Mostrar input cuando "Otro" está seleccionado
                otherInput.style.display = "block";
                otherInput.focus();
              } else {
                // Ocultar input si "Otro" es deseleccionado
                otherInput.style.display = "none";
                otherInput.value = ""; // Limpiar input al ocultar para evitar guardar texto residual
              }
            }
          } else {
            // En preguntas de selección única, al seleccionar otra opción que no sea "Otro", ocultar input "Otro"
            const otherInput = question.querySelector(".other-input");
            if (otherInput) {
              otherInput.style.display = "none";
              otherInput.value = "";
              // Si se oculta input "Otro", también desmar "Otro" si estaba seleccionado previamente
              options.forEach(opt => {
                if(opt.getAttribute("data-value") && opt.getAttribute("data-value").toLowerCase() === "otro"){
                  opt.classList.remove("selected");
                }
              });
            }
          }
        });
      });
    });

    // Navegación entre preguntas
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

    // Guardar respuestas y marcar encuesta como completada en Firestore
    submitBtn.addEventListener("click", async () => {
      submitBtn.disabled = true; // evitar envíos múltiples

      const responses = {};

      questions.forEach((q) => {
        const qid = q.id;
        const selected = [];
        // Recoger todas las opciones seleccionadas
        q.querySelectorAll(".option-card.selected").forEach((opt) => {
          let val = opt.getAttribute("data-value");

          if (val && val.toLowerCase() === "otro") {
            const inpt = q.querySelector("input[type='text']");
            if (inpt && inpt.style.display === "block" && inpt.value.trim() !== "") {
              val = inpt.value.trim(); // Guardar el valor del input "Otro"
            } else {
              val = null;
            }
          }

          if(val !== null){
            selected.push(val);
          }
        });

        responses[qid] = selected;
      });

      try {
        await addDoc(collection(db, "surveyResponses"), {
          userId: currentUser.uid,
          responses,
          createdAt: new Date()
        });
        console.log("Respuestas de encuesta guardadas.");

        await updateDoc(profileRef, { surveyCompleted: true });
        console.log("Perfil actualizado: encuesta completada.");

        window.location.href = "home.html";
      } catch (error) {
        console.error("Error guardando la encuesta:", error);
        alert("No se pudo enviar la encuesta. Intenta otra vez.");
        submitBtn.disabled = false;
      }
    });
  });
});
