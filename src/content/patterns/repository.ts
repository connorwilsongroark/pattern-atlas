import type { Pattern } from "../../types/pattern";

export const repositoryPattern: Pattern = {
  slug: "repository",
  name: "Repository",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Repository provides a collection-like interface for working with domain data while separating business logic from persistence details.",

  keyTakeaway:
    "Use Repository when you want your application to depend on a domain-friendly data access contract instead of raw database queries or ORM details everywhere.",

  problem:
    "As an application grows, data access logic often gets scattered across controllers, services, and components. That makes persistence concerns leak into business logic and makes testing harder.",

  solution:
    "Introduce repository abstractions that encapsulate how domain data is loaded and saved, so application code interacts with a cleaner contract focused on the domain.",

  tags: ["persistence", "data-access", "abstraction", "domain", "testing"],

  whenToUse: [
    "You want to isolate persistence concerns from business logic",
    "You want a cleaner contract for loading and saving domain entities",
    "You want easier unit testing around data access boundaries",
    "You have repeated data access logic that should be centralized",
  ],

  whenNotToUse: [
    "The application is very small and direct data access is clearer",
    "The repository would only wrap trivial ORM calls with no added value",
    "You are creating abstractions that do not match meaningful domain boundaries",
  ],

  benefits: [
    "Centralizes data access logic",
    "Keeps persistence details out of business workflows",
    "Improves testability",
    "Creates cleaner application boundaries",
  ],

  tradeoffs: [
    "Can become a thin wrapper if designed poorly",
    "Adds another abstraction layer",
    "Needs discipline to stay domain-focused rather than query-focused",
  ],

  relatedPatterns: ["unit-of-work", "service-layer", "dependency-injection"],
  confusedWith: ["unit-of-work"],

  examples: [
    {
      title: "Backend example",
      body: "A UserRepository exposes methods like getById and save instead of scattering SQL or ORM queries throughout controllers and services.",
    },
    {
      title: "Testing example",
      body: "A test can swap a database-backed repository for an in-memory one without changing the service using it.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type User = {
  id: string;
  email: string;
};

type UserRepository = {
  getById(id: string): User | undefined;
  save(user: User): void;
};

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  getById(id: string): User | undefined {
    return this.users.get(id);
  }

  save(user: User): void {
    this.users.set(user.id, user);
  }
}

class UserService {
  constructor(private repository: UserRepository) {}

  register(user: User): void {
    this.repository.save(user);
  }
}`,
    },
  ],
};
