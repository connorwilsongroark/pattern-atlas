import type { Pattern } from "../../types/pattern";

export const singletonPattern: Pattern = {
  slug: "singleton",
  name: "Singleton",
  category: "de-emphasize",
  careerLevel: "early",
  difficulty: "beginner",

  summary:
    "Singleton ensures that only one instance of a class exists and provides a global way to access it.",
  keyTakeaway:
    "Use Singleton sparingly, because while it can control shared access, it often introduces hidden global state and tighter coupling.",
  problem:
    "Sometimes a system appears to need a single shared instance of something, such as configuration, logging, or a cache, and developers want to prevent multiple instances from being created accidentally.",
  solution:
    "Restrict construction and expose a single shared instance through a controlled access point.",

  tags: ["global-state", "shared-instance", "lifecycle", "access", "creation"],

  whenToUse: [
    "You truly need exactly one shared instance in process memory",
    "You want to centralize lifecycle control for a shared object",
    "The dependency is effectively application-wide and stable",
  ],

  whenNotToUse: [
    "Dependency injection would express the dependency more clearly",
    "The shared instance introduces hidden coupling",
    "Tests need different instances or isolated state",
    "The class is only being made a singleton for convenience",
  ],

  benefits: [
    "Guarantees a single shared instance",
    "Provides a simple access point",
    "Can centralize lifecycle management",
  ],

  tradeoffs: [
    "Introduces global state",
    "Makes testing and isolation harder",
    "Can hide dependencies",
    "Often becomes overused when DI would be cleaner",
  ],

  relatedPatterns: ["dependency-injection", "factory-method"],
  confusedWith: ["static-class", "service-locator"],

  examples: [
    {
      title: "Configuration example",
      body: "A legacy application may expose a single configuration manager instance globally.",
    },
    {
      title: "Logging example",
      body: "A simple app may use one shared logger instance, though dependency injection is often the better design in larger systems.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class AppConfig {
  private static instance: AppConfig;

  private constructor(public readonly appName: string) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig("My App");
    }

    return AppConfig.instance;
  }
}

const configA = AppConfig.getInstance();
const configB = AppConfig.getInstance();

console.log(configA === configB);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public sealed class AppConfig
{
    private static readonly AppConfig _instance = new AppConfig();

    public string AppName { get; } = "My App";

    private AppConfig() { }

    public static AppConfig Instance => _instance;
}

public class Program
{
    public static void Main()
    {
        var configA = AppConfig.Instance;
        var configB = AppConfig.Instance;

        Console.WriteLine(configA == configB);
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class AppConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.app_name = "My App"
        return cls._instance


config_a = AppConfig()
config_b = AppConfig()

print(config_a is config_b)`,
    },
  ],
};
