import type { Pattern } from "../../types/pattern";

export const specificationPattern: Pattern = {
  slug: "specification",
  name: "Specification",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Specification encapsulates a business rule or selection criteria into a reusable object that can be combined with other rules.",
  keyTakeaway:
    "Use Specification when business rules or filters need to be named, reused, combined, and kept out of scattered conditional logic.",
  problem:
    "Business rules often end up duplicated across services, queries, and validation code. As conditions grow, the logic becomes difficult to reuse, test, and explain.",
  solution:
    "Represent each rule as its own specification and allow specifications to be composed with AND, OR, or NOT so complex business logic stays modular and readable.",

  tags: [
    "business-rules",
    "validation",
    "querying",
    "composition",
    "filtering",
  ],

  whenToUse: [
    "Business rules are repeated in multiple places",
    "You want to name and reuse important domain conditions",
    "You need to combine small rules into larger ones",
    "Conditional logic is becoming hard to test or maintain",
  ],

  whenNotToUse: [
    "The rule is trivial and only used once",
    "Wrapping the logic would make the code less clear",
    "The team is unlikely to benefit from the extra abstraction",
  ],

  benefits: [
    "Improves reuse of business rules",
    "Keeps conditions modular and testable",
    "Makes complex logic easier to read",
    "Encourages expressive domain language",
  ],

  tradeoffs: [
    "Adds abstraction for simple cases",
    "Can become overly elaborate if every condition becomes a specification",
    "May require extra thought when translating to queries",
  ],

  relatedPatterns: ["repository", "service-layer", "policy"],
  confusedWith: ["policy"],

  examples: [
    {
      title: "Business rules example",
      body: "An order may be shippable only if it is paid, in stock, and not on hold. Each of those rules can be modeled separately and combined.",
    },
    {
      title: "Filtering example",
      body: "A product search can compose specifications for category, availability, and price range rather than building conditions inline everywhere.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

type Specification<T> = {
  isSatisfiedBy(candidate: T): boolean;
};

class InStockSpecification implements Specification<Product> {
  isSatisfiedBy(candidate: Product): boolean {
    return candidate.inStock;
  }
}

class AffordableSpecification implements Specification<Product> {
  constructor(private maxPrice: number) {}

  isSatisfiedBy(candidate: Product): boolean {
    return candidate.price <= this.maxPrice;
  }
}

class AndSpecification<T> implements Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>,
  ) {}

  isSatisfiedBy(candidate: T): boolean {
    return (
      this.left.isSatisfiedBy(candidate) &&
      this.right.isSatisfiedBy(candidate)
    );
  }
}

const products: Product[] = [
  { name: "Keyboard", price: 80, inStock: true },
  { name: "Monitor", price: 300, inStock: false },
];

const spec = new AndSpecification(
  new InStockSpecification(),
  new AffordableSpecification(100),
);

const result = products.filter((product) => spec.isSatisfiedBy(product));
console.log(result);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;
using System.Linq;

public class Product
{
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public bool InStock { get; set; }
}

public interface ISpecification<T>
{
    bool IsSatisfiedBy(T candidate);
}

public class InStockSpecification : ISpecification<Product>
{
    public bool IsSatisfiedBy(Product candidate) => candidate.InStock;
}

public class AffordableSpecification : ISpecification<Product>
{
    private readonly decimal _maxPrice;

    public AffordableSpecification(decimal maxPrice)
    {
        _maxPrice = maxPrice;
    }

    public bool IsSatisfiedBy(Product candidate) => candidate.Price <= _maxPrice;
}

public class AndSpecification<T> : ISpecification<T>
{
    private readonly ISpecification<T> _left;
    private readonly ISpecification<T> _right;

    public AndSpecification(ISpecification<T> left, ISpecification<T> right)
    {
        _left = left;
        _right = right;
    }

    public bool IsSatisfiedBy(T candidate)
    {
        return _left.IsSatisfiedBy(candidate) && _right.IsSatisfiedBy(candidate);
    }
}

public class Program
{
    public static void Main()
    {
        var products = new List<Product>
        {
            new Product { Name = "Keyboard", Price = 80, InStock = true },
            new Product { Name = "Monitor", Price = 300, InStock = false }
        };

        var spec = new AndSpecification<Product>(
            new InStockSpecification(),
            new AffordableSpecification(100)
        );

        var result = products.Where(p => spec.IsSatisfiedBy(p));

        foreach (var product in result)
        {
            Console.WriteLine(product.Name);
        }
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `from dataclasses import dataclass
from typing import Protocol


@dataclass
class Product:
    name: str
    price: float
    in_stock: bool


class Specification(Protocol):
    def is_satisfied_by(self, candidate: Product) -> bool:
        ...


class InStockSpecification:
    def is_satisfied_by(self, candidate: Product) -> bool:
        return candidate.in_stock


class AffordableSpecification:
    def __init__(self, max_price: float) -> None:
        self.max_price = max_price

    def is_satisfied_by(self, candidate: Product) -> bool:
        return candidate.price <= self.max_price


class AndSpecification:
    def __init__(self, left: Specification, right: Specification) -> None:
        self.left = left
        self.right = right

    def is_satisfied_by(self, candidate: Product) -> bool:
        return (
            self.left.is_satisfied_by(candidate)
            and self.right.is_satisfied_by(candidate)
        )


products = [
    Product("Keyboard", 80, True),
    Product("Monitor", 300, False),
]

spec = AndSpecification(InStockSpecification(), AffordableSpecification(100))
result = [product for product in products if spec.is_satisfied_by(product)]

print(result)`,
    },
  ],
};
