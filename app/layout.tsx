import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted via next/font (eliminates render-blocking Google Fonts CSS).
// Variable names match the legacy CSS (--font-sans / --font-display / --font-mono
// can be referenced directly in main.css).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// No-FOUC theme init — runs synchronously in <head> before paint so a saved
// "light" preference is applied before the first frame, matching legacy behavior.
const themeInitScript = `(function(){try{var t=localStorage.getItem('atl-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(_){}})();`;

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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Synchronous theme init — must run before paint to avoid FOUC. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
