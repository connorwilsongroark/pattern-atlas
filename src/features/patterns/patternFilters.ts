import type {
  CareerLevel,
  Pattern,
  PatternCategory,
  PatternDifficulty,
} from "../../types/pattern";

export type PatternFilters = {
  search: string;
  category: PatternCategory | "all";
  careerLevel: CareerLevel | "all";
  difficulty: PatternDifficulty | "all";
};

export const defaultPatternFilters: PatternFilters = {
  search: "",
  category: "all",
  careerLevel: "all",
  difficulty: "all",
};

function matchesSearch(pattern: Pattern, rawSearch: string): boolean {
  const search = rawSearch.trim().toLowerCase();

  if (!search) return true;

  const haystack = [
    pattern.name,
    pattern.summary,
    pattern.keyTakeaway,
    pattern.problem,
    pattern.solution,
    ...pattern.tags,
    ...pattern.whenToUse,
    ...pattern.whenNotToUse,
    ...pattern.benefits,
    ...pattern.tradeoffs,
    ...(pattern.confusedWith ?? []),
    ...pattern.relatedPatterns,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

export function filterPatterns(
  patterns: Pattern[],
  filters: PatternFilters,
): Pattern[] {
  return patterns.filter((pattern) => {
    const categoryMatch =
      filters.category === "all" || pattern.category === filters.category;

    const careerLevelMatch =
      filters.careerLevel === "all" ||
      pattern.careerLevel === filters.careerLevel;

    const difficultyMatch =
      filters.difficulty === "all" || pattern.difficulty === filters.difficulty;

    const searchMatch = matchesSearch(pattern, filters.search);

    return categoryMatch && careerLevelMatch && difficultyMatch && searchMatch;
  });
}
