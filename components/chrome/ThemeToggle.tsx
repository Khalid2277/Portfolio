'use client';

import { useTheme } from '@/lib/theme';

// Pixel-faithful port of the legacy `.theme-toggle` button. Uses the same
// `.icon-moon` / `.icon-sun` SVGs and the same `[data-theme="light"]` driven
// CSS in main.css, so the icon swap continues to work without new styling.
export function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
