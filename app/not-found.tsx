import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: { absolute: 'Page not found — AlfaTechLabs' },
  description:
    "The page you're looking for doesn't exist. Find your way back to AlfaTechLabs.",
  robots: 'noindex, nofollow',
};

// Verbatim port of legacy 404.html — same hero, same eyebrow, same CTA pair.
// Next will render this file for any unmatched route in the static export.
export default function NotFound() {
  return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container reveal">
        <Eyebrow style={{ justifyContent: 'center' }}>404 · Not found</Eyebrow>
        <h1 style={{ marginTop: '1rem', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          This page is off the map.
        </h1>
        <p className="lead" style={{ maxWidth: '50ch', margin: '1rem auto 2rem' }}>
          The link you followed may be broken, or the page may have moved. Try one of these
          instead.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button href="/" variant="primary" size="lg" magnetic>
            Back to home
          </Button>
          <Button href="/portfolio" variant="outline" size="lg" magnetic>
            View portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
