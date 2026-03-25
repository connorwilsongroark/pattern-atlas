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
        isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
      }`}
    >
      <h2
        className={`text-lg font-semibold ${
          isCorrect ? "text-green-900" : "text-red-900"
        }`}
      >
        {isCorrect ? "Correct" : "Not quite"}
      </h2>

      {!isCorrect && (
        <p className='mt-2 text-sm text-slate-800'>
          Correct answer: <span className='font-semibold'>{correctAnswer}</span>
        </p>
      )}

      <p className='mt-3 text-sm leading-6 text-slate-700'>{explanation}</p>
    </section>
  );
}
