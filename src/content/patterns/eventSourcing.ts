import type { Pattern } from "../../types/pattern";

export const eventSourcingPattern: Pattern = {
  slug: "event-sourcing",
  name: "Event Sourcing",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Event Sourcing stores state changes as an ordered sequence of events rather than persisting only the current state.",
  keyTakeaway:
    "Use Event Sourcing when the history of change is as important as the current state and you can accept the added complexity of event-driven persistence.",
  problem:
    "Traditional CRUD persistence stores the latest state but often loses the history of how that state was reached. In some domains, auditability, temporal reconstruction, and reactive projections matter a great deal.",
  solution:
    "Persist each meaningful domain event and rebuild current state by replaying the event stream, optionally using projections or snapshots for efficient reads.",

  tags: ["events", "history", "audit", "projections", "state-reconstruction"],

  whenToUse: [
    "The history of changes is important to the domain",
    "Auditability and temporal analysis matter",
    "You want to build multiple read models from the same stream of events",
    "The team understands event-driven persistence tradeoffs",
  ],

  whenNotToUse: [
    "Simple CRUD storage is sufficient",
    "The domain does not benefit from historical replay",
    "The added operational and modeling complexity is not justified",
  ],

  benefits: [
    "Preserves a full history of state changes",
    "Supports audit trails naturally",
    "Can power multiple projections and read models",
    "Makes time-based reconstruction possible",
  ],

  tradeoffs: [
    "Adds substantial complexity",
    "Schema evolution for events must be managed carefully",
    "Rebuilding and projection consistency require extra design effort",
  ],

  relatedPatterns: ["cqrs", "domain-events", "outbox", "saga"],
  confusedWith: ["audit-log", "domain-events"],

  examples: [
    {
      title: "Finance example",
      body: "An account balance can be rebuilt from deposits, withdrawals, and transfers rather than storing only the current balance.",
    },
    {
      title: "Collaboration example",
      body: "A document system can reconstruct state from a stream of edit events and also derive separate read models like activity feeds.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type BankEvent =
  | { type: "Deposited"; amount: number }
  | { type: "Withdrawn"; amount: number };

class BankAccount {
  balance = 0;

  apply(event: BankEvent): void {
    if (event.type === "Deposited") {
      this.balance += event.amount;
    }

    if (event.type === "Withdrawn") {
      this.balance -= event.amount;
    }
  }
}

const events: BankEvent[] = [
  { type: "Deposited", amount: 100 },
  { type: "Withdrawn", amount: 30 },
];

const account = new BankAccount();

for (const event of events) {
  account.apply(event);
}

console.log(account.balance);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public abstract record BankEvent;
public record Deposited(decimal Amount) : BankEvent;
public record Withdrawn(decimal Amount) : BankEvent;

public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Apply(BankEvent bankEvent)
    {
        switch (bankEvent)
        {
            case Deposited deposited:
                Balance += deposited.Amount;
                break;
            case Withdrawn withdrawn:
                Balance -= withdrawn.Amount;
                break;
        }
    }
}

public class Program
{
    public static void Main()
    {
        var events = new List<BankEvent>
        {
            new Deposited(100),
            new Withdrawn(30)
        };

        var account = new BankAccount();

        foreach (var bankEvent in events)
        {
            account.Apply(bankEvent);
        }

        Console.WriteLine(account.Balance);
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class BankAccount:
    def __init__(self) -> None:
        self.balance = 0

    def apply(self, event: dict) -> None:
        if event["type"] == "Deposited":
            self.balance += event["amount"]

        if event["type"] == "Withdrawn":
            self.balance -= event["amount"]


events = [
    {"type": "Deposited", "amount": 100},
    {"type": "Withdrawn", "amount": 30},
]

account = BankAccount()

for event in events:
    account.apply(event)

print(account.balance)`,
    },
  ],
};
