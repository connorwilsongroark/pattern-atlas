import { Link } from "react-router-dom";

type LinkBadgeProps = {
  to?: string;
  children: React.ReactNode;
};

export function LinkBadge({ to, children }: LinkBadgeProps) {
  const sharedClassName =
    "inline-flex rounded-full px-3 py-1 text-sm font-medium";

  if (!to) {
    return (
      <span
        className={`${sharedClassName} bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`${sharedClassName} bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] transition hover:brightness-95 hover:text-[var(--color-text)]`}
    >
      {children}
    </Link>
  );
}
