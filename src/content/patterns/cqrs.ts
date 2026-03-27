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

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class CreateOrderCommand
{
    public string CustomerId { get; set; } = "";
    public decimal Total { get; set; }
}

public class OrderCommandHandler
{
    public void Handle(CreateOrderCommand command)
    {
        Console.WriteLine($"Validating and creating order: {command.CustomerId}, {command.Total}");
    }
}

public class OrderQueryService
{
    public void GetOrderSummary(string orderId)
    {
        Console.WriteLine($"Returning read-optimized order summary for {orderId}");
    }
}

// Usage
class Program
{
    static void Main()
    {
        var command = new CreateOrderCommand
        {
            CustomerId = "cust-123",
            Total = 99.99m
        };

        var handler = new OrderCommandHandler();
        handler.Handle(command);

        var queryService = new OrderQueryService();
        queryService.GetOrderSummary("order-456");
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class CreateOrderCommand:
    def __init__(self, customer_id: str, total: float):
        self.customer_id = customer_id
        self.total = total


class OrderCommandHandler:
    def handle(self, command: CreateOrderCommand):
        print(f"Validating and creating order: {command.customer_id}, {command.total}")


class OrderQueryService:
    def get_order_summary(self, order_id: str):
        print(f"Returning read-optimized order summary for {order_id}")


# Usage
command = CreateOrderCommand("cust-123", 99.99)

handler = OrderCommandHandler()
handler.handle(command)

query_service = OrderQueryService()
query_service.get_order_summary("order-456")`,
    },
  ],
};
