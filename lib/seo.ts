import type { Metadata } from 'next';

export const SITE_URL = 'https://alfatechlabs.net';

interface BuildMetadataInput {
  // Path of the route relative to the site root, with leading slash and no trailing slash.
  // E.g. '/about', '/terms', '/solutions/business-tracking', '/'.
  path: string;
  title: string;
  description: string;
  // Optional override; defaults to /assets/og/og-default.png.
  ogImage?: string;
  // If false, page will be marked noindex (e.g. for unfinished routes).
  index?: boolean;
}

// Builds a Next.js Metadata object that matches the legacy meta-tag set:
// canonical, OG, Twitter card, robots. The values match the live tags exactly
// (verified during phase 9). One helper instead of repeating the same boilerplate
// across every page.
export function buildMetadata({
  path,
  title,
  description,
  ogImage = '/assets/og/og-default.png',
  index = true,
}: BuildMetadataInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const fullOg = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    // `absolute` bypasses the layout's title.template so legacy titles like
    // "Terms of Service — AlfaTechLabs" don't get double-suffixed.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'AlfaTechLabs',
      title,
      description,
      url,
      locale: 'en_AE',
      images: [
        {
          url: fullOg,
          width: 1200,
          height: 630,
          alt: 'AlfaTechLabs — Software, automation, and secure AI for the UAE.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOg],
    },
    robots: index
      ? 'index, follow, max-image-preview:large, max-snippet:-1'
      : 'noindex, nofollow',
  };
}
