type QuizChoiceButtonProps = {
  choice: string;
  onSelect: (choice: string) => void;
  disabled: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  showResult: boolean;
};

export function QuizChoiceButton({
  choice,
  onSelect,
  disabled,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
}: QuizChoiceButtonProps) {
  let className =
    "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition";

  if (!showResult) {
    className += isSelected
      ? " border-[var(--color-primary)] bg-[var(--color-surface-alt)] text-[var(--color-text)]"
      : " border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]";
  } else if (isCorrect) {
    className += " border-green-600 bg-green-50 text-green-900";
  } else if (isIncorrect) {
    className += " border-red-600 bg-red-50 text-red-900";
  } else {
    className +=
      " border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]";
  }

  return (
    <button
      type='button'
      onClick={() => onSelect(choice)}
      disabled={disabled}
      className={className}
    >
      {choice}
    </button>
  );
}
