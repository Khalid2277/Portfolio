import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

interface CtaBannerProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode; // typically the CTA button row
}

// `.cta-banner` — used at the bottom of every page. The legacy markup wraps
// it inside <section class="section">, but we let pages own that wrapper so
// the spacing is consistent with surrounding content.
export function CtaBanner({ eyebrow, title, body, children }: CtaBannerProps) {
  return (
    <div className="cta-banner reveal-scale">
      <div className="cta-glow" aria-hidden="true" />
      {eyebrow && <Eyebrow style={{ justifyContent: 'center' }}>{eyebrow}</Eyebrow>}
      <h2 style={{ marginTop: '1rem' }}>{title}</h2>
      {body && <p>{body}</p>}
      {children && (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
