import type { MetadataRoute } from 'next';

// Required by `output: 'export'` so Next renders a static robots.txt at build.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://alfatechlabs.net/sitemap.xml',
  };
}
