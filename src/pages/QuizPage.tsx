import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuizQuestions } from "../content/quiz";
import { QuizCard } from "../features/quiz/QuizCard";
import { shuffleArray } from "../features/quiz/quizUtils";
import type { QuizQuestion } from "../types/quiz";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MutedPanel } from "../components/ui/MutedPanel";

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
          <div className='flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]'>
            <Link to='/' className='transition hover:text-[var(--color-text)]'>
              Home
            </Link>
            <span>/</span>
            <span>Quiz</span>
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-[var(--color-text)]'>
            {mode === "review-missed" ? "Review Complete" : "Quiz Complete"}
          </h1>

          <p className='text-lg text-[var(--color-text-muted)]'>
            You scored{" "}
            <span className='font-semibold text-[var(--color-text)]'>
              {score}
            </span>{" "}
            out of{" "}
            <span className='font-semibold text-[var(--color-text)]'>
              {totalQuestions}
            </span>
            .
          </p>

          {mode === "full" && missedCount > 0 && (
            <p className='text-[var(--color-text-muted)]'>
              You missed{" "}
              <span className='font-semibold text-[var(--color-text)]'>
                {missedCount}
              </span>{" "}
              {missedCount === 1 ? "question" : "questions"}.
            </p>
          )}
        </header>

        <Card className='p-6'>
          <div className='space-y-4'>
            <p className='text-[var(--color-text-muted)]'>
              {mode === "review-missed"
                ? "Nice work. Reviewing missed questions is one of the fastest ways to sharpen pattern recognition."
                : "Nice work. Keep going until the distinctions between patterns feel intuitive, not memorized."}
            </p>

            <div className='flex flex-wrap gap-3'>
              {mode === "full" && missedQuestionIds.length > 0 && (
                <Button onClick={handleReviewMissed}>
                  Review missed questions
                </Button>
              )}

              <Button variant='secondary' onClick={handleRestart}>
                Restart full quiz
              </Button>

              <Button to='/patterns' variant='secondary'>
                Browse patterns
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-10'>
        <h1 className='text-3xl font-bold text-[var(--color-text)]'>
          No quiz questions found
        </h1>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-3xl space-y-8 px-4 py-10'>
      <header className='space-y-4'>
        <div className='flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]'>
          <Link to='/' className='transition hover:text-[var(--color-text)]'>
            Home
          </Link>
          <span>/</span>
          <span>Quiz</span>
        </div>

        <div>
          <h1 className='text-4xl font-bold tracking-tight text-[var(--color-text)]'>
            {mode === "review-missed"
              ? "Review Missed Questions"
              : "Design Patterns Quiz"}
          </h1>
          <p className='mt-2 text-lg text-[var(--color-text-muted)]'>
            {mode === "review-missed"
              ? "Focus on the questions you missed and strengthen the distinctions."
              : "Practice recognizing patterns from realistic software scenarios."}
          </p>
        </div>

        <MutedPanel className='px-4 py-3 text-sm font-medium text-[var(--color-text-muted)]'>
          Score: {score} / {totalQuestions}
        </MutedPanel>
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
          <Button onClick={handleSubmit} disabled={!selectedChoice}>
            Submit answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {isLastQuestion ? "Finish quiz" : "Next question"}
          </Button>
        )}

        <Button variant='secondary' onClick={handleConfirmRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
}
