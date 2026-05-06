'use client';

import { useEffect, useRef } from 'react';

interface HeroParticlesProps {
  /** Override the parent class to scope where the canvas attaches. Default: nearest `.hero` or `.page-hero`. */
  parentClass?: string;
}

// Hero particle field — direct port of animations.js initParticles. Mounts a
// canvas inside the surrounding hero element, runs an rAF loop with mouse-
// reactive repulsion. Honors prefers-reduced-motion. Pauses on visibility
// hidden. StrictMode-safe via mountedRef guard.
export function HeroParticles({ parentClass }: HeroParticlesProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Guard against React 18 StrictMode double-mounting in dev.
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wrapper = containerRef.current;
    if (!wrapper) return;
    const hero =
      wrapper.closest(parentClass ? `.${parentClass}` : '.hero, .page-hero') ?? wrapper.parentElement;
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'atl-particles';
    canvas.setAttribute('aria-hidden', 'true');
    (hero as HTMLElement).appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 1.75);

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = (hero as HTMLElement).getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const isSmall = window.innerWidth < 900;
    const count = isSmall ? 36 : 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 0.4,
    }));

    const mouse = { x: -1e3, y: -1e3, active: false };
    const onMouseMove = (e: MouseEvent) => {
      const r = (hero as HTMLElement).getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1e3;
      mouse.y = -1e3;
    };
    hero.addEventListener('mousemove', onMouseMove as EventListener);
    hero.addEventListener('mouseleave', onMouseLeave);

    let running = true;
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) tick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let raf = 0;
    const R = 120;
    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const force = (R - d) / R;
            p.vx += (dx / d) * force * 0.18;
            p.vy += (dy / d) * force * 0.18;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vx += (Math.random() - 0.5) * 0.005;
        p.vy += (Math.random() - 0.5) * 0.005;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(122, 240, 184, 0.6)';
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = 1 - d2 / (110 * 110);
            ctx!.strokeStyle = `rgba(25,195,125,${(alpha * 0.35).toFixed(3)})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
    }

    requestAnimationFrame(() => {
      tick();
      requestAnimationFrame(() => canvas.classList.add('atl-ready'));
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mousemove', onMouseMove as EventListener);
      hero.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.remove();
      mountedRef.current = false;
    };
  }, [parentClass]);

  return <div ref={containerRef} aria-hidden="true" style={{ display: 'none' }} />;
}
