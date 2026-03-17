export type PatternCategory = "must-know" | "good-to-know" | "de-emphasize";

export type CareerLevel = "early" | "mid" | "senior";

export type PatternDifficulty = "beginner" | "intermediate" | "advanced";

export type CodeExample = {
  title: string;
  language: "ts" | "tsx" | "cs" | "sql" | "text";
  code: string;
};

export type PatternSection = {
  title: string;
  body: string;
};

/** Schema for an individual design pattern */
export type Pattern = {
  slug: string;
  name: string;
  category: PatternCategory;
  careerLevel: CareerLevel;
  difficulty: PatternDifficulty;

  summary: string;
  keyTakeaway: string;
  problem: string;
  solution: string;

  tags: string[];

  whenToUse: string[];
  whenNotToUse: string[];
  benefits: string[];
  tradeoffs: string[];

  relatedPatterns: string[];
  confusedWith?: string[];

  examples?: PatternSection[];
  codeExamples?: CodeExample[];
};
