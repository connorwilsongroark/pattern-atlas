import { useMemo } from "react";
import { shuffleArray } from "./quizUtils";
import type { QuizQuestion } from "../../types/quiz";
import { Badge } from "../../components/ui/Badge";
import { QuizChoiceButton } from "./QuizChoiceButton";
import { QuizResult } from "./QuizResult";
import { Card } from "../../components/ui/Card";

type QuizCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedChoice: string | null;
  isSubmitted: boolean;
  onSelectChoice: (choice: string) => void;
};

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedChoice,
  isSubmitted,
  onSelectChoice,
}: QuizCardProps) {
  const shuffledChoices = useMemo(
    () => shuffleArray(question.choices),
    [question.id],
  );
  const isCorrect = selectedChoice === question.correctAnswer;

  return (
    <Card className='p-6'>
      <div className='mb-4 flex flex-wrap items-center gap-2'>
        <Badge>Question {questionNumber}</Badge>
        <Badge>{question.category}</Badge>
        <Badge>{question.difficulty}</Badge>
      </div>

      <div className='mb-2 text-sm text-[var(--color-text-muted)]'>
        {questionNumber} of {totalQuestions}
      </div>

      <h1 className='text-2xl font-semibold leading-8 text-[var(--color-text)]'>
        {question.prompt}
      </h1>

      <div className='mt-6 space-y-3'>
        {shuffledChoices.map((choice) => (
          <QuizChoiceButton
            key={choice}
            choice={choice}
            onSelect={onSelectChoice}
            disabled={isSubmitted}
            isSelected={selectedChoice === choice}
            isCorrect={isSubmitted && choice === question.correctAnswer}
            isIncorrect={
              isSubmitted &&
              selectedChoice === choice &&
              choice !== question.correctAnswer
            }
            showResult={isSubmitted}
          />
        ))}
      </div>

      {isSubmitted && selectedChoice && (
        <div className='mt-6'>
          <QuizResult
            isCorrect={isCorrect}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
          />
        </div>
      )}
    </Card>
  );
}
