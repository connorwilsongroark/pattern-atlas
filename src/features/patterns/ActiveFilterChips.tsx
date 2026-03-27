type ActiveFilterChipsProps = {
  search: string;
  category: string;
  careerLevel: string;
  difficulty: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearCareerLevel: () => void;
  onClearDifficulty: () => void;
  onClearAll: () => void;
};

// An individual selected filter, with a button to remove the filter
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type='button'
      onClick={onRemove}
      className='inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-1 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-border)]'
    >
      <span>{label}</span>
      <span aria-hidden='true'>×</span>
    </button>
  );
}

// Shows which filters are currently active and provides a way for the user to remove selected filters
export function ActiveFilterChips({
  // current filter state
  search,
  category,
  careerLevel,
  difficulty,
  // actions to mutate filter state
  onClearSearch,
  onClearCategory,
  onClearCareerLevel,
  onClearDifficulty,
  onClearAll,
}: ActiveFilterChipsProps) {
  const hasActiveFilters =
    search.trim() ||
    category !== "all" ||
    careerLevel !== "all" ||
    difficulty !== "all";

  // if no active filters, don't display any
  if (!hasActiveFilters) return null;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {search.trim() && (
        <Chip label={`Search: ${search}`} onRemove={onClearSearch} />
      )}

      {category !== "all" && (
        <Chip label={`Category: ${category}`} onRemove={onClearCategory} />
      )}

      {careerLevel !== "all" && (
        <Chip label={`Career: ${careerLevel}`} onRemove={onClearCareerLevel} />
      )}

      {difficulty !== "all" && (
        <Chip
          label={`Difficulty: ${difficulty}`}
          onRemove={onClearDifficulty}
        />
      )}

      <button
        type='button'
        onClick={onClearAll}
        className='ml-1 text-sm font-medium text-[var(--color-text-muted)] underline-offset-2 transition hover:text-[var(--color-text)] hover:underline'
      >
        Clear all
      </button>
    </div>
  );
}
