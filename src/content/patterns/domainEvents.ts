import type { Pattern } from "../../types/pattern";

export const domainEventsPattern: Pattern = {
  slug: "domain-events",
  name: "Domain Events",
  category: "must-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Domain Events capture important things that happened in the business domain so other parts of the system can react without tight coupling.",

  keyTakeaway:
    "Use Domain Events when a meaningful business occurrence should trigger additional behavior elsewhere without hardwiring everything together.",

  problem:
    "Business workflows often need follow-up actions in other parts of the system. Directly coding every downstream action into the original workflow creates coupling and makes change harder.",

  solution:
    "Represent important domain occurrences as events and let other parts of the system react to them through handlers or subscribers.",

  tags: ["events", "domain", "business", "decoupling", "architecture"],

  whenToUse: [
    "A business occurrence should trigger multiple downstream reactions",
    "You want to reduce coupling between use cases",
    "You want business-significant events to be explicit in the model",
    "Your architecture benefits from reactive workflows",
  ],

  whenNotToUse: [
    "A direct call is clearer and sufficient",
    "The system is too small for event-driven indirection",
    "You are emitting events for technical details that are not really domain-significant",
  ],

  benefits: [
    "Makes important business occurrences explicit",
    "Reduces coupling between workflows",
    "Supports extensibility",
    "Works well with larger architectures",
  ],

  tradeoffs: [
    "Can make control flow harder to trace",
    "Requires careful naming and boundaries",
    "May interact with eventual consistency concerns",
  ],

  relatedPatterns: ["observer-pub-sub", "cqrs", "outbox-pattern"],
  confusedWith: ["observer-pub-sub"],

  examples: [
    {
      title: "Backend example",
      body: "When an order is placed, a domain event can trigger inventory reservation, confirmation email scheduling, and audit logging.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type DomainEvent = {
  type: string;
  occurredAt: Date;
};

type OrderPlaced = DomainEvent & {
  type: "order.placed";
  orderId: string;
};

function publish(event: DomainEvent): void {
  console.log("Publishing event:", event.type);
}

const event: OrderPlaced = {
  type: "order.placed",
  orderId: "ord_123",
  occurredAt: new Date(),
};

publish(event);`,
    },
  ],
};
