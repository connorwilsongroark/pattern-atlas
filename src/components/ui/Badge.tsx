type BadgeProps = {
  children: React.ReactNode;
  variant?: "subtle" | "default";
};

export function Badge({ children, variant = "subtle" }: BadgeProps) {
  const baseClassName =
    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium";

  const variantClassName =
    variant === "default"
      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
      : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]";

  return (
    <span className={`${baseClassName} ${variantClassName}`}>{children}</span>
  );
}
