'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'gradient';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Enable cursor-tracked magnetic pull (only large CTAs by convention). */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps>;
export type ButtonProps = ButtonAsLink | ButtonAsButton;

function classes(variant: Variant, size: Size, magnetic: boolean, extra?: string) {
  const v = `btn-${variant}`;
  const s = size === 'md' ? '' : ` btn-${size}`;
  return `btn ${v}${s}${magnetic ? ' atl-btn-magnet' : ''}${extra ? ` ${extra}` : ''}`;
}

// Magnetic effect — direct port of animations.js initMagnetic. Spring-following
// translate driven by --bx/--by CSS vars (CSS in animations.css consumes them).
function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rect: DOMRect | null = null;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function tick() {
      const k = 0.22;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      el!.style.setProperty('--bx', `${current.x.toFixed(2)}px`);
      el!.style.setProperty('--by', `${current.y.toFixed(2)}px`);
      if (
        Math.abs(target.x - current.x) > 0.05 ||
        Math.abs(target.y - current.y) > 0.05
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    }
    function kick() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add('atl-magnet');
    };
    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) * 0.28;
      target.y = (e.clientY - cy) * 0.28;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      el.classList.remove('atl-magnet');
      kick();
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove as EventListener);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove as EventListener);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return ref;
}

// `<Button>` — emits `.btn .btn-{variant} [.btn-{size}] [.atl-btn-magnet]` so
// existing main.css/animations.css styles it untouched. Renders an <a> when
// `href` is provided (Next <Link>), otherwise a <button>.
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', magnetic = false, className, children } = props;
  const ref = useMagnetic(magnetic) as React.RefObject<HTMLAnchorElement & HTMLButtonElement>;
  const cls = classes(variant, size, magnetic, className);

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    // External links use a plain anchor; same-origin uses Next Link for prefetch.
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a ref={ref} href={href} className={cls} {...stripCommon(rest)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} ref={ref as any} {...stripCommon(rest)}>
        {children}
      </Link>
    );
  }
  const { ...rest } = props as ButtonAsButton;
  return (
    <button ref={ref} className={cls} {...stripCommon(rest)}>
      {children}
    </button>
  );
}

function stripCommon<T extends Record<string, unknown>>(p: T) {
  // Strip our own props so they don't leak onto the DOM element.
  const { variant, size, magnetic, className, children, ...rest } = p as any;
  return rest;
}
