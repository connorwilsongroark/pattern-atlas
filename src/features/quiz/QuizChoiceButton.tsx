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
      ? " border-slate-900 bg-slate-100 text-slate-950"
      : " border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50";
  } else if (isCorrect) {
    className += " border-green-600 bg-green-50 text-green-900";
  } else if (isIncorrect) {
    className += " border-red-600 bg-red-50 text-red-900";
  } else {
    className += " border-slate-300 bg-white text-slate-500";
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
