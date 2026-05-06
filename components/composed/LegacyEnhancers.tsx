'use client';

import { useEffect } from 'react';

// After hydration, wire up the legacy data-attribute interactions used inside
// solution pages that we render via dangerouslySetInnerHTML:
//
//   - .dash-side .nav-item[data-section] → toggles .dash-panel[data-panel]
//     visibility + .active class on the clicked nav item.
//     (Direct port of main.js lines 247–283.)
//   - [data-count] / [data-suffix] counters animate from 0 to target with a
//     cubic ease-out the first time they enter the viewport. (Port of main.js
//     lines 104–119.)
//   - Single-open accordion behavior on `.accordion .accordion-item` blocks
//     within ported markup. (Port of main.js lines 135–155.)
//
// Mounted once per solution page so the static markup behaves like the legacy
// site without a full re-port.
export function LegacyEnhancers() {
  useEffect(() => {
    wireDashboardTabs();
    const cleanupCounters = wireCounters();
    const cleanupAccordions = wireAccordions();
    const cleanupReveals = wireReveals();
    return () => {
      cleanupCounters();
      cleanupAccordions();
      cleanupReveals();
    };
  }, []);
  return null;
}

const REVEAL_SELECTORS = [
  '.reveal',
  '.reveal-up',
  '.reveal-down',
  '.reveal-left',
  '.reveal-right',
  '.reveal-scale',
  '.reveal-blur',
  '.reveal-stagger',
  '.text-reveal',
];

function wireReveals() {
  if (typeof IntersectionObserver === 'undefined') {
    document
      .querySelectorAll(REVEAL_SELECTORS.join(','))
      .forEach((el) => el.classList.add('in'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-40px 0px -40px 0px', threshold: 0.05 }
  );
  document.querySelectorAll(REVEAL_SELECTORS.join(',')).forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function wireDashboardTabs() {
  const items = document.querySelectorAll<HTMLElement>(
    '.dash-side .nav-item[data-section], .cp-side .item[data-section]'
  );
  const panels = document.querySelectorAll<HTMLElement>(
    '.dash-panel[data-panel], .cp-panel[data-panel]'
  );
  if (!items.length || !panels.length) return;

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-section');
      items.forEach((i) => i.classList.toggle('active', i === item));
      panels.forEach((p) => {
        const match = p.getAttribute('data-panel') === target;
        p.hidden = !match;
        p.classList.toggle('active', match);
      });
      // Re-trigger counters in the newly visible panel (matches legacy behavior).
      const active = document.querySelector<HTMLElement>(
        `.dash-panel[data-panel="${target}"], .cp-panel[data-panel="${target}"]`
      );
      if (active) {
        active
          .querySelectorAll<HTMLElement>('[data-count]')
          .forEach((el) => animateCounter(el, true));
      }
    });
  });
}

function animateCounter(el: HTMLElement, force = false) {
  if (!force && el.dataset.counted === '1') return;
  const target = parseFloat(el.dataset.count || '0');
  const suffix = el.dataset.suffix || '';
  const duration = parseInt(el.dataset.duration || '1400', 10);
  const isFloat = String(target).includes('.');
  el.dataset.counted = '1';

  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  function tick(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const v = target * ease(t);
    el.textContent = (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString('en-US')) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function wireCounters() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => animateCounter(el));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-40px 0px -40px 0px', threshold: 0.05 }
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function wireAccordions() {
  const accordions = document.querySelectorAll<HTMLElement>('.accordion');
  const cleanups: Array<() => void> = [];
  accordions.forEach((acc) => {
    acc.querySelectorAll<HTMLElement>('.accordion-item').forEach((item) => {
      const trigger = item.querySelector<HTMLElement>('.accordion-trigger');
      const content = item.querySelector<HTMLElement>('.accordion-content');
      if (!trigger || !content) return;
      if (item.classList.contains('open')) content.style.maxHeight = `${content.scrollHeight}px`;
      const onClick = () => {
        const isOpen = item.classList.contains('open');
        acc.querySelectorAll('.accordion-item.open').forEach((sib) => {
          if (sib !== item) {
            sib.classList.remove('open');
            const c = sib.querySelector<HTMLElement>('.accordion-content');
            if (c) c.style.maxHeight = '0px';
          }
        });
        if (isOpen) {
          item.classList.remove('open');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      };
      trigger.addEventListener('click', onClick);
      cleanups.push(() => trigger.removeEventListener('click', onClick));
    });
  });
  return () => cleanups.forEach((c) => c());
}
