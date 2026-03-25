import { Link, useParams } from "react-router-dom";
import { getPatternBySlug } from "../content/patterns";
import { PatternComparison } from "../features/patterns/PatternComparison";
import { Navigate } from "react-router-dom";

export function ComparePage() {
  const { leftSlug, rightSlug } = useParams<{
    leftSlug: string;
    rightSlug: string;
  }>();

  if (!leftSlug || !rightSlug) {
    return null;
  }

  // Normalize order
  const [first, second] = [leftSlug, rightSlug].sort();

  if (first !== leftSlug || second !== rightSlug) {
    return <Navigate to={`/compare/${first}/${second}`} replace />;
  }

  const left = getPatternBySlug(first);
  const right = getPatternBySlug(second);

  if (!left || !right) {
    return (
      <div className='mx-auto max-w-4xl px-4 py-12'>
        <h1 className='text-3xl font-bold text-slate-950'>
          Comparison not found
        </h1>
        <p className='mt-3 text-slate-700'>
          One or both pattern slugs could not be found.
        </p>
        <div className='mt-6'>
          <Link
            to='/patterns'
            className='inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white'
          >
            Back to patterns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl space-y-8 px-4 py-10'>
      <header className='space-y-4'>
        <div className='flex flex-wrap items-center gap-3 text-sm text-slate-600'>
          <Link to='/patterns' className='hover:text-slate-900'>
            Patterns
          </Link>
          <span>/</span>
          <span>Compare</span>
        </div>

        <div>
          <h1 className='text-4xl font-bold tracking-tight text-slate-950'>
            Compare Patterns
          </h1>
          <p className='mt-2 text-lg text-slate-700'>
            Side-by-side comparison of <strong>{left.name}</strong> and{" "}
            <strong>{right.name}</strong>.
          </p>
        </div>
      </header>

      <PatternComparison left={left} right={right} />
    </div>
  );
}
