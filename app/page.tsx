import {
  buildBreadcrumbList,
  ORGANIZATION_NODE,
  WEBSITE_NODE,
} from '@/data/jsonLd/sharedGraph';
import { DashboardCockpit } from '@/components/composed/DashboardCockpit';
import { Counter } from '@/components/motion/Counter';
import { HeroParticles } from '@/components/motion/HeroParticles';
import { TextReveal } from '@/components/motion/TextReveal';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/SectionHead';
import { WorkCard } from '@/components/ui/WorkCard';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';
import {
  MockupAgenticRag,
  MockupBusinessTracking,
  MockupCorporateKnowledgeHub,
  MockupSmeOperations,
} from './portfolio/mockups';
import { HeroScene } from './(home)/HeroScene';

const TITLE = 'AlfaTechLabs — Software, Automation & Secure AI for the UAE';
const DESCRIPTION =
  'AlfaTechLabs builds custom software, intelligent automation, and secure agentic AI systems for SMEs, enterprises, and government bodies across the UAE.';

export const metadata = buildMetadata({
  path: '/',
  title: TITLE,
  description: DESCRIPTION,
});

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'WebPage',
      '@id': 'https://alfatechlabs.net/#webpage',
      url: 'https://alfatechlabs.net/',
      name: TITLE,
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      about: { '@id': 'https://alfatechlabs.net/#organization' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
    },
    buildBreadcrumbList({
      trail: [{ name: 'Home', url: 'https://alfatechlabs.net/' }],
    }),
  ],
};

const SERVICES_FAQ = [
  {
    trigger: 'Business tracking software',
    content: (
      <>
        <p>
          End-to-end visibility for retail, F&amp;B and SMEs — sales, payments, inventory, costs,
          and people, in one calm interface.
        </p>
        <ul className="feature-list">
          <li>Real-time sales &amp; revenue tracking</li>
          <li>POS system &amp; payment processing</li>
          <li>Inventory management with low-stock alerts &amp; multi-location support</li>
          <li>Cost control and margin tracking</li>
          <li>Automated daily / weekly / monthly reports</li>
          <li>Role-based access control (admin / manager / staff)</li>
        </ul>
      </>
    ),
  },
  {
    trigger: 'Agentic RAG AI systems',
    content: (
      <>
        <p>
          Secure document search, Q&amp;A and agentic workflows — engineered for organisations that
          can&apos;t trade data for convenience.
        </p>
        <ul className="feature-list">
          <li>Secure internal document search and Q&amp;A</li>
          <li>Audit logs and role-based access control</li>
          <li>Enterprise &amp; government readiness</li>
          <li>Privacy-first architecture, on-prem options</li>
          <li>Customisable to your organisation&apos;s workflows</li>
        </ul>
      </>
    ),
  },
  {
    trigger: 'Web development',
    content: (
      <>
        <p>
          Custom web applications and platforms built on modern frameworks, with performance and
          security baked in.
        </p>
        <ul className="feature-list">
          <li>Custom web applications and platforms</li>
          <li>Modern frontend frameworks &amp; scalable backend</li>
          <li>Performance optimisation and SEO-ready builds</li>
          <li>Secure authentication and role-based access</li>
        </ul>
      </>
    ),
  },
  {
    trigger: 'Mobile app development',
    content: (
      <ul className="feature-list">
        <li>iOS and Android app development</li>
        <li>Cross-platform solutions (Flutter / React Native)</li>
        <li>Secure APIs and backend integration</li>
        <li>App performance optimisation and scalability</li>
      </ul>
    ),
  },
  {
    trigger: 'Customised systems',
    content: (
      <ul className="feature-list">
        <li>Custom dashboards and analytics</li>
        <li>Business portals and web applications</li>
        <li>Internal tools and workflow systems</li>
        <li>Integration with existing systems</li>
        <li>Scalable architecture, ongoing support</li>
      </ul>
    ),
  },
  {
    trigger: 'Automate anything',
    content: (
      <ul className="feature-list">
        <li>Automated notifications and alerts</li>
        <li>Approval workflows and routing</li>
        <li>System integrations and APIs</li>
        <li>Reporting pipelines and data processing</li>
        <li>Workflow triggers and event automation</li>
        <li>Custom automation scripts and tools</li>
      </ul>
    ),
  },
];

