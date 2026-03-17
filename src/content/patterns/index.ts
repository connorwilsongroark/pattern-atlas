import type { Pattern } from "../../types/pattern";
import { commandPattern } from "./command";
import { factoryMethodPattern } from "./factoryMethod";
import { observerPubSubPattern } from "./observerPubSub";
import { statePattern } from "./state";
import { strategyPattern } from "./strategy";

export const patterns: Pattern[] = [
  strategyPattern,
  factoryMethodPattern,
  observerPubSubPattern,
  commandPattern,
  statePattern,
];

export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((pattern) => pattern.slug === slug);
}

export function patternExists(slug: string): boolean {
  return patterns.some((pattern) => pattern.slug === slug);
}
export function groupPatternsByCategory(patterns: Pattern[]) {
  return {
    "must-know": patterns.filter((p) => p.category === "must-know"),
    "good-to-know": patterns.filter((p) => p.category === "good-to-know"),
    "de-emphasize": patterns.filter((p) => p.category === "de-emphasize"),
  };
}
