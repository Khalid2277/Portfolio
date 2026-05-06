import type { ReactNode } from 'react';

interface DashTableProps {
  /** Optional label rendered above the scroll wrapper, e.g. "Latest transactions". */
  label?: string;
  children: ReactNode;
  /** Add a per-table class so callers can layer extra styling (.inv-tbl, .src-tbl, .rost-tbl). */
  variant?: string;
}

// `.dash-table` shell — used by every table in the dashboard cockpits and
// solution pages. Wraps the table in a horizontally-scrollable container
// (`.dash-table-scroll`) so narrow viewports don't overflow.
//
// Pages own the <thead> / <tbody> markup so each table can have custom cells
// (status badges, monospace numerals, sparklines). Keeps the abstraction thin.
export function DashTable({ label, children, variant }: DashTableProps) {
  const tableCls = variant ? `dash-table ${variant}` : 'dash-table';
  return (
    <div className="tile" style={{ padding: 0, overflow: 'hidden' }}>
      {label && (
        <div style={{ padding: '1rem 1.25rem .5rem' }}>
          <div className="tile-label">{label}</div>
        </div>
      )}
      <div className="dash-table-scroll">
        <table className={tableCls}>{children}</table>
      </div>
    </div>
  );
}
