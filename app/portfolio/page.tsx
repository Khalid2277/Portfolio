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
import { WorkCard } from '@/components/ui/WorkCard';
import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';
import {
  MockupAgenticRag,
  MockupBusinessTracking,
  MockupCarWashApp,
  MockupCorporateKnowledgeHub,
  MockupFieldOps,
  MockupProcurementApproval,
  MockupSmeOperations,
} from './mockups';

const TITLE = 'Portfolio — AlfaTechLabs';
const DESCRIPTION =
  'Selected projects, services and process: business tracking, agentic RAG knowledge platforms, mobile apps, custom enterprise systems and SME operations cockpits.';

export const metadata = buildMetadata({
  path: '/portfolio',
  title: TITLE,
  description: DESCRIPTION,
});

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_NODE,
    WEBSITE_NODE,
    {
      '@type': 'CollectionPage',
      '@id': 'https://alfatechlabs.net/portfolio#webpage',
      url: 'https://alfatechlabs.net/portfolio',
      name: 'AlfaTechLabs Portfolio',
      isPartOf: { '@id': 'https://alfatechlabs.net/#website' },
      about: { '@id': 'https://alfatechlabs.net/#organization' },
      description: DESCRIPTION,
      inLanguage: 'en-AE',
      hasPart: [
        { '@type': 'CreativeWork', name: 'Business Tracking Software', url: 'https://alfatechlabs.net/solutions/business-tracking' },
        { '@type': 'CreativeWork', name: 'Agentic RAG AI Systems', url: 'https://alfatechlabs.net/solutions/agentic-rag' },
        { '@type': 'CreativeWork', name: 'On-demand Car Wash Platform', url: 'https://alfatechlabs.net/solutions/car-wash-app' },
        { '@type': 'CreativeWork', name: 'Corporate Knowledge Hub', url: 'https://alfatechlabs.net/solutions/corporate-knowledge-hub' },
        { '@type': 'CreativeWork', name: 'Field-Ops Mobile App', url: 'https://alfatechlabs.net/solutions/field-ops-app' },
        { '@type': 'CreativeWork', name: 'Procurement Approval Engine', url: 'https://alfatechlabs.net/solutions/procurement-approval-engine' },
        { '@type': 'CreativeWork', name: 'SME Operations Platform', url: 'https://alfatechlabs.net/solutions/sme-operations' },
      ],
    },
    buildBreadcrumbList({
      trail: [
        { name: 'Home', url: 'https://alfatechlabs.net/' },
        { name: 'Portfolio', url: 'https://alfatechlabs.net/portfolio' },
      ],
    }),
  ],
};

