import type { Pattern } from "../../types/pattern";

export const cqrsPattern: Pattern = {
  slug: "cqrs",
  name: "CQRS",
  category: "must-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "CQRS separates write operations from read operations so each side can be modeled and optimized independently.",

  keyTakeaway:
    "Use CQRS when reads and writes have meaningfully different models, performance needs, or scaling concerns.",

  problem:
    "In some systems, the shape and constraints of writes differ significantly from the needs of reads. A single model can become awkward, bloated, or inefficient for both.",

  solution:
    "Split commands and queries into separate models or pathways so writes focus on consistency and business rules, while reads focus on retrieval, projection, and performance.",

  tags: [
    "architecture",
    "reads",
    "writes",
    "scaling",
    "projections",
    "commands",
  ],

  whenToUse: [
    "Read and write concerns differ substantially",
    "You need specialized read projections",
    "Write-side business rules are complex",
    "Performance or scaling needs differ between reads and writes",
  ],

  whenNotToUse: [
    "The system is simple CRUD with no real read/write tension",
    "The added complexity outweighs the actual benefit",
    "You are splitting the model for architectural fashion rather than real need",
  ],

  benefits: [
    "Lets reads and writes evolve independently",
    "Supports optimized read models",
    "Clarifies intent between commands and queries",
    "Can scale well in complex systems",
  ],

  tradeoffs: [
    "Adds substantial complexity",
    "May introduce eventual consistency",
    "Requires stronger discipline around model boundaries",
  ],

  relatedPatterns: ["command", "domain-events", "outbox-pattern"],
  confusedWith: ["service-layer"],

  examples: [
    {
      title: "Backend example",
      body: "An order system may use commands to enforce write-side business rules, while a separate read model serves dashboards and search results efficiently.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type CreateOrderCommand = {
  customerId: string;
  total: number;
};

class OrderCommandHandler {
  handle(command: CreateOrderCommand): void {
    console.log("Validating and creating order", command);
  }
}

class OrderQueryService {
  getOrderSummary(orderId: string): void {
    console.log("Returning read-optimized order summary for", orderId);
  }
}`,
    },
  ],
};
