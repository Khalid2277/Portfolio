'use client';

import { useState, type ReactNode } from 'react';
import { Counter } from '@/components/motion/Counter';
import { DashTable } from './DashTable';

type SectionKey =
  | 'overview'
  | 'sales'
  | 'inventory'
  | 'staff'
  | 'reports'
  | 'settings';

const NAV: { key: SectionKey; label: string; icon: ReactNode }[] = [
  {
    key: 'overview',
    label: 'Overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    key: 'sales',
    label: 'Sales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-6" />
      </svg>
    ),
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    key: 'staff',
    label: 'Staff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1" />
      </svg>
    ),
  },
];

// `.dash` cockpit — verbatim port of legacy index.html lines 357–553. Tab
// switching uses internal `useState`. Each panel ports byte-for-byte the
// legacy markup including all numbers, currency formatting, status badges,
// and KPI counters. Counter components remount when their panel becomes
// visible (key={section}) so they re-animate on tab switch (matching legacy
// dash-side re-trigger logic in main.js lines 247–283).
export function DashboardCockpit() {
  const [section, setSection] = useState<SectionKey>('overview');

  return (
    <div className="dash reveal-scale">
      <aside className="dash-side">
        <div
          style={{
            padding: '0.4rem 0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.6rem',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ds" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0" stopColor="#B6F569" />
                <stop offset="1" stopColor="#0B7F4F" />
              </linearGradient>
            </defs>
            <path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z" fill="url(#ds)" opacity="0.9" />
          </svg>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '.95rem' }}>
            Operations
          </span>
        </div>
        {NAV.map((item) => (
          <a
            key={item.key}
            className={`nav-item${section === item.key ? ' active' : ''}`}
            href="javascript:void(0)"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setSection(item.key);
            }}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </aside>

      <div className="dash-main" key={section /* remount counters on tab change */}>
        {section === 'overview' && <Overview />}
        {section === 'sales' && <Sales />}
        {section === 'inventory' && <Inventory />}
        {section === 'staff' && <Staff />}
        {section === 'reports' && <Reports />}
        {section === 'settings' && <Settings />}
      </div>
    </div>
  );
}

function PanelHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '.75rem',
      }}
    >
      <div>
        <span className="eyebrow" style={{ marginBottom: '.4rem' }}>
          {eyebrow}
        </span>
        <h3 style={{ margin: '.25rem 0 0', fontSize: '1.4rem' }}>{title}</h3>
      </div>
      {right}
    </div>
  );
}

