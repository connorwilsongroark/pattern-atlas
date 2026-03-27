import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className='border-t border-[var(--color-border)] bg-[var(--color-surface)]'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr]'>
        <div className='space-y-4'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
              Pattern Atlas
            </p>
            <h2 className='mt-2 text-2xl font-bold tracking-tight text-[var(--color-text)]'>
              Learn patterns in a way that actually sticks.
            </h2>
          </div>

          <p className='max-w-md text-[var(--color-text-muted)]'>
            A practical reference for learning software design patterns through
            categorized explanations, side-by-side comparisons, and interactive
            quizzes.
          </p>
        </div>

        <div>
          <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]'>
            Explore
          </h3>
          <div className='mt-4 flex flex-col gap-3 text-[var(--color-text-muted)]'>
            <Link to='/' className='hover:text-[var(--color-text)]'>
              Home
            </Link>
            <Link to='/patterns' className='hover:text-[var(--color-text)]'>
              Patterns
            </Link>
            <Link to='/quiz' className='hover:text-[var(--color-text)]'>
              Quiz
            </Link>
            <Link
              to='/compare/strategy/state'
              className='hover:text-[var(--color-text)]'
            >
              Compare patterns
            </Link>
          </div>
        </div>

        <div>
          <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]'>
            Focus areas
          </h3>
          <div className='mt-4 space-y-3 text-[var(--color-text-muted)]'>
            <p>Must Know</p>
            <p>Good to Know</p>
            <p>De-emphasize</p>
            <p>Scenario-based practice</p>
          </div>
        </div>
      </div>

      <div className='border-t border-[var(--color-border)]'>
        <div className='mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between'>
          <p>Built as a practical software architecture learning tool.</p>
          <p>© Pattern Atlas</p>
        </div>
      </div>
    </footer>
  );
}
