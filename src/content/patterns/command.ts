import type { Pattern } from "../../types/pattern";

export const commandPattern: Pattern = {
  slug: "command",
  name: "Command",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Command turns a request into an object so it can be passed around, queued, logged, retried, or executed later.",
  keyTakeaway:
    "Use Command when you want to represent actions as objects so they can be queued, logged, retried, or executed later.",

  problem:
    "Sometimes you want to separate the request for an action from the code that performs it. Directly calling methods can make it hard to queue work, implement undo, log actions, or execute them later.",

  solution:
    "Wrap each request in a command object that contains the information needed to perform the action. A handler or executor then runs the command.",

  whenToUse: [
    "You want to queue or defer work",
    "You need undo, replay, or logging behavior",
    "You want to separate intent from execution",
    "You want UI actions and system actions to use a consistent shape",
  ],

  whenNotToUse: [
    "The action is simple and direct calls are clearer",
    "The extra abstraction adds more ceremony than value",
    "You do not need deferred or decoupled execution",
  ],

  benefits: [
    "Separates request from execution",
    "Works well with queues and retries",
    "Supports undo or replay scenarios",
    "Creates a consistent action model",
  ],

  tradeoffs: [
    "Introduces more objects and plumbing",
    "May feel verbose for simple interactions",
    "Handler organization needs discipline as the system grows",
  ],

  relatedPatterns: ["strategy", "observer-pub-sub", "state"],
  confusedWith: ["strategy", "mediator"],

  examples: [
    {
      title: "UI example",
      body: "A toolbar button dispatches a SaveDocumentCommand instead of directly saving, allowing centralized execution and logging.",
    },
    {
      title: "Backend example",
      body: "A queue worker processes commands like SendEmailCommand or GenerateInvoiceCommand asynchronously.",
    },
    {
      title: "Game development example",
      body: "A player click creates a move command or interact command, which is later resolved by the authoritative simulation.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Command = {
  execute(): void;
};

class CreateUserCommand implements Command {
  constructor(private email: string) {}

  execute(): void {
    console.log("Creating user:", this.email);
  }
}

class CommandBus {
  dispatch(command: Command): void {
    command.execute();
  }
}

const bus = new CommandBus();
bus.dispatch(new CreateUserCommand("person@example.com"));`,
    },
  ],
};
