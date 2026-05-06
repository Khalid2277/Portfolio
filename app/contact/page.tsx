import {
  buildBreadcrumbList,
  ORGANIZATION_NODE,
  WEBSITE_NODE,
} from '@/data/jsonLd/sharedGraph';
import { ContactForm } from '@/components/composed/ContactForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';

const TITLE = 'Contact AlfaTechLabs — UAE Software, AI & Automation';
const DESCRIPTION =
  'Tell us about your project. We typically reply within one business day. Based in the United Arab Emirates.';

export const metadata = buildMetadata({
  path: '/contact',
  title: TITLE,
  description: DESCRIPTION,
});

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'ContactPage',
      '@id': 'https://alfatechlabs.net/contact#webpage',
      url: 'https://alfatechlabs.net/contact',
      name: 'Contact AlfaTechLabs',
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      about: { '@id': 'https://alfatechlabs.net/#organization' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
      mainEntity: {
        '@type': 'ContactPoint',
        email: 'hello@alfatechlabs.net',
        contactType: 'customer support',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    },
    buildBreadcrumbList({
      trail: [
        { name: 'Home', url: 'https://alfatechlabs.net/' },
        { name: 'Contact', url: 'https://alfatechlabs.net/contact' },
      ],
    }),
  ],
};

// Verbatim port of legacy contact.html — page hero + 2-card aside (contact info
// + "What happens next" ordered list) + ContactForm with FormSubmit endpoint
// + ContactPage JSON-LD with OpeningHoursSpecification.
export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />

      <section className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="container reveal">
          <Eyebrow>Contact</Eyebrow>
          <h1 style={{ marginTop: '1rem' }}>Tell us what you&apos;re trying to build.</h1>
          <p className="lead">
            We typically reply within one business day. Send a message, or book a 30-minute call
            directly with the team.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <aside className="reveal" style={{ alignSelf: 'start' }}>
              <div className="card" style={{ height: 'auto' }}>
                <div className="flow">
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--fs-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'var(--mist-40)',
                      }}
                    >
                      Email
                    </h4>
                    <a
                      href="mailto:hello@alfatechlabs.net"
                      className="mono"
                      style={{ fontSize: '1.05rem', color: 'var(--mist)' }}
                    >
                      hello@alfatechlabs.net
                    </a>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--fs-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'var(--mist-40)',
                      }}
                    >
                      Web
                    </h4>
                    <a
                      href="https://alfatechlabs.net"
                      className="mono"
                      style={{ fontSize: '1.05rem', color: 'var(--mist)' }}
                    >
                      alfatechlabs.net
                    </a>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--fs-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'var(--mist-40)',
                      }}
                    >
                      Location
                    </h4>
                    <p style={{ fontSize: '1.05rem', color: 'var(--mist)', margin: 0 }}>
                      United Arab Emirates
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--fs-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'var(--mist-40)',
                      }}
                    >
                      Hours
                    </h4>
                    <p style={{ fontSize: '1.05rem', color: 'var(--mist)', margin: 0 }}>
                      Sun–Thu · 09:00–18:00 GST
                    </p>
                  </div>
                </div>
              </div>
              <div className="card" style={{ marginTop: '1rem' }}>
                <h3>What happens next</h3>
                <ol
                  style={{
                    paddingLeft: '1.25rem',
                    color: 'var(--mist-60)',
                    lineHeight: 1.8,
                  }}
                >
                  <li>You send a brief.</li>
                  <li>We reply within one business day.</li>
                  <li>30-minute call to scope the metric.</li>
                  <li>Written proposal with pricing and timeline.</li>
                </ol>
              </div>
            </aside>

            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
