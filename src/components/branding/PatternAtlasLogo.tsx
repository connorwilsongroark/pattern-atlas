type PatternAtlasLogoProps = {
  className?: string;
  title?: string;
  variant?: "mark" | "small" | "primary";
};

export function PatternAtlasLogo({
  className = "h-8 w-8",
  title = "Pattern Atlas",
  variant = "mark",
}: PatternAtlasLogoProps) {
  if (variant === "small") {
    return (
      <svg
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-label={title}
        role='img'
        className={className}
      >
        <circle cx='32' cy='32' r='22' stroke='currentColor' strokeWidth='4' />
        <path
          d='M37 27L34.5 34.5L27 37L29.5 29.5L37 27Z'
          stroke='currentColor'
          strokeWidth='4'
          strokeLinejoin='round'
        />
        <circle cx='32' cy='32' r='3' fill='currentColor' />
      </svg>
    );
  }

  if (variant === "primary") {
    return (
      <svg
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-label={title}
        role='img'
        className={className}
      >
        <circle cx='32' cy='32' r='22' stroke='currentColor' strokeWidth='3' />
        <path
          d='M32 12V18'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M32 46V52'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M12 32H18'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M46 32H52'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M38 26L35 35L26 38L29 29L38 26Z'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinejoin='round'
        />
        <circle cx='32' cy='32' r='2.5' fill='currentColor' />
      </svg>
    );
  }

  return (
    <svg
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      className={className}
    >
      <circle cx='32' cy='32' r='20' stroke='currentColor' strokeWidth='3' />
      <path
        d='M32 14V18'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M32 46V50'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M14 32H18'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M46 32H50'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M37 27L34.5 34.5L27 37L29.5 29.5L37 27Z'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <circle cx='32' cy='32' r='2.5' fill='currentColor' />
    </svg>
  );
}
