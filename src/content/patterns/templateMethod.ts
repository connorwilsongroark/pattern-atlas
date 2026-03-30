import type { Pattern } from "../../types/pattern";

export const templateMethodPattern: Pattern = {
  slug: "template-method",
  name: "Template Method",
  category: "must-know",
  careerLevel: "early",
  difficulty: "intermediate",

  summary:
    "Template Method defines the overall structure of an algorithm in a base class while allowing subclasses to customize specific steps.",
  keyTakeaway:
    "Use Template Method when multiple workflows share the same sequence of steps but differ in some of the details.",
  problem:
    "You may have several processes that follow the same broad flow, but each implementation varies slightly. Repeating that flow in multiple places leads to duplication and inconsistency.",
  solution:
    "Move the shared algorithm structure into a base class method and delegate the variable parts to overridable steps implemented by subclasses.",

  tags: ["inheritance", "workflow", "algorithm", "reuse", "base-class"],

  whenToUse: [
    "Several implementations follow the same overall process",
    "You want to enforce a consistent sequence of steps",
    "Only specific parts of the workflow should vary",
    "You want to reduce duplication across related classes",
  ],

  whenNotToUse: [
    "Composition would be clearer than inheritance",
    "The shared workflow is too small to justify a base class",
    "Subclasses would need to override too many steps to be practical",
  ],

  benefits: [
    "Reduces duplication in similar workflows",
    "Enforces a consistent process structure",
    "Makes variation points explicit",
    "Keeps shared behavior centralized",
  ],

  tradeoffs: [
    "Relies on inheritance, which can become rigid",
    "Can become hard to follow if there are too many hooks",
    "Subclasses may be tightly coupled to base class behavior",
  ],

  relatedPatterns: ["strategy", "factory-method", "command"],
  confusedWith: ["strategy"],

  examples: [
    {
      title: "Backend example",
      body: "An import pipeline may always validate, transform, and save data, but different subclasses can provide their own validation and transformation logic.",
    },
    {
      title: "UI example",
      body: "A page component may define a common loading and rendering flow while allowing subclasses to customize how the content is fetched or displayed.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `abstract class DataImporter {
  run(): void {
    this.load();
    this.validate();
    this.save();
  }

  protected abstract load(): void;
  protected abstract validate(): void;

  protected save(): void {
    console.log("Saving data");
  }
}

class CsvImporter extends DataImporter {
  protected load(): void {
    console.log("Loading CSV file");
  }

  protected validate(): void {
    console.log("Validating CSV rows");
  }
}

const importer = new CsvImporter();
importer.run();`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public abstract class DataImporter
{
    public void Run()
    {
        Load();
        Validate();
        Save();
    }

    protected abstract void Load();
    protected abstract void Validate();

    protected virtual void Save()
    {
        Console.WriteLine("Saving data");
    }
}

public class CsvImporter : DataImporter
{
    protected override void Load()
    {
        Console.WriteLine("Loading CSV file");
    }

    protected override void Validate()
    {
        Console.WriteLine("Validating CSV rows");
    }
}

public class Program
{
    public static void Main()
    {
        var importer = new CsvImporter();
        importer.Run();
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `from abc import ABC, abstractmethod

class DataImporter(ABC):
    def run(self) -> None:
        self.load()
        self.validate()
        self.save()

    @abstractmethod
    def load(self) -> None:
        pass

    @abstractmethod
    def validate(self) -> None:
        pass

    def save(self) -> None:
        print("Saving data")


class CsvImporter(DataImporter):
    def load(self) -> None:
        print("Loading CSV file")

    def validate(self) -> None:
        print("Validating CSV rows")


importer = CsvImporter()
importer.run()`,
    },
  ],
};
