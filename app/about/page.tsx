import {
  buildBreadcrumbList,
  ORGANIZATION_NODE,
  WEBSITE_NODE,
} from '@/data/jsonLd/sharedGraph';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/SectionHead';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';
import {
  AccessibleIllustration,
  ClarityIllustration,
  FutureReadyIllustration,
  StatsIllustration,
  TrustIllustration,
} from './illustrations';

const TITLE = 'About — AlfaTechLabs';
const DESCRIPTION =
  'A founder-led UAE software studio building intelligent automation, custom systems and secure AI for SMEs, enterprises and government.';

export const metadata = buildMetadata({
  path: '/about',
  title: TITLE,
  description: DESCRIPTION,
});

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'AboutPage',
      '@id': 'https://alfatechlabs.net/about#webpage',
      url: 'https://alfatechlabs.net/about',
      name: 'About AlfaTechLabs',
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      about: { '@id': 'https://alfatechlabs.net/#organization' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
    },
    buildBreadcrumbList({
      trail: [
        { name: 'Home', url: 'https://alfatechlabs.net/' },
        { name: 'About', url: 'https://alfatechlabs.net/about' },
      ],
    }),
  ],
};

// Verbatim port of legacy about.html — page hero, founder's message, 4 values
// with custom inline-SVG illustrations, 4 principles, 4 sectors, stats panel
// with iso-platform SVG, CTA banner, full JSON-LD graph.
export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />

      {/* Page hero */}
      <section className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="container reveal">
          <Eyebrow>About</Eyebrow>
          <h1 style={{ marginTop: '1rem' }}>Engineering the operating layer of UAE business.</h1>
          <p className="lead">
            AlfaTechLabs is a UAE-based software studio. We design and build the intelligent
            systems that turn manual operations into compounding advantage.
          </p>
        </div>
      </section>

      {/* Founder's message */}
      <section className="section">
        <div className="container split">
          <div className="reveal">
            <Eyebrow>Founder&apos;s message</Eyebrow>
          </div>
          <div className="reveal flow">
            <p className="lead">
              At AlfaTechLabs, we believe technology should elevate the way people live, work, and
              build. Our mission is to transform everyday operations through intelligent automation
              — and to make digital transformation accessible to every business, not just the
              largest organisations.
            </p>
            <p>
              By designing powerful software, automated systems, and secure AI solutions, we remove
              friction from daily processes and unlock new levels of efficiency, clarity, and
              growth.
            </p>
            <p>
              Our vision is closely aligned with the UAE&apos;s ambition to lead in innovation,
              artificial intelligence, and smart governance — where technology serves as a
              foundation for progress, productivity, and an improved quality of life across every
              sector.
            </p>
            <p
              style={{
                marginTop: '2rem',
                textAlign: 'right',
                fontStyle: 'italic',
                color: 'var(--mist-60)',
              }}
            >
              — Khalid Al Fahim, Founder
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we believe"
            title="The values behind every system we ship."
            lead={
              <>
                Four ideas we keep coming back to. They shape what we build, who we build it for,
                and the standards we refuse to compromise on.
              </>
            }
          />
          <div className="grid cols-2 reveal-stagger">
            <Card>
              <ClarityIllustration />
              <h3>Clarity over complexity</h3>
              <p>
                We believe technology should simplify life, not complicate it. We build clear,
                intuitive systems that remove friction and make operations easy to understand and
                manage.
              </p>
            </Card>
            <Card>
              <TrustIllustration />
              <h3>Trust, security, and responsibility</h3>
              <p>
                We treat data, systems, and AI with the highest level of responsibility. Security,
                privacy, and transparency form the foundation of everything we build.
              </p>
            </Card>
            <Card>
              <FutureReadyIllustration />
              <h3>Future-ready innovation for the UAE</h3>
              <p>
                We&apos;re committed to supporting the UAE&apos;s vision for a smart, innovative,
                and AI-driven economy. Our work aligns with national goals around digital
                transformation, efficiency, and sustainable technological progress.
              </p>
            </Card>
            <Card>
              <AccessibleIllustration />
              <h3>Accessible innovation</h3>
              <p>
                We believe advanced technology should be accessible to everyone. Our goal is to
                make digital transformation achievable for startups, enterprises, and public
                institutions alike.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="Four principles that decide every line we ship." />
          <div className="grid cols-2 reveal-stagger">
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Outcome before output</h3>
              <p>
                We begin with the metric you want to improve — revenue per branch, hours saved per
                week, response time, or operational efficiency — then design the system backwards
                from that goal.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Audit-grade by default</h3>
              <p>
                RBAC, audit logs, encryption in transit and at rest, and on-premise deployment
                options are built in from the start, even for our smallest engagements.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <h3>Calm interfaces</h3>
              <p>
                The best dashboard is the one your team can check once and trust. We design for
                clarity, confidence, and low cognitive load — not just attractive screenshots.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M3.3 7L12 12l8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <h3>Built to keep shipping</h3>
              <p>
                We architect with the year-three roadmap in mind from day one. Long-term
                maintenance, observability, and roadmap support are part of the relationship.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section">
        <div className="container split">
          <div className="reveal">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 style={{ marginTop: '1rem', maxWidth: '14ch' }}>Sectors we know how to ship into.</h2>
          </div>
          <div className="reveal grid cols-2" style={{ gap: '1rem' }}>
            <Card>
              <h3>Government &amp; public sector</h3>
              <p>Knowledge platforms, citizen-facing portals, audit-ready data systems.</p>
            </Card>
            <Card>
              <h3>Retail &amp; F&amp;B</h3>
              <p>POS, inventory, multi-branch tracking, automated reporting.</p>
            </Card>
            <Card>
              <h3>Enterprise</h3>
              <p>Internal tools, dashboards, integrations, secure RAG agents.</p>
            </Card>
            <Card>
              <h3>SMEs &amp; growth-stage</h3>
              <p>Operations cockpits, custom platforms, founder-friendly engineering velocity.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats panel */}
      <section className="section">
        <div className="container">
          <div
            className="card reveal grid cols-2"
            style={{ padding: 'clamp(2rem,5vw,4rem)', gap: '3rem', alignItems: 'center' }}
          >
            <div>
              <Eyebrow>By the numbers</Eyebrow>
              <h2 style={{ marginTop: '1rem' }}>Small enough to care. Engineered to scale.</h2>
              <p className="muted">
                A senior, hands-on team — every project has the founder reachable.
              </p>
              <div className="grid cols-3" style={{ marginTop: '2rem', gap: '1rem' }}>
                <div>
                  <div className="stat-num mono">50+</div>
                  <div className="stat-label">Projects delivered</div>
                </div>
                <div>
                  <div className="stat-num mono">99%</div>
                  <div className="stat-label">Client satisfaction</div>
                </div>
                <div>
                  <div className="stat-num mono">24/7</div>
                  <div className="stat-label">Support available</div>
                </div>
              </div>
            </div>
            <div>
              <StatsIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <CtaBanner
            eyebrow="Get started"
            title="Let's build the next thing your team can't live without."
            body="One conversation. One whiteboard. We'll show you what's possible inside two weeks."
          >
            <Button href="/contact" variant="primary" size="lg" magnetic>
              Start a conversation
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
          </CtaBanner>
        </div>
      </section>
    </>
  );
}
