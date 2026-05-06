// Portfolio work-card mockup SVGs — ported verbatim from the legacy portfolio.html.
// Each export is the inline <svg> body the WorkCard's `art` prop renders.
// Gradient/clip ids are scoped per mockup (w1, w2, …) to match the legacy markup
// and avoid id collisions when multiple mockups share a page (e.g. the home page
// uses a subset).

const COMMON_SVG_PROPS = {
  viewBox: '0 0 600 380',
  preserveAspectRatio: 'xMidYMid slice' as const,
};

export function MockupBusinessTracking() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="#07090A" />
      <g transform="translate(60,80)">
        <rect width="220" height="220" rx="14" fill="#0B0E1A" stroke="#222A44" />
        <text x="20" y="40" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">REVENUE / TODAY</text>
        <text x="20" y="80" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="32" fontWeight="700">AED 124,580</text>
        <polyline points="20,180 50,150 80,170 110,120 140,140 170,90 200,110" fill="none" stroke="url(#w1)" strokeWidth="2.5" />
      </g>
      <g transform="translate(320,80)">
        <rect width="220" height="100" rx="14" fill="#0B0E1A" stroke="#222A44" />
        <text x="20" y="35" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">ORDERS</text>
        <text x="20" y="72" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="26" fontWeight="700">1,284</text>
        <rect width="220" height="100" rx="14" y="120" fill="#0B0E1A" stroke="#222A44" />
        <text x="20" y="155" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">STOCK ALERTS</text>
        <text x="20" y="192" fill="#F5C56B" fontFamily="'Space Grotesk'" fontSize="26" fontWeight="700">7 items</text>
      </g>
    </svg>
  );
}

export function MockupAgenticRag() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <radialGradient id="w2g" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#19C37D" stopOpacity="0.45" />
          <stop offset="1" stopColor="#07090A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="w2c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#0B7F4F" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="#07090A" />
      <circle cx="300" cy="190" r="160" fill="url(#w2g)" />
      <g stroke="#7AF0B8" strokeWidth="0.6" fill="none" opacity="0.55">
        <ellipse cx="300" cy="190" rx="130" ry="130" />
        <ellipse cx="300" cy="190" rx="130" ry="50" />
        <ellipse cx="300" cy="190" rx="50" ry="130" />
      </g>
      <g fill="url(#w2c)">
        <circle cx="300" cy="60" r="6" />
        <circle cx="300" cy="320" r="6" />
        <circle cx="170" cy="190" r="6" />
        <circle cx="430" cy="190" r="6" />
        <circle cx="220" cy="100" r="4" />
        <circle cx="380" cy="280" r="4" />
        <circle cx="380" cy="100" r="4" />
        <circle cx="220" cy="280" r="4" />
      </g>
      <g stroke="#19C37D" strokeWidth="0.8" opacity="0.55">
        <line x1="300" y1="60" x2="170" y2="190" />
        <line x1="300" y1="60" x2="430" y2="190" />
        <line x1="300" y1="320" x2="170" y2="190" />
        <line x1="300" y1="320" x2="430" y2="190" />
        <line x1="220" y1="100" x2="380" y2="280" />
        <line x1="380" y1="100" x2="220" y2="280" />
      </g>
      <rect x="220" y="335" width="160" height="28" rx="14" fill="#0B0E1A" stroke="#222A44" />
      <text x="300" y="354" textAnchor="middle" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">RAG · /knowledge</text>
    </svg>
  );
}

export function MockupSmeOperations() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="w3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07090A" />
          <stop offset="1" stopColor="#1A2140" />
        </linearGradient>
        <linearGradient id="w3c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="url(#w3)" />
      <g transform="translate(60,60)">
        <rect width="120" height="80" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="14" y="28" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">SALES</text>
        <text x="14" y="58" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="20" fontWeight="700">AED 8.4k</text>
        <rect x="140" width="120" height="80" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="154" y="28" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">ITEMS</text>
        <text x="154" y="58" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="20" fontWeight="700">312</text>
        <rect x="280" width="120" height="80" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="294" y="28" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">STAFF</text>
        <text x="294" y="58" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="20" fontWeight="700">14</text>
        <rect x="420" width="60" height="80" rx="10" fill="url(#w3c)" />
        <text x="450" y="50" textAnchor="middle" fill="#0B0E1A" fontFamily="'Space Grotesk'" fontSize="20" fontWeight="700">↑</text>
        <rect y="100" width="480" height="160" rx="14" fill="#0B0E1A" stroke="#222A44" />
        <g fill="#19C37D">
          <rect x="20" y="220" width="20" height="20" />
          <rect x="50" y="200" width="20" height="40" />
          <rect x="80" y="180" width="20" height="60" />
          <rect x="110" y="160" width="20" height="80" />
          <rect x="140" y="140" width="20" height="100" />
          <rect x="170" y="170" width="20" height="70" />
          <rect x="200" y="120" width="20" height="120" />
          <rect x="230" y="150" width="20" height="90" />
          <rect x="260" y="100" width="20" height="140" />
          <rect x="290" y="130" width="20" height="110" />
          <rect x="320" y="110" width="20" height="130" />
          <rect x="350" y="90" width="20" height="150" />
        </g>
      </g>
    </svg>
  );
}

