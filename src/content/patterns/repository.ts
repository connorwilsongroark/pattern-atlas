import type { Pattern } from "../../types/pattern";

export const repositoryPattern: Pattern = {
  slug: "repository",
  name: "Repository",
  category: "must-know",
  careerLevel: "mid",
  difficulty: "intermediate",

  summary:
    "Repository provides a collection-like interface for working with domain data while separating business logic from persistence details.",

  keyTakeaway:
    "Use Repository when you want your application to depend on a domain-friendly data access contract instead of raw database queries or ORM details everywhere.",

  problem:
    "As an application grows, data access logic often gets scattered across controllers, services, and components. That makes persistence concerns leak into business logic and makes testing harder.",

  solution:
    "Introduce repository abstractions that encapsulate how domain data is loaded and saved, so application code interacts with a cleaner contract focused on the domain.",

  tags: ["persistence", "data-access", "abstraction", "domain", "testing"],

  whenToUse: [
    "You want to isolate persistence concerns from business logic",
    "You want a cleaner contract for loading and saving domain entities",
    "You want easier unit testing around data access boundaries",
    "You have repeated data access logic that should be centralized",
  ],

  whenNotToUse: [
    "The application is very small and direct data access is clearer",
    "The repository would only wrap trivial ORM calls with no added value",
    "You are creating abstractions that do not match meaningful domain boundaries",
  ],

  benefits: [
    "Centralizes data access logic",
    "Keeps persistence details out of business workflows",
    "Improves testability",
    "Creates cleaner application boundaries",
  ],

  tradeoffs: [
    "Can become a thin wrapper if designed poorly",
    "Adds another abstraction layer",
    "Needs discipline to stay domain-focused rather than query-focused",
  ],

  relatedPatterns: ["unit-of-work", "service-layer", "dependency-injection"],
  confusedWith: ["unit-of-work"],

  examples: [
    {
      title: "Backend example",
      body: "A UserRepository exposes methods like getById and save instead of scattering SQL or ORM queries throughout controllers and services.",
    },
    {
      title: "Testing example",
      body: "A test can swap a database-backed repository for an in-memory one without changing the service using it.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type User = {
  id: string;
  email: string;
};

type UserRepository = {
  getById(id: string): User | undefined;
  save(user: User): void;
};

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  getById(id: string): User | undefined {
    return this.users.get(id);
  }

  save(user: User): void {
    this.users.set(user.id, user);
  }
}

class UserService {
  constructor(private repository: UserRepository) {}

  register(user: User): void {
    this.repository.save(user);
  }
}`,
    },

    {
      title: "C# example",
      language: "cs",
      code: `using System;
using System.Collections.Generic;

public class User
{
    public string Id { get; set; } = "";
    public string Email { get; set; } = "";
}

public interface IUserRepository
{
    User? GetById(string id);
    void Save(User user);
}

public class InMemoryUserRepository : IUserRepository
{
    private readonly Dictionary<string, User> _users = new();

    public User? GetById(string id)
    {
        return _users.ContainsKey(id) ? _users[id] : null;
    }

    public void Save(User user)
    {
        _users[user.Id] = user;
    }
}

public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public void Register(User user)
    {
        _repository.Save(user);
    }
}

// Usage
class Program
{
    static void Main()
    {
        var repo = new InMemoryUserRepository();
        var service = new UserService(repo);

        service.Register(new User { Id = "u_123", Email = "person@example.com" });

        var user = repo.GetById("u_123");
        Console.WriteLine(user?.Email);
    }
}`,
    },

    {
      title: "Python example",
      language: "py",
      code: `class User:
    def __init__(self, user_id: str, email: str):
        self.id = user_id
        self.email = email


class UserRepository:
    def get_by_id(self, user_id: str):
        raise NotImplementedError()

    def save(self, user: User):
        raise NotImplementedError()


class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self.users = {}

    def get_by_id(self, user_id: str):
        return self.users.get(user_id)

    def save(self, user: User):
        self.users[user.id] = user


class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def register(self, user: User):
        self.repository.save(user)


# Usage
repo = InMemoryUserRepository()
service = UserService(repo)

service.register(User("u_123", "person@example.com"))

user = repo.get_by_id("u_123")
print(user.email if user else None)`,
    },
  ],
};
