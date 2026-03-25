import { getPatternBySlug, patternExists } from "../../content/patterns";
import type { Pattern } from "../../types/pattern";
import { LinkBadge } from "./LinkBadge";
import { Link } from "react-router-dom";

type PatternDetailProps = {
  pattern: Pattern;
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
      <h2 className='mb-3 text-xl font-semibold text-slate-900'>{title}</h2>
      <div className='text-slate-700'>{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='list-disc space-y-2 pl-5'>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700'>
      {children}
    </span>
  );
}

// The page content associated with an individual design pattern. Details all data relevant to the selected design pattern.
export function PatternDetail({ pattern }: PatternDetailProps) {
  return (
    <div className='mx-auto max-w-4xl space-y-6 px-4 py-8'>
      <header className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          <Badge>{pattern.category}</Badge>
          <Badge>{pattern.careerLevel}</Badge>
          <Badge>{pattern.difficulty}</Badge>
        </div>

        <div>
          <h1 className='text-4xl font-bold tracking-tight text-slate-950'>
            {pattern.name}
          </h1>
          <p className='mt-3 text-lg leading-8 text-slate-700'>
            {pattern.summary}
          </p>
        </div>
      </header>

      <SectionCard title='Key takeaway'>
        <p className='text-lg font-medium text-slate-800'>
          {pattern.keyTakeaway}
        </p>
      </SectionCard>

      <SectionCard title='Problem'>
        <p>{pattern.problem}</p>
      </SectionCard>

      <SectionCard title='Solution'>
        <p>{pattern.solution}</p>
      </SectionCard>

      <div className='grid gap-6 md:grid-cols-2'>
        <SectionCard title='When to use'>
          <BulletList items={pattern.whenToUse} />
        </SectionCard>

        <SectionCard title='When not to use'>
          <BulletList items={pattern.whenNotToUse} />
        </SectionCard>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <SectionCard title='Benefits'>
          <BulletList items={pattern.benefits} />
        </SectionCard>

        <SectionCard title='Tradeoffs'>
          <BulletList items={pattern.tradeoffs} />
        </SectionCard>
      </div>

      {pattern.examples && pattern.examples.length > 0 && (
        <SectionCard title='Examples'>
          <div className='space-y-4'>
            {pattern.examples.map((example) => (
              <div key={example.title}>
                <h3 className='font-semibold text-slate-900'>
                  {example.title}
                </h3>
                <p className='mt-1 text-slate-700'>{example.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {pattern.codeExamples && pattern.codeExamples.length > 0 && (
        <SectionCard title='Code examples'>
          <div className='space-y-4'>
            {pattern.codeExamples.map((example) => (
              <div key={example.title} className='space-y-2'>
                <h3 className='font-semibold text-slate-900'>
                  {example.title}
                </h3>
                <pre className='overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100'>
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <div className='grid gap-6 md:grid-cols-2'>
        <SectionCard title='Related patterns'>
          {pattern.relatedPatterns.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {pattern.relatedPatterns.map((related) => (
                <LinkBadge
                  key={related}
                  to={
                    patternExists(related) ? `/patterns/${related}` : undefined
                  }
                >
                  {related}
                </LinkBadge>
              ))}
            </div>
          ) : (
            <p>No related patterns yet.</p>
          )}
        </SectionCard>

        <SectionCard title='Commonly confused with'>
          {pattern.confusedWith && pattern.confusedWith.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {pattern.confusedWith.map((item) => (
                <LinkBadge
                  key={item}
                  to={patternExists(item) ? `/patterns/${item}` : undefined}
                >
                  {item}
                </LinkBadge>
              ))}
            </div>
          ) : (
            <p>No confusion notes yet.</p>
          )}
        </SectionCard>

        <SectionCard title='Compare with'>
          {pattern.relatedPatterns.filter((slug) => patternExists(slug))
            .length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {pattern.relatedPatterns
                .map((slug) => getPatternBySlug(slug))
                .filter((relatedPattern) => relatedPattern !== undefined)
                .map((relatedPattern) => (
                  <Link
                    key={relatedPattern.slug}
                    to={`/compare/${pattern.slug}/${relatedPattern.slug}`}
                    className='inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900'
                  >
                    Compare with {relatedPattern.name}
                  </Link>
                ))}
            </div>
          ) : (
            <p>No comparisons available yet.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
