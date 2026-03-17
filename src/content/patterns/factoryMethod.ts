import type { Pattern } from "../../types/pattern";

export const factoryMethodPattern: Pattern = {
  slug: "factory-method",
  name: "Factory Method",
  category: "must-know",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Factory Method provides a way to create objects through a dedicated creation method instead of directly instantiating concrete classes throughout your codebase.",
  keyTakeaway:
    "Use Factory Method when object creation varies and you want to centralize how implementations are chosen.",
  problem:
    "When code directly creates concrete objects with new, object creation becomes tightly coupled to the consuming code. This makes it harder to swap implementations, test behavior, or centralize creation logic.",

  solution:
    "Move object creation into a factory method so the rest of the system depends on the abstraction or returned contract instead of knowing the exact concrete type being constructed.",
  tags: ["creation", "object-creation", "abstraction", "instantiation"],
  whenToUse: [
    "You create different implementations of the same interface",
    "You want to centralize creation logic",
    "Object creation requires setup, defaults, or branching rules",
    "You want to reduce coupling to concrete implementations",
  ],

  whenNotToUse: [
    "Object creation is trivial and unlikely to change",
    "Adding a factory would only wrap a single new call without any real value",
    "The abstraction would make the code harder to follow than direct construction",
  ],

  benefits: [
    "Reduces coupling to concrete classes",
    "Centralizes creation rules",
    "Improves testability",
    "Makes it easier to swap implementations later",
  ],

  tradeoffs: [
    "Adds another layer of abstraction",
    "Can become overused for very simple creation scenarios",
    "May hide concrete behavior if naming is unclear",
  ],

  relatedPatterns: ["strategy", "abstract-factory", "dependency-injection"],
  confusedWith: ["abstract-factory", "simple-factory"],

  examples: [
    {
      title: "UI example",
      body: "A notification system may create different notification handlers for email, SMS, or in-app alerts based on configuration.",
    },
    {
      title: "Backend example",
      body: "A storage service may create either a local file provider or cloud blob provider depending on the environment.",
    },
    {
      title: "Testing example",
      body: "A test setup can use a factory method to create fake or in-memory dependencies instead of production ones.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Logger = {
  log(message: string): void;
};

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log("[console]", message);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log("[file]", message);
  }
}

function createLogger(environment: "development" | "production"): Logger {
  if (environment === "development") {
    return new ConsoleLogger();
  }

  return new FileLogger();
}

const logger = createLogger("development");
logger.log("App started");`,
    },
  ],
};
