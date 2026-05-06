'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'atl-theme';

// Read the current theme from <html data-theme="…"> (set synchronously by the
// no-FOUC inline script in layout.tsx). Falls back to 'dark' on the server.
function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  // Hydrate from the actual DOM after mount to keep SSR + no-FOUC consistent.
  useEffect(() => {
    setThemeState(readInitialTheme());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore — private mode, etc. */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

// Synchronous init script string — embedded in <head> via dangerouslySetInnerHTML.
// Must run before paint, so it lives outside React's render cycle.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('atl-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(_){}})();`;
