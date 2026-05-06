'use client';

import { useEffect } from 'react';

// Direct port of the legacy main.js mouse-parallax effect: writes
// --mesh-x / --parallax-y (scroll) + --mesh-x (mouse) onto <body>, plus
// --parallax-x / --parallax-y onto any `.hero-scene` it can find. The legacy
// CSS in main.css reads those vars to drive the body grid + mesh + hero scene
// drift. No new styling.
export function MouseParallax() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      const y = window.scrollY;
      // The legacy listener also wrote header / scroll-top visibility classes,
      // but those now live in dedicated components. Just write the parallax.
      if (reduced) return;
      const yp = Math.min(y * 0.15, 200);
      document.body.style.setProperty('--parallax-y', `${-yp}px`);
      document.body.style.setProperty('--mesh-y', `${y * 0.05}px`);
    };

    const onMouse = (e: MouseEvent) => {
      if (reduced) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      document.body.style.setProperty('--mesh-x', `${x}px`);
      const scene = document.querySelector<HTMLElement>('.hero-scene');
      if (scene) {
        scene.style.setProperty('--parallax-x', `${x * 0.6}px`);
        scene.style.setProperty('--parallax-y', `${y * 0.6}px`);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', onMouse, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return null;
}
