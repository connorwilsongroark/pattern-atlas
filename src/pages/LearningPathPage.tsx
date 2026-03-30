import { Link } from "react-router-dom";
import { getPatternBySlug } from "../content/patterns";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MutedPanel } from "../components/ui/MutedPanel";

type StagePatternListProps = {
  slugs: string[];
};

function StagePatternList({ slugs }: StagePatternListProps) {
  const patterns = slugs
    .map((slug) => getPatternBySlug(slug))
    .filter((pattern) => pattern !== undefined);

  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {patterns.map((pattern) => (
        <Link
          key={pattern.slug}
          to={`/patterns/${pattern.slug}`}
          className='rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:bg-[var(--color-surface-alt)]'
        >
          <div className='mb-2 flex flex-wrap gap-2'>
            <Badge>{pattern.difficulty}</Badge>
            <Badge>{pattern.careerLevel}</Badge>
          </div>

          <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
            {pattern.name}
          </h3>

          <p className='mt-2 text-sm text-[var(--color-text-muted)]'>
            {pattern.keyTakeaway}
          </p>
        </Link>
      ))}
    </div>
  );
}

type LearningStageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  goals: string[];
  slugs: string[];
};

function LearningStage({
  eyebrow,
  title,
  summary,
  goals,
  slugs,
}: LearningStageProps) {
  return (
    <section className='space-y-5 sm:space-y-6'>
      <div className='space-y-3'>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
          {eyebrow}
        </p>
        <h2 className='text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl'>
          {title}
        </h2>
        <p className='max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8'>
          {summary}
        </p>
      </div>

      <Card className='p-5 sm:p-6'>
        <div className='grid gap-6 lg:grid-cols-[1.1fr_1.4fr]'>
          <div>
            <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
              What to focus on
            </h3>
            <ul className='mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)] sm:text-base'>
              {goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
              Recommended patterns
            </h3>
            <div className='mt-4'>
              <StagePatternList slugs={slugs} />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export function LearningPathPage() {
  return (
    <div className='mx-auto max-w-6xl space-y-12 px-4 py-8 sm:space-y-16 sm:py-10'>
      <header className='space-y-5 sm:space-y-6'>
        <div className='space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
            Structured learning
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl'>
            A practical learning path for design patterns
          </h1>
          <p className='max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8'>
            This path is designed to help you learn patterns in a useful order:
            first the ones you will actually see and apply, then the ones that
            organize more complex systems, and finally the architectural
            patterns that matter as systems scale.
          </p>
        </div>

        <MutedPanel className='p-4 sm:p-5'>
          <div className='grid gap-4 md:grid-cols-3'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]'>
                Stage 1
              </p>
              <p className='mt-2 text-sm text-[var(--color-text)] sm:text-base'>
                Learn to recognize and apply foundational patterns.
              </p>
            </div>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]'>
                Stage 2
              </p>
              <p className='mt-2 text-sm text-[var(--color-text)] sm:text-base'>
                Learn to organize behavior, workflows, and data access cleanly.
              </p>
            </div>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]'>
                Stage 3
              </p>
              <p className='mt-2 text-sm text-[var(--color-text)] sm:text-base'>
                Learn the patterns that matter in larger, more distributed
                systems.
              </p>
            </div>
          </div>
        </MutedPanel>
      </header>

      <LearningStage
        eyebrow='Stage 1'
        title='Early career foundations'
        summary='Start with patterns that sharpen your instincts around composition, interfaces, behavior, and clear object collaboration. These are the patterns that help you stop reaching for conditionals or tightly coupled code by default.'
        goals={[
          "Understand composition over inheritance in practice.",
          "Learn to recognize when behavior should be swapped, wrapped, or translated.",
          "Get comfortable with simple creation patterns and interface boundaries.",
          "Build pattern recognition before worrying about system-scale architecture.",
        ]}
        slugs={[
          "strategy",
          "adapter",
          "facade",
          "factory-method",
          "dependency-injection",
          "builder",
          "proxy",
          "template-method",
        ]}
      />

      <LearningStage
        eyebrow='Stage 2'
        title='Mid-level application design'
        summary='Once the fundamentals feel natural, move into patterns that help organize real application code: workflows, stateful behavior, data access boundaries, and layered composition.'
        goals={[
          "Keep controllers and UI layers thin.",
          "Separate business workflows from transport and persistence concerns.",
          "Encapsulate stateful behavior more cleanly.",
          "Use composition to add behavior without rigid inheritance trees.",
        ]}
        slugs={[
          "decorator",
          "state",
          "command",
          "observer-pub-sub",
          "chain-of-responsibility",
          "service-layer",
          "repository",
          "specification",
        ]}
      />

      <LearningStage
        eyebrow='Stage 3'
        title='Senior and architectural patterns'
        summary='These patterns become more important when systems grow in complexity, distribution, and operational demands. Learn them after the fundamentals are comfortable, so they feel like practical tools rather than abstract theory.'
        goals={[
          "Understand transactional boundaries and consistency tradeoffs.",
          "Learn how events reshape system design.",
          "Recognize when reads and writes need different models.",
          "Think about resilience, messaging, and reliability in production systems.",
        ]}
        slugs={[
          "unit-of-work",
          "ports-and-adapters",
          "anti-corruption-layer",
          "domain-events",
          "outbox-pattern",
          "cqrs",
          "retry",
          "cache-aside",
          "circuit-breaker",
          "saga",
        ]}
      />

      <section className='space-y-5 sm:space-y-6'>
        <div className='space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
            Study advice
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl'>
            How to get the most out of Pattern Atlas
          </h2>
        </div>

        <Card className='p-5 sm:p-6'>
          <div className='grid gap-6 md:grid-cols-3'>
            <div>
              <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
                1. Learn in clusters
              </h3>
              <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
                Study patterns that are commonly confused with each other, like
                Strategy vs State or Adapter vs Facade.
              </p>
            </div>

            <div>
              <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
                2. Focus on use cases
              </h3>
              <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
                Do not just memorize definitions. Ask what problem the pattern
                solves and what signals suggest using it.
              </p>
            </div>

            <div>
              <h3 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
                3. Test yourself
              </h3>
              <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
                Use the quiz to strengthen recognition, then come back to
                compare patterns side by side when distinctions are fuzzy.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <Card className='p-6 sm:p-8'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='max-w-2xl'>
              <h2 className='text-2xl font-bold tracking-tight text-[var(--color-text)]'>
                Ready to start?
              </h2>
              <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
                Browse the full library, compare similar patterns, or practice
                with the quiz.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <Button to='/patterns'>Browse patterns</Button>
              <Button to='/quiz' variant='secondary'>
                Take the quiz
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
