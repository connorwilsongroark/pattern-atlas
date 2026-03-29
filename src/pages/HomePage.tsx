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
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]'>
          {eyebrow}
        </p>
      )}
      <h2 className='text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl'>
        {title}
      </h2>
      {description && (
        <p className='text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8'>
          {description}
        </p>
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
    <div className='rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6'>
      <h3 className='text-lg font-semibold text-[var(--color-text)] sm:text-xl'>
        {title}
      </h3>
      <p className='mt-3 text-sm text-[var(--color-text-muted)] sm:text-base'>
        {description}
      </p>
      <Link
        to={to}
        className='mt-5 inline-flex rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition hover:opacity-90'
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
      ? "border-[var(--color-success-border)] bg-[var(--color-success-bg)]"
      : tone === "blue"
        ? "border-[var(--color-info-border)] bg-[var(--color-info-bg)]"
        : "border-[var(--color-warning-border)] bg-[var(--color-warning-bg)]";

  const titleClass =
    tone === "green"
      ? "text-[var(--color-success-text)]"
      : tone === "blue"
        ? "text-[var(--color-info-text)]"
        : "text-[var(--color-warning-text)]";

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${toneClass}`}>
      <h3 className={`text-lg font-semibold sm:text-xl ${titleClass}`}>
        {title}
      </h3>
      <p className='mt-3 text-sm text-[var(--color-text-muted)] sm:text-base'>
        {description}
      </p>
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
    <div className='rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6'>
      <h3 className='text-lg font-semibold text-[var(--color-text)] sm:text-xl'>
        {title}
      </h3>
      <p className='mt-3 text-sm text-[var(--color-text-muted)] sm:text-base'>
        {description}
      </p>
    </div>
  );
}

export function HomePage() {
  const featuredPatterns = patterns.filter((pattern) =>
    featuredSlugs.includes(pattern.slug),
  );

  return (
    <div className='bg-[var(--color-bg)] text-[var(--color-text)]'>
      {/* Hero */}
      <section className='border-b border-[var(--color-border)] bg-[var(--color-surface)]'>
        <div className='mx-auto max-w-6xl px-4 py-14 sm:py-20'>
          <div className='max-w-4xl space-y-8'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]'>
              Practical software architecture
            </p>

            <div className='space-y-5'>
              <h1 className='text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-6xl'>
                Learn design patterns the way developers actually use them.
              </h1>

              <p className='max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8'>
                Pattern Atlas is a practical reference for software design
                patterns, with categorized explanations, side-by-side
                comparisons, and interactive quizzes to help the ideas stick.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <Link
                to='/patterns'
                className='rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition hover:opacity-90'
              >
                Browse patterns
              </Link>
              <Link
                to='/quiz'
                className='rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-alt)]'
              >
                Take the quiz
              </Link>
            </div>

            <div className='grid gap-3 pt-4 sm:gap-4 md:grid-cols-3'>
              <div className='rounded-xl bg-[var(--color-surface-alt)] p-4'>
                <p className='text-2xl font-bold text-[var(--color-text)]'>
                  {patterns.length}
                </p>
                <p className='mt-1 text-sm text-[var(--color-text-muted)]'>
                  patterns in the library
                </p>
              </div>
              <div className='rounded-xl bg-[var(--color-surface-alt)] p-4'>
                <p className='text-2xl font-bold text-[var(--color-text)]'>
                  Compare
                </p>
                <p className='mt-1 text-sm text-[var(--color-text-muted)]'>
                  similar patterns side by side
                </p>
              </div>
              <div className='rounded-xl bg-[var(--color-surface-alt)] p-4'>
                <p className='text-2xl font-bold text-[var(--color-text)]'>
                  Quiz
                </p>
                <p className='mt-1 text-sm text-[var(--color-text-muted)]'>
                  practice pattern recognition
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className='mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <SectionHeading
          eyebrow='Use the site'
          title='Three ways to learn'
          description='Whether you want to study, compare, or test yourself, the site should help you move quickly.'
        />

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          <FeatureCard
            title='Browse the library'
            description='Explore patterns by category, difficulty, and career stage.'
            to='/patterns'
            cta='Explore patterns'
          />
          <FeatureCard
            title='Compare similar patterns'
            description='See patterns side by side so differences become clearer.'
            to='/compare/strategy/state'
            cta='Try a comparison'
          />
          <FeatureCard
            title='Practice with quizzes'
            description='Test your understanding with scenario-based questions.'
            to='/quiz'
            cta='Start quiz'
          />
        </div>
      </section>

      {/* Featured Patterns */}
      <section className='border-y border-[var(--color-border)] bg-[var(--color-surface)]'>
        <div className='mx-auto max-w-6xl px-4 py-12 sm:py-16'>
          <SectionHeading
            eyebrow='Start here'
            title='Featured patterns'
            description='A strong starting point for developers.'
          />

          <div className='mt-8 grid gap-4 md:grid-cols-2'>
            {featuredPatterns.map((pattern) => (
              <PatternCard key={pattern.slug} pattern={pattern} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className='mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <SectionHeading
          eyebrow='Categories'
          title='Organized by practical usefulness'
        />

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          <CategoryCard
            title='🟢 Must Know'
            description='Core patterns'
            tone='green'
          />
          <CategoryCard
            title='🔵 Good to Know'
            description='Useful patterns'
            tone='blue'
          />
          <CategoryCard
            title='🟡 De-emphasize'
            description='Recognize, not prioritize'
            tone='yellow'
          />
        </div>
      </section>

      {/* CTA */}
      <section className='mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <div className='rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 shadow-sm sm:py-12 md:px-10'>
          <h2 className='text-2xl font-bold text-[var(--color-text)] sm:text-3xl md:text-4xl'>
            Start learning patterns that stick.
          </h2>

          <p className='mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg'>
            Browse the library, compare confusing patterns, or take the quiz to
            practice recognition through realistic scenarios.
          </p>

          <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Link
              to='/patterns'
              className='rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition hover:opacity-90'
            >
              Browse patterns
            </Link>
            <Link
              to='/quiz'
              className='rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-alt)]'
            >
              Take the quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
