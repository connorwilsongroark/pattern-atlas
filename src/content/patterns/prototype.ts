import type { Pattern } from "../../types/pattern";

export const prototypePattern: Pattern = {
  slug: "prototype",
  name: "Prototype",
  category: "de-emphasize",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Prototype creates new objects by cloning an existing instance instead of constructing them from scratch.",
  keyTakeaway:
    "Use Prototype when copying a configured object is simpler or more efficient than recreating it manually.",
  problem:
    "Sometimes object creation is expensive, repetitive, or requires a large amount of default configuration. Reconstructing the same setup repeatedly can be awkward and error-prone.",
  solution:
    "Create a prototype object that already contains the desired defaults and clone it when a new similar instance is needed.",

  tags: ["cloning", "copying", "defaults", "creation", "configuration"],

  whenToUse: [
    "Object setup is expensive or repetitive",
    "You want to duplicate configured objects efficiently",
    "The main need is copying an existing instance with slight changes",
  ],

  whenNotToUse: [
    "Normal construction is clearer",
    "Cloning would be confusing because of deep vs shallow copy concerns",
    "The objects are simple enough that duplication adds little value",
  ],

  benefits: [
    "Can simplify repeated object creation",
    "Encourages reuse of sensible defaults",
    "Can be faster than rebuilding complex setup repeatedly",
  ],

  tradeoffs: [
    "Clone behavior can be tricky",
    "Deep copies may be expensive or error-prone",
    "The pattern is less common in everyday application code",
  ],

  relatedPatterns: ["builder", "factory-method"],
  confusedWith: ["builder"],

  examples: [
    {
      title: "UI example",
      body: "A drawing app may duplicate a configured shape style instead of rebuilding every property from scratch.",
    },
    {
      title: "Document example",
      body: "A template document can be cloned and then customized for a new customer or project.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class ReportConfig {
  constructor(
    public title: string,
    public includeCharts: boolean,
  ) {}

  clone(): ReportConfig {
    return new ReportConfig(this.title, this.includeCharts);
  }
}

const monthlyTemplate = new ReportConfig("Monthly Report", true);
const customReport = monthlyTemplate.clone();
customReport.title = "Custom Report";

console.log(monthlyTemplate.title);
console.log(customReport.title);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class ReportConfig
{
    public string Title { get; set; }
    public bool IncludeCharts { get; set; }

    public ReportConfig(string title, bool includeCharts)
    {
        Title = title;
        IncludeCharts = includeCharts;
    }

    public ReportConfig Clone()
    {
        return new ReportConfig(Title, IncludeCharts);
    }
}

public class Program
{
    public static void Main()
    {
        var monthlyTemplate = new ReportConfig("Monthly Report", true);
        var customReport = monthlyTemplate.Clone();
        customReport.Title = "Custom Report";

        Console.WriteLine(monthlyTemplate.Title);
        Console.WriteLine(customReport.Title);
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class ReportConfig:
    def __init__(self, title: str, include_charts: bool) -> None:
        self.title = title
        self.include_charts = include_charts

    def clone(self) -> "ReportConfig":
        return ReportConfig(self.title, self.include_charts)


monthly_template = ReportConfig("Monthly Report", True)
custom_report = monthly_template.clone()
custom_report.title = "Custom Report"

print(monthly_template.title)
print(custom_report.title)`,
    },
  ],
};
