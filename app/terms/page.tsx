import {
  buildBreadcrumbList,
  ORGANIZATION_NODE,
  WEBSITE_NODE,
} from '@/data/jsonLd/sharedGraph';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';

const TITLE = 'Terms of Service — AlfaTechLabs';
const DESCRIPTION =
  'The terms governing the use of the AlfaTechLabs website and the engagement of AlfaTechLabs as a service provider.';

export const metadata = buildMetadata({
  path: '/terms',
  title: TITLE,
  description: DESCRIPTION,
});

const termsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'WebPage',
      '@id': 'https://alfatechlabs.net/terms#webpage',
      url: 'https://alfatechlabs.net/terms',
      name: TITLE,
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
      lastReviewed: '2026-05-07',
    },
    buildBreadcrumbList({
      trail: [
        { name: 'Home', url: 'https://alfatechlabs.net/' },
        { name: 'Terms', url: 'https://alfatechlabs.net/terms' },
      ],
    }),
  ],
};

// Verbatim port of legacy terms.html — every numbered section, every bullet,
// every link preserved. Only structural changes: <a> → <Link> for the email
// (still a mailto, so plain anchor); inline color from a style attr matched
// to the legacy iris-300 token.
export default function TermsPage() {
  return (
    <>
      <JsonLd data={termsJsonLd} />
      <section className="page-hero">
        <div className="container reveal">
          <span className="eyebrow">Legal</span>
          <h1 style={{ marginTop: '1rem' }}>Terms of service.</h1>
          <p className="lead">
            The terms that apply when you use this website. Service engagements are governed by a
            separate Master Services Agreement.
          </p>
          <p className="muted mono" style={{ fontSize: '0.9rem' }}>
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose reveal">
            <h2>1. Acceptance</h2>
            <p>
              By accessing alfatechlabs.net (the &quot;Site&quot;) you agree to these terms. If you
              do not agree, please do not use the Site.
            </p>

            <h2>2. About the Site</h2>
            <p>
              The Site is owned and operated by AlfaTechLabs, a software studio in the United Arab
              Emirates. The Site provides information about our company, services and work.
            </p>

            <h2>3. Permitted use</h2>
            <p>
              You may view, download and print pages from the Site for your own personal or
              internal business use, subject to these terms.
            </p>

            <h2>4. Restrictions</h2>
            <p>Without our prior written permission, you may not:</p>
            <ul>
              <li>republish material from the Site;</li>
              <li>sell, rent or sub-license material from the Site;</li>
              <li>
                reproduce, duplicate, copy or otherwise exploit material on the Site for a
                commercial purpose;
              </li>
              <li>edit or otherwise modify any material on the Site;</li>
              <li>or use the Site in any way that is or may be damaging to it or to its availability.</li>
            </ul>

            <h2>5. Intellectual property</h2>
            <p>
              All trademarks, logos, content and design elements on the Site are owned by
              AlfaTechLabs or used under licence. Nothing on the Site grants any licence to the
              AlfaTechLabs brand or any of our third-party trademarks.
            </p>

            <h2>6. No warranty</h2>
            <p>
              The Site is provided &quot;as is&quot;. We make no warranties of any kind, express or
              implied, including but not limited to warranties of accuracy, fitness for a
              particular purpose, or non-infringement.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, AlfaTechLabs is not liable for any indirect,
              incidental, special or consequential damages arising out of your use of the Site.
            </p>

            <h2>8. Service engagements</h2>
            <p>
              If you engage AlfaTechLabs to deliver software, automation or AI services, the
              engagement is governed by a separately signed Master Services Agreement and any
              applicable Statement of Work. Those documents take precedence over these terms in
              the event of conflict.
            </p>

            <h2>9. Governing law</h2>
            <p>
              These terms are governed by the laws of the United Arab Emirates. Any dispute is
              subject to the exclusive jurisdiction of the courts of the UAE.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions? Email{' '}
              <a href="mailto:hello@alfatechlabs.net" style={{ color: 'var(--iris-300)' }}>
                hello@alfatechlabs.net
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
