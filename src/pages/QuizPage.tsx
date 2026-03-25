import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuizQuestions } from "../content/quiz";
import { QuizCard } from "../features/quiz/QuizCard";
import { shuffleArray } from "../features/quiz/quizUtils";
import type { QuizQuestion } from "../types/quiz";

type QuizMode = "full" | "review-missed";

export function QuizPage() {
  const [allQuestions] = useState<QuizQuestion[]>(() => getAllQuizQuestions());
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(getAllQuizQuestions()),
  );

  const [mode, setMode] = useState<QuizMode>("full");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [missedQuestionIds, setMissedQuestionIds] = useState<string[]>([]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const quizComplete = currentIndex >= totalQuestions;

  function resetRun(nextQuestions: QuizQuestion[], nextMode: QuizMode) {
    setQuestions(nextQuestions);
    setMode(nextMode);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsSubmitted(false);
    setScore(0);
  }

  function handleSelectChoice(choice: string) {
    if (isSubmitted) return;
    setSelectedChoice(choice);
  }

  function handleSubmit() {
    if (!selectedChoice || !currentQuestion) return;

    const isCorrect = selectedChoice === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setMissedQuestionIds((prev) =>
        prev.includes(currentQuestion.id)
          ? prev
          : [...prev, currentQuestion.id],
      );
    }

    setIsSubmitted(true);
  }

  function handleNext() {
    if (!isSubmitted) return;

    setSelectedChoice(null);
    setIsSubmitted(false);
    setCurrentIndex((prev) => prev + 1);
  }

  function handleRestart() {
    setMissedQuestionIds([]);
    resetRun(shuffleArray(allQuestions), "full");
  }

  function handleConfirmRestart() {
    const confirmed = window.confirm(
      "Are you sure you want to restart the quiz? Your current progress will be lost.",
    );

    if (!confirmed) return;

    handleRestart();
  }

  function handleReviewMissed() {
    const missedQuestions = allQuestions.filter((question) =>
      missedQuestionIds.includes(question.id),
    );

    if (missedQuestions.length === 0) return;

    resetRun(shuffleArray(missedQuestions), "review-missed");
  }

  if (quizComplete) {
    const missedCount = totalQuestions - score;

    return (
      <div className='mx-auto max-w-3xl space-y-8 px-4 py-10'>
        <header className='space-y-4'>
          <div className='flex flex-wrap items-center gap-3 text-sm text-slate-600'>
            <Link to='/' className='hover:text-slate-900'>
              Home
            </Link>
            <span>/</span>
            <span>Quiz</span>
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-slate-950'>
            {mode === "review-missed" ? "Review Complete" : "Quiz Complete"}
          </h1>

          <p className='text-lg text-slate-700'>
            You scored <span className='font-semibold'>{score}</span> out of{" "}
            <span className='font-semibold'>{totalQuestions}</span>.
          </p>

          {mode === "full" && missedCount > 0 && (
            <p className='text-slate-600'>
              You missed <span className='font-semibold'>{missedCount}</span>{" "}
              {missedCount === 1 ? "question" : "questions"}.
            </p>
          )}
        </header>

        <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='space-y-4'>
            <p className='text-slate-700'>
              {mode === "review-missed"
                ? "Nice work. Reviewing missed questions is one of the fastest ways to sharpen pattern recognition."
                : "Nice work. Keep going until the distinctions between patterns feel intuitive, not memorized."}
            </p>

            <div className='flex flex-wrap gap-3'>
              {mode === "full" && missedQuestionIds.length > 0 && (
                <button
                  type='button'
                  onClick={handleReviewMissed}
                  className='rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800'
                >
                  Review missed questions
                </button>
              )}

              <button
                type='button'
                onClick={handleRestart}
                className='rounded-lg border border-slate-300 px-4 py-2 text-slate-800 transition hover:bg-slate-50'
              >
                Restart full quiz
              </button>

              <Link
                to='/patterns'
                className='rounded-lg border border-slate-300 px-4 py-2 text-slate-800 transition hover:bg-slate-50'
              >
                Browse patterns
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-10'>
        <h1 className='text-3xl font-bold text-slate-950'>
          No quiz questions found
        </h1>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl space-y-8 px-4 py-10'>
      <header className='space-y-4'>
        <div className='flex flex-wrap items-center gap-3 text-sm text-slate-600'>
          <Link to='/' className='hover:text-slate-900'>
            Home
          </Link>
          <span>/</span>
          <span>Quiz</span>
        </div>

        <div>
          <h1 className='text-4xl font-bold tracking-tight text-slate-950'>
            {mode === "review-missed"
              ? "Review Missed Questions"
              : "Design Patterns Quiz"}
          </h1>
          <p className='mt-2 text-lg text-slate-700'>
            {mode === "review-missed"
              ? "Focus on the questions you missed and strengthen the distinctions."
              : "Practice recognizing patterns from realistic software scenarios."}
          </p>
        </div>

        <div className='rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700'>
          Score: {score} / {totalQuestions}
        </div>
      </header>

      <QuizCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedChoice={selectedChoice}
        isSubmitted={isSubmitted}
        onSelectChoice={handleSelectChoice}
      />

      <div className='flex flex-wrap gap-3'>
        {!isSubmitted ? (
          <button
            type='button'
            onClick={handleSubmit}
            disabled={!selectedChoice}
            className='rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Submit answer
          </button>
        ) : (
          <button
            type='button'
            onClick={handleNext}
            className='rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800'
          >
            {isLastQuestion ? "Finish quiz" : "Next question"}
          </button>
        )}

        <button
          type='button'
          onClick={handleConfirmRestart}
          className='rounded-lg border border-slate-300 px-4 py-2 text-slate-800 transition hover:bg-slate-50'
        >
          Restart
        </button>
      </div>
    </div>
  );
}
