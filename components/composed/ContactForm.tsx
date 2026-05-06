'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  /** FormSubmit AJAX endpoint. */
  endpoint?: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'info'; text: string }
  | { kind: 'success'; text: string }
  | { kind: 'error'; text: string };

const DEFAULT_ENDPOINT = 'https://formsubmit.co/ajax/hello@alfatechlabs.net';

// Direct port of the legacy contact form handler (main.js lines 173–244).
// Same hidden FormSubmit fields (_subject, _template, _captcha, _honey),
// same client-side regex validation, same status semantics, same fetch shape
// (POSTs JSON with Content-Type: application/json, Accept: application/json).
//
// FormSubmit's first-ever submission to a new endpoint email triggers an
// activation email to the recipient — once that link is clicked, all
// subsequent submissions deliver normally.
export function ContactForm({ endpoint = DEFAULT_ENDPOINT }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently drop bots that fill the hidden _honey field.
    if (((data.get('_honey') as string) || '').trim() !== '') return;

    const name = ((data.get('name') as string) || '').trim();
    const email = ((data.get('email') as string) || '').trim();
    const message = ((data.get('message') as string) || '').trim();

    if (!name) {
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

    // FormSubmit's /ajax/ endpoint expects JSON, not multipart FormData.
    const payload: Record<string, unknown> = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
        error?: string;
      };
      const ok =
        res.ok &&
        (json.success === true ||
          json.success === 'true' ||
          (!('success' in json) && res.ok));
      if (!ok) {
        const detail = json.message || json.error || `HTTP ${res.status}`;
        throw new Error(detail);
      }
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
      action={endpoint}
      method="POST"
      noValidate
      onSubmit={onSubmit}
    >
      {/* Hidden FormSubmit configuration — preserved verbatim from legacy markup. */}
      <input type="hidden" name="_subject" value="New contact from alfatechlabs.net" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
        }}
        aria-hidden="true"
      />

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
