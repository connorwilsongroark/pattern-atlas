import type { ReactNode } from "react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]'>
      <div className='flex min-h-screen flex-col'>
        <SiteHeader />
        <main className='min-w-0 flex-1'>{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
