import { useEffect, useState } from "react";

type CodeExample = {
  title: string;
  language: string;
  code: string;
};

type CodeTabsProps = {
  examples: CodeExample[];
  patternSlug?: string;
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

  useEffect(() => {
    setSelectedTab(0);
  }, [patternSlug]);

  if (!examples || examples.length === 0) return null;

  const activeExample = examples[selectedTab];

  return (
    <div className='space-y-4'>
      <div
        className='overflow-x-auto border-b border-[var(--color-border)]'
        role='tablist'
        aria-label='Code examples'
      >
        <div className='flex min-w-max gap-2'>
          {examples.map((example, index) => {
            const isSelected = selectedTab === index;

            return (
              <button
                key={example.title}
                type='button'
                role='tab'
                aria-selected={isSelected}
                aria-controls={`code-panel-${index}`}
                id={`code-tab-${index}`}
                onClick={() => setSelectedTab(index)}
                className={[
                  "whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition",
                  isSelected
                    ? "border-[var(--color-brand)] text-[var(--color-text)]"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                ].join(" ")}
              >
                {formatLanguage(example.language)}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`code-panel-${selectedTab}`}
        role='tabpanel'
        aria-labelledby={`code-tab-${selectedTab}`}
        className='space-y-2'
      >
        <h3 className='text-sm font-semibold text-[var(--color-text)] sm:text-base'>
          {activeExample.title}
        </h3>

        <pre className='overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-slate-100 sm:p-4 sm:text-sm'>
          <code>{activeExample.code}</code>
        </pre>
      </div>
    </div>
  );
}
