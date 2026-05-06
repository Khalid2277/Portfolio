import type { ReactNode } from 'react';

// `.pill` — inline badge used everywhere (tag rails, status chips, integration
// lists). Tone is driven by inline style/var overrides on the call site, same
// pattern as the legacy markup (e.g. `border-color: rgba(25,195,125,.4); color: var(--iris-300)`).
export function Pill({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`pill${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </span>
  );
}
