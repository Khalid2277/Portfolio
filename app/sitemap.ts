import type { MetadataRoute } from 'next';

// Required by `output: 'export'` so Next renders a static sitemap.xml at build.
export const dynamic = 'force-static';

const SITE = 'https://alfatechlabs.net';

const SOLUTIONS = [
  'business-tracking',
  'agentic-rag',
  'car-wash-app',
  'corporate-knowledge-hub',
  'field-ops-app',
  'procurement-approval-engine',
  'sme-operations',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-07');
  const rootPages = [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/portfolio', priority: 0.9 },
    { path: '/contact', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
  ];

  return [
    ...rootPages.map(({ path, priority }) => ({
      url: path === '/' ? `${SITE}/` : `${SITE}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...SOLUTIONS.map((slug) => ({
      url: `${SITE}/solutions/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
