import type { Pattern } from "../../types/pattern";

export const visitorPattern: Pattern = {
  slug: "visitor",
  name: "Visitor",
  category: "de-emphasize",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Visitor lets you add operations across a set of related types without changing those types directly, but it is often more complex than modern codebases need.",

  keyTakeaway:
    "Know Visitor well enough to recognize it, but reach for it only when operations change more often than the object structure itself.",

  problem:
    "Sometimes you have a stable object structure and need to add many different operations across that structure. Adding those operations directly to each class can become messy.",

  solution:
    "Define a visitor interface with a visit method for each supported type, and let each type accept the visitor so the operation is dispatched appropriately.",

  tags: ["double-dispatch", "tree-structures", "operations", "rare-pattern"],

  whenToUse: [
    "You have a stable set of node or element types",
    "You need to add multiple operations over the same structure",
    "You are working with compilers, parsers, or AST-like models",
  ],

  whenNotToUse: [
    "The structure changes often",
    "The added indirection is too heavy for the problem",
    "A simpler polymorphic design is clearer",
  ],

  benefits: [
    "Keeps external operations separate from the structure",
    "Can work well for stable trees and language tooling",
    "Centralizes related operations",
  ],

  tradeoffs: [
    "Adds complexity",
    "Can be awkward to extend with new element types",
    "Rarely the clearest solution in everyday application code",
  ],

  relatedPatterns: ["interpreter"],
  confusedWith: ["strategy"],

  examples: [
    {
      title: "Compiler example",
      body: "A syntax tree may be visited by one visitor for evaluation, another for printing, and another for validation.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type Visitor = {
  visitCircle(circle: Circle): void;
  visitSquare(square: Square): void;
};

class Circle {
  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

class Square {
  accept(visitor: Visitor): void {
    visitor.visitSquare(this);
  }
}`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;

public interface IVisitor
{
    void VisitCircle(Circle circle);
    void VisitSquare(Square square);
}

public interface IShape
{
    void Accept(IVisitor visitor);
}

public class Circle : IShape
{
    public void Accept(IVisitor visitor)
    {
        visitor.VisitCircle(this);
    }
}

public class Square : IShape
{
    public void Accept(IVisitor visitor)
    {
        visitor.VisitSquare(this);
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class Visitor:
    def visit_circle(self, circle):
        raise NotImplementedError()

    def visit_square(self, square):
        raise NotImplementedError()


class Circle:
    def accept(self, visitor: Visitor):
        visitor.visit_circle(self)


class Square:
    def accept(self, visitor: Visitor):
        visitor.visit_square(self)`,
    },
  ],
};
