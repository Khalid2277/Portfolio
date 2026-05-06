'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface AccordionItem {
  trigger: ReactNode; // displayed in the trigger button
  content: ReactNode; // body, rendered inside `.accordion-content-inner`
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item open at first paint (matches the legacy `<div class="accordion-item open">` pattern). */
  defaultOpenIndex?: number;
  /** Match legacy single-open behavior. Set false for multi-open. */
  singleOpen?: boolean;
}

// Pixel-faithful port of the legacy `.accordion` block. Uses the existing
// `.accordion`, `.accordion-item`, `.accordion-trigger`, `.accordion-content`,
// `.accordion-content-inner`, `.chev` classes from main.css.
//
// Behavior parity:
// - max-height animates from 0 → scrollHeight on open and back on close,
//   matching main.js lines 135–155.
// - Single-open behavior closes any other open item when one is opened.
// - Resize observer keeps the open item's max-height in sync if the content
//   grows (e.g. fonts loading after first paint).
export function Accordion({ items, defaultOpenIndex = 0, singleOpen = true }: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(defaultOpenIndex >= 0 && defaultOpenIndex < items.length ? [defaultOpenIndex] : [])
  );

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      const isOpen = next.has(i);
      if (singleOpen) next.clear();
      if (!isOpen) next.add(i);
      return next;
    });
  };

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionRow key={i} item={item} open={openSet.has(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) setMaxHeight(`${el.scrollHeight}px`);
    else setMaxHeight('0px');
  }, [open, item.content]);

  // Keep the open height accurate if content size changes (fonts, images).
  useEffect(() => {
    if (!open) return;
    const el = contentRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setMaxHeight(`${el.scrollHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <button
        className="accordion-trigger"
        type="button"
        aria-expanded={open}
        onClick={onToggle}
      >
        {item.trigger}
        <span className="chev" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div className="accordion-content" ref={contentRef} style={{ maxHeight }}>
        <div className="accordion-content-inner">{item.content}</div>
      </div>
    </div>
  );
}