// Verbatim port of legacy index.html. Every section preserved:
// 1. Hero (text-reveal h1, lead, CTA pair, hero stats counters, glow + scene + particles)
// 2. Trust strip
// 3. Capabilities — 3 cards
// 4. Capability strip — 3 items
// 5. Operations cockpit — DashboardCockpit (6 panels)
// 6. About teaser
// 7. Services accordion — 6 items
// 8. Recent work — 4 work cards
// 9. CTA banner
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <HeroScene />
        <HeroParticles />
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow reveal-up">Software · Automation · AI · UAE</span>
            <h1>
              <TextReveal>Software, automation, and secure AI</TextReveal>{' '}
              <TextReveal style={{ color: 'var(--fg-muted)', fontWeight: 600 }}>
                — engineered for the businesses building the
              </TextReveal>{' '}
              <span className="accent uae-flag-text">UAE.</span>
            </h1>
            <p className="hero-sub reveal-up" style={{ transitionDelay: '.6s' }}>
              AlfaTechLabs designs custom platforms, agentic AI systems, and operations software
              for SMEs, enterprises, and government. We turn operational complexity into
              measurable clarity.
            </p>
            <div className="hero-cta reveal-up" style={{ transitionDelay: '.8s' }}>
              <Button href="/contact" variant="primary" size="lg" magnetic>
                Book a Demo
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Button>
              <Button href="/portfolio" variant="outline" size="lg" magnetic>
                View Portfolio
              </Button>
            </div>
            <div className="hero-stats reveal-stagger">
              <div>
                <div className="stat-num mono">
                  <Counter target={50} suffix="+" />
                </div>
                <div className="stat-label">Projects delivered</div>
              </div>
              <div>
                <div className="stat-num mono">
                  <Counter target={99} suffix="%" />
                </div>
                <div className="stat-label">Client satisfaction</div>
              </div>
              <div>
                <div className="stat-num mono">24/7</div>
                <div className="stat-label">Support available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ padding: '1.5rem 0 0' }}>
        <div className="container reveal">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--line)',
              borderRadius: 9999,
              background: 'color-mix(in oklab, var(--bg-elev) 60%, transparent)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span
              className="mono"
              style={{
                color: 'var(--fg-soft)',
                fontSize: '.78rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}
            >
              Trusted by
            </span>
            <span className="muted" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
              UAE Government
            </span>
            <Dot />
            <span className="muted" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
              Retail Groups
            </span>
            <Dot />
            <span className="muted" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
              F&amp;B Chains
            </span>
            <Dot />
            <span className="muted" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
              Enterprise IT
            </span>
            <Dot />
            <span className="muted" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
              Public Sector
            </span>
          </div>
        </div>
      </section>

      {/* Capabilities — 3 cards */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="What we bring to your business."
            lead="Three product pillars that compound into one outcome — operations that you can measure, automate, and trust."
          />
          <div className="grid cols-3 reveal-stagger">
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 4 4 5-6" />
                  </svg>
                </div>
                <span className="card-num">01</span>
              </div>
              <h3>Real-time insights</h3>
              <p>
                Dashboards, reporting pipelines, and live KPIs that turn fragmented data into
                decisions you can act on the same day.
              </p>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                  </svg>
                </div>
                <span className="card-num">02</span>
              </div>
              <h3>Operational automation</h3>
              <p>
                Approvals, notifications, integrations and reporting — orchestrated end-to-end so
                your team stops firefighting and starts compounding.
              </p>
            </Card>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <span className="card-num">03</span>
              </div>
              <h3>Secure AI knowledge systems</h3>
              <p>
                Agentic RAG with audit-grade access control, on-prem deployment options, and
                privacy-first architecture for enterprise and government.
              </p>
            </Card>
          </div>

          <div className="capability-strip reveal-up" style={{ marginTop: '2rem' }}>
            <div className="item">
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <h4>Outcome-led discovery</h4>
                <p>We start with the metric you&apos;re trying to move, then design backwards.</p>
              </div>
            </div>
            <div className="item">
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
              </div>
              <div>
                <h4>Audit-grade engineering</h4>
                <p>RBAC, audit logs and on-prem options on every system we deliver.</p>
              </div>
            </div>
            <div className="item">
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h4>Built to keep shipping</h4>
                <p>Long-term maintenance, observability, and roadmap support after launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations cockpit */}
      <section className="section">
        <div className="container">
          <div
            className="section-head reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <Eyebrow>Live preview</Eyebrow>
              <h2 style={{ marginTop: '1rem' }}>A glimpse of the operations cockpit.</h2>
            </div>
            <a href="/solutions/business-tracking" className="link-underline">
              See the full product →
            </a>
          </div>
          <DashboardCockpit />
        </div>
      </section>

      {/* About teaser */}
      <section className="section">
        <div className="container split">
          <div className="reveal-left">
            <Eyebrow>Company</Eyebrow>
            <h2 style={{ marginTop: '1rem', fontSize: 'var(--fs-h2)', maxWidth: '14ch' }}>
              Empowering UAE businesses with intelligent technology.
            </h2>
          </div>
          <div className="reveal-right flow">
            <p className="lead">
              AlfaTechLabs is a UAE-based software and AI studio. We help SMEs, enterprises, and
              government bodies replace manual processes with intelligent systems — from POS and
              operations tracking to agentic RAG knowledge platforms.
            </p>
            <p>
              We believe technology should elevate the way people live, work, and build. Our work
              is closely aligned with the UAE&apos;s ambition to lead in innovation, AI, and smart
              governance.
            </p>
            <Button href="/about" variant="outline" style={{ marginTop: '1rem' }}>
              Learn about us
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Services accordion */}
      <section className="section">
        <div className="container split">
          <div className="reveal-left">
            <Eyebrow>Services</Eyebrow>
            <h2 style={{ marginTop: '1rem', maxWidth: '12ch' }}>
              Six engineering capabilities. One delivery team.
            </h2>
            <p className="muted" style={{ marginTop: '1rem' }}>
              Pick a service to see what&apos;s included.
            </p>
          </div>
          <div className="reveal-right">
            <Accordion items={SERVICES_FAQ} defaultOpenIndex={0} singleOpen />
            <Button href="/portfolio" variant="outline" style={{ marginTop: '2rem' }}>
              View portfolio
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent work — 4 work cards */}
      <section className="section">
        <div className="container">
          <div
            className="section-head reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <h2 style={{ marginTop: '1rem' }}>Recent work.</h2>
            </div>
            <a href="/portfolio" className="btn btn-ghost link-underline">
              All projects →
            </a>
          </div>

          <div className="work-grid reveal-stagger">
            <WorkCard
              href="/solutions/business-tracking"
              art={<MockupBusinessTracking />}
              eyebrow="Business tracking software"
              title="Enterprise business tracking"
              body="A unified operations layer for a UAE retail group — real-time POS, inventory and margin tracking across branches."
              tags={['POS', 'Inventory', 'Analytics']}
            />
            <WorkCard
              href="/solutions/agentic-rag"
              art={<MockupAgenticRag />}
              eyebrow="Agentic RAG AI"
              title="Government AI knowledge system"
              body="An audit-grade RAG platform for a public-sector body — on-prem, role-aware, and answerable for every query."
              tags={['RAG', 'Government', 'On-prem']}
            />
            <WorkCard
              href="/solutions/sme-operations"
              art={<MockupSmeOperations />}
              eyebrow="Business tracking software"
              title="SME operations platform"
              body="A lightweight, multi-branch operations cockpit for a fast-growing SME — sales, stock, staff, all in one screen."
              tags={['SME', 'POS', 'Inventory']}
            />
            <WorkCard
              href="/solutions/corporate-knowledge-hub"
              art={<MockupCorporateKnowledgeHub />}
              eyebrow="Knowledge management"
              title="Corporate knowledge hub"
              body="An internal-only knowledge agent for an enterprise — every answer cited, every access logged, nothing leaves the perimeter."
              tags={['Knowledge', 'Enterprise', 'RAG']}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <CtaBanner
            eyebrow="Get started"
            title="Ready to transform your business?"
            body="Let's discuss how our solutions can help you achieve your goals. Book a free consultation with our team."
          >
            <Button href="/contact" variant="primary" size="lg" magnetic>
              Book a Demo
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
            <Button href="/portfolio" variant="outline" size="lg" magnetic>
              View portfolio
            </Button>
          </CtaBanner>
        </div>
      </section>
    </>
  );
}

function Dot() {
  return <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--fg-soft)' }} />;
}
