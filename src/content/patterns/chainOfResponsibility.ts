import type { Pattern } from "../../types/pattern";

export const chainOfResponsibilityPattern: Pattern = {
  slug: "chain-of-responsibility",
  name: "Chain of Responsibility",
  category: "must-know",
  careerLevel: "early",
  difficulty: "intermediate",

  summary:
    "Chain of Responsibility passes a request through a sequence of handlers, where each handler can process it, modify it, pass it along, or stop the chain.",
  keyTakeaway:
    "Use Chain of Responsibility when multiple steps should get a chance to handle a request without the sender knowing exactly which one will act.",
  problem:
    "A request may need to go through multiple checks, transformations, or handlers, but hardcoding all that logic into one place creates tight coupling and makes the flow harder to extend.",
  solution:
    "Split the behavior into separate handlers arranged in a chain. Each handler decides whether to act, whether to pass the request onward, or whether to stop the process.",

  tags: ["pipeline", "middleware", "handlers", "workflow", "decoupling"],

  whenToUse: [
    "A request should pass through multiple validation or processing steps",
    "You want to add or remove handlers without rewriting the whole flow",
    "The sender should not need to know which handler will process the request",
    "You are building middleware, filters, or approval chains",
  ],

  whenNotToUse: [
    "A simple direct call is clearer",
    "The sequence of logic is too small to justify separate handlers",
    "The chain would become difficult to trace or debug",
  ],

  benefits: [
    "Decouples sender from concrete handlers",
    "Makes workflows easier to extend",
    "Encourages small focused processing steps",
    "Works well for middleware-style pipelines",
  ],

  tradeoffs: [
    "Can make control flow less obvious",
    "Debugging may require tracing multiple handlers",
    "Overuse can lead to unnecessary indirection",
  ],

  relatedPatterns: ["command", "mediator", "template-method", "pipeline"],
  confusedWith: ["mediator", "pipeline"],

  examples: [
    {
      title: "Backend example",
      body: "An HTTP request can pass through authentication, authorization, logging, and validation handlers before reaching the final endpoint.",
    },
    {
      title: "Business workflow example",
      body: "An expense request can move through manager approval, finance review, and compliance checks until one step rejects it or the chain completes.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Request = {
  user?: { isAuthenticated: boolean; isAdmin: boolean };
};

type Handler = {
  setNext(handler: Handler): Handler;
  handle(request: Request): void;
};

abstract class BaseHandler implements Handler {
  private next?: Handler;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: Request): void {
    if (this.next) {
      this.next.handle(request);
    }
  }
}

class AuthenticationHandler extends BaseHandler {
  handle(request: Request): void {
    if (!request.user?.isAuthenticated) {
      console.log("Request rejected: not authenticated");
      return;
    }

    super.handle(request);
  }
}

class AuthorizationHandler extends BaseHandler {
  handle(request: Request): void {
    if (!request.user?.isAdmin) {
      console.log("Request rejected: not authorized");
      return;
    }

    super.handle(request);
  }
}

class FinalHandler extends BaseHandler {
  handle(_: Request): void {
    console.log("Request processed");
  }
}

const auth = new AuthenticationHandler();
const admin = new AuthorizationHandler();
const finalHandler = new FinalHandler();

auth.setNext(admin).setNext(finalHandler);

auth.handle({
  user: { isAuthenticated: true, isAdmin: true },
});`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class Request
{
    public User? User { get; set; }
}

public class User
{
    public bool IsAuthenticated { get; set; }
    public bool IsAdmin { get; set; }
}

public interface IHandler
{
    IHandler SetNext(IHandler handler);
    void Handle(Request request);
}

public abstract class BaseHandler : IHandler
{
    private IHandler? _next;

    public IHandler SetNext(IHandler handler)
    {
        _next = handler;
        return handler;
    }

    public virtual void Handle(Request request)
    {
        _next?.Handle(request);
    }
}

public class AuthenticationHandler : BaseHandler
{
    public override void Handle(Request request)
    {
        if (request.User == null || !request.User.IsAuthenticated)
        {
            Console.WriteLine("Request rejected: not authenticated");
            return;
        }

        base.Handle(request);
    }
}

public class AuthorizationHandler : BaseHandler
{
    public override void Handle(Request request)
    {
        if (request.User == null || !request.User.IsAdmin)
        {
            Console.WriteLine("Request rejected: not authorized");
            return;
        }

        base.Handle(request);
    }
}

public class FinalHandler : BaseHandler
{
    public override void Handle(Request request)
    {
        Console.WriteLine("Request processed");
    }
}

public class Program
{
    public static void Main()
    {
        var auth = new AuthenticationHandler();
        var admin = new AuthorizationHandler();
        var finalHandler = new FinalHandler();

        auth.SetNext(admin).SetNext(finalHandler);

        auth.Handle(new Request
        {
            User = new User { IsAuthenticated = true, IsAdmin = true }
        });
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class BaseHandler:
    def __init__(self) -> None:
        self.next_handler = None

    def set_next(self, handler: "BaseHandler") -> "BaseHandler":
        self.next_handler = handler
        return handler

    def handle(self, request: dict) -> None:
        if self.next_handler:
            self.next_handler.handle(request)


class AuthenticationHandler(BaseHandler):
    def handle(self, request: dict) -> None:
        user = request.get("user")

        if not user or not user.get("is_authenticated"):
            print("Request rejected: not authenticated")
            return

        super().handle(request)


class AuthorizationHandler(BaseHandler):
    def handle(self, request: dict) -> None:
        user = request.get("user")

        if not user or not user.get("is_admin"):
            print("Request rejected: not authorized")
            return

        super().handle(request)


class FinalHandler(BaseHandler):
    def handle(self, request: dict) -> None:
        print("Request processed")


auth = AuthenticationHandler()
admin = AuthorizationHandler()
final_handler = FinalHandler()

auth.set_next(admin).set_next(final_handler)

auth.handle({
    "user": {
        "is_authenticated": True,
        "is_admin": True,
    }
})`,
    },
  ],
};
