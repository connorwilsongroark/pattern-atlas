type QuizResultProps = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
};

export function QuizResult({
  isCorrect,
  correctAnswer,
  explanation,
}: QuizResultProps) {
  return (
    <section
      className={`rounded-2xl border p-5 ${
        isCorrect
          ? "border-[var(--color-success-border)] bg-[var(--color-success-bg)]"
          : "border-[var(--color-danger-border)] bg-[var(--color-danger-bg)]"
      }`}
    >
      <h2
        className={`text-lg font-semibold ${
          isCorrect
            ? "text-[var(--color-success-text)]"
            : "text-[var(--color-danger-text)]"
        }`}
      >
        {isCorrect ? "Correct" : "Not quite"}
      </h2>

      {!isCorrect && (
        <p className='mt-2 text-sm text-[var(--color-text)]'>
          Correct answer: <span className='font-semibold'>{correctAnswer}</span>
        </p>
      )}

      <p className='mt-3 text-sm leading-6 text-[var(--color-text-muted)]'>
        {explanation}
      </p>
    </section>
  );
}
