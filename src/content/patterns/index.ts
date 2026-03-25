import type { Pattern } from "../../types/pattern";
import { adapterPattern } from "./adapter";
import { builderPattern } from "./builder";
import { circuitBreakerPattern } from "./circuitBreaker";
import { commandPattern } from "./command";
import { cqrsPattern } from "./cqrs";
import { decoratorPattern } from "./decorator";
import { dependencyInjectionPattern } from "./dependencyInjection";
import { domainEventsPattern } from "./domainEvents";
import { facadePattern } from "./facade";
import { factoryMethodPattern } from "./factoryMethod";
import { observerPubSubPattern } from "./observerPubSub";
import { outboxPattern } from "./outbox";
import { repositoryPattern } from "./repository";
import { serviceLayerPattern } from "./serviceLayer";
import { statePattern } from "./state";
import { strategyPattern } from "./strategy";
import { unitOfWorkPattern } from "./unitOfWork";
import { visitorPattern } from "./visitor";

// Expose list of patterns to the application
export const patterns: Pattern[] = [
  strategyPattern,
  factoryMethodPattern,
  observerPubSubPattern,
  commandPattern,
  statePattern,
  dependencyInjectionPattern,
  decoratorPattern,
  serviceLayerPattern,
  unitOfWorkPattern,
  builderPattern,
  circuitBreakerPattern,
  visitorPattern,
  repositoryPattern,
  facadePattern,
  adapterPattern,
  cqrsPattern,
  domainEventsPattern,
  outboxPattern,
];

/** Get the pattern by the supplied string */
export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((pattern) => pattern.slug === slug);
}

/** Get the list of patterns based on the list of supplied strings */
export function getPatternsBySlug(slugs: string[]): Pattern[] {
  return slugs
    .map((slug) => getPatternBySlug(slug))
    .filter((pattern): pattern is Pattern => pattern !== undefined);
}

/** Return a list of patterns that can be compared to the current pattern (by slug) */
export function getComparablePatterns(currentSlug: string): Pattern[] {
  return patterns.filter((pattern) => pattern.slug !== currentSlug);
}

/** Return a boolean indicating whether or not the pattern exists */
export function patternExists(slug: string): boolean {
  return patterns.some((pattern) => pattern.slug === slug);
}

export function groupPatternsByCategory(
  items: Pattern[],
): Record<"must-know" | "good-to-know" | "de-emphasize", Pattern[]> {
  return {
    "must-know": items.filter((p) => p.category === "must-know"),
    "good-to-know": items.filter((p) => p.category === "good-to-know"),
    "de-emphasize": items.filter((p) => p.category === "de-emphasize"),
  };
}
