'use client';

import type { ReactNode } from 'react';
import { useTilt } from '@/components/motion/useTilt';

interface DashTableProps {
  /** Optional label rendered above the scroll wrapper, e.g. "Latest transactions". */
  label?: string;
  children: ReactNode;
  /** Add a per-table class so callers can layer extra styling (.inv-tbl, .src-tbl, .rost-tbl). */
  variant?: string;
  /** Disable the 3D tilt hover (defaults to on so Latest transactions, Low stock alerts,
   *  Top performers, Recent reports all tilt with the same feel as the home cards). */
  tilt?: boolean;
}

// `.dash-table` shell — used by every table in the dashboard cockpits and
// solution pages. Wraps the table in a horizontally-scrollable container
// (`.dash-table-scroll`) so narrow viewports don't overflow.
//
// The outer `.tile` wrapper opts into the same 3D tilt spring as `<Card>` and
// `<Tile>` so the whole panel responds to the cursor like every other card on
// the page. Disabled on touch / reduced-motion via the shared useTilt hook.
export function DashTable({ label, children, variant, tilt = true }: DashTableProps) {
  const ref = useTilt<HTMLDivElement>(tilt);
  const tableCls = variant ? `dash-table ${variant}` : 'dash-table';
  const wrapperCls = `tile${tilt ? ' atl-tilt' : ''}`;

  return (
    <div ref={ref} className={wrapperCls} style={{ padding: 0, overflow: 'hidden' }}>
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
