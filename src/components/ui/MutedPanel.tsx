type MutedPanelProps = {
  children: React.ReactNode;
  className?: string;
};

// Reusable Muted panel component w/ extensible styling
export function MutedPanel({ children, className = "" }: MutedPanelProps) {
  return (
    <div className={`rounded-xl bg-[var(--color-surface-alt)] ${className}`}>
      {children}
    </div>
  );
}
