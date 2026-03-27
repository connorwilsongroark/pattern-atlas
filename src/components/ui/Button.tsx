import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary";

type CommonButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButtonProps = CommonButtonProps & {
  to?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonAsLinkProps = CommonButtonProps & {
  to: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function getButtonClassName(
  variant: ButtonVariant,
  className: string,
  disabled?: boolean,
) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";

  const variantClassName =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]";

  const disabledClassName = disabled ? " cursor-not-allowed opacity-50" : "";

  return `${baseClassName} ${variantClassName}${disabledClassName} ${className}`.trim();
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = props.className ?? "";

  if (typeof props.to === "string") {
    return (
      <Link to={props.to} className={getButtonClassName(variant, className)}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={getButtonClassName(variant, className, props.disabled)}
    >
      {props.children}
    </button>
  );
}
