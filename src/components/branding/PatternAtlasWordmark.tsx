import { PatternAtlasLogo } from "./PatternAtlasLogo";

type PatternAtlasWordmarkProps = {
  className?: string;
  logoClassName?: string;
  textClassName?: string;
};

export function PatternAtlasWordmark({
  className = "flex items-center gap-2 text-[var(--color-text)]",
  logoClassName = "h-10 w-10 shrink-0",
  textClassName = "text-xl font-semibold tracking-tight",
}: PatternAtlasWordmarkProps) {
  return (
    <div className={className}>
      <PatternAtlasLogo className={logoClassName} variant='small' />
      <span className={textClassName}>Pattern Atlas</span>
    </div>
  );
}
