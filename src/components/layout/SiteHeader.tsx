import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { headerNavItems } from "./navItems";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function NavItem({ to, children, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-2 text-sm font-medium transition",
          "block w-full whitespace-nowrap",
          isActive
            ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((value) => !value);
  }

  return (
    <header className='sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='flex items-center justify-between gap-4 py-4'>
          <NavLink
            to='/'
            className='min-w-0 flex items-center gap-3'
            onClick={closeMenu}
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-foreground)]'>
              PA
            </div>

            <div className='min-w-0'>
              <p className='truncate text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
                Pattern Atlas
              </p>
              <p className='hidden text-sm text-[var(--color-text-muted)] sm:block'>
                Practical design patterns
              </p>
            </div>
          </NavLink>

          <div className='flex items-center gap-2'>
            {/* Desktop nav */}
            <nav className='hidden items-center gap-2 md:flex flex-nowrap'>
              {headerNavItems.map((item) => (
                <NavItem key={item.to} to={item.to}>
                  {item.label}
                </NavItem>
              ))}
            </nav>

            <ThemeToggle />

            <button
              type='button'
              onClick={toggleMenu}
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition hover:bg-[var(--color-surface-alt)] md:hidden'
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls='mobile-site-nav'
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div
            id='mobile-site-nav'
            className='border-t border-[var(--color-border)] py-3 md:hidden'
          >
            <nav className='flex flex-col gap-2 pb-1'>
              {headerNavItems.map((item) => (
                <NavItem key={item.to} to={item.to} onClick={closeMenu}>
                  {item.label}
                </NavItem>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
