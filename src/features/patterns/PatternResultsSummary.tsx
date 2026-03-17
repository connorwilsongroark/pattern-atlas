type PatternResultsSummaryProps = {
  count: number;
};

export function PatternResultsSummary({ count }: PatternResultsSummaryProps) {
  return (
    <div className='text-sm text-slate-600'>
      {count === 1 ? "1 pattern found" : `${count} patterns found`}
    </div>
  );
}
