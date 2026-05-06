// Hero scene SVG — port of the inline SVG inside .hero-scene on the legacy
// home page. Lives in app/(home)/ next to the home page since it's single-use.
//
// CSS in main.css drives `.hero-scene > svg { animation: rotateSlow 60s linear infinite }`
// so the rotate keyframe still applies untouched.
export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B6F569" stopOpacity="0.95" />
            <stop offset="1" stopColor="#19C37D" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.85" />
            <stop offset="1" stopColor="#0B7F4F" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="ggrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#19C37D" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0B7F4F" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <circle cx="300" cy="300" r="240" fill="url(#ggrad)" />
        <g opacity="0.35" stroke="#7AF0B8" strokeWidth="0.8" fill="none">
          <ellipse cx="300" cy="300" rx="190" ry="190" />
          <ellipse cx="300" cy="300" rx="190" ry="60" />
          <ellipse cx="300" cy="300" rx="190" ry="120" />
          <ellipse cx="300" cy="300" rx="60" ry="190" />
          <ellipse cx="300" cy="300" rx="120" ry="190" />
        </g>
        <g transform="translate(170,160)">
          <polygon points="0,40 60,10 120,40 60,70" fill="url(#g1)" opacity="0.9" />
          <polygon points="0,40 0,110 60,140 60,70" fill="url(#g2)" opacity="0.7" />
          <polygon
            points="60,70 120,40 120,110 60,140"
            fill="#07090A"
            stroke="url(#g1)"
            strokeWidth="1.5"
            opacity="0.9"
          />
        </g>
        <g transform="translate(330,300)">
          <polygon points="0,40 60,10 120,40 60,70" fill="#07090A" stroke="url(#g2)" strokeWidth="1.5" />
          <polygon points="0,40 0,110 60,140 60,70" fill="url(#g2)" opacity="0.85" />
          <polygon points="60,70 120,40 120,110 60,140" fill="url(#g1)" opacity="0.75" />
        </g>
        <g transform="translate(110,380)">
          <polygon points="0,40 60,10 120,40 60,70" fill="url(#g1)" opacity="0.7" />
          <polygon points="0,40 0,110 60,140 60,70" fill="#07090A" stroke="url(#g1)" strokeWidth="1.5" />
          <polygon points="60,70 120,40 120,110 60,140" fill="url(#g2)" opacity="0.6" />
        </g>
        <g fill="#7AF0B8">
          <circle cx="120" cy="120" r="2" />
          <circle cx="500" cy="150" r="1.5" />
          <circle cx="80" cy="280" r="1.5" />
          <circle cx="540" cy="320" r="2.5" />
          <circle cx="460" cy="480" r="1.5" />
          <circle cx="180" cy="520" r="2" />
          <circle cx="290" cy="80" r="1.5" />
        </g>
        <g stroke="#19C37D" strokeWidth="0.6" opacity="0.4">
          <line x1="120" y1="120" x2="290" y2="80" />
          <line x1="290" y1="80" x2="500" y2="150" />
          <line x1="80" y1="280" x2="120" y2="120" />
          <line x1="540" y1="320" x2="500" y2="150" />
          <line x1="540" y1="320" x2="460" y2="480" />
          <line x1="180" y1="520" x2="460" y2="480" />
          <line x1="180" y1="520" x2="80" y2="280" />
        </g>
        <circle cx="430" cy="200" r="22" fill="url(#g1)" filter="url(#glow)" opacity="0.85" />
        <circle cx="430" cy="200" r="14" fill="#F5F7FB" opacity="0.95" />
      </svg>
    </div>
  );
}
