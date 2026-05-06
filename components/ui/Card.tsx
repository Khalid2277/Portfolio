'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/components/motion/useTilt';

interface CardProps {
  children: ReactNode;
  /** Add the `atl-tilt` class so the 3D tilt effect activates. Default true. */
  tilt?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: 'article' | 'div' | 'section';
}

// `<Card>` — emits `.card` (+ `.atl-tilt` when tilt={true}). Polymorphic via
// `as` so semantic <article> works for portfolio cards.
export function Card({ children, tilt = true, className, style, as = 'article' }: CardProps) {
  const ref = useTilt<HTMLElement>(tilt);
  const cls = `card${tilt ? ' atl-tilt' : ''}${className ? ` ${className}` : ''}`;

  if (as === 'div')
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={cls} style={style}>
        {children}
      </div>
    );
  if (as === 'section')
    return (
      <section ref={ref as React.Ref<HTMLElement>} className={cls} style={style}>
        {children}
      </section>
    );
  return (
    <article ref={ref as React.Ref<HTMLElement>} className={cls} style={style}>
      {children}
    </article>
  );
}
