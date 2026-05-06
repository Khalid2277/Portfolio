'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Direction of the entrance translation. Default 'up'. */
  direction?: Direction;
  /** Add a 12px blur on the initial state. Defaults to false. */
  blur?: boolean;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Stagger child elements (used when wrapping a grid or list). */
  stagger?: number;
  /** Override the wrapper element. Default 'div'. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Override the in-view threshold; matches IntersectionObserver rootMargin behavior. */
  amount?: number;
}

// Replaces the legacy `.reveal` IntersectionObserver glue with Framer Motion's
// `whileInView`. Honors prefers-reduced-motion (returns the static frame).
//
// To stagger children, set `stagger`; the children must be motion.div /
// motion.li or wrapped with motion. The simplest pattern is to pass a list of
// already-Reveal'd children.
export function Reveal({
  children,
  direction = 'up',
  blur = false,
  delay = 0,
  stagger,
  as,
  className,
  style,
  amount = 0.05,
}: RevealProps) {
  const reduced = useReducedMotion();

  const initial = reduced
    ? { opacity: 1 }
    : {
        opacity: 0,
        x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
        y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
        scale: direction === 'scale' ? 0.94 : 1,
        filter: blur || direction === 'blur' ? 'blur(12px)' : 'blur(0px)',
      };

  const animate = reduced
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      };

  const transition = stagger
    ? {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
        delay,
        staggerChildren: stagger,
      }
    : {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
        delay,
      };

  const Component = (motion[(as ?? 'div') as keyof typeof motion] as unknown) as React.ElementType;

  return (
    <Component
      className={className}
      style={style}
      initial={initial as HTMLMotionProps<'div'>['initial']}
      whileInView={animate as HTMLMotionProps<'div'>['animate']}
      viewport={{ once: true, amount }}
      transition={transition}
    >
      {children}
    </Component>
  );
}
