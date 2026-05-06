'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

// Smooth route-to-route fade. AnimatePresence keys on `pathname` so the
// outgoing page fades out before the incoming page animates in. Framer's
// default mount-on-first-render handles the loading entrance; subsequent
// route changes get the same treatment.
//
// Honors prefers-reduced-motion: when set, the wrapper renders content
// directly with no animation.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        className="atl-page-transition"
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
        transition={{
          duration: 0.36,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
