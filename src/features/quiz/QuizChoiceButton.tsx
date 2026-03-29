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
    "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2";

  if (!showResult) {
    className += isSelected
      ? " border-[var(--color-primary)] bg-[var(--color-surface-alt)] text-[var(--color-text)]"
      : " border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]";
  } else if (isCorrect) {
    className +=
      " border-[var(--color-success-border)] bg-[var(--color-success-bg)] text-[var(--color-success-text)]";
  } else if (isIncorrect) {
    className +=
      " border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]";
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
      <span className='block break-words'>{choice}</span>
    </button>
  );
}
