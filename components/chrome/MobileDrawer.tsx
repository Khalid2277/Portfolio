'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CONTACT_EMAIL, PRIMARY_NAV } from '@/data/navigation';
import { Brand } from './Brand';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Pixel-faithful port of the legacy `.drawer` + `.drawer-panel`. The CSS in
// main.css drives the slide animation off the `.open` class — we toggle that
// here. Body scroll lock + Escape + backdrop click parity with the legacy
// listeners in main.js.
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Body scroll lock — matches legacy `document.body.style.overflow = 'hidden'`.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes — matches legacy keydown listener.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Auto-close on route change (so tapping a nav link inside the drawer closes it).
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div
      className={`drawer${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      // Backdrop click — only if the click was on the backdrop itself.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Brand />
          <button
            className="drawer-close menu-toggle"
            aria-label="Close menu"
            style={{ display: 'inline-flex' }}
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/contact" className="btn btn-primary">
            Book a Demo
          </Link>
          <span
            className="mono"
            style={{ color: 'var(--fg-soft)', fontSize: '0.85rem' }}
          >
            {CONTACT_EMAIL}
          </span>
        </div>
      </div>
    </div>
  );
}
