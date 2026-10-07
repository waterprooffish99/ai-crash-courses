(() => {
  "use strict";

  const progressBar = document.querySelector("[data-reading-progress]");
  if (progressBar) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percent = available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0;
      progressBar.style.width = `${percent}%`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const glossaryInput = document.querySelector("#glossarySearch");
  if (glossaryInput) {
    const terms = [...document.querySelectorAll(".gterm")];
    glossaryInput.addEventListener("input", () => {
      const query = glossaryInput.value.trim().toLocaleLowerCase();
      for (const term of terms) {
        const searchable = `${term.dataset.term || ""} ${term.textContent}`.toLocaleLowerCase();
        term.hidden = Boolean(query) && !searchable.includes(query);
      }
    });
  }

  for (const card of document.querySelectorAll(".flashcard")) {
    card.addEventListener("click", () => {
      const isOpen = card.getAttribute("aria-expanded") === "true";
      card.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }

  for (const button of document.querySelectorAll("[data-copy-prompt]")) {
    button.addEventListener("click", async () => {
      const container = button.closest(".promptbox, .codebox, .card, section") || button.parentElement;
      const code = container?.querySelector("pre, code");
      if (!code) return;
      const originalLabel = button.textContent;
      try {
        await copyText(code.textContent.trim());
        button.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed";
      }
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1800);
    });
  }

  for (const quiz of document.querySelectorAll("[data-quiz]")) {
    const questions = [...quiz.querySelectorAll(".quiz-question[data-answer]")];
    const checkButton = quiz.querySelector('[data-quiz-action="check"]');
    const resetButton = quiz.querySelector('[data-quiz-action="reset"]');
    let result = quiz.querySelector("[data-quiz-result]");

    if (!questions.length || !checkButton) continue;
    if (!result) {
      result = document.createElement("p");
      result.className = "quiz-result";
      result.dataset.quizResult = "";
      result.setAttribute("aria-live", "polite");
      quiz.append(result);
    }

    checkButton.addEventListener("click", () => {
      let correct = 0;
      let answered = 0;
      for (const question of questions) {
        const selected = question.querySelector('input[type="radio"]:checked');
        const expected = question.dataset.answer.trim().toLocaleLowerCase();
        const actual = selected?.value.trim().toLocaleLowerCase();
        if (selected) answered += 1;
        const isCorrect = Boolean(selected) && actual === expected;
        question.dataset.state = isCorrect ? "correct" : "incorrect";
        if (isCorrect) correct += 1;
      }
      const unanswered = questions.length - answered;
      result.textContent = `${correct} of ${questions.length} correct${unanswered ? ` · ${unanswered} unanswered` : ""}. Review the highlighted questions and try again.`;
      result.focus?.();
    });

    resetButton?.addEventListener("click", () => {
      for (const input of quiz.querySelectorAll('input[type="radio"]')) input.checked = false;
      for (const question of questions) delete question.dataset.state;
      result.textContent = "Quiz reset. Choose an answer for each question when you are ready.";
    });
  }
})();
