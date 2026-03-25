import type { QuizQuestion } from "../../types/quiz";

/** Full catalog of quiz questions */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "strategy-1",
    prompt:
      "You want to switch between different discount calculation behaviors without filling your service with conditionals. Which pattern fits best?",
    choices: ["Strategy", "Facade", "Builder", "Adapter"],
    correctAnswer: "Strategy",
    explanation:
      "Strategy is a good fit when you want to swap behaviors cleanly at runtime without embedding branching logic throughout your code.",
    difficulty: "beginner",
    category: "must-know",
    relatedPatternSlug: "strategy",
  },
  {
    id: "adapter-1",
    prompt:
      "You need your app to work with a third-party library whose interface does not match what your code expects. Which pattern fits best?",
    choices: ["Adapter", "State", "Command", "Repository"],
    correctAnswer: "Adapter",
    explanation:
      "Adapter translates one interface into another so existing application code can work with an incompatible dependency or legacy API.",
    difficulty: "beginner",
    category: "must-know",
    relatedPatternSlug: "adapter",
  },
  {
    id: "facade-1",
    prompt:
      "A subsystem requires callers to coordinate several services in the right order just to do one common task. Which pattern best simplifies that experience?",
    choices: ["Facade", "Strategy", "Visitor", "Command"],
    correctAnswer: "Facade",
    explanation:
      "Facade provides a simpler, workflow-oriented interface over a more complex subsystem.",
    difficulty: "beginner",
    category: "must-know",
    relatedPatternSlug: "facade",
  },
  {
    id: "factory-method-1",
    prompt:
      "Your application creates different logger implementations depending on environment, and you want that creation logic centralized instead of scattered around the codebase. Which pattern fits best?",
    choices: ["Factory Method", "Decorator", "State", "CQRS"],
    correctAnswer: "Factory Method",
    explanation:
      "Factory Method centralizes object creation and reduces coupling to concrete implementations.",
    difficulty: "beginner",
    category: "must-know",
    relatedPatternSlug: "factory-method",
  },
  {
    id: "observer-1",
    prompt:
      "When an order is placed, you want to trigger inventory updates, confirmation emails, and audit logging without tightly coupling those actions to the order placement code. Which pattern fits best?",
    choices: ["Observer / Pub-Sub", "Builder", "Service Layer", "Visitor"],
    correctAnswer: "Observer / Pub-Sub",
    explanation:
      "Observer / Pub-Sub is useful when one event should trigger multiple downstream reactions without hardwiring every dependency together.",
    difficulty: "beginner",
    category: "must-know",
    relatedPatternSlug: "observer-pub-sub",
  },
  {
    id: "decorator-1",
    prompt:
      "You want to add logging and caching around an existing repository implementation without changing the original class. Which pattern fits best?",
    choices: ["Decorator", "Adapter", "Builder", "Factory Method"],
    correctAnswer: "Decorator",
    explanation:
      "Decorator wraps an existing implementation and adds behavior before or after delegating to it.",
    difficulty: "intermediate",
    category: "must-know",
    relatedPatternSlug: "decorator",
  },
  {
    id: "dependency-injection-1",
    prompt:
      "A service is difficult to test because it creates its own email sender and logger internally. Which pattern or principle best improves that design?",
    choices: ["Dependency Injection", "Visitor", "Builder", "Facade"],
    correctAnswer: "Dependency Injection",
    explanation:
      "Dependency Injection improves testability and reduces coupling by supplying dependencies from the outside.",
    difficulty: "intermediate",
    category: "must-know",
    relatedPatternSlug: "dependency-injection",
  },
  {
    id: "service-layer-1",
    prompt:
      "Your controllers are starting to contain validation, orchestration, and multi-step business workflows. Which pattern best helps move that logic to a more appropriate place?",
    choices: ["Service Layer", "Adapter", "Builder", "Prototype"],
    correctAnswer: "Service Layer",
    explanation:
      "Service Layer centralizes application workflows and business orchestration so controllers and routes stay thin.",
    difficulty: "intermediate",
    category: "must-know",
    relatedPatternSlug: "service-layer",
  },
  {
    id: "state-1",
    prompt:
      "An upload component behaves differently in idle, uploading, success, and error states, and conditionals are spreading across the code. Which pattern fits best?",
    choices: ["State", "Strategy", "Facade", "Factory Method"],
    correctAnswer: "State",
    explanation:
      "State is useful when behavior changes substantially based on current state and those rules are growing complex.",
    difficulty: "intermediate",
    category: "must-know",
    relatedPatternSlug: "state",
  },
  {
    id: "repository-1",
    prompt:
      "You want application code to depend on a domain-friendly interface for loading and saving users rather than raw SQL or ORM details. Which pattern fits best?",
    choices: ["Repository", "Visitor", "Strategy", "Proxy"],
    correctAnswer: "Repository",
    explanation:
      "Repository abstracts persistence behind a domain-oriented contract and keeps data access concerns out of business workflows.",
    difficulty: "intermediate",
    category: "must-know",
    relatedPatternSlug: "repository",
  },
  {
    id: "cqrs-1",
    prompt:
      "Your write-side business rules are complex, but your read side needs highly optimized projections for dashboards and search. Which architectural pattern fits best?",
    choices: ["CQRS", "Builder", "Decorator", "Template Method"],
    correctAnswer: "CQRS",
    explanation:
      "CQRS separates commands and queries so reads and writes can evolve and scale independently.",
    difficulty: "advanced",
    category: "must-know",
    relatedPatternSlug: "cqrs",
  },
  {
    id: "outbox-1",
    prompt:
      "You need to save domain changes and reliably publish integration events without risking failure between the database write and message publication. Which pattern fits best?",
    choices: ["Outbox Pattern", "Unit of Work", "Builder", "Adapter"],
    correctAnswer: "Outbox Pattern",
    explanation:
      "Outbox Pattern coordinates data changes and event publication by first writing outgoing events durably within the same transaction.",
    difficulty: "advanced",
    category: "good-to-know",
    relatedPatternSlug: "outbox-pattern",
  },
  {
    id: "unit-of-work-1",
    prompt:
      "Placing an order requires creating the order, reserving inventory, and writing an audit entry, and these changes should succeed or fail together. Which pattern best addresses that need?",
    choices: ["Unit of Work", "Decorator", "State", "Facade"],
    correctAnswer: "Unit of Work",
    explanation:
      "Unit of Work coordinates related persistence changes within a single transaction boundary.",
    difficulty: "advanced",
    category: "must-know",
    relatedPatternSlug: "unit-of-work",
  },
  {
    id: "circuit-breaker-1",
    prompt:
      "A downstream service is repeatedly timing out, and continuing to call it is increasing latency and system stress. Which pattern helps by failing fast for a while instead?",
    choices: ["Circuit Breaker", "Repository", "Builder", "Strategy"],
    correctAnswer: "Circuit Breaker",
    explanation:
      "Circuit Breaker protects your system from repeatedly hammering a failing dependency and helps reduce cascading failure.",
    difficulty: "advanced",
    category: "good-to-know",
    relatedPatternSlug: "circuit-breaker",
  },
  {
    id: "visitor-1",
    prompt:
      "Which pattern is most often associated with stable tree-like structures such as syntax trees, where you want to add multiple operations without changing the node classes directly?",
    choices: ["Visitor", "Service Layer", "Strategy", "Factory Method"],
    correctAnswer: "Visitor",
    explanation:
      "Visitor is most useful when the structure is stable and operations change more often than the types themselves, such as in compilers or AST tooling.",
    difficulty: "advanced",
    category: "de-emphasize",
    relatedPatternSlug: "visitor",
  },
];
