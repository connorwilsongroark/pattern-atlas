import type { Pattern } from "../../types/pattern";

export const strategyPattern: Pattern = {
  slug: "strategy",
  name: "Strategy",
  category: "must-know",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Strategy defines a family of interchangeable behaviors and lets you swap them at runtime without changing the code that uses them.",
  keyTakeaway:
    "Use Strategy when you want to swap behaviors cleanly without filling your code with conditionals.",

  problem:
    "Sometimes a piece of code needs to perform one of several similar behaviors, but hardcoding those behaviors with if/else or switch statements makes the code harder to extend and maintain.",

  solution:
    "Extract each behavior into its own strategy implementation and let the consuming object depend on an abstraction rather than concrete branching logic.",

  whenToUse: [
    "You have multiple ways to perform the same task",
    "You want to remove large if/else or switch statements",
    "You want behavior to be swappable at runtime",
    "You want to isolate business rules into focused units",
  ],

  whenNotToUse: [
    "You only have one behavior and do not expect variation",
    "The added abstraction would be heavier than the problem",
    "The differences between behaviors are trivial and unlikely to grow",
  ],

  benefits: [
    "Reduces conditional complexity",
    "Improves extensibility",
    "Encourages composition over inheritance",
    "Makes behaviors easier to test independently",
  ],

  tradeoffs: [
    "Introduces more files and abstractions",
    "Can feel verbose for very small problems",
    "Requires choosing how strategies are selected and composed",
  ],

  relatedPatterns: ["factory-method", "state", "command"],
  confusedWith: ["state", "template-method"],

  examples: [
    {
      title: "UI example",
      body: "A payment form may support different payment calculation or validation strategies depending on the selected payment method.",
    },
    {
      title: "Backend example",
      body: "An order pricing service may use different discount strategies depending on the customer, promotion, or order type.",
    },
    {
      title: "Game development example",
      body: "An enemy AI could switch between patrol, chase, and flee movement strategies depending on world state.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type PricingStrategy = {
  calculateSubtotal(amount: number): number;
};

class StandardPricingStrategy implements PricingStrategy {
  calculateSubtotal(amount: number): number {
    return amount;
  }
}

class PremiumPricingStrategy implements PricingStrategy {
  calculateSubtotal(amount: number): number {
    return amount * 0.9;
  }
}

class CheckoutService {
  constructor(private strategy: PricingStrategy) {}

  getSubtotal(amount: number): number {
    return this.strategy.calculateSubtotal(amount);
  }
}

const standardCheckout = new CheckoutService(
  new StandardPricingStrategy()
);

const premiumCheckout = new CheckoutService(
  new PremiumPricingStrategy()
);

console.log(standardCheckout.getSubtotal(100)); // 100
console.log(premiumCheckout.getSubtotal(100));  // 90`,
    },
  ],
};
