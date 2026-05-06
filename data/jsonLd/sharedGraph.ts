// Shared schema-org graph nodes (Organization + WebSite) reused across every
// page's JSON-LD payload. Each page's own page-specific node (WebPage,
// AboutPage, ContactPage, Service, etc.) and BreadcrumbList are added at use site.
//
// Values are byte-equivalent to the legacy <script type="application/ld+json">
// blocks; verified in phase 9.

export const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': 'https://alfatechlabs.net/#organization',
  name: 'AlfaTechLabs',
  url: 'https://alfatechlabs.net/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://alfatechlabs.net/assets/favicon/android-chrome-512x512.png',
    width: 512,
    height: 512,
  },
  image: 'https://alfatechlabs.net/assets/og/og-default.png',
  email: 'hello@alfatechlabs.net',
  description:
    'AlfaTechLabs builds custom software, intelligent automation, and secure agentic AI systems for SMEs, enterprises, and government bodies across the UAE.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AE',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@alfatechlabs.net',
    contactType: 'customer support',
    areaServed: 'AE',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: [],
} as const;

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': 'https://alfatechlabs.net/#website',
  url: 'https://alfatechlabs.net/',
  name: 'AlfaTechLabs',
  description: 'Custom software, automation, and secure AI for the UAE.',
  publisher: { '@id': 'https://alfatechlabs.net/#organization' },
  inLanguage: 'en-AE',
} as const;

export const HOME_BREADCRUMB_ITEM = {
  '@type': 'ListItem',
  position: 1,
  name: 'Home',
  item: 'https://alfatechlabs.net/',
} as const;

interface BreadcrumbInput {
  /** All trail items including Home as position 1. */
  trail: { name: string; url: string }[];
}

export function buildBreadcrumbList({ trail }: BreadcrumbInput) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
