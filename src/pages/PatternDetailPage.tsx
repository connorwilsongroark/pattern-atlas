import { Link, useParams } from "react-router-dom";
import { getPatternBySlug } from "../content/patterns";
import { PatternDetail } from "../features/patterns/PatternDetail";

/** Fetches the data for the individual pattern detail page by slug. If not found, supplies a default page, leading back to the list. Otherwise, populates & returns the PatternDetail data to the UI */
export function PatternDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the pattern data by the slug from the URl. Otherwise, return a "missing pattern" message
  const pattern = slug ? getPatternBySlug(slug) : undefined;

  if (!pattern) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-12'>
        <h1 className='text-3xl font-bold text-slate-950'>Pattern not found</h1>
        <p className='mt-3 text-slate-700'>
          We couldn&apos;t find a pattern for slug:{" "}
          <span className='font-mono'>{slug}</span>
        </p>
        <Link
          to='/patterns'
          className='mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white'
        >
          Back to patterns
        </Link>
      </div>
    );
  }
  // If the pattern was found, pass the pattern data to the PatternDetail component to render the page
  return <PatternDetail pattern={pattern} />;
}
