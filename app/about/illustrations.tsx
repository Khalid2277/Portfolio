// Decorative SVG illustrations for /about — ported verbatim from the legacy
// about.html. They live next to the page (single-use) rather than under
// components/, so future edits stay localized.

const VALUE_FRAME_STYLE: React.CSSProperties = {
  margin: '-1.75rem -1.75rem 1.5rem',
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'radial-gradient(circle at 50% 65%,rgba(25,195,125,0.10),transparent 70%),linear-gradient(180deg,rgba(25,195,125,0.04),transparent)',
  borderBottom: '1px solid var(--line)',
  overflow: 'hidden',
};

const SVG_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  maxWidth: 300,
};

// Value 1 — Clarity over complexity
export function ClarityIllustration() {
  return (
    <div style={VALUE_FRAME_STYLE}>
      <svg viewBox="0 0 240 160" aria-hidden="true" style={SVG_STYLE}>
        <defs>
          <linearGradient id="v1ga" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B6F569" />
            <stop offset="1" stopColor="#19C37D" />
          </linearGradient>
          <linearGradient id="v1gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19C37D" />
            <stop offset="1" stopColor="#0B7F4F" />
          </linearGradient>
          <radialGradient id="v1gr" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.55" />
            <stop offset="1" stopColor="#19C37D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="80" r="58" fill="url(#v1gr)" />
        <g opacity="0.55" fill="none" stroke="#7AF0B8" strokeWidth="0.8">
          <polygon points="22,55 50,40 78,55 50,70" transform="rotate(-14 50 55)" />
          <polygon points="14,82 42,67 70,82 42,97" transform="rotate(10 42 82)" />
          <polygon points="36,40 64,25 92,40 64,55" transform="rotate(22 64 40)" />
          <polygon points="28,108 56,93 84,108 56,123" transform="rotate(-8 56 108)" />
          <polygon points="50,72 78,57 106,72 78,87" transform="rotate(-22 78 72)" />
        </g>
        <circle cx="120" cy="80" r="22" fill="none" stroke="url(#v1ga)" strokeWidth="0.6" opacity="0.45" />
        <circle cx="120" cy="80" r="14" fill="none" stroke="url(#v1ga)" strokeWidth="1" />
        <circle cx="120" cy="80" r="3.5" fill="#B6F569" />
        <line x1="98" y1="80" x2="106" y2="80" stroke="#7AF0B8" strokeWidth="0.7" opacity="0.55" />
        <line x1="134" y1="80" x2="158" y2="80" stroke="#7AF0B8" strokeWidth="0.7" opacity="0.55" />
        <g transform="translate(168,42)">
          <polygon points="0,30 30,15 60,30 30,45" fill="url(#v1ga)" opacity="0.92" />
          <polygon points="0,30 0,70 30,85 30,45" fill="url(#v1gb)" opacity="0.72" />
          <polygon points="30,45 60,30 60,70 30,85" fill="#0B0E1A" stroke="url(#v1ga)" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

// Value 2 — Trust, security, and responsibility
export function TrustIllustration() {
  return (
    <div style={{ ...VALUE_FRAME_STYLE, background: 'radial-gradient(circle at 50% 50%,rgba(25,195,125,0.10),transparent 70%),linear-gradient(180deg,rgba(25,195,125,0.04),transparent)' }}>
      <svg viewBox="0 0 240 160" aria-hidden="true" style={SVG_STYLE}>
        <defs>
          <linearGradient id="v2ga" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B6F569" />
            <stop offset="1" stopColor="#19C37D" />
          </linearGradient>
          <linearGradient id="v2gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19C37D" />
            <stop offset="1" stopColor="#0B7F4F" />
          </linearGradient>
          <radialGradient id="v2gr" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.5" />
            <stop offset="1" stopColor="#19C37D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="80" r="62" fill="url(#v2gr)" />
        <ellipse cx="120" cy="80" rx="100" ry="20" fill="none" stroke="#7AF0B8" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="120" cy="80" rx="72" ry="14" fill="none" stroke="#7AF0B8" strokeWidth="0.5" opacity="0.28" />
        <g transform="translate(120,80)">
          <polygon
            points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23"
            fill="none"
            stroke="url(#v2ga)"
            strokeWidth="1"
            opacity="0.85"
          />
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="url(#v2gb)" opacity="0.5" />
          <polygon points="0,-19 16,-10 16,10 0,19 -16,10 -16,-10" fill="url(#v2ga)" opacity="0.92" />
          <circle r="9" fill="none" stroke="#B6F569" strokeWidth="0.6" opacity="0.7" />
          <circle r="4.5" fill="#fff" />
        </g>
        <circle cx="40" cy="78" r="2.6" fill="#B6F569" />
        <circle cx="200" cy="82" r="2.6" fill="#7AF0B8" />
        <circle cx="120" cy="36" r="2" fill="#7AF0B8" opacity="0.7" />
      </svg>
    </div>
  );
}

// Value 3 — Future-ready innovation for the UAE
export function FutureReadyIllustration() {
  return (
    <div
      style={{
        ...VALUE_FRAME_STYLE,
        background:
          'radial-gradient(circle at 50% 70%,rgba(25,195,125,0.10),transparent 70%),linear-gradient(180deg,rgba(25,195,125,0.04),transparent)',
      }}
    >
      <svg viewBox="0 0 240 160" aria-hidden="true" style={SVG_STYLE}>
        <defs>
          <linearGradient id="v3ga" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B6F569" />
            <stop offset="1" stopColor="#19C37D" />
          </linearGradient>
          <linearGradient id="v3gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19C37D" />
            <stop offset="1" stopColor="#0B7F4F" />
          </linearGradient>
          <radialGradient id="v3gr" cx="50%" cy="65%" r="55%">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.5" />
            <stop offset="1" stopColor="#19C37D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="105" r="70" fill="url(#v3gr)" />
        <g transform="translate(120,138)" fill="none" stroke="#7AF0B8" opacity="0.4">
          <polygon points="-92,0 0,-22 92,0 0,22" strokeWidth="0.5" />
          <polygon points="-60,0 0,-15 60,0 0,15" strokeWidth="0.4" opacity="0.65" />
        </g>
        <g transform="translate(54,86)">
          <polygon points="0,15 16,7 32,15 16,23" fill="url(#v3ga)" opacity="0.9" />
          <polygon points="0,15 0,46 16,54 16,23" fill="url(#v3gb)" opacity="0.72" />
          <polygon points="16,23 32,15 32,46 16,54" fill="#0B0E1A" stroke="url(#v3ga)" strokeWidth="0.7" />
        </g>
        <g transform="translate(105,38)">
          <polygon points="0,15 18,5 36,15 18,25" fill="url(#v3ga)" />
          <polygon points="0,15 0,94 18,104 18,25" fill="url(#v3gb)" opacity="0.82" />
          <polygon points="18,25 36,15 36,94 18,104" fill="#0B0E1A" stroke="url(#v3ga)" strokeWidth="0.7" />
          <line x1="18" y1="-2" x2="18" y2="5" stroke="#B6F569" strokeWidth="1.2" />
          <circle cx="18" cy="-4" r="3" fill="#B6F569" />
          <circle cx="18" cy="-4" r="7" fill="none" stroke="#7AF0B8" strokeWidth="0.5" opacity="0.55" />
        </g>
        <g transform="translate(160,68)">
          <polygon points="0,15 16,7 32,15 16,23" fill="url(#v3ga)" opacity="0.9" />
          <polygon points="0,15 0,62 16,70 16,23" fill="url(#v3gb)" opacity="0.72" />
          <polygon points="16,23 32,15 32,62 16,70" fill="#0B0E1A" stroke="url(#v3ga)" strokeWidth="0.7" />
        </g>
        <g fill="#7AF0B8">
          <circle cx="35" cy="42" r="2" />
          <circle cx="200" cy="32" r="2" />
          <circle cx="50" cy="20" r="1.5" opacity="0.7" />
        </g>
        <path
          d="M 35,42 Q 120,2 200,32"
          fill="none"
          stroke="#7AF0B8"
          strokeWidth="0.4"
          opacity="0.45"
          strokeDasharray="2,3"
        />
      </svg>
    </div>
  );
}

// Value 4 — Accessible innovation
export function AccessibleIllustration() {
  return (
    <div
      style={{
        ...VALUE_FRAME_STYLE,
        background:
          'radial-gradient(circle at 50% 50%,rgba(25,195,125,0.10),transparent 70%),linear-gradient(180deg,rgba(25,195,125,0.04),transparent)',
      }}
    >
      <svg viewBox="0 0 240 160" aria-hidden="true" style={SVG_STYLE}>
        <defs>
          <linearGradient id="v4ga" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B6F569" />
            <stop offset="1" stopColor="#19C37D" />
          </linearGradient>
          <linearGradient id="v4gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19C37D" />
            <stop offset="1" stopColor="#0B7F4F" />
          </linearGradient>
          <radialGradient id="v4gr" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.55" />
            <stop offset="1" stopColor="#19C37D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="80" r="68" fill="url(#v4gr)" />
        <g stroke="#7AF0B8" strokeWidth="0.6" fill="none" opacity="0.45">
          <line x1="120" y1="80" x2="40" y2="38" />
          <line x1="120" y1="80" x2="200" y2="38" />
          <line x1="120" y1="80" x2="40" y2="122" />
          <line x1="120" y1="80" x2="200" y2="122" />
          <line x1="120" y1="80" x2="35" y2="80" />
          <line x1="120" y1="80" x2="205" y2="80" />
        </g>
        <g stroke="#7AF0B8" strokeWidth="0.4" fill="none" opacity="0.32" strokeDasharray="2,3">
          <line x1="40" y1="38" x2="35" y2="80" />
          <line x1="35" y1="80" x2="40" y2="122" />
          <line x1="200" y1="38" x2="205" y2="80" />
          <line x1="205" y1="80" x2="200" y2="122" />
        </g>
        <g transform="translate(40,38)">
          <polygon points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6" fill="url(#v4ga)" opacity="0.92" />
        </g>
        <g transform="translate(200,38)">
          <polygon points="0,-9 8,-4 8,4 0,9 -8,4 -8,-4" fill="url(#v4gb)" opacity="0.92" />
        </g>
        <g transform="translate(40,122)">
          <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="url(#v4gb)" opacity="0.88" />
        </g>
        <g transform="translate(200,122)">
          <polygon points="0,-11 9,-5 9,5 0,11 -9,5 -9,-5" fill="url(#v4ga)" opacity="0.92" />
        </g>
        <g transform="translate(35,80)">
          <polygon points="0,-7 6,-3 6,3 0,7 -6,3 -6,-3" fill="url(#v4ga)" opacity="0.85" />
        </g>
        <g transform="translate(205,80)">
          <polygon points="0,-7 6,-3 6,3 0,7 -6,3 -6,-3" fill="url(#v4gb)" opacity="0.85" />
        </g>
        <g transform="translate(120,80)">
          <polygon
            points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13"
            fill="none"
            stroke="url(#v4ga)"
            strokeWidth="0.8"
            opacity="0.55"
          />
          <polygon points="0,-16 13,-8 13,8 0,16 -13,8 -13,-8" fill="url(#v4gb)" opacity="0.7" />
          <polygon points="0,-9 8,-4 8,4 0,9 -8,4 -8,-4" fill="url(#v4ga)" />
          <circle r="3" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}

// "By the numbers" iso-platform with three iso-cubes — used in the stats
// panel section.
export function StatsIllustration() {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B6F569" />
          <stop offset="1" stopColor="#19C37D" />
        </linearGradient>
        <linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19C37D" />
          <stop offset="1" stopColor="#0B7F4F" />
        </linearGradient>
        <radialGradient id="agr" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#19C37D" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0B7F4F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="190" r="160" fill="url(#agr)" />
      <g transform="translate(250,210)">
        <polygon points="0,-60 130,0 0,60 -130,0" fill="#07090A" stroke="#19C37D" strokeWidth="1" />
        <polygon points="0,-60 130,0 0,60 -130,0" fill="url(#ag1)" opacity="0.1" />
        <g transform="translate(-60,-30)">
          <polygon points="0,20 30,5 60,20 30,35" fill="url(#ag1)" opacity="0.95" />
          <polygon points="0,20 0,55 30,70 30,35" fill="url(#ag2)" opacity="0.7" />
          <polygon points="30,35 60,20 60,55 30,70" fill="#0B0E1A" stroke="url(#ag1)" />
        </g>
        <g transform="translate(20,-50)">
          <polygon points="0,20 30,5 60,20 30,35" fill="url(#ag2)" opacity="0.95" />
          <polygon points="0,20 0,55 30,70 30,35" fill="url(#ag1)" opacity="0.7" />
          <polygon points="30,35 60,20 60,55 30,70" fill="#0B0E1A" stroke="url(#ag2)" />
        </g>
        <g transform="translate(50,0)">
          <polygon points="0,20 30,5 60,20 30,35" fill="url(#ag1)" opacity="0.85" />
          <polygon points="0,20 0,55 30,70 30,35" fill="url(#ag2)" opacity="0.6" />
          <polygon points="30,35 60,20 60,55 30,70" fill="#0B0E1A" stroke="url(#ag1)" />
        </g>
      </g>
      <g fill="none" stroke="#7AF0B8" strokeWidth="0.6" opacity="0.5">
        <ellipse cx="250" cy="120" rx="160" ry="22" />
      </g>
      <g fill="#7AF0B8">
        <circle cx="100" cy="118" r="3" />
        <circle cx="400" cy="120" r="3" />
        <circle cx="250" cy="98" r="3" />
      </g>
    </svg>
  );
}
