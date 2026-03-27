import type { Pattern } from "../../types/pattern";

export const statePattern: Pattern = {
  slug: "state",
  name: "State",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "State lets an object change its behavior when its internal state changes by delegating behavior to state-specific implementations.",
  keyTakeaway:
    "Use State when behavior changes substantially based on current state and conditionals are starting to spread everywhere.",

  problem:
    "When an object behaves differently depending on its current state, code often grows into large conditional branches spread across multiple methods. That makes the behavior harder to understand and extend.",

  solution:
    "Represent each meaningful state as its own object or implementation, and let the main object delegate behavior to the current state. As the state changes, behavior changes cleanly with it.",
  tags: ["state", "behavior", "transitions", "conditional-logic"],
  whenToUse: [
    "Behavior changes significantly based on current state",
    "You have large state-based conditionals",
    "You want transitions to be explicit and maintainable",
    "You want each state’s behavior isolated",
  ],

  whenNotToUse: [
    "The state differences are tiny and unlikely to grow",
    "A simple enum and small conditional is clearer",
    "The abstraction would be heavier than the domain complexity",
  ],

  benefits: [
    "Removes complex branching",
    "Encapsulates state-specific behavior",
    "Makes transitions more explicit",
    "Improves maintainability as state rules grow",
  ],

  tradeoffs: [
    "Adds more classes or objects",
    "Can be overkill for simple state transitions",
    "Requires clear ownership of transitions and lifecycle",
  ],

  relatedPatterns: ["strategy", "command", "observer-pub-sub"],
  confusedWith: ["strategy"],

  examples: [
    {
      title: "UI example",
      body: "A file uploader may behave differently in idle, uploading, success, and error states.",
    },
    {
      title: "Backend example",
      body: "An order may move through pending, paid, shipped, and cancelled states with different allowed operations in each.",
    },
    {
      title: "Game development example",
      body: "An NPC can switch between idle, patrol, chase, and stunned states, each with different update behavior.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type OrderState = {
  canCancel(): boolean;
  label(): string;
};

class PendingState implements OrderState {
  canCancel(): boolean {
    return true;
  }

  label(): string {
    return "Pending";
  }
}

class ShippedState implements OrderState {
  canCancel(): boolean {
    return false;
  }

  label(): string {
    return "Shipped";
  }
}

class Order {
  constructor(private state: OrderState) {}

  getStatus(): string {
    return this.state.label();
  }

  canCancel(): boolean {
    return this.state.canCancel();
  }

  setState(state: OrderState): void {
    this.state = state;
  }
}

const order = new Order(new PendingState());

console.log(order.getStatus()); // Pending
console.log(order.canCancel()); // true

order.setState(new ShippedState());

console.log(order.getStatus()); // Shipped
console.log(order.canCancel()); // false`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public interface IOrderState
{
    bool CanCancel();
    string Label();
}

public class PendingState : IOrderState
{
    public bool CanCancel() => true;
    public string Label() => "Pending";
}

public class ShippedState : IOrderState
{
    public bool CanCancel() => false;
    public string Label() => "Shipped";
}

public class Order
{
    private IOrderState _state;

    public Order(IOrderState state)
    {
        _state = state;
    }

    public string GetStatus()
    {
        return _state.Label();
    }

    public bool CanCancel()
    {
        return _state.CanCancel();
    }

    public void SetState(IOrderState state)
    {
        _state = state;
    }
}

// Usage
class Program
{
    static void Main()
    {
        var order = new Order(new PendingState());

        Console.WriteLine(order.GetStatus()); // Pending
        Console.WriteLine(order.CanCancel()); // true

        order.SetState(new ShippedState());

        Console.WriteLine(order.GetStatus()); // Shipped
        Console.WriteLine(order.CanCancel()); // false
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class OrderState:
    def can_cancel(self) -> bool:
        raise NotImplementedError()

    def label(self) -> str:
        raise NotImplementedError()


class PendingState(OrderState):
    def can_cancel(self) -> bool:
        return True

    def label(self) -> str:
        return "Pending"


class ShippedState(OrderState):
    def can_cancel(self) -> bool:
        return False

    def label(self) -> str:
        return "Shipped"


class Order:
    def __init__(self, state: OrderState):
        self.state = state

    def get_status(self) -> str:
        return self.state.label()

    def can_cancel(self) -> bool:
        return self.state.can_cancel()

    def set_state(self, state: OrderState):
        self.state = state


# Usage
order = Order(PendingState())

print(order.get_status())  # Pending
print(order.can_cancel())  # True

order.set_state(ShippedState())

print(order.get_status())  # Shipped
print(order.can_cancel())  # False`,
    },
  ],
};
