/* AlfaTechLabs · Front-end interactions v3.0 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Theme toggle (light/dark) ----------
  const root = document.documentElement;
  const stored = localStorage.getItem('atl-theme');
  if (stored) root.setAttribute('data-theme', stored);
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const curr = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = curr === 'light' ? 'dark' : 'light';
      if (next === 'dark') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      localStorage.setItem('atl-theme', next);
    });
  });

  // ---------- Header scroll state ----------
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 600);

    // parallax — body mesh + grid
    if (!reduced) {
      const yp = Math.min(y * 0.15, 200);
      document.body.style.setProperty('--parallax-y', `${-yp}px`);
      document.body.style.setProperty('--mesh-y', `${y * 0.05}px`);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Mouse parallax (mesh + hero scene) ----------
  if (!reduced) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      document.body.style.setProperty('--mesh-x', `${x}px`);
      const scene = document.querySelector('.hero-scene');
      if (scene) {
        scene.style.setProperty('--parallax-x', `${x * 0.6}px`);
        scene.style.setProperty('--parallax-y', `${y * 0.6}px`);
      }
    }, { passive: true });
  }

  // ---------- Mobile drawer ----------
  const drawer = document.querySelector('.drawer');
  const openDrawer = () => { if (drawer) { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; } };
  const closeDrawer = () => { if (drawer) { drawer.classList.remove('open'); document.body.style.overflow = ''; } };
  document.querySelectorAll('.menu-toggle:not(.drawer-close)').forEach((b) => b.addEventListener('click', openDrawer));
  document.querySelectorAll('.drawer-close').forEach((b) => b.addEventListener('click', closeDrawer));
  if (drawer) drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // ---------- Word-by-word text reveal preprocessing ----------
  document.querySelectorAll('.text-reveal').forEach((el) => {
    if (el.dataset.processed) return;
    const text = el.textContent.trim();
    el.innerHTML = '';
    text.split(/\s+/).forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.style.setProperty('--i', i);
      span.textContent = word;
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
    el.dataset.processed = '1';
  });

  // ---------- Scroll reveal (IntersectionObserver) ----------
  const REVEAL_SELECTORS = [
    '.reveal', '.reveal-up', '.reveal-down', '.reveal-left', '.reveal-right',
    '.reveal-scale', '.reveal-blur', '.reveal-stagger', '.text-reveal'
  ];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // counter trigger
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(animateCount);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-40px 0px -40px 0px', threshold: 0.05 });
    document.querySelectorAll(REVEAL_SELECTORS.join(',')).forEach((el) => io.observe(el));
    document.querySelectorAll('[data-count]').forEach((el) => {
      // also observe stand-alone counters
      io.observe(el);
    });
  } else {
    document.querySelectorAll(REVEAL_SELECTORS.join(',')).forEach((el) => el.classList.add('in'));
  }

  function animateCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = parseInt(el.dataset.duration || '1400', 10);
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = target * ease(t);
      el.textContent = (target % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Magnetic + tilt cards (mouse follow) ----------
  if (!reduced) {
    document.querySelectorAll('.card, .tile').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      });
    });
  }

  // ---------- Accordion ----------
  document.querySelectorAll('.accordion').forEach((acc) => {
    acc.querySelectorAll('.accordion-item').forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');
      if (!trigger || !content) return;
      // initialize open state
      if (item.classList.contains('open')) content.style.maxHeight = content.scrollHeight + 'px';
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        acc.querySelectorAll('.accordion-item.open').forEach((sib) => {
          if (sib !== item) {
            sib.classList.remove('open');
            const c = sib.querySelector('.accordion-content');
            if (c) c.style.maxHeight = '0px';
          }
        });
        if (isOpen) { item.classList.remove('open'); content.style.maxHeight = '0px'; }
        else        { item.classList.add('open');    content.style.maxHeight = content.scrollHeight + 'px'; }
      });
    });
  });

  // ---------- Modal ----------
  document.querySelectorAll('[data-modal-open]').forEach((b) => {
    b.addEventListener('click', () => {
      const sel = b.getAttribute('data-modal-open');
      const m = document.querySelector(sel);
      if (m) m.classList.add('open');
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); });
    m.querySelectorAll('[data-modal-close], .modal-close').forEach((b) => {
      b.addEventListener('click', () => m.classList.remove('open'));
    });
  });

  // ---------- Contact form ----------
  const form = document.querySelector('#contact-form');
  if (form) {
    const message = form.querySelector('.form-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnLabel = submitBtn ? submitBtn.querySelector('.btn-label') : null;
    const originalLabel = btnLabel ? btnLabel.textContent : '';

    const setStatus = (cls, text) => {
      if (!message) return;
      message.className = 'form-message ' + cls;
      message.textContent = text;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      // Honeypot — silently drop bots
      if ((data.get('_honey') || '').toString().trim() !== '') return;

      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const msg = (data.get('message') || '').toString().trim();

      if (!name) { setStatus('error', 'Please enter your name.'); return; }
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setStatus('error', 'Please enter a valid email address.');
        return;
      }
      if (!msg) { setStatus('error', 'Please include a short message.'); return; }

      const endpoint = form.getAttribute('action');
      if (!endpoint) {
        setStatus('error', 'Form is misconfigured. Please email hello@alfatechlabs.net directly.');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = 'Sending…';
      setStatus('info', 'Sending your message…');

      // FormSubmit's /ajax/ endpoint expects JSON, not multipart FormData.
      const payload = {};
      data.forEach((value, key) => { payload[key] = value; });

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        const ok = res.ok && (json.success === true || json.success === 'true' || (!('success' in json) && res.ok));
        if (!ok) {
          const detail = (json && (json.message || json.error)) || ('HTTP ' + res.status);
          throw new Error(detail);
        }

        setStatus('success', 'Thanks! Your message is on its way. We typically reply within one business day.');
        form.reset();
      } catch (err) {
        console.error('Contact form submission failed:', err);
        setStatus('error', 'Sorry — we couldn’t send that. Please email hello@alfatechlabs.net directly.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnLabel) btnLabel.textContent = originalLabel;
      }
    });
  }

  // ---------- Dashboard sidebar nav ----------
  const dashItems = document.querySelectorAll('.dash-side .nav-item[data-section]');
  const dashPanels = document.querySelectorAll('.dash-panel[data-panel]');
  if (dashItems.length && dashPanels.length) {
    dashItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = item.getAttribute('data-section');
        dashItems.forEach((i) => i.classList.toggle('active', i === item));
        dashPanels.forEach((p) => {
          const match = p.getAttribute('data-panel') === target;
          p.hidden = !match;
        });
        // re-run counters on newly visible panel
        const active = document.querySelector(`.dash-panel[data-panel="${target}"]`);
        if (active) {
          active.querySelectorAll('[data-count]').forEach((el) => {
            const target = parseFloat(el.getAttribute('data-count'));
            const suffix = el.getAttribute('data-suffix') || '';
            const isFloat = String(target).includes('.');
            const dur = 800;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              const v = target * eased;
              el.textContent = (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        }
      });
    });
    // settings toggles
    document.querySelectorAll('.dash-panel .dtoggle').forEach((t) => {
      t.addEventListener('click', () => t.classList.toggle('on'));
    });
  }

  // ---------- Year ----------
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
