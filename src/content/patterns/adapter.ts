import type { Pattern } from "../../types/pattern";

export const adapterPattern: Pattern = {
  slug: "adapter",
  name: "Adapter",
  category: "must-know",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Adapter translates one interface into another so existing code can work with an incompatible dependency or legacy API.",

  keyTakeaway:
    "Use Adapter when two parts of a system should work together but their interfaces do not match.",

  problem:
    "You often need to integrate with code or libraries whose interface does not match what your application expects. Changing either side directly may be impossible or undesirable.",

  solution:
    "Introduce an adapter that converts calls and data between the expected interface and the existing incompatible one.",

  tags: ["integration", "translation", "legacy", "wrapping", "interfaces"],

  whenToUse: [
    "You need to integrate with an incompatible interface",
    "You are wrapping a third-party or legacy dependency",
    "You want to isolate translation logic in one place",
    "You want your application to depend on its own preferred contract",
  ],

  whenNotToUse: [
    "The interfaces already align well enough",
    "A direct dependency is simpler and acceptable",
    "You are using an adapter where a facade or decorator is actually the better fit",
  ],

  benefits: [
    "Isolates translation logic",
    "Reduces coupling to external APIs",
    "Makes integrations easier to swap",
    "Helps keep application code clean",
  ],

  tradeoffs: [
    "Adds an extra layer",
    "Can hide important mismatches if done carelessly",
    "Needs maintenance when the adapted dependency changes",
  ],

  relatedPatterns: ["facade", "decorator", "anti-corruption-layer"],
  confusedWith: ["facade", "decorator"],

  examples: [
    {
      title: "Backend example",
      body: "A payment adapter can translate your application's payment contract into the method names and payloads expected by a third-party provider.",
    },
    {
      title: "Frontend example",
      body: "A date adapter can normalize a third-party date library to a simpler internal formatting interface.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class LegacyEmailSender {
  sendEmail(address: string, body: string): void {
    console.log("Legacy send:", address, body);
  }
}

type Notifier = {
  send(message: string, recipient: string): void;
};

class EmailSenderAdapter implements Notifier {
  constructor(private legacy: LegacyEmailSender) {}

  send(message: string, recipient: string): void {
    this.legacy.sendEmail(recipient, message);
  }
}

const notifier: Notifier = new EmailSenderAdapter(
  new LegacyEmailSender(),
);

notifier.send("Hello", "person@example.com");`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class LegacyEmailSender
{
    public void SendEmail(string address, string body)
    {
        Console.WriteLine($"Legacy send: {address} {body}");
    }
}

public interface INotifier
{
    void Send(string message, string recipient);
}

public class EmailSenderAdapter : INotifier
{
    private readonly LegacyEmailSender _legacy;

    public EmailSenderAdapter(LegacyEmailSender legacy)
    {
        _legacy = legacy;
    }

    public void Send(string message, string recipient)
    {
        _legacy.SendEmail(recipient, message);
    }
}

public class Program
{
    public static void Main()
    {
        INotifier notifier = new EmailSenderAdapter(new LegacyEmailSender());
        notifier.Send("Hello", "person@example.com");
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class LegacyEmailSender:
    def send_email(self, address: str, body: str) -> None:
        print(f"Legacy send: {address} {body}")


class EmailSenderAdapter:
    def __init__(self, legacy: LegacyEmailSender) -> None:
        self.legacy = legacy

    def send(self, message: str, recipient: str) -> None:
        self.legacy.send_email(recipient, message)


notifier = EmailSenderAdapter(LegacyEmailSender())
notifier.send("Hello", "person@example.com")`,
    },
  ],
};
