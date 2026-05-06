'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  /** Form name registered with Netlify Forms. Must match across HTML + submit. */
  name?: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'info'; text: string }
  | { kind: 'success'; text: string }
  | { kind: 'error'; text: string };

const FORM_NAME = 'contact';

// Netlify Forms binding. The form is detected at deploy time by Netlify's
// form-scanner reading out/contact.html, so the `data-netlify`,
// `data-netlify-honeypot`, and the hidden `form-name` input all need to
// render in the static export.
//
// Submission is a regular form-encoded POST to the site root — Netlify
// intercepts it and stores the message in the dashboard. Email
// notifications are configured per-site under Site Settings → Forms →
// Form notifications.
//
// The same client-side validation and status states from the legacy
// FormSubmit handler still apply; we just point them at Netlify.
function encodeFormData(data: FormData): string {
  const params = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === 'string') params.append(key, value);
  });
  return params.toString();
}

export function ContactForm({ name = FORM_NAME }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Netlify's bot-field honeypot — silently drop bots that fill it.
    if (((data.get('bot-field') as string) || '').trim() !== '') return;

    const fullName = ((data.get('name') as string) || '').trim();
    const email = ((data.get('email') as string) || '').trim();
    const message = ((data.get('message') as string) || '').trim();

    if (!fullName) {
      setStatus({ kind: 'error', text: 'Please enter your name.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!message) {
      setStatus({ kind: 'error', text: 'Please include a short message.' });
      return;
    }

    setSubmitting(true);
    setStatus({ kind: 'info', text: 'Sending your message…' });

    // Make sure form-name is in the payload (Netlify uses this to route).
    if (!data.has('form-name')) data.set('form-name', name);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({
        kind: 'success',
        text: 'Thanks! Your message is on its way. We typically reply within one business day.',
      });
      form.reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Contact form submission failed:', err);
      setStatus({
        kind: 'error',
        text: 'Sorry — we couldn’t send that. Please email hello@alfatechlabs.net directly.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      className="card"
      style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}
      name={name}
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      onSubmit={onSubmit}
    >
      {/* Required by Netlify so the submission is routed to this form's bucket. */}
      <input type="hidden" name="form-name" value={name} />

      {/* Netlify's honeypot — visually hidden but present in the DOM so bots
          fill it. Real users never see it. */}
      <p style={{ display: 'none' }}>
        <label>
          Don&apos;t fill this out if you&apos;re human:{' '}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.ae"
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your company"
            autoComplete="organization"
          />
        </div>
        <div className="field">
          <label htmlFor="topic">I&apos;m interested in</label>
          <input
            id="topic"
            name="topic"
            type="text"
            placeholder="e.g. Agentic RAG pilot, POS rollout, automation"
          />
        </div>
      </div>
      <div className="field" style={{ marginTop: '1.25rem' }}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project — the metric you're trying to move, where you are today, what would make it a win."
        />
      </div>
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
          By sending you agree to our{' '}
          <Link href="/privacy" style={{ color: 'var(--iris-300)' }}>
            privacy policy
          </Link>
          .
        </p>
        <button className="btn btn-primary btn-lg" type="submit" disabled={submitting}>
          <span className="btn-label">{submitting ? 'Sending…' : 'Send message'}</span>
          <svg
            className="arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
          </svg>
        </button>
      </div>
      <div
        className={`form-message${status.kind === 'idle' ? '' : ` ${status.kind}`}`}
        role="status"
        aria-live="polite"
      >
        {status.kind !== 'idle' ? status.text : ''}
      </div>
    </form>
  );
}
