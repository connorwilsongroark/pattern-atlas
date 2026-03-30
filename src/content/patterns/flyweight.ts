import type { Pattern } from "../../types/pattern";

export const flyweightPattern: Pattern = {
  slug: "flyweight",
  name: "Flyweight",
  category: "de-emphasize",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Flyweight reduces memory usage by sharing common intrinsic state between many similar objects instead of storing duplicate data repeatedly.",
  keyTakeaway:
    "Use Flyweight when a very large number of similar objects are consuming too much memory and their shared state can be separated from their unique state.",
  problem:
    "Systems with huge numbers of similar objects can waste memory by storing the same repeated data inside every instance.",
  solution:
    "Move shared intrinsic state into reusable flyweight objects and keep only the unique extrinsic state outside the shared instances.",

  tags: ["memory", "optimization", "sharing", "performance", "state"],

  whenToUse: [
    "You have very large numbers of similar objects",
    "Memory pressure is a real concern",
    "Shared and unique state can be clearly separated",
    "The added complexity is justified by performance needs",
  ],

  whenNotToUse: [
    "The system does not have meaningful memory pressure",
    "The distinction between shared and unique state is unclear",
    "Readability is more important than the optimization",
  ],

  benefits: [
    "Can greatly reduce memory usage",
    "Encourages explicit handling of shared data",
    "Useful in specialized high-scale scenarios",
  ],

  tradeoffs: [
    "Adds conceptual complexity",
    "Makes object usage less straightforward",
    "Rarely needed in ordinary application code",
  ],

  relatedPatterns: ["prototype", "singleton"],
  confusedWith: ["singleton", "cache"],

  examples: [
    {
      title: "Game example",
      body: "A game can share sprite or terrain metadata across thousands of tiles while storing only position separately.",
    },
    {
      title: "Text rendering example",
      body: "A document editor can share character glyph data while storing only each character's location and formatting context externally.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `class TreeType {
  constructor(
    public name: string,
    public color: string,
  ) {}
}

class TreeFactory {
  private static types = new Map<string, TreeType>();

  static getTreeType(name: string, color: string): TreeType {
    const key = \`\${name}:\${color}\`;

    if (!this.types.has(key)) {
      this.types.set(key, new TreeType(name, color));
    }

    return this.types.get(key)!;
  }
}

type Tree = {
  x: number;
  y: number;
  type: TreeType;
};

const forest: Tree[] = [
  { x: 1, y: 2, type: TreeFactory.getTreeType("Oak", "Green") },
  { x: 5, y: 8, type: TreeFactory.getTreeType("Oak", "Green") },
];

console.log(forest[0].type === forest[1].type);`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public class TreeType
{
    public string Name { get; }
    public string Color { get; }

    public TreeType(string name, string color)
    {
        Name = name;
        Color = color;
    }
}

public static class TreeFactory
{
    private static readonly Dictionary<string, TreeType> Types = new();

    public static TreeType GetTreeType(string name, string color)
    {
        var key = $"{name}:{color}";

        if (!Types.ContainsKey(key))
        {
            Types[key] = new TreeType(name, color);
        }

        return Types[key];
    }
}

public class Tree
{
    public int X { get; set; }
    public int Y { get; set; }
    public TreeType Type { get; set; } = null!;
}

public class Program
{
    public static void Main()
    {
        var treeA = new Tree { X = 1, Y = 2, Type = TreeFactory.GetTreeType("Oak", "Green") };
        var treeB = new Tree { X = 5, Y = 8, Type = TreeFactory.GetTreeType("Oak", "Green") };

        Console.WriteLine(object.ReferenceEquals(treeA.Type, treeB.Type));
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class TreeType:
    def __init__(self, name: str, color: str) -> None:
        self.name = name
        self.color = color


class TreeFactory:
    _types: dict[str, TreeType] = {}

    @classmethod
    def get_tree_type(cls, name: str, color: str) -> TreeType:
        key = f"{name}:{color}"

        if key not in cls._types:
            cls._types[key] = TreeType(name, color)

        return cls._types[key]


forest = [
    {"x": 1, "y": 2, "type": TreeFactory.get_tree_type("Oak", "Green")},
    {"x": 5, "y": 8, "type": TreeFactory.get_tree_type("Oak", "Green")},
]

print(forest[0]["type"] is forest[1]["type"])`,
    },
  ],
};
