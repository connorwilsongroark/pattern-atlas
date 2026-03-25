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

function isCategory(value: string): value is PatternCategory {
  return (
    value === "must-know" ||
    value === "good-to-know" ||
    value === "de-emphasize"
  );
}

function isCareerLevel(value: string): value is CareerLevel {
  return value === "early" || value === "mid" || value === "senior";
}

function isDifficulty(value: string): value is PatternDifficulty {
  return (
    value === "beginner" || value === "intermediate" || value === "advanced"
  );
}

export function getFiltersFromSearchParams(
  searchParams: URLSearchParams,
): PatternFilters {
  const search = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "all";
  const careerLevelParam = searchParams.get("careerLevel") ?? "all";
  const difficultyParam = searchParams.get("difficulty") ?? "all";

  return {
    search,
    category: isCategory(categoryParam) ? categoryParam : "all",
    careerLevel: isCareerLevel(careerLevelParam) ? careerLevelParam : "all",
    difficulty: isDifficulty(difficultyParam) ? difficultyParam : "all",
  };
}

export function getSearchParamsFromFilters(
  filters: PatternFilters,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.category !== "all") {
    params.set("category", filters.category);
  }

  if (filters.careerLevel !== "all") {
    params.set("careerLevel", filters.careerLevel);
  }

  if (filters.difficulty !== "all") {
    params.set("difficulty", filters.difficulty);
  }

  return params;
}

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
