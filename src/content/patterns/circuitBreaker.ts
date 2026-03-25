import type { Pattern } from "../../types/pattern";

export const circuitBreakerPattern: Pattern = {
  slug: "circuit-breaker",
  name: "Circuit Breaker",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Circuit Breaker prevents a failing dependency from being hammered continuously by temporarily stopping calls and allowing recovery checks.",

  keyTakeaway:
    "Use Circuit Breaker when repeated calls to a failing dependency would worsen latency, load, or cascading failure.",

  problem:
    "When a downstream service is failing or timing out, blindly retrying every call can overload both your system and the dependency, creating cascading failures.",

  solution:
    "Track failures and open the circuit when a threshold is reached. While open, fail fast instead of calling the dependency. Later, allow limited test calls to see if recovery has occurred.",

  tags: [
    "resilience",
    "distributed-systems",
    "failures",
    "timeouts",
    "availability",
  ],

  whenToUse: [
    "You depend on flaky or remote services",
    "Failure cascades are a real risk",
    "You want to fail fast during outages",
    "Latency and resilience matter in production",
  ],

  whenNotToUse: [
    "There is no meaningful remote dependency",
    "The system is simple enough that added resilience logic is unnecessary",
    "You have not yet measured a real failure mode worth protecting against",
  ],

  benefits: [
    "Reduces cascading failures",
    "Protects system resources",
    "Improves resilience under outage conditions",
    "Makes dependency health handling explicit",
  ],

  tradeoffs: [
    "Adds operational complexity",
    "Requires thoughtful thresholds and recovery logic",
    "Can hide transient recovery if configured poorly",
  ],

  relatedPatterns: [
    "retry-pattern",
    "outbox-pattern",
    "event-driven-architecture",
  ],
  confusedWith: ["retry-pattern"],

  examples: [
    {
      title: "Backend example",
      body: "An API gateway can stop forwarding requests to an unhealthy downstream billing service for a cooling-off period.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class CircuitBreaker {
  private failures = 0;
  private open = false;

  execute(action: () => void): void {
    if (this.open) {
      throw new Error("Circuit is open");
    }

    try {
      action();
      this.failures = 0;
    } catch (error) {
      this.failures += 1;

      if (this.failures >= 3) {
        this.open = true;
      }

      throw error;
    }
  }
}`,
    },
  ],
};
