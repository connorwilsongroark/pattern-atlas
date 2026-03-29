import { Link } from "react-router-dom";
import type { Pattern } from "../../types/pattern";
import { Badge } from "../../components/ui/Badge";

type PatternComparisonProps = {
  left: Pattern;
  right: Pattern;
};

function ComparisonPane({
  pattern,
  children,
  bordered = false,
}: {
  pattern: Pattern;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={[
        "p-5 sm:p-6",
        bordered
          ? "border-b border-[var(--color-border)] md:border-b-0 md:border-r"
          : "",
      ].join(" ")}
    >
      <div className='mb-4 md:hidden'>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]'>
          {pattern.name}
        </p>
      </div>

      {children}
    </div>
  );
}

function ComparisonSection({
  title,
  left,
  right,
  leftContent,
  rightContent,
}: {
  title: string;
  left: Pattern;
  right: Pattern;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <section className='overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm'>
      <div className='border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-4 sm:px-6'>
        <h2 className='text-base font-semibold text-[var(--color-text)] sm:text-lg'>
          {title}
        </h2>
      </div>

      <div className='hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] md:grid md:grid-cols-2'>
        <div className='border-r border-[var(--color-border)] px-6 py-3'>
          <p className='text-sm font-semibold text-[var(--color-text)]'>
            {left.name}
          </p>
        </div>
        <div className='px-6 py-3'>
          <p className='text-sm font-semibold text-[var(--color-text)]'>
            {right.name}
          </p>
        </div>
      </div>

      <div className='grid gap-0 md:grid-cols-2'>
        <ComparisonPane pattern={left} bordered>
          {leftContent}
        </ComparisonPane>

        <ComparisonPane pattern={right}>{rightContent}</ComparisonPane>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)] sm:text-base'>
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
          className='text-2xl font-bold tracking-tight text-[var(--color-text)] transition hover:text-[var(--color-text-muted)] sm:text-3xl'
        >
          {pattern.name}
        </Link>
        <p className='mt-3 text-sm text-[var(--color-text-muted)] sm:text-base'>
          {pattern.summary}
        </p>
      </div>

      <div className='rounded-xl bg-[var(--color-surface-alt)] p-4'>
        <p className='text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] sm:text-sm'>
          Key takeaway
        </p>
        <p className='mt-2 text-sm text-[var(--color-text)] sm:text-base'>
          {pattern.keyTakeaway}
        </p>
      </div>
    </div>
  );
}

export function PatternComparison({ left, right }: PatternComparisonProps) {
  return (
    <div className='space-y-6'>
      <ComparisonSection
        title='Overview'
        left={left}
        right={right}
        leftContent={<PatternHeader pattern={left} />}
        rightContent={<PatternHeader pattern={right} />}
      />

      <ComparisonSection
        title='Problem'
        left={left}
        right={right}
        leftContent={
          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            {left.problem}
          </p>
        }
        rightContent={
          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            {right.problem}
          </p>
        }
      />

      <ComparisonSection
        title='Solution'
        left={left}
        right={right}
        leftContent={
          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            {left.solution}
          </p>
        }
        rightContent={
          <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
            {right.solution}
          </p>
        }
      />

      <ComparisonSection
        title='When to use'
        left={left}
        right={right}
        leftContent={<BulletList items={left.whenToUse} />}
        rightContent={<BulletList items={right.whenToUse} />}
      />

      <ComparisonSection
        title='When not to use'
        left={left}
        right={right}
        leftContent={<BulletList items={left.whenNotToUse} />}
        rightContent={<BulletList items={right.whenNotToUse} />}
      />

      <ComparisonSection
        title='Benefits'
        left={left}
        right={right}
        leftContent={<BulletList items={left.benefits} />}
        rightContent={<BulletList items={right.benefits} />}
      />

      <ComparisonSection
        title='Tradeoffs'
        left={left}
        right={right}
        leftContent={<BulletList items={left.tradeoffs} />}
        rightContent={<BulletList items={right.tradeoffs} />}
      />

      <ComparisonSection
        title='Tags'
        left={left}
        right={right}
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
