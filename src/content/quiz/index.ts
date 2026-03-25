import type { QuizQuestion } from "../../types/quiz";
import type { PatternDifficulty, PatternCategory } from "../../types/pattern";
import { quizQuestions } from "./questions";

export function getAllQuizQuestions(): QuizQuestion[] {
  return quizQuestions;
}

export function getQuizQuestionById(id: string): QuizQuestion | undefined {
  return quizQuestions.find((question) => question.id === id);
}

export function getQuizQuestionsByDifficulty(
  difficulty: PatternDifficulty,
): QuizQuestion[] {
  return quizQuestions.filter((question) => question.difficulty === difficulty);
}

export function getQuizQuestionsByCategory(
  category: PatternCategory,
): QuizQuestion[] {
  return quizQuestions.filter((question) => question.category === category);
}

export function getQuizQuestionsByPatternSlug(
  relatedPatternSlug: string,
): QuizQuestion[] {
  return quizQuestions.filter(
    (question) => question.relatedPatternSlug === relatedPatternSlug,
  );
}
