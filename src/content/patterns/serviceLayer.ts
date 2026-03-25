import type { Pattern } from "../../types/pattern";

export const serviceLayerPattern: Pattern = {
  slug: "service-layer",
  name: "Service Layer",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Service Layer organizes business operations behind application-focused services instead of scattering business logic across controllers, repositories, or UI code.",

  keyTakeaway:
    "Use Service Layer to keep business workflows in one place and prevent orchestration logic from leaking into controllers or UI components.",

  problem:
    "As applications grow, business rules and multi-step workflows often end up scattered across controllers, routes, repositories, or components. That makes logic harder to test and reuse.",

  solution:
    "Introduce application services that coordinate use cases, business rules, and dependencies while keeping controllers and UI code thin.",

  tags: ["business-logic", "application-layer", "orchestration", "use-cases"],

  whenToUse: [
    "You have multi-step business workflows",
    "Controllers or routes are getting too heavy",
    "You want use-case-focused application boundaries",
    "You want to keep UI and transport concerns thin",
  ],

  whenNotToUse: [
    "The application is tiny and direct handling is clearer",
    "The service layer would only forward calls without adding value",
    "You are creating services with no meaningful business boundary",
  ],

  benefits: [
    "Centralizes business workflows",
    "Keeps controllers thin",
    "Improves testability",
    "Creates clearer application boundaries",
  ],

  tradeoffs: [
    "Can become anemic if it only forwards calls",
    "Requires discipline around what belongs in services",
    "Adds another layer to the architecture",
  ],

  relatedPatterns: ["repository", "unit-of-work", "dependency-injection"],
  confusedWith: ["facade"],

  examples: [
    {
      title: "Backend example",
      body: "An OrderService coordinates validation, pricing, persistence, and event publishing for order placement.",
    },
    {
      title: "Frontend example",
      body: "A client-side service encapsulates the workflow for loading, validating, and saving a draft instead of spreading it across several components.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type UserRepository = {
  save(email: string): void;
};

class InMemoryUserRepository implements UserRepository {
  save(email: string): void {
    console.log("Saved user:", email);
  }
}

class UserService {
  constructor(private repository: UserRepository) {}

  registerUser(email: string): void {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    this.repository.save(email);
  }
}

const service = new UserService(new InMemoryUserRepository());
service.registerUser("person@example.com");`,
    },
  ],
};
