import { Link } from "react-router-dom";
import type { Pattern } from "../../types/pattern";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { MutedPanel } from "../../components/ui/MutedPanel";

type PatternCardProps = {
  pattern: Pattern;
};

// Summary of the details of an individual design pattern. When clicked, navigates to the page that fully explains the design pattern.
export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      to={`/patterns/${pattern.slug}`}
      className='group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2'
    >
      <Card className='h-full p-4 transition group-hover:-translate-y-0.5 group-hover:shadow-md sm:p-5'>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Badge>{pattern.category}</Badge>
          <Badge>{pattern.difficulty}</Badge>
          <Badge>{pattern.careerLevel}</Badge>
        </div>

        <h2 className='text-lg font-semibold text-[var(--color-text)] transition group-hover:text-[var(--color-text-muted)] sm:text-xl'>
          {pattern.name}
        </h2>

        <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
          {pattern.summary}
        </p>

        <MutedPanel className='mt-4 p-3'>
          <p className='text-sm font-medium text-[var(--color-text)]'>
            💡 {pattern.keyTakeaway}
          </p>
        </MutedPanel>
      </Card>
    </Link>
  );
}
