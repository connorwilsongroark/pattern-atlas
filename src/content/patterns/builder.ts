import type { Pattern } from "../../types/pattern";

export const builderPattern: Pattern = {
  slug: "builder",
  name: "Builder",
  category: "good-to-know",
  careerLevel: "early",
  difficulty: "intermediate",

  summary:
    "Builder constructs complex objects step by step, making creation clearer when many optional parts or combinations exist.",

  keyTakeaway:
    "Use Builder when object construction is getting noisy, hard to read, or full of optional combinations.",

  problem:
    "Some objects require many optional fields, configuration options, or staged construction steps. Large constructors and object literals can become unreadable and error-prone.",

  solution:
    "Provide a builder that guides construction step by step and then produces the final object once configuration is complete.",

  tags: ["construction", "configuration", "object-creation", "fluent-api"],

  whenToUse: [
    "Object construction has many optional parts",
    "You want more readable setup code",
    "You want staged or validated construction",
    "You want to avoid giant constructors",
  ],

  whenNotToUse: [
    "The object is simple and easy to construct directly",
    "A plain object literal is clearer",
    "The builder adds more ceremony than clarity",
  ],

  benefits: [
    "Improves readability of complex construction",
    "Supports optional configuration cleanly",
    "Can enforce valid build steps",
    "Reduces constructor overload",
  ],

  tradeoffs: [
    "Adds another abstraction",
    "Can be excessive for simple objects",
    "Mutable builder state requires care",
  ],

  relatedPatterns: ["factory-method", "abstract-factory"],
  confusedWith: ["factory-method"],

  examples: [
    {
      title: "UI example",
      body: "A chart configuration object with many optional settings can be built fluently instead of passed as a giant constructor call.",
    },
    {
      title: "Testing example",
      body: "Builders are useful in tests for creating sample data with readable defaults and small overrides.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type User = {
  email: string;
  displayName?: string;
  isAdmin: boolean;
};

class UserBuilder {
  private user: User = {
    email: "",
    isAdmin: false,
  };

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withDisplayName(displayName: string): this {
    this.user.displayName = displayName;
    return this;
  }

  asAdmin(): this {
    this.user.isAdmin = true;
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}

const user = new UserBuilder()
  .withEmail("person@example.com")
  .withDisplayName("Connor")
  .asAdmin()
  .build();`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class User
{
    public string Email { get; set; } = "";
    public string? DisplayName { get; set; }
    public bool IsAdmin { get; set; }
}

public class UserBuilder
{
    private readonly User _user = new User();

    public UserBuilder WithEmail(string email)
    {
        _user.Email = email;
        return this;
    }

    public UserBuilder WithDisplayName(string displayName)
    {
        _user.DisplayName = displayName;
        return this;
    }

    public UserBuilder AsAdmin()
    {
        _user.IsAdmin = true;
        return this;
    }

    public User Build()
    {
        return _user;
    }
}

class Program
{
    static void Main()
    {
        var user = new UserBuilder()
            .WithEmail("person@example.com")
            .WithDisplayName("Connor")
            .AsAdmin()
            .Build();

        Console.WriteLine(user.Email);
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class User:
    def __init__(self, email="", display_name=None, is_admin=False):
        self.email = email
        self.display_name = display_name
        self.is_admin = is_admin


class UserBuilder:
    def __init__(self):
        self._user = User()

    def with_email(self, email: str):
        self._user.email = email
        return self

    def with_display_name(self, display_name: str):
        self._user.display_name = display_name
        return self

    def as_admin(self):
        self._user.is_admin = True
        return self

    def build(self) -> User:
        return self._user


user = (
    UserBuilder()
    .with_email("person@example.com")
    .with_display_name("Connor")
    .as_admin()
    .build()
)

print(user.email)`,
    },
  ],
};