function Overview() {
  return (
    <div className="dash-panel active">
      <PanelHeader
        eyebrow="Today · Dubai"
        title="Welcome back, Ahmed."
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="badge badge-success">● Live</span>
            <span className="badge">7 branches</span>
          </div>
        }
      />
      <div className="dash-tiles">
        <div className="tile">
          <div className="tile-label">Revenue · today</div>
          <div className="tile-num mono">AED 124,580</div>
          <div className="tile-delta">↑ 12.4% vs yesterday</div>
        </div>
        <div className="tile">
          <div className="tile-label">Orders</div>
          <div className="tile-num mono">
            <Counter target={1284} thousands />
          </div>
          <div className="tile-delta">↑ 8.1% w/w</div>
        </div>
        <div className="tile">
          <div className="tile-label">Stock alerts</div>
          <div className="tile-num mono" style={{ color: 'var(--sand-400)' }}>
            7 items
          </div>
          <div className="tile-delta down">↓ restock 3</div>
        </div>
        <div className="tile">
          <div className="tile-label">Margin</div>
          <div className="tile-num mono">
            <Counter target={38.4} suffix="%" decimals={1} />
          </div>
          <div className="tile-delta">↑ 1.2pp m/m</div>
        </div>
      </div>
      <div className="tile" style={{ marginTop: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '.5rem',
          }}
        >
          <div>
            <div className="tile-label">Revenue · last 30 days</div>
            <div className="tile-num mono" style={{ fontSize: '1.4rem' }}>
              AED 3.42M
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.4rem' }}>
            <span className="pill">7d</span>
            <span
              className="pill"
              style={{ borderColor: 'rgba(25,195,125,.4)', color: 'var(--iris-300)' }}
            >
              30d
            </span>
            <span className="pill">90d</span>
          </div>
        </div>
        <svg viewBox="0 0 600 140" preserveAspectRatio="none" style={{ width: '100%', height: 140 }}>
          <defs>
            <linearGradient id="ch1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#19C37D" stopOpacity="0.5" />
              <stop offset="1" stopColor="#19C37D" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ch2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#B6F569" />
              <stop offset="1" stopColor="#0B7F4F" />
            </linearGradient>
          </defs>
          <path
            d="M0,110 L20,100 L40,108 L60,90 L80,95 L100,80 L120,82 L140,70 L160,76 L180,60 L200,68 L220,55 L240,62 L260,48 L280,55 L300,40 L320,52 L340,35 L360,42 L380,28 L400,38 L420,22 L440,30 L460,15 L480,25 L500,18 L520,28 L540,12 L560,20 L580,8 L600,16 L600,140 L0,140 Z"
            fill="url(#ch1)"
          />
          <path
            d="M0,110 L20,100 L40,108 L60,90 L80,95 L100,80 L120,82 L140,70 L160,76 L180,60 L200,68 L220,55 L240,62 L260,48 L280,55 L300,40 L320,52 L340,35 L360,42 L380,28 L400,38 L420,22 L440,30 L460,15 L480,25 L500,18 L520,28 L540,12 L560,20 L580,8 L600,16"
            fill="none"
            stroke="url(#ch2)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

function Sales() {
  return (
    <div className="dash-panel">
      <PanelHeader
        eyebrow="Sales · live"
        title="Transactions today"
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="pill" style={{ borderColor: 'rgba(25,195,125,.4)', color: 'var(--iris-300)' }}>
              All branches
            </span>
            <span className="pill">Card</span>
            <span className="pill">Cash</span>
          </div>
        }
      />
      <div className="dash-tiles">
        <div className="tile">
          <div className="tile-label">Tickets · today</div>
          <div className="tile-num mono">1,284</div>
          <div className="tile-delta">↑ 8.1%</div>
        </div>
        <div className="tile">
          <div className="tile-label">Avg basket</div>
          <div className="tile-num mono">AED 97</div>
          <div className="tile-delta">↑ 4.2%</div>
        </div>
        <div className="tile">
          <div className="tile-label">Refunds</div>
          <div className="tile-num mono" style={{ color: 'var(--sand-400)' }}>
            AED 1,420
          </div>
          <div className="tile-delta down">↓ 0.9%</div>
        </div>
        <div className="tile">
          <div className="tile-label">Top branch</div>
          <div className="tile-num mono" style={{ fontSize: '1.1rem' }}>
            Marina · AED 38k
          </div>
          <div className="tile-delta">3 of 7 trending</div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <DashTable label="Latest transactions">
          <thead>
            <tr>
              <th>Time</th>
              <th>Branch</th>
              <th>Items</th>
              <th>Method</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">14:42</td>
              <td>Dubai Marina</td>
              <td>3</td>
              <td><span className="pill">Card</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 248.00</td>
            </tr>
            <tr>
              <td className="mono">14:38</td>
              <td>Abu Dhabi · Yas</td>
              <td>1</td>
              <td><span className="pill">Apple Pay</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 79.50</td>
            </tr>
            <tr>
              <td className="mono">14:35</td>
              <td>Sharjah · Al Majaz</td>
              <td>5</td>
              <td><span className="pill">Cash</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 412.00</td>
            </tr>
            <tr>
              <td className="mono">14:31</td>
              <td>Dubai Marina</td>
              <td>2</td>
              <td><span className="pill">Card</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 156.00</td>
            </tr>
            <tr>
              <td className="mono">14:28</td>
              <td>JBR</td>
              <td>4</td>
              <td><span className="pill">Card</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 304.75</td>
            </tr>
            <tr>
              <td className="mono">14:24</td>
              <td>DIFC</td>
              <td>2</td>
              <td><span className="pill">Apple Pay</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 188.00</td>
            </tr>
          </tbody>
        </DashTable>
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <div className="dash-panel">
      <PanelHeader
        eyebrow="Inventory"
        title="Stock health"
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="badge" style={{ color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' }}>
              7 low
            </span>
            <span className="badge" style={{ color: '#ef6f6f', borderColor: 'rgba(239,111,111,.3)' }}>
              2 out
            </span>
          </div>
        }
      />
      <div className="dash-tiles">
        <div className="tile">
          <div className="tile-label">SKUs tracked</div>
          <div className="tile-num mono">2,184</div>
          <div className="tile-delta">across 7 branches</div>
        </div>
        <div className="tile">
          <div className="tile-label">Stock value</div>
          <div className="tile-num mono">AED 1.84M</div>
          <div className="tile-delta">↑ 2.1% w/w</div>
        </div>
        <div className="tile">
          <div className="tile-label">Turnover · 30d</div>
          <div className="tile-num mono">4.2×</div>
          <div className="tile-delta">↑ 0.3×</div>
        </div>
        <div className="tile">
          <div className="tile-label">Reorder due</div>
          <div className="tile-num mono" style={{ color: 'var(--sand-400)' }}>
            12 SKUs
          </div>
          <div className="tile-delta down">action needed</div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <DashTable label="Low stock alerts">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item</th>
              <th>Branch</th>
              <th>On hand</th>
              <th style={{ textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">A-1042</td>
              <td>Arabic coffee · 250g</td>
              <td>Marina</td>
              <td className="mono">4</td>
              <td style={{ textAlign: 'right' }}>
                <span className="pill" style={{ color: '#ef6f6f', borderColor: 'rgba(239,111,111,.3)' }}>
                  Critical
                </span>
              </td>
            </tr>
            <tr>
              <td className="mono">A-2210</td>
              <td>Saffron tea bags</td>
              <td>DIFC</td>
              <td className="mono">8</td>
              <td style={{ textAlign: 'right' }}>
                <span className="pill" style={{ color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' }}>
                  Low
                </span>
              </td>
            </tr>
            <tr>
              <td className="mono">B-3401</td>
              <td>Date syrup · 500ml</td>
              <td>Yas</td>
              <td className="mono">11</td>
              <td style={{ textAlign: 'right' }}>
                <span className="pill" style={{ color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' }}>
                  Low
                </span>
              </td>
            </tr>
            <tr>
              <td className="mono">C-0820</td>
              <td>Karak masala blend</td>
              <td>Sharjah</td>
              <td className="mono">2</td>
              <td style={{ textAlign: 'right' }}>
                <span className="pill" style={{ color: '#ef6f6f', borderColor: 'rgba(239,111,111,.3)' }}>
                  Critical
                </span>
              </td>
            </tr>
            <tr>
              <td className="mono">D-1190</td>
              <td>Paper cups · 12oz</td>
              <td>JBR</td>
              <td className="mono">14</td>
              <td style={{ textAlign: 'right' }}>
                <span className="pill" style={{ color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' }}>
                  Low
                </span>
              </td>
            </tr>
          </tbody>
        </DashTable>
      </div>
    </div>
  );
}

function Staff() {
  return (
    <div className="dash-panel">
      <PanelHeader
        eyebrow="Staff · today"
        title="Shifts & performance"
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="badge badge-success">● 38 on shift</span>
          </div>
        }
      />
      <div className="dash-tiles">
        <div className="tile">
          <div className="tile-label">Headcount</div>
          <div className="tile-num mono">62</div>
          <div className="tile-delta">across 7 branches</div>
        </div>
        <div className="tile">
          <div className="tile-label">On shift now</div>
          <div className="tile-num mono">38</div>
          <div className="tile-delta">↑ 4 vs avg</div>
        </div>
        <div className="tile">
          <div className="tile-label">Hours · this week</div>
          <div className="tile-num mono">1,420h</div>
          <div className="tile-delta">on target</div>
        </div>
        <div className="tile">
          <div className="tile-label">Tickets / hr · top</div>
          <div className="tile-num mono">14.8</div>
          <div className="tile-delta">Aisha · Marina</div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <DashTable label="Top performers · today">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Tickets</th>
              <th style={{ textAlign: 'right' }}>Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aisha M.</td>
              <td>Lead barista</td>
              <td>Marina</td>
              <td className="mono">118</td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 11,420</td>
            </tr>
            <tr>
              <td>Rahul P.</td>
              <td>Cashier</td>
              <td>DIFC</td>
              <td className="mono">102</td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 9,880</td>
            </tr>
            <tr>
              <td>Sara K.</td>
              <td>Supervisor</td>
              <td>Yas</td>
              <td className="mono">94</td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 8,610</td>
            </tr>
            <tr>
              <td>Omar A.</td>
              <td>Barista</td>
              <td>Sharjah</td>
              <td className="mono">88</td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 7,940</td>
            </tr>
            <tr>
              <td>Layla H.</td>
              <td>Cashier</td>
              <td>JBR</td>
              <td className="mono">81</td>
              <td className="mono" style={{ textAlign: 'right' }}>AED 7,210</td>
            </tr>
          </tbody>
        </DashTable>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="dash-panel">
      <PanelHeader
        eyebrow="Reports"
        title="Scheduled & on-demand"
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="pill">Daily</span>
            <span className="pill" style={{ borderColor: 'rgba(25,195,125,.4)', color: 'var(--iris-300)' }}>
              Weekly
            </span>
            <span className="pill">Monthly</span>
          </div>
        }
      />
      <div className="dash-tiles">
        <div className="tile">
          <div className="tile-label">Reports run · 30d</div>
          <div className="tile-num mono">142</div>
          <div className="tile-delta">↑ 18%</div>
        </div>
        <div className="tile">
          <div className="tile-label">Scheduled</div>
          <div className="tile-num mono">9</div>
          <div className="tile-delta">all healthy</div>
        </div>
        <div className="tile">
          <div className="tile-label">VAT-ready</div>
          <div className="tile-num mono">Q3 2025</div>
          <div className="tile-delta">FTA format</div>
        </div>
        <div className="tile">
          <div className="tile-label">Last export</div>
          <div className="tile-num mono" style={{ fontSize: '1.1rem' }}>
            2 hours ago
          </div>
          <div className="tile-delta">P&amp;L · CSV</div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <DashTable label="Recent reports">
          <thead>
            <tr>
              <th>Report</th>
              <th>Range</th>
              <th>Generated</th>
              <th style={{ textAlign: 'right' }}>Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Daily sales summary</td>
              <td>Today</td>
              <td className="mono">14:30</td>
              <td style={{ textAlign: 'right' }}><span className="pill">PDF</span></td>
            </tr>
            <tr>
              <td>VAT return · prep</td>
              <td>Q3 2025</td>
              <td className="mono">12:14</td>
              <td style={{ textAlign: 'right' }}><span className="pill">CSV</span></td>
            </tr>
            <tr>
              <td>Inventory aging</td>
              <td>30 days</td>
              <td className="mono">Yesterday</td>
              <td style={{ textAlign: 'right' }}><span className="pill">XLSX</span></td>
            </tr>
            <tr>
              <td>Branch P&amp;L</td>
              <td>Aug 2025</td>
              <td className="mono">Yesterday</td>
              <td style={{ textAlign: 'right' }}><span className="pill">PDF</span></td>
            </tr>
            <tr>
              <td>Staff productivity</td>
              <td>This week</td>
              <td className="mono">2 days ago</td>
              <td style={{ textAlign: 'right' }}><span className="pill">PDF</span></td>
            </tr>
          </tbody>
        </DashTable>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="dash-panel">
      <PanelHeader
        eyebrow="Settings"
        title="Workspace"
        right={
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <span className="badge">Ahmed · Owner</span>
          </div>
        }
      />
      <div className="settings-grid">
        <div className="tile">
          <div className="tile-label">Organization</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '.4rem' }}>Mira Coffee Co.</div>
          <div className="muted" style={{ fontSize: '.85rem', marginTop: '.2rem' }}>
            TRN 100-456-789-00003
          </div>
        </div>
        <div className="tile">
          <div className="tile-label">Currency &amp; locale</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '.4rem' }}>AED · en-AE</div>
          <div className="muted" style={{ fontSize: '.85rem', marginTop: '.2rem' }}>Asia/Dubai (GMT+4)</div>
        </div>
        <div className="tile">
          <div className="tile-label">VAT</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '.4rem' }}>5% · Standard</div>
          <div className="muted" style={{ fontSize: '.85rem', marginTop: '.2rem' }}>FTA-compliant invoices</div>
        </div>
        <div className="tile">
          <div className="tile-label">Branches</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '.4rem' }}>7 active</div>
          <div className="muted" style={{ fontSize: '.85rem', marginTop: '.2rem' }}>
            Marina, DIFC, JBR · +4
          </div>
        </div>
        <div className="tile">
          <div className="tile-label">Integrations</div>
          <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
            <span className="pill">Stripe</span>
            <span className="pill">Network Intl</span>
            <span className="pill">Zoho</span>
            <span className="pill">Slack</span>
          </div>
        </div>
        <div className="tile">
          <div className="tile-label">Notifications</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
              marginTop: '.5rem',
              fontSize: '.9rem',
            }}
          >
            <NotificationToggle label="Daily digest" defaultOn />
            <NotificationToggle label="Stock alerts" defaultOn />
            <NotificationToggle label="Refund > AED 500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      onClick={(e) => {
        e.preventDefault();
        setOn((v) => !v);
      }}
    >
      {label} <span className={`dtoggle${on ? ' on' : ''}`} />
    </label>
  );
}
