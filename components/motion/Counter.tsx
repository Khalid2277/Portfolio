'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  /** Animation duration in ms (matches legacy default 1400). */
  duration?: number;
  /** Number of decimal places when target has a fractional part (matches legacy v.toFixed(1)). */
  decimals?: 0 | 1;
  /** Format integers with thousands separators (e.g. 1,284). */
  thousands?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Counter animation — direct port of main.js lines 104–119 (eased cubic
// `1 - (1-t)^3`). Triggers on first IntersectionObserver entry, runs once.
// On reduced-motion, jumps straight to the final value.
export function Counter({
  target,
  suffix = '',
  duration = 1400,
  decimals,
  thousands = false,
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [text, setText] = useState<string>(() => format(0, target, suffix, decimals, thousands));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setText(format(target, target, suffix, decimals, thousands));
      return;
    }

    const start = (now?: number) => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = now ?? performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (n: number) => {
        const t = Math.min(1, (n - t0) / duration);
        const v = target * ease(t);
        setText(format(v, target, suffix, decimals, thousands));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { rootMargin: '-40px 0px -40px 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, duration, decimals, thousands]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}

function format(
  value: number,
  target: number,
  suffix: string,
  decimals: 0 | 1 | undefined,
  thousands: boolean
): string {
  const isFloat = decimals !== undefined ? decimals === 1 : target % 1 !== 0;
  if (isFloat) return value.toFixed(1) + suffix;
  const rounded = Math.round(value);
  const str = thousands ? rounded.toLocaleString('en-US') : String(rounded);
  return str + suffix;
}
