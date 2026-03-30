import type { Pattern } from "../../types/pattern";

export const sagaPattern: Pattern = {
  slug: "saga",
  name: "Saga",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Saga coordinates a long-running business process across multiple steps and services by chaining local transactions and compensating actions.",
  keyTakeaway:
    "Use Saga when a workflow spans multiple services and you need eventual consistency instead of a single distributed transaction.",
  problem:
    "In distributed systems, a business process may involve multiple services that each own their own data. A single ACID transaction across them is often impractical or undesirable, but partial failure still has to be handled safely.",
  solution:
    "Break the workflow into a sequence of local steps. If one step fails, run compensating actions for the steps that already succeeded so the system returns to a valid state.",

  tags: [
    "distributed-systems",
    "workflow",
    "eventual-consistency",
    "compensation",
    "microservices",
  ],

  whenToUse: [
    "A business process spans multiple services",
    "You cannot or should not use a distributed transaction",
    "The workflow is long-running and may partially fail",
    "You can define meaningful compensating actions",
  ],

  whenNotToUse: [
    "A single local transaction is enough",
    "Compensation is impossible or unacceptable for the domain",
    "The system does not actually require service-level separation",
  ],

  benefits: [
    "Supports complex workflows across service boundaries",
    "Avoids heavy distributed transactions",
    "Makes failure handling explicit",
    "Fits event-driven architectures well",
  ],

  tradeoffs: [
    "Adds major design complexity",
    "Compensating actions can be difficult to define correctly",
    "Requires careful handling of retries, idempotency, and observability",
  ],

  relatedPatterns: ["outbox", "domain-events", "event-sourcing", "cqrs"],
  confusedWith: ["workflow-engine", "two-phase-commit"],

  examples: [
    {
      title: "E-commerce example",
      body: "An order workflow may reserve inventory, charge a payment, and create a shipment. If shipment creation fails, the saga may refund the payment and release the inventory.",
    },
    {
      title: "Travel example",
      body: "A booking flow may reserve a flight, hotel, and car. If one step fails, earlier reservations can be canceled through compensating actions.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class OrderSaga {
  async execute(): Promise<void> {
    try {
      await this.reserveInventory();
      await this.chargePayment();
      await this.createShipment();
      console.log("Saga completed");
    } catch {
      await this.compensate();
    }
  }

  private async reserveInventory(): Promise<void> {
    console.log("Inventory reserved");
  }

  private async chargePayment(): Promise<void> {
    console.log("Payment charged");
  }

  private async createShipment(): Promise<void> {
    throw new Error("Shipment failed");
  }

  private async compensate(): Promise<void> {
    console.log("Refund payment");
    console.log("Release inventory");
  }
}

const saga = new OrderSaga();
saga.execute();`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Threading.Tasks;

public class OrderSaga
{
    public async Task Execute()
    {
        try
        {
            await ReserveInventory();
            await ChargePayment();
            await CreateShipment();
            Console.WriteLine("Saga completed");
        }
        catch
        {
            await Compensate();
        }
    }

    private Task ReserveInventory()
    {
        Console.WriteLine("Inventory reserved");
        return Task.CompletedTask;
    }

    private Task ChargePayment()
    {
        Console.WriteLine("Payment charged");
        return Task.CompletedTask;
    }

    private Task CreateShipment()
    {
        throw new Exception("Shipment failed");
    }

    private Task Compensate()
    {
        Console.WriteLine("Refund payment");
        Console.WriteLine("Release inventory");
        return Task.CompletedTask;
    }
}

public class Program
{
    public static async Task Main()
    {
        var saga = new OrderSaga();
        await saga.Execute();
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class OrderSaga:
    async def execute(self) -> None:
        try:
            await self.reserve_inventory()
            await self.charge_payment()
            await self.create_shipment()
            print("Saga completed")
        except Exception:
            await self.compensate()

    async def reserve_inventory(self) -> None:
        print("Inventory reserved")

    async def charge_payment(self) -> None:
        print("Payment charged")

    async def create_shipment(self) -> None:
        raise Exception("Shipment failed")

    async def compensate(self) -> None:
        print("Refund payment")
        print("Release inventory")`,
    },
  ],
};
