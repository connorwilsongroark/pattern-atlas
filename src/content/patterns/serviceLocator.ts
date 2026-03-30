import type { Pattern } from "../../types/pattern";

export const serviceLocatorPattern: Pattern = {
  slug: "service-locator",
  name: "Service Locator",
  category: "de-emphasize",
  careerLevel: "senior",
  difficulty: "intermediate",

  summary:
    "Service Locator provides a central registry that classes can query to obtain dependencies at runtime.",
  keyTakeaway:
    "Know Service Locator mainly so you can recognize its tradeoffs, because it often hides dependencies that dependency injection would make explicit.",
  problem:
    "Some systems want a convenient way to resolve dependencies without passing them through constructors or method parameters everywhere.",
  solution:
    "Register dependencies in a shared locator and let consumers request services from it as needed.",

  tags: [
    "dependencies",
    "registry",
    "resolution",
    "global-access",
    "anti-pattern",
  ],

  whenToUse: [
    "You are working within an existing framework or legacy codebase that already uses it",
    "You need to understand and maintain a system built around runtime service resolution",
    "A narrow infrastructure layer benefits from late resolution and the tradeoffs are accepted",
  ],

  whenNotToUse: [
    "Constructor injection can make dependencies explicit",
    "You want code to be easier to test and reason about",
    "The pattern is being chosen mainly for convenience",
  ],

  benefits: [
    "Can simplify access to shared services in legacy systems",
    "Supports runtime lookup scenarios",
    "May reduce parameter plumbing in some codebases",
  ],

  tradeoffs: [
    "Hides dependencies",
    "Makes testing harder",
    "Increases coupling to a global registry",
    "Often weaker than dependency injection in clarity and maintainability",
  ],

  relatedPatterns: ["dependency-injection", "singleton"],
  confusedWith: ["dependency-injection", "singleton"],

  examples: [
    {
      title: "Legacy application example",
      body: "A desktop application may use a global registry to resolve logging and configuration services throughout the codebase.",
    },
    {
      title: "Framework integration example",
      body: "A framework callback may look up a service from a container when constructor injection is not easily available.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Logger = {
  log(message: string): void;
};

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class ServiceLocator {
  private static services = new Map<string, unknown>();

  static register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  static resolve<T>(key: string): T {
    return this.services.get(key) as T;
  }
}

ServiceLocator.register<Logger>("logger", new ConsoleLogger());

class OrderService {
  private logger = ServiceLocator.resolve<Logger>("logger");

  placeOrder(): void {
    this.logger.log("Order placed");
  }
}

new OrderService().placeOrder();`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public interface ILogger
{
    void Log(string message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}

public static class ServiceLocator
{
    private static readonly Dictionary<string, object> Services = new();

    public static void Register<T>(string key, T service)
    {
        Services[key] = service!;
    }

    public static T Resolve<T>(string key)
    {
        return (T)Services[key];
    }
}

public class OrderService
{
    private readonly ILogger _logger = ServiceLocator.Resolve<ILogger>("logger");

    public void PlaceOrder()
    {
        _logger.Log("Order placed");
    }
}

public class Program
{
    public static void Main()
    {
        ServiceLocator.Register<ILogger>("logger", new ConsoleLogger());
        new OrderService().PlaceOrder();
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class ConsoleLogger:
    def log(self, message: str) -> None:
        print(message)


class ServiceLocator:
    _services: dict[str, object] = {}

    @classmethod
    def register(cls, key: str, service: object) -> None:
        cls._services[key] = service

    @classmethod
    def resolve(cls, key: str) -> object:
        return cls._services[key]


ServiceLocator.register("logger", ConsoleLogger())


class OrderService:
    def __init__(self) -> None:
        self.logger = ServiceLocator.resolve("logger")

    def place_order(self) -> None:
        self.logger.log("Order placed")


OrderService().place_order()`,
    },
  ],
};
