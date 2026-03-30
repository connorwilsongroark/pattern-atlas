import type { Pattern } from "../../types/pattern";

export const portsAndAdaptersPattern: Pattern = {
  slug: "ports-and-adapters",
  name: "Ports and Adapters",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Ports and Adapters structures an application so core business logic depends on stable internal contracts while external technologies plug in through adapters.",
  keyTakeaway:
    "Use Ports and Adapters when you want the core of the system to stay independent from frameworks, databases, and delivery mechanisms.",
  problem:
    "Applications often become tightly coupled to web frameworks, ORMs, message brokers, or external services. Over time, business logic becomes harder to test, reuse, and reason about because infrastructure concerns leak everywhere.",
  solution:
    "Define ports as application-owned interfaces and place adapters at the edges to translate between the outside world and the application's core use cases.",

  tags: [
    "architecture",
    "boundaries",
    "hexagonal",
    "integration",
    "testability",
  ],

  whenToUse: [
    "You want business logic isolated from infrastructure details",
    "You expect to swap implementations like databases or external APIs",
    "You want application use cases to be easy to test without framework dependencies",
    "You are designing a system with clear boundaries between core and edges",
  ],

  whenNotToUse: [
    "The application is very small and the architectural overhead is unnecessary",
    "The team is unlikely to maintain the boundary consistently",
    "The indirection would add more complexity than real value",
  ],

  benefits: [
    "Protects the core domain from infrastructure coupling",
    "Improves testability",
    "Makes boundaries explicit",
    "Supports replacing edge technologies more easily",
  ],

  tradeoffs: [
    "Adds architectural complexity",
    "Requires discipline to keep dependencies flowing inward",
    "May feel verbose for small applications",
  ],

  relatedPatterns: [
    "adapter",
    "repository",
    "service-layer",
    "anti-corruption-layer",
  ],
  confusedWith: ["layered-architecture", "adapter"],

  examples: [
    {
      title: "Backend example",
      body: "An order application can define a payment port and then plug in Stripe, PayPal, or a fake test adapter without changing the use case itself.",
    },
    {
      title: "Testing example",
      body: "A test can inject an in-memory adapter for persistence instead of using a real database.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type PaymentPort = {
  charge(amount: number): void;
};

class CheckoutService {
  constructor(private paymentPort: PaymentPort) {}

  checkout(total: number): void {
    this.paymentPort.charge(total);
    console.log("Order placed");
  }
}

class StripeAdapter implements PaymentPort {
  charge(amount: number): void {
    console.log("Charging with Stripe:", amount);
  }
}

const service = new CheckoutService(new StripeAdapter());
service.checkout(100);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public interface IPaymentPort
{
    void Charge(decimal amount);
}

public class CheckoutService
{
    private readonly IPaymentPort _paymentPort;

    public CheckoutService(IPaymentPort paymentPort)
    {
        _paymentPort = paymentPort;
    }

    public void Checkout(decimal total)
    {
        _paymentPort.Charge(total);
        Console.WriteLine("Order placed");
    }
}

public class StripeAdapter : IPaymentPort
{
    public void Charge(decimal amount)
    {
        Console.WriteLine($"Charging with Stripe: {amount}");
    }
}

public class Program
{
    public static void Main()
    {
        var service = new CheckoutService(new StripeAdapter());
        service.Checkout(100);
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class PaymentPort:
    def charge(self, amount: float) -> None:
        raise NotImplementedError()


class CheckoutService:
    def __init__(self, payment_port: PaymentPort) -> None:
        self.payment_port = payment_port

    def checkout(self, total: float) -> None:
        self.payment_port.charge(total)
        print("Order placed")


class StripeAdapter(PaymentPort):
    def charge(self, amount: float) -> None:
        print(f"Charging with Stripe: {amount}")


service = CheckoutService(StripeAdapter())
service.checkout(100)`,
    },
  ],
};
