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

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type='button'
      onClick={onRemove}
      className='inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-800 transition hover:bg-slate-300'
    >
      <span>{label}</span>
      <span aria-hidden='true'>×</span>
    </button>
  );
}

export function ActiveFilterChips({
  search,
  category,
  careerLevel,
  difficulty,
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
        className='ml-1 text-sm font-medium text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline'
      >
        Clear all
      </button>
    </div>
  );
}
