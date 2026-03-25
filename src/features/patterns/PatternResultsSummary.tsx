type PatternResultsSummaryProps = {
  count: number;
};

/** Small summary blurb that currently just details how many patterns were found that meet the given criteria. Just receives a number. */
export function PatternResultsSummary({ count }: PatternResultsSummaryProps) {
  return (
    <div className='text-sm text-slate-600'>
      {count === 1 ? "1 pattern found" : `${count} patterns found`}
    </div>
  );
}
