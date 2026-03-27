import type { Pattern } from "../../types/pattern";

export const circuitBreakerPattern: Pattern = {
  slug: "circuit-breaker",
  name: "Circuit Breaker",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Circuit Breaker prevents a failing dependency from being hammered continuously by temporarily stopping calls and allowing recovery checks.",

  keyTakeaway:
    "Use Circuit Breaker when repeated calls to a failing dependency would worsen latency, load, or cascading failure.",

  problem:
    "When a downstream service is failing or timing out, blindly retrying every call can overload both your system and the dependency, creating cascading failures.",

  solution:
    "Track failures and open the circuit when a threshold is reached. While open, fail fast instead of calling the dependency. Later, allow limited test calls to see if recovery has occurred.",

  tags: [
    "resilience",
    "distributed-systems",
    "failures",
    "timeouts",
    "availability",
  ],

  whenToUse: [
    "You depend on flaky or remote services",
    "Failure cascades are a real risk",
    "You want to fail fast during outages",
    "Latency and resilience matter in production",
  ],

  whenNotToUse: [
    "There is no meaningful remote dependency",
    "The system is simple enough that added resilience logic is unnecessary",
    "You have not yet measured a real failure mode worth protecting against",
  ],

  benefits: [
    "Reduces cascading failures",
    "Protects system resources",
    "Improves resilience under outage conditions",
    "Makes dependency health handling explicit",
  ],

  tradeoffs: [
    "Adds operational complexity",
    "Requires thoughtful thresholds and recovery logic",
    "Can hide transient recovery if configured poorly",
  ],

  relatedPatterns: [
    "retry-pattern",
    "outbox-pattern",
    "event-driven-architecture",
  ],
  confusedWith: ["retry-pattern"],

  examples: [
    {
      title: "Backend example",
      body: "An API gateway can stop forwarding requests to an unhealthy downstream billing service for a cooling-off period.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class CircuitBreaker {
  private failures = 0;
  private open = false;

  execute(action: () => void): void {
    if (this.open) {
      throw new Error("Circuit is open");
    }

    try {
      action();
      this.failures = 0;
    } catch (error) {
      this.failures += 1;

      if (this.failures >= 3) {
        this.open = true;
      }

      throw error;
    }
  }
}`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class CircuitBreaker
{
    private int _failures = 0;
    private bool _open = false;

    public void Execute(Action action)
    {
        if (_open)
        {
            throw new Exception("Circuit is open");
        }

        try
        {
            action();
            _failures = 0;
        }
        catch
        {
            _failures++;

            if (_failures >= 3)
            {
                _open = true;
            }

            throw;
        }
    }
}

// Usage
class Program
{
    static void Main()
    {
        var breaker = new CircuitBreaker();

        try
        {
            breaker.Execute(() =>
            {
                throw new Exception("Failure");
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class CircuitBreaker:
    def __init__(self):
        self.failures = 0
        self.open = False

    def execute(self, action):
        if self.open:
            raise Exception("Circuit is open")

        try:
            action()
            self.failures = 0
        except Exception as e:
            self.failures += 1

            if self.failures >= 3:
                self.open = True

            raise e


# Usage
breaker = CircuitBreaker()

try:
    breaker.execute(lambda: (_ for _ in ()).throw(Exception("Failure")))
except Exception as e:
    print(e)`,
    },
  ],
};
