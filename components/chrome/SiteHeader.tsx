'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PRIMARY_NAV } from '@/data/navigation';
import { Brand } from './Brand';
import { ThemeToggle } from './ThemeToggle';

interface SiteHeaderProps {
  onOpenDrawer: () => void;
}

// Direct port of the legacy `.site-header` block. Same DOM, same classes —
// main.css styles it without change. The `.scrolled` class is toggled at the
// same y > 12 threshold as the legacy main.js header listener.
export function SiteHeader({ onOpenDrawer }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The legacy `active` class lit up only the exact route. Replicate that.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav">
        <Brand />
        <nav aria-label="Primary">
          <ul className="nav-links">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={isActive(item.href) ? 'active' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-cta">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-outline btn-sm">
            Let&apos;s Talk
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm">
            Book a Demo
          </Link>
          <button className="menu-toggle" aria-label="Open menu" onClick={onOpenDrawer}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
