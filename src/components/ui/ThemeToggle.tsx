import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-alt)]'
      aria-label='Toggle dark mode'
      title='Toggle dark mode'
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
