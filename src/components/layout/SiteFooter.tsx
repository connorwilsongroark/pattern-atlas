import { Link } from "react-router-dom";
import { footerNavItems } from "./navItems";

export function SiteFooter() {
  return (
    <footer className='border-t border-[var(--color-border)] bg-[var(--color-surface)]'>
      <div className='mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:py-12 md:grid-cols-[1.5fr_1fr_1fr]'>
        <div className='space-y-4'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
              Pattern Atlas
            </p>
            <h2 className='mt-2 text-xl font-bold tracking-tight text-[var(--color-text)] sm:text-2xl'>
              Learn patterns in a way that actually sticks.
            </h2>
          </div>

          <p className='max-w-md text-sm text-[var(--color-text-muted)] sm:text-base'>
            A practical reference for learning software design patterns through
            categorized explanations, side-by-side comparisons, and interactive
            quizzes.
          </p>
        </div>

        {footerNavItems.map((section) => (
          <div key={section.label}>
            <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]'>
              {section.label}
            </h3>

            <div className='mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-muted)] sm:text-base'>
              {section.navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className='transition hover:text-[var(--color-text)]'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='border-t border-[var(--color-border)]'>
        <div className='mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between'>
          <p>Built as a practical software architecture learning tool.</p>
          <p>© Pattern Atlas</p>
        </div>
      </div>
    </footer>
  );
}
