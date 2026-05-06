// Centralised link tables so the header, drawer, and footer all derive from a
// single source. Hrefs match the live URLs (no .html suffix; matches today).

export const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_COMPANY = [
  { href: '/about', label: 'About us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_SOLUTIONS = [
  { href: '/solutions/business-tracking', label: 'Business tracking' },
  { href: '/solutions/agentic-rag', label: 'Agentic RAG' },
  { href: '/solutions/car-wash-app', label: 'Mobile apps' },
  { href: '/solutions/procurement-approval-engine', label: 'Automation' },
] as const;

export const FOOTER_LEGAL = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of service' },
] as const;

export const CONTACT_EMAIL = 'hello@alfatechlabs.net';
