import type { ReactNode } from 'react';

// `.eyebrow` — small uppercase label used at the top of every section/page hero.
// Existing styling lives in main.css; this just emits the class + content.
export function Eyebrow({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`eyebrow${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </span>
  );
}
