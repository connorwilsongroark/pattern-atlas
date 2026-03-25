import type { PatternCategory, PatternDifficulty } from "./pattern";

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: PatternDifficulty;
  category: PatternCategory;
  relatedPatternSlug: string;
};