// Verbatim port of legacy portfolio.html — page hero, 7 work cards (each with
// its full inline-SVG mockup), 6-card services, 4-card process, CTA banner.
export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={portfolioJsonLd} />

      <section className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="container reveal">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 style={{ marginTop: '1rem' }}>Selected work, shipped.</h1>
          <p className="lead">
            Seven platforms in production, six engineering capabilities, one delivery team. Pick
            the case study that looks like your problem — or scroll on for the services and
            process behind every shipment.
          </p>
        </div>
      </section>

      {/* Work grid — 7 case studies */}
      <section className="section">
        <div className="container">
          <div className="work-grid reveal-stagger">
            <WorkCard
              href="/solutions/business-tracking"
              art={<MockupBusinessTracking />}
              eyebrow="Business tracking software"
              title="Enterprise business tracking"
              body="Multi-branch operations cockpit for a UAE retail group — POS, inventory and margin tracking unified in real-time."
              tags={['POS', 'Inventory', 'Analytics']}
            />
            <WorkCard
              href="/solutions/agentic-rag"
              art={<MockupAgenticRag />}
              eyebrow="Agentic RAG AI"
              title="Government AI knowledge system"
              body="Audit-grade, on-prem RAG platform for a public-sector body. Role-aware, source-cited, fully air-gapped."
              tags={['RAG', 'Government', 'On-prem']}
            />
            <WorkCard
              href="/solutions/sme-operations"
              art={<MockupSmeOperations />}
              eyebrow="Business tracking software"
              title="SME operations platform"
              body="Lightweight ops cockpit for a fast-growing SME — sales, stock, staff, all in one screen, ready in six weeks."
              tags={['SME', 'POS', 'Inventory']}
            />
            <WorkCard
              href="/solutions/corporate-knowledge-hub"
              art={<MockupCorporateKnowledgeHub />}
              eyebrow="Knowledge management"
              title="Corporate knowledge hub"
              body="Internal-only knowledge agent for an enterprise — every answer cited, every access logged, nothing leaves the perimeter."
              tags={['Knowledge', 'Enterprise', 'RAG']}
            />
            <WorkCard
              href="/solutions/procurement-approval-engine"
              art={<MockupProcurementApproval />}
              eyebrow="Operational automation"
              title="Procurement approval engine"
              body="A configurable approval-routing engine for an enterprise procurement team — replaces a 9-step manual process."
              tags={['Workflow', 'Enterprise', 'Automation']}
            />
            <WorkCard
              href="/solutions/car-wash-app"
              art={<MockupCarWashApp />}
              eyebrow="Mobile · Flutter · Live build"
              title="On-demand car wash platform"
              body="A two-app Flutter ecosystem we're actively shipping for a UAE car wash startup — customer booking app + operations admin app, real-time job queue."
              tags={['Flutter', 'Firebase', 'Realtime', 'UAE']}
            />
            <WorkCard
              href="/solutions/field-ops-app"
              art={<MockupFieldOps />}
              eyebrow="Mobile · Custom"
              title="Field-ops mobile app"
              body="A cross-platform field-operations app for site visits — offline-first, photo capture, auto-sync, auto-report."
              tags={['Mobile', 'Offline-first', 'Field-ops']}
            />
          </div>
        </div>
      </section>

      {/* Services — 6 cards */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Services" title="Six engineering capabilities." />
          <div className="grid cols-3 reveal-stagger">
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="3" width="18" height="14" rx="2" />
                  <path d="M3 8h18M7 17v4M17 17v4M5 21h14" />
                </svg>
              </div>
              <h3>Web development</h3>
              <p>
                Custom web applications and platforms on modern frameworks, with performance, SEO
                and secure auth baked in.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <h3>Mobile app development</h3>
              <p>
                iOS and Android native plus cross-platform (Flutter / React Native), with secure
                APIs and backend integration.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </div>
              <h3>Software development</h3>
              <p>
                Custom enterprise software, internal tools, APIs and integrations — scalable,
                cloud-ready, maintainable.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19 12a7 7 0 0 0-14 0M12 5V2M12 22v-3" />
                </svg>
              </div>
              <h3>Agentic RAG AI systems</h3>
              <p>
                Secure document search and Q&amp;A, audit logs, RBAC, on-prem deployment,
                customisable workflows.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <h3>Customised systems</h3>
              <p>
                Custom dashboards, business portals, internal tools, workflow systems —
                integrated with what you already run.
              </p>
            </Card>
            <Card>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 12h4l2-7 4 14 2-7h6" />
                </svg>
              </div>
              <h3>Automate anything</h3>
              <p>
                Notifications, approvals, integrations, reporting pipelines, event triggers,
                custom automation scripts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process — 4 numbered phases */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Process" title="From whiteboard to production in four phases." />
          <div className="grid cols-4 reveal-stagger">
            <Card>
              <div className="card-num">PHASE 01</div>
              <h3 style={{ marginTop: '0.5rem' }}>Discover</h3>
              <p>
                One-week diagnostic. We meet your team, audit the current stack, and agree the
                metric we&apos;re going to move.
              </p>
            </Card>
            <Card>
              <div className="card-num">PHASE 02</div>
              <h3 style={{ marginTop: '0.5rem' }}>Architect</h3>
              <p>
                Solution design, security model, integration map, delivery plan with weekly
                checkpoints.
              </p>
            </Card>
            <Card>
              <div className="card-num">PHASE 03</div>
              <h3 style={{ marginTop: '0.5rem' }}>Build</h3>
              <p>
                Two-week sprints, demo every Friday, staging environment from day one. You own
                the repo.
              </p>
            </Card>
            <Card>
              <div className="card-num">PHASE 04</div>
              <h3 style={{ marginTop: '0.5rem' }}>Operate</h3>
              <p>
                Production support, observability, roadmap iteration. We stay in the loop after
                launch.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <CtaBanner
            eyebrow="Ship the next one with us"
            title="Bring us the metric. We'll bring the system."
          >
            <Button href="/contact" variant="primary" size="lg" magnetic>
              Start a project
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
