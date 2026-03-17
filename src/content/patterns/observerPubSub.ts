import type { Pattern } from "../../types/pattern";

export const observerPubSubPattern: Pattern = {
  slug: "observer-pub-sub",
  name: "Observer / Pub-Sub",
  category: "must-know",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Observer and Pub-Sub allow one part of a system to notify interested listeners when something happens without tightly coupling the sender to every receiver.",
  keyTakeaway:
    "Use Observer or Pub-Sub when one event should trigger multiple reactions without tightly coupling all the participants together.",

  problem:
    "In many systems, one action should trigger multiple reactions. Hardcoding those reactions directly into the source of the event creates tight coupling and makes the code harder to extend.",

  solution:
    "Let interested listeners subscribe to events, and let the publisher emit notifications without knowing exactly who is listening. This decouples the source of an event from its downstream reactions.",
  tags: ["events", "pub-sub", "observer", "decoupling", "messaging"],

  whenToUse: [
    "One event should trigger multiple reactions",
    "You want to decouple senders from receivers",
    "You need extensibility without changing the source behavior",
    "Your UI or system reacts to state changes or domain events",
  ],

  whenNotToUse: [
    "The behavior is simple and direct calls are clearer",
    "The event flow would become too hard to trace",
    "You do not actually need loose coupling",
  ],

  benefits: [
    "Reduces coupling between components",
    "Improves extensibility",
    "Works well for UI events and domain events",
    "Supports modular architecture",
  ],

  tradeoffs: [
    "Can make behavior harder to trace",
    "Too many events can create noisy architecture",
    "Ordering and error handling require deliberate design",
  ],

  relatedPatterns: ["domain-events", "mediator", "command"],
  confusedWith: ["mediator", "domain-events"],

  examples: [
    {
      title: "UI example",
      body: "A form component emits a change event, and multiple listeners update validation, field summaries, and submit state.",
    },
    {
      title: "Backend example",
      body: "When an order is placed, listeners may reserve inventory, send an email, and write an audit entry.",
    },
    {
      title: "Game development example",
      body: "A world event like player damage can trigger UI updates, sound effects, and screen shake without hardcoding them together.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type EventMap = {
  "user.created": { id: string; email: string };
};

class EventBus {
  private handlers = new Map<string, Array<(payload: unknown) => void>>();

  on<T>(eventName: string, handler: (payload: T) => void): void {
    const existing = this.handlers.get(eventName) ?? [];
    existing.push(handler as (payload: unknown) => void);
    this.handlers.set(eventName, existing);
  }

  emit<T>(eventName: string, payload: T): void {
    const handlers = this.handlers.get(eventName) ?? [];
    for (const handler of handlers) {
      handler(payload);
    }
  }
}

const bus = new EventBus();

bus.on<{ id: string; email: string }>("user.created", (payload) => {
  console.log("Send welcome email to", payload.email);
});

bus.on<{ id: string; email: string }>("user.created", (payload) => {
  console.log("Create CRM record for", payload.id);
});

bus.emit("user.created", {
  id: "u_123",
  email: "person@example.com",
});`,
    },
  ],
};
