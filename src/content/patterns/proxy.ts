import type { Pattern } from "../../types/pattern";

export const proxyPattern: Pattern = {
  slug: "proxy",
  name: "Proxy",
  category: "must-know",
  careerLevel: "early",
  difficulty: "intermediate",

  summary:
    "Proxy provides a stand-in object that controls access to another object, often to add lazy loading, caching, security, or remote communication behavior.",
  keyTakeaway:
    "Use Proxy when you want to keep the same interface while adding access-control or infrastructure behavior around the real object.",
  problem:
    "Sometimes an object is expensive to create, remote to access, or should only be used under certain conditions. Adding that logic directly to consumers spreads the concern everywhere.",
  solution:
    "Introduce a proxy that implements the same contract as the real object and forwards calls while adding extra behavior such as validation, caching, logging, or lazy initialization.",

  tags: [
    "wrapping",
    "indirection",
    "access-control",
    "lazy-loading",
    "caching",
  ],

  whenToUse: [
    "You want lazy initialization of an expensive dependency",
    "You need to enforce access checks before forwarding calls",
    "You want to cache or log behavior without changing consumers",
    "You are representing a remote service behind a local-looking interface",
  ],

  whenNotToUse: [
    "A simpler decorator or adapter better describes the intent",
    "The extra layer adds little or no practical value",
    "The indirect behavior would make debugging harder than necessary",
  ],

  benefits: [
    "Adds infrastructure behavior without changing consumers",
    "Preserves the original contract",
    "Can improve performance through caching or lazy loading",
    "Can centralize access rules",
  ],

  tradeoffs: [
    "Adds indirection",
    "Can hide costly or remote behavior behind a familiar interface",
    "May make debugging or tracing more difficult",
  ],

  relatedPatterns: ["decorator", "adapter", "facade"],
  confusedWith: ["decorator", "adapter"],

  examples: [
    {
      title: "Backend example",
      body: "A caching proxy can sit in front of a product service and return cached results before calling the real dependency.",
    },
    {
      title: "Frontend example",
      body: "An image proxy can delay loading a full-size image until the user actually opens it.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type ProductService = {
  getProduct(id: string): string;
};

class RealProductService implements ProductService {
  getProduct(id: string): string {
    console.log("Fetching from database");
    return \`Product \${id}\`;
  }
}

class CachingProductProxy implements ProductService {
  private cache = new Map<string, string>();

  constructor(private realService: ProductService) {}

  getProduct(id: string): string {
    const cached = this.cache.get(id);
    if (cached) {
      return cached;
    }

    const product = this.realService.getProduct(id);
    this.cache.set(id, product);
    return product;
  }
}

const service = new CachingProductProxy(new RealProductService());

console.log(service.getProduct("42"));
console.log(service.getProduct("42"));`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public interface IProductService
{
    string GetProduct(string id);
}

public class RealProductService : IProductService
{
    public string GetProduct(string id)
    {
        Console.WriteLine("Fetching from database");
        return $"Product {id}";
    }
}

public class CachingProductProxy : IProductService
{
    private readonly IProductService _realService;
    private readonly Dictionary<string, string> _cache = new();

    public CachingProductProxy(IProductService realService)
    {
        _realService = realService;
    }

    public string GetProduct(string id)
    {
        if (_cache.TryGetValue(id, out var cached))
        {
            return cached;
        }

        var product = _realService.GetProduct(id);
        _cache[id] = product;
        return product;
    }
}

public class Program
{
    public static void Main()
    {
        IProductService service = new CachingProductProxy(new RealProductService());

        Console.WriteLine(service.GetProduct("42"));
        Console.WriteLine(service.GetProduct("42"));
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class RealProductService:
    def get_product(self, product_id: str) -> str:
        print("Fetching from database")
        return f"Product {product_id}"


class CachingProductProxy:
    def __init__(self, real_service: RealProductService) -> None:
        self.real_service = real_service
        self.cache: dict[str, str] = {}

    def get_product(self, product_id: str) -> str:
        if product_id in self.cache:
            return self.cache[product_id]

        product = self.real_service.get_product(product_id)
        self.cache[product_id] = product
        return product


service = CachingProductProxy(RealProductService())

print(service.get_product("42"))
print(service.get_product("42"))`,
    },
  ],
};
