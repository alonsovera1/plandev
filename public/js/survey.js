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

    if (!submitBtn) {
      console.error("Botón de envío no encontrado.");
      return;
    }

    totalQuestionsDisplay.textContent = total;

    function showQuestion(idx) {
      questions.forEach((q, i) => {
        q.style.display = (i === idx) ? "block" : "none";
      });
      currentQuestionDisplay.textContent = idx + 1;
      progressFill.style.width = `${((idx + 1) / total) * 100}%`;

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

    // Guardar respuestas y marcar encuesta como completada
    submitBtn.addEventListener("click", async () => {
      submitBtn.disabled = true; // evita envíos múltiples
      const responses = {};
      questions.forEach((q) => {
        const qid = q.id;
        const selected = [];
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
        // Guardar respuestas en Firestore
        await addDoc(collection(db, "surveyResponses"), {
          userId: currentUser.uid,
          responses,
          createdAt: new Date()
        });
        console.log("Respuestas de encuesta guardadas.");

        // Actualizar perfil indicando encuesta completada
        await updateDoc(profileRef, { surveyCompleted: true });
        console.log("Perfil actualizado: encuesta completada.");

        window.location.href = "home.html";
      } catch (error) {
        console.error("Error guardando la encuesta:", error);
        alert("No se pudo enviar la encuesta. Intenta otra vez.");
        submitBtn.disabled = false; // permitir reintentos
      }
    });
  });
});