import type { ReactNode } from 'react';

type Tone = 'live' | 'syncing' | 'reauth' | 'critical' | 'low' | 'success' | 'warning' | 'neutral';

const TONE_STYLE: Record<Tone, React.CSSProperties> = {
  live: { color: 'var(--iris-300)', borderColor: 'rgba(25,195,125,.4)' },
  syncing: { color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' },
  reauth: { color: '#ef6f6f', borderColor: 'rgba(239,111,111,.3)' },
  critical: { color: '#ef6f6f', borderColor: 'rgba(239,111,111,.3)' },
  low: { color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' },
  success: { color: 'var(--iris-300)', borderColor: 'rgba(25,195,125,.4)' },
  warning: { color: 'var(--sand-400)', borderColor: 'rgba(245,158,11,.3)' },
  neutral: {},
};

// Colored pill used for table status cells (live / syncing / re-auth /
// critical / low). Same DOM as a `.pill`, just with the legacy inline styles
// codified as a tone prop so call sites stay tidy.
export function StatusBadge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span className="pill" style={TONE_STYLE[tone]}>
      {children}
    </span>
  );
}
