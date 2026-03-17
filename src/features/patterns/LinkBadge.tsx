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
      <span className={`${sharedClassName} bg-slate-100 text-slate-700`}>
        {children}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`${sharedClassName} bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900`}
    >
      {children}
    </Link>
  );
}
