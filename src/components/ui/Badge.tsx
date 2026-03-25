type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "subtle";
};

export function Badge({ children, variant = "subtle" }: BadgeProps) {
  const base = "inline-flex rounded-full px-2.5 py-1 text-xs font-medium";
  const styles = {
    subtle: "bg-slate-100 text-slate-700",
    default: "bg-slate-900 text-white",
  };

  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}
