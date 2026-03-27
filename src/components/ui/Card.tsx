type CardProps = {
  children: React.ReactNode;
  className?: string;
};

// Reusable Card w/ extensible styling
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
