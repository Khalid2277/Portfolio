'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/components/motion/useTilt';

interface TileProps {
  children: ReactNode;
  tilt?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// `.tile` — dashboard / KPI tile. Distinct from `.card` in main.css; same
// tilt behavior so we share useTilt().
export function Tile({ children, tilt = true, className, style }: TileProps) {
  const ref = useTilt<HTMLDivElement>(tilt);
  const cls = `tile${tilt ? ' atl-tilt' : ''}${className ? ` ${className}` : ''}`;
  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}
