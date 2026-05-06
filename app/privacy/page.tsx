import {
  buildBreadcrumbList,
  ORGANIZATION_NODE,
  WEBSITE_NODE,
} from '@/data/jsonLd/sharedGraph';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';

const TITLE = 'Privacy Policy — AlfaTechLabs';
const DESCRIPTION =
  'How AlfaTechLabs collects, uses, and protects information when you visit our site or engage us as a client.';

export const metadata = buildMetadata({
  path: '/privacy',
  title: TITLE,
  description: DESCRIPTION,
});

const privacyJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'WebPage',
      '@id': 'https://alfatechlabs.net/privacy#webpage',
      url: 'https://alfatechlabs.net/privacy',
      name: TITLE,
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
      lastReviewed: '2026-05-07',
    },
    buildBreadcrumbList({
      trail: [
        { name: 'Home', url: 'https://alfatechlabs.net/' },
        { name: 'Privacy', url: 'https://alfatechlabs.net/privacy' },
      ],
    }),
  ],
};

// Verbatim port of legacy privacy.html — every numbered section, every bullet,
// every <strong>, every email link preserved.
export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={privacyJsonLd} />
      <section className="page-hero">
        <div className="container reveal">
          <span className="eyebrow">Legal</span>
          <h1 style={{ marginTop: '1rem' }}>Privacy policy.</h1>
          <p className="lead">
            How AlfaTechLabs collects, uses, and protects information when you visit our site or
            engage us as a client.
          </p>
          <p className="muted mono" style={{ fontSize: '0.9rem' }}>
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose reveal">
            <h2>1. Who we are</h2>
            <p>
              AlfaTechLabs is a software studio incorporated in the United Arab Emirates. You can
              reach our privacy team at{' '}
              <a href="mailto:hello@alfatechlabs.net" style={{ color: 'var(--iris-300)' }}>
                hello@alfatechlabs.net
              </a>
              .
            </p>

            <h2>2. What we collect</h2>
            <p>We keep data collection deliberately small.</p>
            <ul>
              <li>
                <strong>Contact form data</strong> — name, email, company, and the message you
                write to us.
              </li>
              <li>
                <strong>Operational data</strong> — basic web analytics (page, referrer, country,
                device type) used to improve the site. We do not use third-party advertising
                trackers.
              </li>
              <li>
                <strong>Client engagement data</strong> — information you share during a project
                (subject to a separate Master Services Agreement and any client-specific data
                processing terms).
              </li>
            </ul>

            <h2>3. How we use it</h2>
            <ul>
              <li>To respond to your enquiry and arrange a follow-up.</li>
              <li>To improve our website and the relevance of our content.</li>
              <li>To meet our legal, accounting and contractual obligations.</li>
            </ul>
            <p>
              We do not sell your data. We do not share it with third parties except as required
              to deliver the service you&apos;ve engaged us for, or to comply with applicable law.
            </p>

            <h2>4. Where we store it</h2>
            <p>
              We store data with reputable cloud providers in the EU and the UAE. Where a client
              requires on-prem deployment of any system we deliver, that system runs entirely
              inside the client&apos;s perimeter and we do not retain copies of client data.
            </p>

            <h2>5. How long we keep it</h2>
            <p>
              Contact form messages are retained for up to 24 months. Project data is retained
              for the duration of the engagement plus the period required by applicable law and
              our agreement with you.
            </p>

            <h2>6. Your rights</h2>
            <p>
              You can ask us to access, correct or delete personal data we hold about you. Email{' '}
              <a href="mailto:hello@alfatechlabs.net" style={{ color: 'var(--iris-300)' }}>
                hello@alfatechlabs.net
              </a>{' '}
              and we will respond within 30 days.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use a small set of strictly-necessary cookies for site function and aggregated
              analytics. We do not use advertising cookies.
            </p>

            <h2>8. Updates</h2>
            <p>
              If we make material changes to this policy we will update the date above and, where
              appropriate, notify you directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
