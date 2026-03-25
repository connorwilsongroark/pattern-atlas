import type { Pattern } from "../../types/pattern";

export const decoratorPattern: Pattern = {
  slug: "decorator",
  name: "Decorator",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Decorator lets you add behavior to an object by wrapping it, without changing the original implementation.",

  keyTakeaway:
    "Use Decorator when you want to layer behavior around something without creating a large inheritance tree.",

  problem:
    "Sometimes you want to add responsibilities like logging, caching, validation, or formatting to an existing object. Inheritance can quickly become rigid and explode into many combinations.",

  solution:
    "Wrap an object with another object that implements the same contract and adds behavior before or after delegating to the wrapped object.",

  tags: [
    "wrapping",
    "composition",
    "extensibility",
    "layering",
    "cross-cutting",
  ],

  whenToUse: [
    "You want to add optional behavior around an object",
    "You want to avoid inheritance explosion",
    "You want to compose behavior in layers",
    "You have cross-cutting concerns like logging or caching",
  ],

  whenNotToUse: [
    "The extra wrapping makes the flow too hard to follow",
    "A direct implementation would be simpler and clearer",
    "You only need one fixed behavior with no variation",
  ],

  benefits: [
    "Supports composition over inheritance",
    "Makes behavior extensible",
    "Keeps base implementations focused",
    "Works well for layered concerns",
  ],

  tradeoffs: [
    "Can make call stacks harder to trace",
    "Many wrappers can become confusing",
    "Requires consistent interface design",
  ],

  relatedPatterns: ["adapter", "facade", "strategy"],
  confusedWith: ["adapter", "proxy"],

  examples: [
    {
      title: "Backend example",
      body: "A repository can be wrapped with a caching decorator or logging decorator without changing the core repository implementation.",
    },
    {
      title: "HTTP example",
      body: "A request handler can be wrapped with middleware-like decorators for auth, logging, and metrics.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Notifier = {
  send(message: string): void;
};

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log("Email:", message);
  }
}

class LoggingNotifier implements Notifier {
  constructor(private inner: Notifier) {}

  send(message: string): void {
    console.log("Logging before send");
    this.inner.send(message);
  }
}

const notifier = new LoggingNotifier(new EmailNotifier());
notifier.send("Hello");`,
    },
  ],
};
