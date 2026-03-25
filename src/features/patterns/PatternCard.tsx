import { Link } from "react-router-dom";
import type { Pattern } from "../../types/pattern";

type PatternCardProps = {
  pattern: Pattern;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700'>
      {children}
    </span>
  );
}

// Summary of the details of an individual design pattern. When clicked, navigates to the page that fully explains the design pattern.
export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      to={`/patterns/${pattern.slug}`}
      className='group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    >
      <div className='mb-3 flex flex-wrap gap-2'>
        <Badge>{pattern.category}</Badge>
        <Badge>{pattern.difficulty}</Badge>
        <Badge>{pattern.careerLevel}</Badge>
      </div>

      <h2 className='text-xl font-semibold text-slate-900 group-hover:text-slate-700'>
        {pattern.name}
      </h2>

      <p className='mt-2 text-slate-700'>{pattern.summary}</p>

      <div className='mt-4 rounded-lg bg-slate-50 p-3'>
        <p className='text-sm font-medium text-slate-800'>
          💡 {pattern.keyTakeaway}
        </p>
      </div>
    </Link>
  );
}
