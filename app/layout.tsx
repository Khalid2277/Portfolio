import type { Metadata, Viewport } from 'next';
import { Chrome } from '@/components/chrome/Chrome';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

// Fonts are loaded via Google Fonts <link> tag (see <head> below) rather than
// next/font, so the legacy `font-family: 'Inter'` / `'Space Grotesk'` /
// `'JetBrains Mono'` rules in main.css resolve unchanged.

export const viewport: Viewport = {
  themeColor: '#070912',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://alfatechlabs.net'),
  title: {
    default: 'AlfaTechLabs — Software, Automation & Secure AI for the UAE',
    template: '%s — AlfaTechLabs',
  },
  description:
    'AlfaTechLabs builds custom software, intelligent automation, and secure agentic AI systems for SMEs, enterprises, and government bodies across the UAE.',
  applicationName: 'AlfaTechLabs',
  authors: [{ name: 'AlfaTechLabs' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/assets/svg/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'AlfaTechLabs',
    locale: 'en_AE',
    images: [
      {
        url: '/assets/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AlfaTechLabs — Software, automation, and secure AI for the UAE.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og/og-default.png'],
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Synchronous theme init — must run before paint to avoid FOUC. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Google Fonts — same families as the legacy site so main.css's
            `font-family: 'Inter'` / `'Space Grotesk'` / `'JetBrains Mono'`
            rules resolve directly. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
