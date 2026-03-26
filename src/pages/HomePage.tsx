import { Link } from "react-router-dom";
import { patterns } from "../content/patterns";
import { PatternCard } from "../features/patterns/PatternCard";

const featuredSlugs = ["strategy", "adapter", "repository", "cqrs"];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className='max-w-3xl space-y-3'>
      {eyebrow && (
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
          {eyebrow}
        </p>
      )}
      <h2 className='text-3xl font-bold tracking-tight text-slate-950'>
        {title}
      </h2>
      {description && (
        <p className='text-lg leading-8 text-slate-700'>{description}</p>
      )}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  to,
  cta,
}: {
  title: string;
  description: string;
  to: string;
  cta: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      <h3 className='text-xl font-semibold text-slate-950'>{title}</h3>
      <p className='mt-3 text-slate-700'>{description}</p>
      <Link
        to={to}
        className='mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800'
      >
        {cta}
      </Link>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  tone,
}: {
  title: string;
  description: string;
  tone: "green" | "blue" | "yellow";
}) {
  const toneClass =
    tone === "green"
      ? "bg-green-50 border-green-200"
      : tone === "blue"
        ? "bg-blue-50 border-blue-200"
        : "bg-yellow-50 border-yellow-200";

  return (
    <div className={`rounded-2xl border p-6 ${toneClass}`}>
      <h3 className='text-xl font-semibold text-slate-950'>{title}</h3>
      <p className='mt-3 text-slate-700'>{description}</p>
    </div>
  );
}

function LearningStep({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      <h3 className='text-xl font-semibold text-slate-950'>{title}</h3>
      <p className='mt-3 text-slate-700'>{description}</p>
    </div>
  );
}

export function HomePage() {
  const featuredPatterns = patterns.filter((pattern) =>
    featuredSlugs.includes(pattern.slug),
  );

  return (
    <div className='bg-slate-50 text-slate-900'>
      <section className='border-b border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 py-20'>
          <div className='max-w-4xl space-y-8'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Practical software architecture
            </p>

            <div className='space-y-5'>
              <h1 className='text-5xl font-bold tracking-tight text-slate-950 md:text-6xl'>
                Learn design patterns the way developers actually use them.
              </h1>

              <p className='max-w-3xl text-xl leading-8 text-slate-700'>
                Pattern Atlas is a practical reference for software design
                patterns, with categorized explanations, side-by-side
                comparisons, and interactive quizzes to help the ideas stick.
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              <Link
                to='/patterns'
                className='rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800'
              >
                Browse patterns
              </Link>
              <Link
                to='/quiz'
                className='rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50'
              >
                Take the quiz
              </Link>
            </div>

            <div className='grid gap-4 pt-4 md:grid-cols-3'>
              <div className='rounded-xl bg-slate-100 p-4'>
                <p className='text-2xl font-bold text-slate-950'>
                  {patterns.length}
                </p>
                <p className='mt-1 text-sm text-slate-600'>
                  patterns in the library
                </p>
              </div>
              <div className='rounded-xl bg-slate-100 p-4'>
                <p className='text-2xl font-bold text-slate-950'>Compare</p>
                <p className='mt-1 text-sm text-slate-600'>
                  similar patterns side by side
                </p>
              </div>
              <div className='rounded-xl bg-slate-100 p-4'>
                <p className='text-2xl font-bold text-slate-950'>Quiz</p>
                <p className='mt-1 text-sm text-slate-600'>
                  practice pattern recognition
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-16'>
        <SectionHeading
          eyebrow='Use the site'
          title='Three ways to learn'
          description='Whether you want to study, compare, or test yourself, the site should help you move quickly.'
        />

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          <FeatureCard
            title='Browse the library'
            description='Explore patterns by category, difficulty, and career stage. Search for patterns by concept, not just by name.'
            to='/patterns'
            cta='Explore patterns'
          />
          <FeatureCard
            title='Compare similar patterns'
            description='See patterns side by side so the differences between them become clearer and more memorable.'
            to='/compare/strategy/state'
            cta='Try a comparison'
          />
          <FeatureCard
            title='Practice with quizzes'
            description='Test your understanding with scenario-based questions that emphasize recognition over memorization.'
            to='/quiz'
            cta='Start quiz'
          />
        </div>
      </section>

      <section className='border-y border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 py-16'>
          <SectionHeading
            eyebrow='Start here'
            title='Featured patterns'
            description='A strong starting point for developers learning to think in reusable design ideas.'
          />

          <div className='mt-8 grid gap-4 md:grid-cols-2'>
            {featuredPatterns.map((pattern) => (
              <PatternCard key={pattern.slug} pattern={pattern} />
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-16'>
        <SectionHeading
          eyebrow='Categories'
          title='Organized by practical usefulness'
          description='Not every pattern deserves the same amount of attention early on.'
        />

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          <CategoryCard
            title='🟢 Must Know'
            description='Core patterns developers should understand early because they show up often in real systems.'
            tone='green'
          />
          <CategoryCard
            title='🔵 Good to Know'
            description='Useful patterns that deepen your understanding as systems become more complex and architectural.'
            tone='blue'
          />
          <CategoryCard
            title='🟡 De-emphasize'
            description='Patterns worth recognizing, but usually not the first place to spend your study time.'
            tone='yellow'
          />
        </div>
      </section>

      <section className='border-y border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 py-16'>
          <SectionHeading
            eyebrow='Learning path'
            title='Grow from fundamentals to architecture'
            description='The library is organized to help you study patterns in a progression that mirrors real software development.'
          />

          <div className='mt-8 grid gap-4 md:grid-cols-3'>
            <LearningStep
              title='Early career'
              description='Focus on foundations like Strategy, Adapter, Facade, Factory Method, and Dependency Injection.'
            />
            <LearningStep
              title='Mid-level'
              description='Move into patterns that organize workflows and compose behavior, like Service Layer, Decorator, State, and Repository.'
            />
            <LearningStep
              title='Senior'
              description='Study architectural patterns like CQRS, Domain Events, Unit of Work, Outbox Pattern, and Circuit Breaker.'
            />
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-16'>
        <div className='rounded-3xl bg-slate-900 px-6 py-12 text-white md:px-10'>
          <div className='max-w-3xl space-y-5'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-300'>
              Ready to dig in?
            </p>
            <h2 className='text-4xl font-bold tracking-tight'>
              Start learning patterns in a way that actually sticks.
            </h2>
            <p className='text-lg leading-8 text-slate-300'>
              Browse the library, compare confusing patterns, or take the quiz
              to practice recognition through realistic scenarios.
            </p>

            <div className='flex flex-wrap gap-3 pt-2'>
              <Link
                to='/patterns'
                className='rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100'
              >
                Browse patterns
              </Link>
              <Link
                to='/quiz'
                className='rounded-lg border border-slate-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800'
              >
                Take the quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
