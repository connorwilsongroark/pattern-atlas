import type { Pattern } from "../../types/pattern";

export const outboxPattern: Pattern = {
  slug: "outbox-pattern",
  name: "Outbox Pattern",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Outbox Pattern ensures that database changes and event publication stay coordinated by first writing events to durable storage within the same transaction.",

  keyTakeaway:
    "Use Outbox Pattern when you need to reliably publish events after a database change without risking lost or duplicated messages from partial failure.",

  problem:
    "When a system writes to a database and publishes a message separately, failures in between can leave data and messaging out of sync.",

  solution:
    "Write the intended outgoing event to an outbox table in the same transaction as the business change, then publish it asynchronously from that durable record.",

  tags: ["reliability", "messaging", "transactions", "events", "integration"],

  whenToUse: [
    "You publish messages after database changes",
    "Partial failure between persistence and messaging is a real risk",
    "You need reliable event delivery patterns",
    "You are building event-driven or integration-heavy systems",
  ],

  whenNotToUse: [
    "There is no message publication requirement",
    "The added operational complexity is not justified",
    "Your consistency requirements are loose enough that simple publication is acceptable",
  ],

  benefits: [
    "Improves reliability between data changes and messaging",
    "Reduces risk of lost events",
    "Works well in event-driven architectures",
    "Makes integration failure handling more deliberate",
  ],

  tradeoffs: [
    "Adds infrastructure and operational complexity",
    "Requires cleanup and publishing processes",
    "Still requires idempotent consumers in many systems",
  ],

  relatedPatterns: ["domain-events", "cqrs", "unit-of-work"],
  confusedWith: ["unit-of-work"],

  examples: [
    {
      title: "Backend example",
      body: "After saving an order, the system writes an outbox record for OrderPlaced in the same transaction. A background processor later publishes it to the broker.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class OrderService {
  placeOrder(): void {
    console.log("Begin transaction");
    console.log("Insert order");
    console.log("Insert outbox row: order.placed");
    console.log("Commit transaction");
  }
}

class OutboxProcessor {
  publishPending(): void {
    console.log("Read unpublished outbox rows");
    console.log("Publish messages");
    console.log("Mark rows as published");
  }
}`,
    },
  ],
};
