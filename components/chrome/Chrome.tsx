'use client';

import { useState } from 'react';
import { LegacyEnhancers } from '@/components/composed/LegacyEnhancers';
import { PageTransition } from '@/components/motion/PageTransition';
import { ParallaxBackground } from '@/components/motion/ParallaxBackground';
import { ThemeProvider } from '@/lib/theme';
import { MobileDrawer } from './MobileDrawer';
import { MouseParallax } from './MouseParallax';
import { ScrollTopButton } from './ScrollTopButton';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SkipLink } from './SkipLink';

// Single client-side chrome wrapper. Owns the drawer open state shared between
// the header's hamburger and the drawer itself, and mounts the global
// ThemeProvider, mouse parallax, scroll-top button, header, drawer, and footer.
// Pages render inside <main id="main">.
export function Chrome({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider>
      <ParallaxBackground />
      <SkipLink />
      <SiteHeader onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <ScrollTopButton />
      <MouseParallax />
      <LegacyEnhancers />
    </ThemeProvider>
  );
}
