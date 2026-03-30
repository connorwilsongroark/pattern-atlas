import type { Pattern } from "../../types/pattern";

export const mediatorPattern: Pattern = {
  slug: "mediator",
  name: "Mediator",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Mediator centralizes communication between related objects so they interact through a coordinating object instead of talking to each other directly.",
  keyTakeaway:
    "Use Mediator when many objects need to coordinate, but direct connections between them would create a tangled web of dependencies.",
  problem:
    "When multiple objects communicate directly with one another, the relationships can become difficult to understand, maintain, and extend. Changes in one object may ripple across the whole group.",
  solution:
    "Introduce a mediator that manages collaboration between participants. Each participant talks to the mediator, and the mediator decides how other objects should respond.",

  tags: ["coordination", "communication", "decoupling", "ui", "workflow"],

  whenToUse: [
    "Multiple objects need to coordinate behavior",
    "Direct communication between components is becoming tangled",
    "You want to centralize collaboration rules",
    "You are managing UI interactions or workflow orchestration",
  ],

  whenNotToUse: [
    "The collaboration is simple enough for direct calls",
    "The mediator would become a large all-knowing object",
    "A pub-sub or observer style relationship better fits the problem",
  ],

  benefits: [
    "Reduces direct coupling between participants",
    "Centralizes interaction rules",
    "Makes related workflows easier to change",
    "Helps keep participant classes simpler",
  ],

  tradeoffs: [
    "The mediator itself can become too large",
    "Can shift complexity into one coordinating class",
    "Sometimes less natural than direct communication",
  ],

  relatedPatterns: ["observer-pub-sub", "chain-of-responsibility", "facade"],
  confusedWith: ["observer-pub-sub", "facade"],

  examples: [
    {
      title: "UI example",
      body: "A form mediator can coordinate a submit button, validation message, and input fields so the components do not need to know about one another directly.",
    },
    {
      title: "Application example",
      body: "A booking workflow can use a mediator to coordinate payment, inventory, and notification components in one place.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Mediator = {
  notify(sender: string, event: string): void;
};

class LoginFormMediator implements Mediator {
  notify(sender: string, event: string): void {
    if (sender === "username" && event === "changed") {
      console.log("Validate username");
    }

    if (sender === "password" && event === "changed") {
      console.log("Validate password");
    }

    if (sender === "submit" && event === "clicked") {
      console.log("Attempt login");
    }
  }
}

class InputField {
  constructor(
    private name: string,
    private mediator: Mediator,
  ) {}

  change(): void {
    this.mediator.notify(this.name, "changed");
  }
}

class SubmitButton {
  constructor(private mediator: Mediator) {}

  click(): void {
    this.mediator.notify("submit", "clicked");
  }
}

const mediator = new LoginFormMediator();
const username = new InputField("username", mediator);
const password = new InputField("password", mediator);
const submit = new SubmitButton(mediator);

username.change();
password.change();
submit.click();`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public interface IMediator
{
    void Notify(string sender, string eventName);
}

public class LoginFormMediator : IMediator
{
    public void Notify(string sender, string eventName)
    {
        if (sender == "username" && eventName == "changed")
        {
            Console.WriteLine("Validate username");
        }

        if (sender == "password" && eventName == "changed")
        {
            Console.WriteLine("Validate password");
        }

        if (sender == "submit" && eventName == "clicked")
        {
            Console.WriteLine("Attempt login");
        }
    }
}

public class InputField
{
    private readonly string _name;
    private readonly IMediator _mediator;

    public InputField(string name, IMediator mediator)
    {
        _name = name;
        _mediator = mediator;
    }

    public void Change()
    {
        _mediator.Notify(_name, "changed");
    }
}

public class SubmitButton
{
    private readonly IMediator _mediator;

    public SubmitButton(IMediator mediator)
    {
        _mediator = mediator;
    }

    public void Click()
    {
        _mediator.Notify("submit", "clicked");
    }
}

public class Program
{
    public static void Main()
    {
        var mediator = new LoginFormMediator();
        var username = new InputField("username", mediator);
        var password = new InputField("password", mediator);
        var submit = new SubmitButton(mediator);

        username.Change();
        password.Change();
        submit.Click();
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class LoginFormMediator:
    def notify(self, sender: str, event: str) -> None:
        if sender == "username" and event == "changed":
            print("Validate username")

        if sender == "password" and event == "changed":
            print("Validate password")

        if sender == "submit" and event == "clicked":
            print("Attempt login")


class InputField:
    def __init__(self, name: str, mediator: LoginFormMediator) -> None:
        self.name = name
        self.mediator = mediator

    def change(self) -> None:
        self.mediator.notify(self.name, "changed")


class SubmitButton:
    def __init__(self, mediator: LoginFormMediator) -> None:
        self.mediator = mediator

    def click(self) -> None:
        self.mediator.notify("submit", "clicked")


mediator = LoginFormMediator()
username = InputField("username", mediator)
password = InputField("password", mediator)
submit = SubmitButton(mediator)

username.change()
password.change()
submit.click()`,
    },
  ],
};
