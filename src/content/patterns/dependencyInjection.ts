import type { Pattern } from "../../types/pattern";

export const dependencyInjectionPattern: Pattern = {
  slug: "dependency-injection",
  name: "Dependency Injection",
  category: "must-know",
  careerLevel: "early",
  difficulty: "intermediate",

  summary:
    "Dependency Injection provides an object’s dependencies from the outside instead of having the object create them itself.",

  keyTakeaway:
    "Use Dependency Injection to reduce coupling and make your code easier to test, swap, and compose.",

  problem:
    "When a class creates its own dependencies, it becomes tightly coupled to concrete implementations. That makes testing harder and makes it harder to swap implementations as the system grows.",

  solution:
    "Pass dependencies into a class or function from the outside, usually through the constructor or function parameters, so the consumer depends on abstractions rather than concrete implementations.",

  tags: ["dependencies", "composition", "testability", "coupling", "inversion"],

  whenToUse: [
    "You want to reduce coupling to concrete implementations",
    "You want to make units easier to test",
    "You expect implementations to vary by environment or context",
    "You want composition to happen at the application boundary",
  ],

  whenNotToUse: [
    "The dependency is trivial and unlikely to change",
    "The abstraction adds more ceremony than value",
    "You are introducing interfaces only for hypothetical future needs",
  ],

  benefits: [
    "Improves testability",
    "Reduces coupling",
    "Makes implementations easier to swap",
    "Supports cleaner application composition",
  ],

  tradeoffs: [
    "Adds indirection",
    "Can feel abstract to early-career developers",
    "Overuse can make simple code feel overly ceremonial",
  ],

  relatedPatterns: ["factory-method", "repository", "service-layer"],
  confusedWith: ["service-locator"],

  examples: [
    {
      title: "UI example",
      body: "A React component receives a data-loading service as a prop instead of importing a concrete API client directly.",
    },
    {
      title: "Backend example",
      body: "A user service receives an email sender and repository through its constructor so they can be swapped in tests or by environment.",
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
    console.log(message);
  }
}

class UserService {
  constructor(private logger: Logger) {}

  createUser(email: string): void {
    this.logger.log(\`Creating user: \${email}\`);
  }
}

const logger = new ConsoleLogger();
const userService = new UserService(logger);

userService.createUser("person@example.com");`,
    },
  ],
};
