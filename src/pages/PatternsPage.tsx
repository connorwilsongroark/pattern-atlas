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

function Section({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: typeof patterns;
}) {
  if (items.length === 0) return null;

  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold text-slate-950'>{title}</h2>
        <p className='mt-1 text-slate-600'>{description}</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
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
    <div className='mx-auto max-w-6xl space-y-8 px-4 py-10'>
      <header className='max-w-3xl space-y-4'>
        <h1 className='text-4xl font-bold text-slate-950'>Design Patterns</h1>
        <p className='text-lg text-slate-700'>
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
        <section className='rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center'>
          <h2 className='text-xl font-semibold text-slate-900'>
            No patterns matched
          </h2>
          <p className='mt-2 text-slate-600'>
            Try adjusting your search or clearing one of the filters.
          </p>
        </section>
      ) : (
        <div className='space-y-12'>
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
