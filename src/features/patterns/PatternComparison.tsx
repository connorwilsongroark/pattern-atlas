import { Link } from "react-router-dom";
import type { Pattern } from "../../types/pattern";
import { Badge } from "../../components/ui/Badge";

type PatternComparisonProps = {
  left: Pattern;
  right: Pattern;
};

function ComparisonSection({
  title,
  leftContent,
  rightContent,
}: {
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
      <div className='border-b border-slate-200 bg-slate-50 px-6 py-4'>
        <h2 className='text-lg font-semibold text-slate-950'>{title}</h2>
      </div>

      <div className='grid gap-0 md:grid-cols-2'>
        <div className='border-b border-slate-200 p-6 md:border-b-0 md:border-r'>
          {leftContent}
        </div>
        <div className='p-6'>{rightContent}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='list-disc space-y-2 pl-5 text-slate-700'>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PatternHeader({ pattern }: { pattern: Pattern }) {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <Badge>{pattern.category}</Badge>
        <Badge>{pattern.careerLevel}</Badge>
        <Badge>{pattern.difficulty}</Badge>
      </div>

      <div>
        <Link
          to={`/patterns/${pattern.slug}`}
          className='text-3xl font-bold tracking-tight text-slate-950 hover:text-slate-700'
        >
          {pattern.name}
        </Link>
        <p className='mt-3 text-slate-700'>{pattern.summary}</p>
      </div>

      <div className='rounded-xl bg-slate-50 p-4'>
        <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
          Key takeaway
        </p>
        <p className='mt-2 text-slate-800'>{pattern.keyTakeaway}</p>
      </div>
    </div>
  );
}

export function PatternComparison({ left, right }: PatternComparisonProps) {
  return (
    <div className='space-y-6'>
      <ComparisonSection
        title='Overview'
        leftContent={<PatternHeader pattern={left} />}
        rightContent={<PatternHeader pattern={right} />}
      />

      <ComparisonSection
        title='Problem'
        leftContent={<p className='text-slate-700'>{left.problem}</p>}
        rightContent={<p className='text-slate-700'>{right.problem}</p>}
      />

      <ComparisonSection
        title='Solution'
        leftContent={<p className='text-slate-700'>{left.solution}</p>}
        rightContent={<p className='text-slate-700'>{right.solution}</p>}
      />

      <ComparisonSection
        title='When to use'
        leftContent={<BulletList items={left.whenToUse} />}
        rightContent={<BulletList items={right.whenToUse} />}
      />

      <ComparisonSection
        title='When not to use'
        leftContent={<BulletList items={left.whenNotToUse} />}
        rightContent={<BulletList items={right.whenNotToUse} />}
      />

      <ComparisonSection
        title='Benefits'
        leftContent={<BulletList items={left.benefits} />}
        rightContent={<BulletList items={right.benefits} />}
      />

      <ComparisonSection
        title='Tradeoffs'
        leftContent={<BulletList items={left.tradeoffs} />}
        rightContent={<BulletList items={right.tradeoffs} />}
      />

      <ComparisonSection
        title='Tags'
        leftContent={
          <div className='flex flex-wrap gap-2'>
            {left.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        }
        rightContent={
          <div className='flex flex-wrap gap-2'>
            {right.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        }
      />
    </div>
  );
}
