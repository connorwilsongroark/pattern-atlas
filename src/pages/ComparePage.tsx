import { Link, useParams, Navigate } from "react-router-dom";
import { getPatternBySlug } from "../content/patterns";
import { PatternComparison } from "../features/patterns/PatternComparison";

export function ComparePage() {
  const { leftSlug, rightSlug } = useParams<{
    leftSlug: string;
    rightSlug: string;
  }>();

  if (!leftSlug || !rightSlug) {
    return null;
  }

  const [first, second] = [leftSlug, rightSlug].sort();

  if (first !== leftSlug || second !== rightSlug) {
    return <Navigate to={`/compare/${first}/${second}`} replace />;
  }

  const left = getPatternBySlug(first);
  const right = getPatternBySlug(second);

  if (!left || !right) {
    return (
      <div className='mx-auto max-w-4xl px-4 py-10 sm:py-12'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold text-[var(--color-text)] sm:text-3xl'>
            Comparison not found
          </h1>
          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            One or both pattern slugs could not be found.
          </p>
          <div>
            <Link
              to='/patterns'
              className='inline-flex rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)] transition hover:opacity-90 sm:text-base'
            >
              Back to patterns
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl space-y-6 px-4 py-8 sm:space-y-8 sm:py-10'>
      <header className='space-y-4'>
        <div className='flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)] sm:gap-3'>
          <Link
            to='/patterns'
            className='transition hover:text-[var(--color-text)]'
          >
            Patterns
          </Link>
          <span>/</span>
          <span>Compare</span>
        </div>

        <div>
          <h1 className='text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl'>
            Compare Patterns
          </h1>
          <p className='mt-2 text-base text-[var(--color-text-muted)] sm:text-lg'>
            Side-by-side comparison of{" "}
            <strong className='text-[var(--color-text)]'>{left.name}</strong>{" "}
            and{" "}
            <strong className='text-[var(--color-text)]'>{right.name}</strong>.
          </p>
        </div>
      </header>

      <PatternComparison left={left} right={right} />
    </div>
  );
}
