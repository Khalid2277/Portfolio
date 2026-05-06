import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

// `.section-head` — the eyebrow + h2 + lead trio that introduces almost every
// section. Layout-only; `.reveal` is added by the page so the existing reveal
// system / GSAP fade-up applies untouched.
export function SectionHead({ eyebrow, title, lead, align, className }: SectionHeadProps) {
  return (
    <div
      className={`section-head${className ? ` ${className}` : ''}`}
      style={align === 'center' ? { textAlign: 'center' } : undefined}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{ marginTop: '1rem' }}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
