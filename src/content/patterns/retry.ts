import type { Pattern } from "../../types/pattern";

export const retryPattern: Pattern = {
  slug: "retry",
  name: "Retry",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Retry attempts an operation again after failure when the failure is likely to be temporary rather than permanent.",
  keyTakeaway:
    "Use Retry for transient failures like network timeouts or temporary service unavailability, but pair it with limits and backoff so it does not make failures worse.",
  problem:
    "Distributed systems and external dependencies often fail temporarily. Treating every failure as final can reduce resilience, but blindly retrying can overload systems or repeat harmful operations.",
  solution:
    "Retry only operations that are safe and likely to succeed on a later attempt, usually with a maximum number of attempts and a delay strategy such as exponential backoff.",

  tags: [
    "resilience",
    "transient-failure",
    "backoff",
    "network",
    "distributed-systems",
  ],

  whenToUse: [
    "Failures are often temporary or intermittent",
    "The operation is idempotent or otherwise safe to retry",
    "You are calling external services or infrastructure",
    "You want to improve resilience against short-lived outages",
  ],

  whenNotToUse: [
    "The failure is permanent or caused by invalid input",
    "Retrying would duplicate harmful side effects",
    "The system lacks limits, delays, or observability around retries",
  ],

  benefits: [
    "Improves resilience against transient failures",
    "Can reduce the impact of short-lived outages",
    "Works well with backoff and circuit breaker patterns",
    "Can improve perceived reliability",
  ],

  tradeoffs: [
    "Can amplify load during an outage if misused",
    "Adds latency before surfacing failure",
    "Requires care around idempotency and side effects",
  ],

  relatedPatterns: ["circuit-breaker", "bulkhead", "timeout"],
  confusedWith: ["circuit-breaker"],

  examples: [
    {
      title: "API example",
      body: "A service may retry a request to a payment gateway after a timeout if the request is idempotent and the gateway is known to fail transiently.",
    },
    {
      title: "Database example",
      body: "An application may retry a database command after a temporary connection interruption with exponential backoff.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `async function retry<T>(
  operation: () => Promise<T>,
  maxAttempts: number,
): Promise<T> {
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempt++;

      if (attempt >= maxAttempts) {
        throw error;
      }

      console.log(\`Retrying... attempt \${attempt + 1}\`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error("Unreachable");
}

let failures = 0;

retry(async () => {
  failures++;

  if (failures < 3) {
    throw new Error("Temporary failure");
  }

  return "Success";
}, 3).then(console.log);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Threading.Tasks;

public class Program
{
    public static async Task<T> Retry<T>(Func<Task<T>> operation, int maxAttempts)
    {
        var attempt = 0;

        while (attempt < maxAttempts)
        {
            try
            {
                return await operation();
            }
            catch (Exception)
            {
                attempt++;

                if (attempt >= maxAttempts)
                {
                    throw;
                }

                Console.WriteLine($"Retrying... attempt {attempt + 1}");
                await Task.Delay(500);
            }
        }

        throw new Exception("Unreachable");
    }

    public static async Task Main()
    {
        var failures = 0;

        var result = await Retry(async () =>
        {
            failures++;

            if (failures < 3)
            {
                throw new Exception("Temporary failure");
            }

            return "Success";
        }, 3);

        Console.WriteLine(result);
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `import time


def retry(operation, max_attempts: int):
    attempt = 0

    while attempt < max_attempts:
        try:
            return operation()
        except Exception as error:
            attempt += 1

            if attempt >= max_attempts:
                raise error

            print(f"Retrying... attempt {attempt + 1}")
            time.sleep(0.5)


failures = {"count": 0}


def flaky_operation() -> str:
    failures["count"] += 1

    if failures["count"] < 3:
        raise Exception("Temporary failure")

    return "Success"


print(retry(flaky_operation, 3))`,
    },
  ],
};
