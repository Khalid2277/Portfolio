import Link from 'next/link';
import {
  CONTACT_EMAIL,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  FOOTER_SOLUTIONS,
} from '@/data/navigation';
import { Brand } from './Brand';

// Direct port of the legacy `.site-footer` block. Same DOM, same classes —
// main.css styles it untouched. Year stamps via new Date() at render time.
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand className="" />
            <p style={{ color: 'var(--fg-muted)', maxWidth: '36ch', marginTop: '1rem' }}>
              Amplifying businesses through powerful software + AI. Based in the United Arab
              Emirates.
            </p>
            <p
              className="mono"
              style={{ marginTop: '1rem', color: 'var(--fg-soft)', fontSize: '0.9rem' }}
            >
              {CONTACT_EMAIL}
            </p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            {FOOTER_COMPANY.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            {FOOTER_SOLUTIONS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            {FOOTER_LEGAL.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © <span data-year>{year}</span> AlfaTechLabs · United Arab Emirates
          </span>
        </div>
      </div>
    </footer>
  );
}
