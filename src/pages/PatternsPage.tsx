import { patterns, groupPatternsByCategory } from "../content/patterns";
import { PatternCard } from "../features/patterns/PatternCard";

function Section({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: typeof patterns;
}) {
  if (items.length === 0) return null;

  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold text-slate-950'>{title}</h2>
        <p className='mt-1 text-slate-600'>{description}</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {items.map((pattern) => (
          <PatternCard key={pattern.slug} pattern={pattern} />
        ))}
      </div>
    </section>
  );
}

export function PatternsPage() {
  const grouped = groupPatternsByCategory(patterns);

  return (
    <div className='mx-auto max-w-6xl space-y-12 px-4 py-10'>
      <header className='max-w-3xl space-y-4'>
        <h1 className='text-4xl font-bold text-slate-950'>Design Patterns</h1>
        <p className='text-lg text-slate-700'>
          A practical, categorized guide to design patterns used in real-world
          systems—from foundational concepts to advanced architecture.
        </p>
      </header>

      <Section
        title='🟢 Must Know'
        description='Core patterns every developer should understand early in their career.'
        items={grouped["must-know"]}
      />

      <Section
        title='🔵 Good to Know'
        description='Important patterns that deepen your understanding as systems grow.'
        items={grouped["good-to-know"]}
      />

      <Section
        title='🟡 De-emphasize'
        description='Patterns that are less commonly needed in modern systems.'
        items={grouped["de-emphasize"]}
      />
    </div>
  );
}
