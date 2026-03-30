import type { Pattern } from "../../types/pattern";

export const antiCorruptionLayerPattern: Pattern = {
  slug: "anti-corruption-layer",
  name: "Anti-Corruption Layer",
  category: "good-to-know",
  careerLevel: "senior",
  difficulty: "advanced",

  summary:
    "Anti-Corruption Layer protects your model from another system's concepts, contracts, and inconsistencies by translating between the two boundaries.",
  keyTakeaway:
    "Use Anti-Corruption Layer when integrating with an external or legacy system whose model should not leak directly into your own application design.",
  problem:
    "When integrating with another system, especially a legacy or third-party one, its concepts and data shapes can spread into your codebase. Over time this contaminates your own model and makes your system harder to reason about.",
  solution:
    "Create a dedicated translation layer at the boundary that converts external concepts into your own model and prevents foreign assumptions from leaking inward.",

  tags: ["integration", "boundaries", "legacy", "translation", "architecture"],

  whenToUse: [
    "You are integrating with a legacy or external system",
    "The other system's model does not align well with yours",
    "You want to protect your domain language and internal design",
    "The integration boundary is important enough to deserve explicit translation",
  ],

  whenNotToUse: [
    "The systems already align closely enough",
    "A lighter adapter is sufficient for the integration",
    "The extra layer would add overhead without protecting anything meaningful",
  ],

  benefits: [
    "Protects internal models from leaking external concepts",
    "Keeps boundaries explicit",
    "Makes integrations easier to understand and change",
    "Supports long-term maintainability around messy dependencies",
  ],

  tradeoffs: [
    "Adds an additional integration layer",
    "Requires ongoing maintenance as the external system changes",
    "Can feel heavy for small or short-lived integrations",
  ],

  relatedPatterns: ["adapter", "ports-and-adapters", "facade"],
  confusedWith: ["adapter", "facade"],

  examples: [
    {
      title: "Legacy system example",
      body: "A modern order service can translate cryptic legacy ERP fields and codes into clean internal order concepts before the rest of the application sees them.",
    },
    {
      title: "Third-party API example",
      body: "A billing integration can convert a provider's webhook payloads and statuses into application-owned invoice events and state transitions.",
    },
  ],

  codeExamples: [
    {
      title: "TypeScript example",
      language: "ts",
      code: `type LegacyCustomerRecord = {
  CUST_ID: string;
  FULL_NAME: string;
  STATUS_CODE: "A" | "I";
};

type Customer = {
  id: string;
  name: string;
  isActive: boolean;
};

class LegacyCustomerApi {
  getCustomer(): LegacyCustomerRecord {
    return {
      CUST_ID: "123",
      FULL_NAME: "Ada Lovelace",
      STATUS_CODE: "A",
    };
  }
}

class CustomerAcl {
  constructor(private legacyApi: LegacyCustomerApi) {}

  getCustomer(): Customer {
    const record = this.legacyApi.getCustomer();

    return {
      id: record.CUST_ID,
      name: record.FULL_NAME,
      isActive: record.STATUS_CODE === "A",
    };
  }
}

const acl = new CustomerAcl(new LegacyCustomerApi());
console.log(acl.getCustomer());`,
    },
    {
      title: "C# example",
      language: "cs",
      code: `using System;

public class LegacyCustomerRecord
{
    public string CUST_ID { get; set; } = "";
    public string FULL_NAME { get; set; } = "";
    public string STATUS_CODE { get; set; } = "";
}

public class Customer
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public bool IsActive { get; set; }
}

public class LegacyCustomerApi
{
    public LegacyCustomerRecord GetCustomer()
    {
        return new LegacyCustomerRecord
        {
            CUST_ID = "123",
            FULL_NAME = "Ada Lovelace",
            STATUS_CODE = "A"
        };
    }
}

public class CustomerAcl
{
    private readonly LegacyCustomerApi _legacyApi;

    public CustomerAcl(LegacyCustomerApi legacyApi)
    {
        _legacyApi = legacyApi;
    }

    public Customer GetCustomer()
    {
        var record = _legacyApi.GetCustomer();

        return new Customer
        {
            Id = record.CUST_ID,
            Name = record.FULL_NAME,
            IsActive = record.STATUS_CODE == "A"
        };
    }
}

public class Program
{
    public static void Main()
    {
        var acl = new CustomerAcl(new LegacyCustomerApi());
        var customer = acl.GetCustomer();

        Console.WriteLine($"{customer.Id} {customer.Name} {customer.IsActive}");
    }
}`,
    },
    {
      title: "Python example",
      language: "py",
      code: `class LegacyCustomerApi:
    def get_customer(self) -> dict:
        return {
            "CUST_ID": "123",
            "FULL_NAME": "Ada Lovelace",
            "STATUS_CODE": "A",
        }


class CustomerAcl:
    def __init__(self, legacy_api: LegacyCustomerApi) -> None:
        self.legacy_api = legacy_api

    def get_customer(self) -> dict:
        record = self.legacy_api.get_customer()

        return {
            "id": record["CUST_ID"],
            "name": record["FULL_NAME"],
            "is_active": record["STATUS_CODE"] == "A",
        }


acl = CustomerAcl(LegacyCustomerApi())
print(acl.get_customer())`,
    },
  ],
};