export function MockupCorporateKnowledgeHub() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="w4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07090A" />
          <stop offset="1" stopColor="#1A1B36" />
        </linearGradient>
        <linearGradient id="w4c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#0B7F4F" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="url(#w4)" />
      <g transform="translate(60,60)">
        <rect width="180" height="220" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <rect x="20" y="30" width="120" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="50" width="140" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="70" width="80" height="6" rx="3" fill="#19C37D" />
        <rect x="20" y="90" width="140" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="110" width="100" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="130" width="140" height="6" rx="3" fill="#7AF0B8" />
        <rect x="20" y="150" width="60" height="6" rx="3" fill="#222A44" />
        <text x="20" y="200" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">/policy.pdf</text>
      </g>
      <g transform="translate(260,90)">
        <rect width="280" height="200" rx="14" fill="#0B0E1A" stroke="#19C37D" />
        <circle cx="32" cy="32" r="14" fill="url(#w4c)" />
        <text x="32" y="36" textAnchor="middle" fill="#0B0E1A" fontFamily="'Space Grotesk'" fontSize="14" fontWeight="700">α</text>
        <text x="58" y="38" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">AGENT</text>
        <rect x="20" y="60" width="240" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="76" width="200" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="92" width="160" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="116" width="240" height="40" rx="8" fill="#19C37D" opacity="0.15" stroke="#19C37D" />
        <text x="32" y="142" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">&quot;Cite source · audit logged&quot;</text>
      </g>
      <line x1="240" y1="170" x2="260" y2="170" stroke="#19C37D" strokeWidth="2" />
    </svg>
  );
}

export function MockupProcurementApproval() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="w5" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07090A" />
          <stop offset="1" stopColor="#1A2140" />
        </linearGradient>
        <linearGradient id="w5c" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="url(#w5)" />
      <g transform="translate(60,60)">
        <rect width="480" height="260" rx="14" fill="#0B0E1A" stroke="#222A44" />
        <text x="20" y="40" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">APPROVAL FLOW · LIVE</text>
        <rect x="20" y="60" width="100" height="50" rx="10" fill="#19C37D" opacity="0.15" stroke="#19C37D" />
        <text x="70" y="89" textAnchor="middle" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">REQUEST</text>
        <rect x="170" y="60" width="120" height="50" rx="10" fill="url(#w5c)" />
        <text x="230" y="89" textAnchor="middle" fill="#0B0E1A" fontFamily="'JetBrains Mono'" fontSize="11">REVIEWER</text>
        <rect x="340" y="60" width="120" height="50" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="400" y="89" textAnchor="middle" fill="#F5F7FB" fontFamily="'JetBrains Mono'" fontSize="11">SIGN-OFF</text>
        <line x1="120" y1="85" x2="170" y2="85" stroke="#19C37D" strokeWidth="2" />
        <line x1="290" y1="85" x2="340" y2="85" stroke="#19C37D" strokeWidth="2" />
        <rect x="20" y="140" width="440" height="100" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="32" y="170" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">AUDIT TRAIL</text>
        <text x="32" y="194" fill="#F5F7FB" fontFamily="'JetBrains Mono'" fontSize="11">14:08 · k.fahim · approved · request_4892</text>
        <text x="32" y="216" fill="#F5F7FB" fontFamily="'JetBrains Mono'" fontSize="11">14:11 · m.salim · escalated · request_4893</text>
      </g>
    </svg>
  );
}

