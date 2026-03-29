import { Link, useParams } from "react-router-dom";
import { getPatternBySlug } from "../content/patterns";
import { PatternDetail } from "../features/patterns/PatternDetail";

/** Fetches the data for the individual pattern detail page by slug. If not found, supplies a default page, leading back to the list. Otherwise, populates & returns the PatternDetail data to the UI */
export function PatternDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const pattern = slug ? getPatternBySlug(slug) : undefined;

  if (!pattern) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold text-[var(--color-text)] sm:text-3xl'>
            Pattern not found
          </h1>

          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            We couldn&apos;t find a pattern for slug:{" "}
            <span className='font-mono text-[var(--color-text)] break-words'>
              {slug}
            </span>
          </p>

          <Link
            to='/patterns'
            className='inline-block rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)] transition hover:opacity-90 sm:text-base'
          >
            Back to patterns
          </Link>
        </div>
      </div>
    );
  }

  return <PatternDetail pattern={pattern} />;
}
