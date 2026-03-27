import { useState, useEffect } from "react";

type CodeExample = {
  title: string;
  language: string;
  code: string;
};

type CodeTabsProps = {
  examples: CodeExample[];
  patternSlug?: string; // optional for reset behavior
};

function formatLanguage(lang: string) {
  switch (lang) {
    case "ts":
      return "TypeScript";
    case "js":
      return "JavaScript";
    case "cs":
    case "csharp":
      return "C#";
    case "py":
      return "Python";
    default:
      return lang.toUpperCase();
  }
}

export function CodeTabs({ examples, patternSlug }: CodeTabsProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  // Reset tab when switching patterns
  useEffect(() => {
    setSelectedTab(0);
  }, [patternSlug]);

  if (!examples || examples.length === 0) return null;

  const activeExample = examples[selectedTab];

  return (
    <div className='space-y-4'>
      {/* Tabs */}
      <div className='flex flex-wrap gap-2 border-b border-[var(--color-border)]'>
        {examples.map((example, index) => (
          <button
            key={example.title}
            onClick={() => setSelectedTab(index)}
            className={`px-3 py-2 text-sm font-medium transition
              ${
                selectedTab === index
                  ? "border-b-2 border-[var(--color-brand)] text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
          >
            {formatLanguage(example.language)}
          </button>
        ))}
      </div>

      {/* Code */}
      <div className='space-y-2'>
        <h3 className='font-semibold text-[var(--color-text)]'>
          {activeExample.title}
        </h3>

        <pre className='overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100'>
          <code>{activeExample.code}</code>
        </pre>
      </div>
    </div>
  );
}