export function MockupCarWashApp() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="wcw" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a1226" />
          <stop offset="1" stopColor="#070912" />
        </linearGradient>
        <linearGradient id="wcwc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
        <linearGradient id="wcwBubble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7AF0B8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#7AF0B8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="url(#wcw)" />
      <g opacity="0.5">
        <circle cx="80" cy="320" r="18" fill="url(#wcwBubble)" />
        <circle cx="140" cy="350" r="10" fill="url(#wcwBubble)" />
        <circle cx="500" cy="60" r="14" fill="url(#wcwBubble)" />
        <circle cx="560" cy="120" r="8" fill="url(#wcwBubble)" />
        <circle cx="40" cy="220" r="6" fill="url(#wcwBubble)" />
      </g>
      <g transform="translate(120,40)">
        <rect width="160" height="300" rx="28" fill="#0B0E1A" stroke="#19C37D" />
        <rect x="14" y="20" width="132" height="80" rx="14" fill="url(#wcwc)" />
        <text x="80" y="50" textAnchor="middle" fill="#0B0E1A" fontFamily="'Space Grotesk'" fontSize="13" fontWeight="700">Book a wash</text>
        <text x="80" y="72" textAnchor="middle" fill="#0B0E1A" fontFamily="Inter" fontSize="10" opacity="0.85">15 min ETA</text>
        <rect x="14" y="116" width="132" height="44" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <circle cx="32" cy="138" r="10" fill="#19C37D" opacity="0.25" />
        <text x="32" y="142" textAnchor="middle" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="11">EXT</text>
        <text x="50" y="135" fill="#F5F7FB" fontFamily="Inter" fontSize="10">Exterior wash</text>
        <text x="50" y="150" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="9">AED 35</text>
        <rect x="14" y="168" width="132" height="44" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <circle cx="32" cy="190" r="10" fill="#19C37D" opacity="0.25" />
        <text x="50" y="187" fill="#F5F7FB" fontFamily="Inter" fontSize="10">Interior + Ext</text>
        <text x="50" y="202" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="9">AED 65</text>
        <rect x="14" y="240" width="132" height="40" rx="10" fill="url(#wcwc)" />
        <text x="80" y="265" textAnchor="middle" fill="#0B0E1A" fontFamily="'Space Grotesk'" fontSize="12" fontWeight="700">Schedule →</text>
      </g>
      <g transform="translate(320,80)">
        <rect width="220" height="220" rx="14" fill="#0B0E1A" stroke="#222A44" />
        <text x="20" y="32" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="10">ADMIN · LIVE</text>
        <text x="20" y="62" fill="#F5F7FB" fontFamily="'Space Grotesk'" fontSize="22" fontWeight="700">42 jobs today</text>
        <rect x="20" y="80" width="180" height="6" rx="3" fill="#222A44" />
        <rect x="20" y="80" width="120" height="6" rx="3" fill="url(#wcwc)" />
        <text x="20" y="108" fill="#F5F7FB" fontFamily="Inter" fontSize="10">A. Hassan · Land Cruiser</text>
        <text x="20" y="124" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="9">14:30 · Premium · AED 120</text>
        <text x="20" y="148" fill="#F5F7FB" fontFamily="Inter" fontSize="10">M. Khan · Patrol</text>
        <text x="20" y="164" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="9">14:45 · Exterior · AED 35</text>
        <text x="20" y="188" fill="#F5F7FB" fontFamily="Inter" fontSize="10">F. Al Marri · Range Rover</text>
        <text x="20" y="204" fill="#7AF0B8" fontFamily="'JetBrains Mono'" fontSize="9">15:00 · Full detail · AED 280</text>
      </g>
    </svg>
  );
}

export function MockupFieldOps() {
  return (
    <svg {...COMMON_SVG_PROPS}>
      <defs>
        <linearGradient id="w6" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07090A" />
          <stop offset="1" stopColor="#1A1B36" />
        </linearGradient>
        <linearGradient id="w6c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill="url(#w6)" />
      <g transform="translate(220,40)">
        <rect width="160" height="300" rx="28" fill="#0B0E1A" stroke="#19C37D" />
        <rect x="16" y="20" width="128" height="60" rx="12" fill="url(#w6c)" />
        <text x="80" y="58" textAnchor="middle" fill="#0B0E1A" fontFamily="'Space Grotesk'" fontSize="22" fontWeight="700">Field Ops</text>
        <rect x="16" y="100" width="128" height="40" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="32" y="125" fill="#F5F7FB" fontFamily="Inter" fontSize="11">Site visit · 14:08</text>
        <rect x="16" y="148" width="128" height="40" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="32" y="173" fill="#F5F7FB" fontFamily="Inter" fontSize="11">Photo upload</text>
        <rect x="16" y="196" width="128" height="40" rx="10" fill="#22C55E" opacity="0.15" stroke="#22C55E" />
        <text x="32" y="221" fill="#22C55E" fontFamily="Inter" fontSize="11">✓ Synced</text>
        <rect x="16" y="244" width="128" height="40" rx="10" fill="#0B0E1A" stroke="#222A44" />
        <text x="32" y="269" fill="#F5F7FB" fontFamily="Inter" fontSize="11">Generate report →</text>
      </g>
    </svg>
  );
}
