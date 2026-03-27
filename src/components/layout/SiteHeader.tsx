import { NavLink } from "react-router-dom";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-2 text-sm font-medium transition",
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
  return (
    <header className='sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
        <NavLink to='/' className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-foreground)]'>
            PA
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]'>
              Pattern Atlas
            </p>
            <p className='text-sm text-[var(--color-text-muted)]'>
              Practical design patterns
            </p>
          </div>
        </NavLink>

        <nav className='flex items-center gap-2'>
          <NavItem to='/'>Home</NavItem>
          <NavItem to='/patterns'>Patterns</NavItem>
          <NavItem to='/quiz'>Quiz</NavItem>
        </nav>
      </div>
    </header>
  );
}
