'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useTilt } from '@/components/motion/useTilt';
import { Pill } from './Pill';

interface WorkCardProps {
  /** Where the card links to when clicked (e.g. /solutions/business-tracking). Optional. */
  href?: string;
  /** Inline SVG mockup or other artwork rendered in the `.work-art` slot. */
  art: ReactNode;
  eyebrow?: string;
  title: string;
  body: string;
  tags?: string[];
  className?: string;
}

// `.card.work-card` — port of the legacy portfolio card. The hover scale on
// `.work-art > svg` and the gradient tint on `.work-art::after` come from
// main.css unchanged.
export function WorkCard({ href, art, eyebrow, title, body, tags, className }: WorkCardProps) {
  const ref = useTilt<HTMLDivElement>(true);
  const cls = `card work-card atl-tilt${className ? ` ${className}` : ''}`;

  const inner = (
    <>
      <div className="work-art">{art}</div>
      <div className="work-body">
        {eyebrow && <span className="work-eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        <p className="muted">{body}</p>
        {tags && tags.length > 0 && (
          <div className="tag-rail" style={{ marginTop: '1rem' }}>
            {tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        className={cls}
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
      >
        {inner}
      </Link>
    );
  }
  return (
    <article ref={ref} className={cls}>
      {inner}
    </article>
  );
}
