/* AlfaTechLabs · Cinematic animation layer
 * - Hero particle field (mouse reactive)
 * - GSAP + ScrollTrigger section reveals & parallax
 * - 3D tilt cards (vanilla — Framer-Motion style spring on rotateX/Y)
 * - Magnetic buttons
 *
 * Performance:
 * - Honors prefers-reduced-motion
 * - Disables tilt + magnetic on touch
 * - Caps DPR; pauses on visibility hidden
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none)').matches || ('ontouchstart' in window);
  const isSmall = window.innerWidth < 900;
  const docEl = document.documentElement;

  // -------------------------------------------------------
  // Mark page as loaded — used by other modules for entrance gating.
  // -------------------------------------------------------
  docEl.classList.add('atl-loaded');

  // -------------------------------------------------------
  // Hero particle field — mouse reactive
  // -------------------------------------------------------
  function initParticles() {
    if (reduced) return;
    const hero = document.querySelector('.hero, .page-hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'atl-particles';
    canvas.setAttribute('aria-hidden', 'true');
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 1.75);

    let w = 0, h = 0;
    function resize() {
      const rect = hero.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const count = isSmall ? 36 : 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 0.4,
    }));

    const mouse = { x: -1e3, y: -1e3, active: false };
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    });
    hero.addEventListener('mouseleave', () => { mouse.active = false; mouse.x = -1e3; mouse.y = -1e3; });

    let running = true;
    document.addEventListener('visibilitychange', () => { running = document.visibilityState === 'visible'; if (running) tick(); });

    function tick() {
      if (!running) return;
      requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);

      // Soft repulsion radius
      const R = 120;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Mouse repulsion
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
        // Gentle damping
        p.vx *= 0.985; p.vy *= 0.985;
        // Drift
        p.vx += (Math.random() - 0.5) * 0.005;
        p.vy += (Math.random() - 0.5) * 0.005;
        p.x += p.vx; p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(122, 240, 184, 0.6)';
        ctx.fill();
      }

      // Connecting filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = 1 - d2 / (110 * 110);
            ctx.strokeStyle = 'rgba(25,195,125,' + (alpha * 0.35).toFixed(3) + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(() => {
      tick();
      requestAnimationFrame(() => canvas.classList.add('atl-ready'));
    });
  }

  // -------------------------------------------------------
  // GSAP + ScrollTrigger: section reveals & parallax depth
  // -------------------------------------------------------
  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      // Make sure everything is visible
      document.querySelectorAll('.atl-section-fade').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    // .text-reveal is handled by main.js's IntersectionObserver (.in class → CSS reveal).
    // The previous GSAP upgrade was unreliable for above-the-fold heroes, so we leave
    // the simpler IO-based path alone here.

    // Section-level cinematic fade-up. Tag candidate sections.
    document.querySelectorAll('main > section').forEach((sec) => {
      const head = sec.querySelector('.section-head, .container > .reveal, .container > .split > .reveal');
      if (!head) return;
      gsap.fromTo(head,
        { opacity: 0, y: 60, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sec, start: 'top 80%', once: true },
        }
      );
    });

    // Card stagger entry on grids
    document.querySelectorAll('.grid.cols-3, .grid.cols-4, .grid.cols-2, .work-grid, .dash-tiles').forEach((grid) => {
      const items = grid.children;
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        }
      );
    });

    // (Hero glow already has a CSS keyframe drift; we leave it alone to avoid transform conflicts.
    // Three.js camera Y is driven by scroll, so multi-layer scroll parallax is preserved.)

    // CTA banner depth
    document.querySelectorAll('.cta-banner').forEach((banner) => {
      gsap.fromTo(banner,
        { opacity: 0, scale: 0.94, y: 50 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.05, ease: 'expo.out',
          scrollTrigger: { trigger: banner, start: 'top 85%', once: true },
        }
      );
    });

    // Hero sub/CTA/stats entrance is handled by main.js's IntersectionObserver
    // via the .reveal-up / .reveal-stagger classes — running gsap.from on them here
    // races the IO and can capture opacity:0 as the destination, leaving them invisible.
  }

  // -------------------------------------------------------
  // 3D tilt cards — vanilla spring, GPU friendly
  // -------------------------------------------------------
  function initTilt() {
    if (reduced || isTouch) return;
    const cards = document.querySelectorAll('.card, .tile, .work-card');
    cards.forEach((card) => {
      card.classList.add('atl-tilt');
      let rect = null;
      let rafId = 0;
      // Spring-targeted values
      const target = { rx: 0, ry: 0, tz: 0 };
      const current = { rx: 0, ry: 0, tz: 0 };
      let active = false;

      function update() {
        // Critically-damped spring approximation
        const k = 0.18;
        current.rx += (target.rx - current.rx) * k;
        current.ry += (target.ry - current.ry) * k;
        current.tz += (target.tz - current.tz) * k;
        card.style.setProperty('--rx', current.rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', current.ry.toFixed(2) + 'deg');
        card.style.setProperty('--tz', current.tz.toFixed(2) + 'px');
        if (Math.abs(target.rx - current.rx) > 0.05 ||
            Math.abs(target.ry - current.ry) > 0.05 ||
            Math.abs(target.tz - current.tz) > 0.1) {
          rafId = requestAnimationFrame(update);
        } else {
          rafId = 0;
        }
      }
      function kick() { if (!rafId) rafId = requestAnimationFrame(update); }

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
        card.classList.add('atl-tilting');
        target.tz = 14;
        active = true;
        kick();
      });
      card.addEventListener('mousemove', (e) => {
        if (!active || !rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        // Limit to ±8deg for elegance
        target.ry = (px - 0.5) * 14;
        target.rx = -(py - 0.5) * 14;
        // Existing main.js sets --mx/--my for the radial highlight
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        kick();
      });
      card.addEventListener('mouseleave', () => {
        active = false;
        target.rx = 0; target.ry = 0; target.tz = 0;
        card.classList.remove('atl-tilting');
        kick();
      });
    });
  }

  // -------------------------------------------------------
  // Magnetic CTA buttons
  // -------------------------------------------------------
  function initMagnetic() {
    if (reduced || isTouch) return;
    const buttons = document.querySelectorAll('.btn-primary.btn-lg, .btn-outline.btn-lg, .hero-cta .btn, .cta-banner .btn');
    buttons.forEach((btn) => {
      btn.classList.add('atl-btn-magnet');
      let rect = null;
      let rafId = 0;
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };

      function loop() {
        const k = 0.22;
        current.x += (target.x - current.x) * k;
        current.y += (target.y - current.y) * k;
        btn.style.setProperty('--bx', current.x.toFixed(2) + 'px');
        btn.style.setProperty('--by', current.y.toFixed(2) + 'px');
        if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
          rafId = requestAnimationFrame(loop);
        } else {
          rafId = 0;
        }
      }
      function kick() { if (!rafId) rafId = requestAnimationFrame(loop); }

      btn.addEventListener('mouseenter', () => { rect = btn.getBoundingClientRect(); btn.classList.add('atl-magnet'); });
      btn.addEventListener('mousemove', (e) => {
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        target.x = (e.clientX - cx) * 0.28;
        target.y = (e.clientY - cy) * 0.28;
        kick();
      });
      btn.addEventListener('mouseleave', () => {
        target.x = 0; target.y = 0;
        btn.classList.remove('atl-magnet');
        kick();
      });
    });
  }

  // -------------------------------------------------------
  // Boot
  // -------------------------------------------------------
  function boot() {
    initParticles();
    initGSAP();
    initTilt();
    initMagnetic();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
