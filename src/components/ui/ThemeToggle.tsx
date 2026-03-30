import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='rounded-lg p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]'
      aria-label='Toggle dark mode'
      title='Toggle dark mode'
    >
      {theme === "dark" ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
    </button>
  );
}
