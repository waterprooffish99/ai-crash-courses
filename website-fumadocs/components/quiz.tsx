'use client';

import { useId, useState } from 'react';

export type QuizQuestion = {
  question: string;
  options: { value: string; label: string }[];
  answer: string;
};

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const quizId = useId();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const correct = questions.filter((question, index) => answers[index]?.toLowerCase() === question.answer.toLowerCase()).length;
  const answered = Object.keys(answers).length;

  return (
    <section className="learning-quiz" aria-label="Knowledge check">
      {questions.map((question, index) => {
        const selected = answers[index];
        const isCorrect = checked && selected?.toLowerCase() === question.answer.toLowerCase();
        return (
          <fieldset
            className="quiz-question"
            data-state={checked ? (isCorrect ? 'correct' : 'incorrect') : undefined}
            key={`${quizId}-${index}`}
          >
            <legend>{question.question}</legend>
            {question.options.map((option) => (
              <label className="quiz-option" key={option.value}>
                <input
                  type="radio"
                  name={`${quizId}-${index}`}
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => {
                    setAnswers((current) => ({ ...current, [index]: option.value }));
                    setChecked(false);
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
        );
      })}
      <div className="quiz-actions" data-validation-ignore="true">
        <button type="button" onClick={() => setChecked(true)}>Check my score</button>
        <button className="secondary" type="button" onClick={() => { setAnswers({}); setChecked(false); }}>Reset</button>
      </div>
      <p className="quiz-result" aria-live="polite" data-validation-ignore="true">
        {checked ? `${correct} of ${questions.length} correct${questions.length - answered ? ` · ${questions.length - answered} unanswered` : ''}.` : 'Choose one answer for each question, then check your score.'}
      </p>
    </section>
  );
}
