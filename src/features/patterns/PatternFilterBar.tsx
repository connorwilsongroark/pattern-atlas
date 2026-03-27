import type { ChangeEvent } from "react";
import type { PatternFilters } from "./patternFilters";

// Receives currently applied filters, how to update the filters, and the action to reset all.
type PatternFilterBarProps = {
  filters: PatternFilters;
  onChange: (next: PatternFilters) => void;
  onReset: () => void;
};

// The interactive bar for setting and resetting applied filters.
export function PatternFilterBar({
  filters,
  onChange,
  onReset,
}: PatternFilterBarProps) {
  function update<K extends keyof PatternFilters>(
    key: K,
    value: PatternFilters[K],
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    update("search", event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    update("category", event.target.value as PatternFilters["category"]);
  }

  function handleCareerLevelChange(event: ChangeEvent<HTMLSelectElement>) {
    update("careerLevel", event.target.value as PatternFilters["careerLevel"]);
  }

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    update("difficulty", event.target.value as PatternFilters["difficulty"]);
  }

  return (
    <section className='rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm'>
      <div className='grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]'>
        {/* Search */}
        <div>
          <label
            htmlFor='pattern-search'
            className='mb-1 block text-sm font-medium text-[var(--color-text-muted)]'
          >
            Search
          </label>
          <input
            id='pattern-search'
            type='text'
            value={filters.search}
            onChange={handleSearchChange}
            placeholder='Search by pattern name, concept, or keyword...'
            className='w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] outline-none transition focus:border-[var(--color-text-muted)]'
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor='pattern-category'
            className='mb-1 block text-sm font-medium text-[var(--color-text-muted)]'
          >
            Category
          </label>
          <select
            id='pattern-category'
            value={filters.category}
            onChange={handleCategoryChange}
            className='w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] outline-none transition focus:border-[var(--color-text-muted)]'
          >
            <option value='all'>All</option>
            <option value='must-know'>Must know</option>
            <option value='good-to-know'>Good to know</option>
            <option value='de-emphasize'>De-emphasize</option>
          </select>
        </div>

        {/* Career level */}
        <div>
          <label
            htmlFor='pattern-career-level'
            className='mb-1 block text-sm font-medium text-[var(--color-text-muted)]'
          >
            Career level
          </label>
          <select
            id='pattern-career-level'
            value={filters.careerLevel}
            onChange={handleCareerLevelChange}
            className='w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] outline-none transition focus:border-[var(--color-text-muted)]'
          >
            <option value='all'>All</option>
            <option value='early'>Early</option>
            <option value='mid'>Mid</option>
            <option value='senior'>Senior</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor='pattern-difficulty'
            className='mb-1 block text-sm font-medium text-[var(--color-text-muted)]'
          >
            Difficulty
          </label>
          <select
            id='pattern-difficulty'
            value={filters.difficulty}
            onChange={handleDifficultyChange}
            className='w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] outline-none transition focus:border-[var(--color-text-muted)]'
          >
            <option value='all'>All</option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
          </select>
        </div>

        {/* Reset button */}
        <div className='flex items-end'>
          <button
            type='button'
            onClick={onReset}
            className='w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-[var(--color-primary-foreground)] transition hover:opacity-90'
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
