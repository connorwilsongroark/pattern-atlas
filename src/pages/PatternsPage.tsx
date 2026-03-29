import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { groupPatternsByCategory, patterns } from "../content/patterns";
import { ActiveFilterChips } from "../features/patterns/ActiveFilterChips";
import { PatternCard } from "../features/patterns/PatternCard";
import { PatternFilterBar } from "../features/patterns/PatternFilterBar";
import { PatternResultsSummary } from "../features/patterns/PatternResultsSummary";
import {
  defaultPatternFilters,
  filterPatterns,
  getFiltersFromSearchParams,
  getSearchParamsFromFilters,
  type PatternFilters,
} from "../features/patterns/patternFilters";

type SectionProps = {
  title: string;
  description: string;
  items: typeof patterns;
};

function Section({ title, description, items }: SectionProps) {
  if (items.length === 0) return null;

  return (
    <section className='space-y-4 sm:space-y-5'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-bold text-[var(--color-text)] sm:text-3xl'>
          {title}
        </h2>
        <p className='text-sm text-[var(--color-text-muted)] sm:text-base'>
          {description}
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {items.map((pattern) => (
          <PatternCard key={pattern.slug} pattern={pattern} />
        ))}
      </div>
    </section>
  );
}

export function PatternsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return getFiltersFromSearchParams(searchParams);
  }, [searchParams]);

  const filteredPatterns = useMemo(() => {
    return filterPatterns(patterns, filters);
  }, [filters]);

  const grouped = useMemo(() => {
    return groupPatternsByCategory(filteredPatterns);
  }, [filteredPatterns]);

  function updateFilters(nextFilters: PatternFilters) {
    setSearchParams(getSearchParamsFromFilters(nextFilters));
  }

  function patchFilters(partial: Partial<PatternFilters>) {
    updateFilters({
      ...filters,
      ...partial,
    });
  }

  function resetFilters() {
    setSearchParams(getSearchParamsFromFilters(defaultPatternFilters));
  }

  return (
    <div className='mx-auto max-w-6xl space-y-6 px-4 py-8 sm:space-y-8 sm:py-10'>
      <header className='max-w-3xl space-y-3 sm:space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl'>
          Design Patterns
        </h1>
        <p className='text-base text-[var(--color-text-muted)] sm:text-lg'>
          A practical, categorized guide to design patterns used in real-world
          systems—from foundational concepts to advanced architecture.
        </p>
      </header>

      <PatternFilterBar
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
      />

      <ActiveFilterChips
        search={filters.search}
        category={filters.category}
        careerLevel={filters.careerLevel}
        difficulty={filters.difficulty}
        onClearSearch={() => patchFilters({ search: "" })}
        onClearCategory={() => patchFilters({ category: "all" })}
        onClearCareerLevel={() => patchFilters({ careerLevel: "all" })}
        onClearDifficulty={() => patchFilters({ difficulty: "all" })}
        onClearAll={resetFilters}
      />

      <PatternResultsSummary count={filteredPatterns.length} />

      {filteredPatterns.length === 0 ? (
        <section className='rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center sm:p-8'>
          <h2 className='text-lg font-semibold text-[var(--color-text)] sm:text-xl'>
            No patterns matched
          </h2>
          <p className='mt-2 text-sm text-[var(--color-text-muted)] sm:text-base'>
            Try adjusting your search or clearing one of the filters.
          </p>
        </section>
      ) : (
        <div className='space-y-10 sm:space-y-12'>
          <Section
            title='🟢 Must Know'
            description='Core patterns every developer should understand early in their career.'
            items={grouped["must-know"]}
          />

          <Section
            title='🔵 Good to Know'
            description='Important patterns that deepen your understanding as systems grow.'
            items={grouped["good-to-know"]}
          />

          <Section
            title='🟡 De-emphasize'
            description='Patterns that are less commonly needed in modern systems.'
            items={grouped["de-emphasize"]}
          />
        </div>
      )}
    </div>
  );
}
