import type { Pattern } from "../../types/pattern";

export const cacheAsidePattern: Pattern = {
  slug: "cache-aside",
  name: "Cache-Aside",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Cache-Aside loads data into a cache only when it is requested, with the application checking the cache first and falling back to the primary data store on a miss.",
  keyTakeaway:
    "Use Cache-Aside when you want to improve read performance without forcing every piece of data to be cached upfront.",
  problem:
    "Reading frequently accessed data from the primary store every time can be slow and expensive, but preloading everything into cache is often wasteful or impractical.",
  solution:
    "On each read, first check the cache. If the value is missing, load it from the primary store, save it into the cache, and then return it.",

  tags: [
    "caching",
    "performance",
    "reads",
    "data-access",
    "distributed-systems",
  ],

  whenToUse: [
    "Some data is read often enough to benefit from caching",
    "You want to reduce load on the primary data store",
    "A cache miss can safely fall back to the source of truth",
    "The application can tolerate temporary staleness when appropriate",
  ],

  whenNotToUse: [
    "The data changes so frequently that cache invalidation becomes impractical",
    "The application requires perfectly fresh reads at all times",
    "The added caching complexity is not justified by the performance gain",
  ],

  benefits: [
    "Improves read performance",
    "Reduces repeated load on the source of truth",
    "Caches only what is actually used",
    "Can be introduced incrementally",
  ],

  tradeoffs: [
    "Cache invalidation must be handled carefully",
    "Data may become stale",
    "Adds operational and debugging complexity",
  ],

  relatedPatterns: ["proxy", "retry", "circuit-breaker"],
  confusedWith: ["write-through-cache", "proxy"],

  examples: [
    {
      title: "Product catalog example",
      body: "A product service can look up popular product details in Redis before querying the database.",
    },
    {
      title: "Profile example",
      body: "A user profile endpoint can cache recently requested profiles to reduce repeated reads from the main store.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `const cache = new Map<string, string>();

function getFromDatabase(key: string): string {
  console.log("Fetching from database");
  return \`value-for-\${key}\`;
}

function getValue(key: string): string {
  const cached = cache.get(key);

  if (cached) {
    console.log("Cache hit");
    return cached;
  }

  console.log("Cache miss");
  const value = getFromDatabase(key);
  cache.set(key, value);
  return value;
}

console.log(getValue("user:1"));
console.log(getValue("user:1"));`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public class Program
{
    private static readonly Dictionary<string, string> Cache = new();

    public static string GetFromDatabase(string key)
    {
        Console.WriteLine("Fetching from database");
        return $"value-for-{key}";
    }

    public static string GetValue(string key)
    {
        if (Cache.TryGetValue(key, out var cached))
        {
            Console.WriteLine("Cache hit");
            return cached;
        }

        Console.WriteLine("Cache miss");
        var value = GetFromDatabase(key);
        Cache[key] = value;
        return value;
    }

    public static void Main()
    {
        Console.WriteLine(GetValue("user:1"));
        Console.WriteLine(GetValue("user:1"));
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `cache: dict[str, str] = {}


def get_from_database(key: str) -> str:
    print("Fetching from database")
    return f"value-for-{key}"


def get_value(key: str) -> str:
    if key in cache:
        print("Cache hit")
        return cache[key]

    print("Cache miss")
    value = get_from_database(key)
    cache[key] = value
    return value


print(get_value("user:1"))
print(get_value("user:1"))`,
    },
  ],
};
