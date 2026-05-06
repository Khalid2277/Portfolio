import Link from 'next/link';

// The "AlfaTechLabs" wordmark + the iris accent rule. Same DOM and classes as
// the legacy `.brand` anchor — main.css styles it untouched.
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`brand${className ? ` ${className}` : ''}`}
      aria-label="AlfaTechLabs home"
    >
      <span className="brand-wordmark">AlfaTechLabs</span>
      <span className="brand-rule" aria-hidden="true" />
    </Link>
  );
}
