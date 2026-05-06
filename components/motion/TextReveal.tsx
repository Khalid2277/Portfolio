'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Fragment, useEffect, useRef, type ElementType } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  /** The string content to split word-by-word. Pass plain text, not nested JSX. */
  children: string;
  /** Wrapper element. Default 'span' so it inlines inside an <h1>. */
  as?: ElementType;
  /** Delay each word's animation, seconds. Default 0.05. */
  stagger?: number;
  /** Total duration per word, seconds. Default 0.85. */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Word-by-word cinematic reveal — direct port of animations.js initGSAP().
// Each word lives inside an `.atl-split .word-line` wrapper so it slides up
// from below an overflow-hidden line. animations.css drives the initial frame
// (yPercent: 110, rotate: 6, opacity: 0).
//
// Above-the-fold instances play immediately (matching the legacy `aboveFold`
// branch). Below-fold instances trigger via ScrollTrigger at top 88%.
//
// On prefers-reduced-motion, the words stay in their final state and no
// animation runs.
export function TextReveal({
  children,
  as = 'span',
  stagger = 0.05,
  duration = 0.85,
  className,
  style,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedRef = useRef<boolean>(false);

  // Pre-split words at render time so SSR ships the wrapped DOM. Each word
  // wraps in a `.word-line` (overflow:hidden) span containing a `.word` span.
  const words = children.split(/\s+/).filter(Boolean);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reducedRef.current) {
        // Make sure final state is visible if motion is reduced.
        el.querySelectorAll<HTMLElement>('.word').forEach((w) => {
          w.style.transform = 'translateY(0) rotate(0)';
          w.style.opacity = '1';
        });
        return;
      }

      const wordEls = el.querySelectorAll<HTMLElement>('.word');
      if (!wordEls.length) return;

      const rect = el.getBoundingClientRect();
      const aboveFold = rect.top < window.innerHeight;

      const tween = gsap.fromTo(
        wordEls,
        { yPercent: 110, rotate: 6, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          paused: !aboveFold,
        }
      );

      if (aboveFold) {
        tween.play(0);
      } else {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => tween.play(0),
        });
      }
    },
    { scope: ref as unknown as React.MutableRefObject<HTMLElement> }
  );

  // Cast to a generic React.ElementType so TypeScript doesn't union over every
  // possible intrinsic element (which trips the union-too-complex error).
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`text-reveal atl-split${className ? ` ${className}` : ''}`}
      style={style}
    >
      {words.map((word, i) => (
        // The trailing space lives OUTSIDE the .word-line wrapper. Putting it
        // inside would let .word-line { overflow: hidden } clip it, which is
        // what was running every word together visually.
        <Fragment key={i}>
          <span className="word-line">
            <span className="word" style={{ ['--i' as string]: i } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
