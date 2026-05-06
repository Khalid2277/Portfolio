'use client';

import { useEffect, useRef } from 'react';

// Vanilla-spring 3D tilt hook — direct port of animations.js initTilt.
// Sets --rx / --ry / --tz / --mx / --my CSS vars on the element. The legacy
// animations.css consumes them via the `.atl-tilt` selector. Disabled on
// touch and reduced-motion environments.
export function useTilt<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rect: DOMRect | null = null;
    let raf = 0;
    const target = { rx: 0, ry: 0, tz: 0 };
    const current = { rx: 0, ry: 0, tz: 0 };
    let active = false;

    function update() {
      const k = 0.18;
      current.rx += (target.rx - current.rx) * k;
      current.ry += (target.ry - current.ry) * k;
      current.tz += (target.tz - current.tz) * k;
      el!.style.setProperty('--rx', `${current.rx.toFixed(2)}deg`);
      el!.style.setProperty('--ry', `${current.ry.toFixed(2)}deg`);
      el!.style.setProperty('--tz', `${current.tz.toFixed(2)}px`);
      if (
        Math.abs(target.rx - current.rx) > 0.05 ||
        Math.abs(target.ry - current.ry) > 0.05 ||
        Math.abs(target.tz - current.tz) > 0.1
      ) {
        raf = requestAnimationFrame(update);
      } else {
        raf = 0;
      }
    }
    function kick() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add('atl-tilting');
      target.tz = 14;
      active = true;
      kick();
    };
    const onMove = (e: MouseEvent) => {
      if (!active || !rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      target.ry = (px - 0.5) * 14;
      target.rx = -(py - 0.5) * 14;
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      kick();
    };
    const onLeave = () => {
      active = false;
      target.rx = 0;
      target.ry = 0;
      target.tz = 0;
      el.classList.remove('atl-tilting');
      kick();
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return ref;
}
