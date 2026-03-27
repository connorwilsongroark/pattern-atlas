import { Link } from "react-router-dom";
import type { Pattern } from "../../types/pattern";
import { Badge } from "../../components/ui/Badge";

type PatternCardProps = {
  pattern: Pattern;
};

// Summary of the details of an individual design pattern. When clicked, navigates to the page that fully explains the design pattern.
export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      to={`/patterns/${pattern.slug}`}
      className='group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    >
      <div className='mb-3 flex flex-wrap gap-2'>
        <Badge>{pattern.category}</Badge>
        <Badge>{pattern.difficulty}</Badge>
        <Badge>{pattern.careerLevel}</Badge>
      </div>

      <h2 className='text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-text-muted)]'>
        {pattern.name}
      </h2>

      <p className='mt-2 text-[var(--color-text-muted)]'>{pattern.summary}</p>

      <div className='mt-4 rounded-lg bg-[var(--color-surface-alt)] p-3'>
        <p className='text-sm font-medium text-[var(--color-text)]'>
          💡 {pattern.keyTakeaway}
        </p>
      </div>
    </Link>
  );
}
