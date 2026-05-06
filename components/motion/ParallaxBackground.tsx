'use client';

import { useEffect, useRef } from 'react';

// 3D parallax background — four colored gradient orbs and three wireframe
// geometric shapes layered behind every page. Each layer translates on the
// Y axis at a different speed driven by scroll position, producing a
// natural depth-of-field parallax without the heaviness of a full Three.js
// scene. Pure CSS transforms (`translate3d`) so the GPU handles compositing.
//
// Disabled on mobile (<= 900px), on touch devices, and when the user has
// `prefers-reduced-motion: reduce` set. CSS positions every layer behind the
// site chrome (z-index: 0) and masks the corners away so it never competes
// with content.
export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 900;
    const touch = matchMedia('(hover: none)').matches;
    if (reduced || small || touch) {
      el.style.display = 'none';
      return;
    }

    let raf = 0;
    let scrollY = 0;
    let pending = false;

    const onScroll = () => {
      scrollY = window.scrollY || 0;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        // Each child layer carries its own --speed (data attribute). Compute
        // its translateY once per frame and write a CSS variable so the
        // browser's compositor handles the actual transform.
        const layers = el.querySelectorAll<HTMLElement>('[data-speed]');
        layers.forEach((layer) => {
          const speed = parseFloat(layer.dataset.speed || '0');
          layer.style.setProperty('--py', `${(scrollY * speed).toFixed(2)}px`);
        });
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="atl-parallax-bg" aria-hidden="true" ref={ref}>
      {/* Soft gradient orbs — different colours, sizes, and parallax speeds */}
      <span className="atl-pl atl-pl-orb atl-pl-iris" data-speed="-0.18" style={{ top: '8%', left: '-6%' }} />
      <span className="atl-pl atl-pl-orb atl-pl-cyan" data-speed="-0.32" style={{ top: '40%', right: '-8%' }} />
      <span className="atl-pl atl-pl-orb atl-pl-violet" data-speed="-0.12" style={{ top: '78%', left: '20%' }} />
      <span className="atl-pl atl-pl-orb atl-pl-mint" data-speed="-0.45" style={{ top: '120%', right: '12%' }} />

      {/* Slowly rotating wireframe shapes — tiny, low-opacity, far from centre */}
      <svg className="atl-pl atl-pl-shape atl-pl-shape-1" data-speed="-0.22" viewBox="0 0 80 80" aria-hidden="true">
        <polygon
          points="40,4 76,24 76,56 40,76 4,56 4,24"
          fill="none"
          stroke="rgba(122,240,184,.55)"
          strokeWidth="0.8"
        />
        <polygon
          points="40,18 62,30 62,50 40,62 18,50 18,30"
          fill="none"
          stroke="rgba(122,240,184,.35)"
          strokeWidth="0.6"
        />
      </svg>
      <svg className="atl-pl atl-pl-shape atl-pl-shape-2" data-speed="-0.38" viewBox="0 0 80 80" aria-hidden="true">
        <g transform="translate(40,40)">
          <polygon points="-26,0 0,-22 26,0 0,22" fill="none" stroke="rgba(182,245,105,.45)" strokeWidth="0.7" />
          <polygon points="-26,0 -26,18 0,38 0,22" fill="none" stroke="rgba(182,245,105,.3)" strokeWidth="0.6" />
          <polygon points="0,22 0,38 26,18 26,0" fill="none" stroke="rgba(182,245,105,.3)" strokeWidth="0.6" />
        </g>
      </svg>
      <svg className="atl-pl atl-pl-shape atl-pl-shape-3" data-speed="-0.15" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(25,195,125,.4)" strokeWidth="0.7" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="rgba(25,195,125,.3)" strokeWidth="0.6" />
        <circle cx="40" cy="40" r="8" fill="rgba(122,240,184,.55)" />
      </svg>
    </div>
  );
}
