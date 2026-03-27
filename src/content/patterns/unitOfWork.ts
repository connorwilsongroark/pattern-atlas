import type { Pattern } from "../../types/pattern";

export const unitOfWorkPattern: Pattern = {
  slug: "unit-of-work",
  name: "Unit of Work",
  category: "must-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Unit of Work tracks changes across a business transaction and commits them together as a single coordinated operation.",

  keyTakeaway:
    "Use Unit of Work when several related data changes should succeed or fail together as one transaction boundary.",

  problem:
    "Complex workflows often involve multiple inserts, updates, or deletes that should be treated as one logical operation. Without coordination, partial success can leave the system in an inconsistent state.",

  solution:
    "Track related changes inside a unit of work and commit them together, typically within a transaction boundary, so the operation is coordinated and consistent.",

  tags: [
    "transactions",
    "persistence",
    "consistency",
    "repositories",
    "database",
  ],

  whenToUse: [
    "Several related persistence changes must succeed together",
    "You want a clear transaction boundary",
    "Multiple repositories participate in one use case",
    "You need consistency across a workflow",
  ],

  whenNotToUse: [
    "A simple single-operation save is enough",
    "The ORM or framework already gives you the right abstraction",
    "Adding an explicit unit of work would duplicate infrastructure meaninglessly",
  ],

  benefits: [
    "Coordinates related data changes",
    "Improves transactional consistency",
    "Makes commit boundaries explicit",
    "Works well with repositories and services",
  ],

  tradeoffs: [
    "Adds architectural complexity",
    "Can overlap with ORM abstractions",
    "Requires careful transaction ownership",
  ],

  relatedPatterns: ["repository", "service-layer", "domain-events"],
  confusedWith: ["repository"],

  examples: [
    {
      title: "Backend example",
      body: "Placing an order may create the order, reserve inventory, and write an audit record, all within one transaction boundary.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class UnitOfWork {
  begin(): void {
    console.log("Begin transaction");
  }

  commit(): void {
    console.log("Commit transaction");
  }

  rollback(): void {
    console.log("Rollback transaction");
  }
}

class OrderService {
  constructor(private uow: UnitOfWork) {}

  placeOrder(): void {
    this.uow.begin();

    try {
      console.log("Save order");
      console.log("Reserve inventory");
      console.log("Write audit log");
      this.uow.commit();
    } catch {
      this.uow.rollback();
      throw new Error("Order placement failed");
    }
  }
}`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class UnitOfWork
{
    public void Begin()
    {
        Console.WriteLine("Begin transaction");
    }

    public void Commit()
    {
        Console.WriteLine("Commit transaction");
    }

    public void Rollback()
    {
        Console.WriteLine("Rollback transaction");
    }
}

public class OrderService
{
    private readonly UnitOfWork _uow;

    public OrderService(UnitOfWork uow)
    {
        _uow = uow;
    }

    public void PlaceOrder()
    {
        _uow.Begin();

        try
        {
            Console.WriteLine("Save order");
            Console.WriteLine("Reserve inventory");
            Console.WriteLine("Write audit log");

            _uow.Commit();
        }
        catch
        {
            _uow.Rollback();
            throw new Exception("Order placement failed");
        }
    }
}

// Usage
class Program
{
    static void Main()
    {
        var service = new OrderService(new UnitOfWork());
        service.PlaceOrder();
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class UnitOfWork:
    def begin(self):
        print("Begin transaction")

    def commit(self):
        print("Commit transaction")

    def rollback(self):
        print("Rollback transaction")


class OrderService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    def place_order(self):
        self.uow.begin()

        try:
            print("Save order")
            print("Reserve inventory")
            print("Write audit log")
            self.uow.commit()
        except Exception:
            self.uow.rollback()
            raise Exception("Order placement failed")


# Usage
service = OrderService(UnitOfWork())
service.place_order()`,
    },
  ],
};
