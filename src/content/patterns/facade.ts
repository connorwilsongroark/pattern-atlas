import type { Pattern } from "../../types/pattern";

export const facadePattern: Pattern = {
  slug: "facade",
  name: "Facade",
  category: "must-know",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Facade provides a simpler interface over a more complex subsystem, making common use cases easier to work with.",

  keyTakeaway:
    "Use Facade when a system or library is too complex for most callers and you want to expose a cleaner entry point.",

  problem:
    "Some subsystems are powerful but awkward to use directly because they require callers to understand too many moving parts, steps, or dependencies.",

  solution:
    "Create a facade that wraps the complex subsystem and exposes a simpler, more focused API for the most common workflows.",

  tags: ["simplification", "api-design", "wrapping", "subsystem", "usability"],

  whenToUse: [
    "A subsystem is too complex for most callers",
    "You want to expose a simpler workflow-oriented API",
    "You want to hide internal orchestration details",
    "You want to make a third-party library easier to use",
  ],

  whenNotToUse: [
    "The underlying API is already simple and clear",
    "The facade would hide important control that callers truly need",
    "You are only renaming methods without simplifying anything meaningful",
  ],

  benefits: [
    "Simplifies usage",
    "Reduces coupling to subsystem details",
    "Creates a clearer entry point",
    "Improves readability for common workflows",
  ],

  tradeoffs: [
    "Can become too broad if it tries to cover everything",
    "May hide flexibility advanced callers want",
    "Needs maintenance as the subsystem evolves",
  ],

  relatedPatterns: ["adapter", "service-layer", "decorator"],
  confusedWith: ["adapter", "service-layer"],

  examples: [
    {
      title: "Backend example",
      body: "A DocumentExportFacade can coordinate template loading, rendering, PDF generation, and storage behind one method call.",
    },
    {
      title: "Frontend example",
      body: "A UI helper can wrap several browser APIs and present one easy function for copying formatted content to the clipboard.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class AuthService {
  signIn(): void {
    console.log("Signing in");
  }
}

class ProfileService {
  loadProfile(): void {
    console.log("Loading profile");
  }
}

class DashboardFacade {
  constructor(
    private auth: AuthService,
    private profile: ProfileService,
  ) {}

  initializeDashboard(): void {
    this.auth.signIn();
    this.profile.loadProfile();
  }
}

const dashboard = new DashboardFacade(
  new AuthService(),
  new ProfileService(),
);

dashboard.initializeDashboard();`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class AuthService
{
    public void SignIn()
    {
        Console.WriteLine("Signing in");
    }
}

public class ProfileService
{
    public void LoadProfile()
    {
        Console.WriteLine("Loading profile");
    }
}

public class DashboardFacade
{
    private readonly AuthService _auth;
    private readonly ProfileService _profile;

    public DashboardFacade(AuthService auth, ProfileService profile)
    {
        _auth = auth;
        _profile = profile;
    }

    public void InitializeDashboard()
    {
        _auth.SignIn();
        _profile.LoadProfile();
    }
}

// Usage
class Program
{
    static void Main()
    {
        var dashboard = new DashboardFacade(
            new AuthService(),
            new ProfileService()
        );

        dashboard.InitializeDashboard();
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class AuthService:
    def sign_in(self):
        print("Signing in")


class ProfileService:
    def load_profile(self):
        print("Loading profile")


class DashboardFacade:
    def __init__(self, auth: AuthService, profile: ProfileService):
        self.auth = auth
        self.profile = profile

    def initialize_dashboard(self):
        self.auth.sign_in()
        self.profile.load_profile()


# Usage
dashboard = DashboardFacade(AuthService(), ProfileService())
dashboard.initialize_dashboard()`,
    },
  ],
};
