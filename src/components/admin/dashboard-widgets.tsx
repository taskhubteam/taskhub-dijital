"use client";

import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Panel({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className = "",
}: {
  title: string;
  description?: ReactNode;
  icon?: LucideIcon;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 text-neutral-400" aria-hidden="true" />}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
            {description && <p className="text-xs text-neutral-500">{description}</p>}
          </div>
        </div>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const TONES = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100",
} as const;

export type Tone = keyof typeof TONES;

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
  delta,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  tone?: Tone;
  delta?: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-neutral-500">{label}</span>
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-lg ring-1 ${TONES[tone]}`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 tabular-nums">
        {value}
      </div>
      {delta && <div className="mt-1">{delta}</div>}
    </div>
  );
}

/**
 * Change vs the previous period. `higherIsBetter: false` for metrics like average position,
 * where a drop is an improvement. Shown with an arrow and words, never colour alone.
 */
export function Delta({
  current,
  previous,
  higherIsBetter = true,
  format = "percent",
}: {
  current: number;
  previous: number;
  higherIsBetter?: boolean;
  format?: "percent" | "points";
}) {
  if (!previous && !current) return <span className="text-xs text-neutral-400">No data</span>;
  if (!previous) return <span className="text-xs text-neutral-400">New this period</span>;

  const diff = current - previous;
  const text =
    format === "points"
      ? `${Math.abs(diff).toFixed(1)}`
      : `${Math.abs((diff / previous) * 100).toFixed(0)}%`;
  const flat = format === "points" ? Math.abs(diff) < 0.05 : Math.abs(diff / previous) < 0.005;
  if (flat) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
        <Minus className="size-3.5" aria-hidden="true" /> No change vs previous 28 days
      </span>
    );
  }
  const good = higherIsBetter ? diff > 0 : diff < 0;
  const Arrow = diff > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${good ? "text-emerald-700" : "text-red-700"}`}
    >
      <Arrow className="size-3.5" aria-hidden="true" />
      {diff > 0 ? "Up" : "Down"} {text}
      <span className="font-normal text-neutral-500">vs previous 28 days</span>
    </span>
  );
}

/** Ranked list with a thin magnitude bar behind each value. */
export function MeterList({
  rows,
  format = (n) => n.toLocaleString(),
  empty = "No data yet.",
}: {
  rows: { label: string; value: number; title?: string }[];
  format?: (n: number) => string;
  empty?: string;
}) {
  if (rows.length === 0) return <p className="text-sm text-neutral-500">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label} className="text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-neutral-700" title={row.title ?? row.label}>
              {row.label}
            </span>
            <span className="shrink-0 font-medium tabular-nums text-neutral-900">
              {format(row.value)}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-neutral-100">
            <div
              className="h-1.5 rounded-full bg-blue-600"
              style={{ width: `${Math.max((row.value / max) * 100, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function shortDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function niceMax(n: number) {
  if (n <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(n));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * pow >= n / 4)! * pow;
  return Math.ceil(n / step) * step;
}

/**
 * Daily bar chart, one series. Bars in a single brand hue, recessive grid, hover/focus tooltip.
 */
export function DailyBars({
  data,
  format = (n) => n.toLocaleString(),
  label,
}: {
  data: { date: string; value: number }[];
  format?: (n: number) => string;
  label: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const W = 720;
  const H = 200;
  const pad = { top: 12, right: 8, bottom: 24, left: 36 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const max = niceMax(Math.max(...data.map((d) => d.value), 0));
  const slot = innerW / Math.max(data.length, 1);
  const barW = Math.max(slot - 2, 1);
  const ticks = [0, max / 2, max];
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;
  const labelIdx = [0, Math.floor((data.length - 1) / 2), data.length - 1];
  const point = active !== null ? data[active] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${label} per day`}
        onMouseLeave={() => setActive(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={y(t)}
              y2={y(t)}
              stroke={t === 0 ? "#cbd5e1" : "#eef2f6"}
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-[11px] tabular-nums"
            >
              {format(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.left + i * slot + 1;
          const h = Math.max(pad.top + innerH - y(d.value), d.value > 0 ? 2 : 0);
          const top = pad.top + innerH - h;
          const r = Math.min(4, barW / 2, h);
          return (
            <g key={d.date}>
              {/* Bar with rounded top, square at the baseline. */}
              {h > 0 && (
                <path
                  d={`M${x},${top + h} V${top + r} Q${x},${top} ${x + r},${top} H${x + barW - r} Q${x + barW},${top} ${x + barW},${top + r} V${top + h} Z`}
                  className={active === i ? "fill-blue-800" : "fill-blue-600"}
                />
              )}
              {/* Full-height hit target, larger than the bar. */}
              <rect
                x={pad.left + i * slot}
                y={pad.top}
                width={slot}
                height={innerH}
                fill="transparent"
                tabIndex={0}
                aria-label={`${shortDate(d.date)}: ${format(d.value)} ${label.toLowerCase()}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="cursor-default outline-none"
              />
            </g>
          );
        })}
        {labelIdx.map((i) =>
          data[i] ? (
            <text
              key={i}
              x={pad.left + i * slot + slot / 2}
              y={H - 6}
              textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
              className="fill-neutral-400 text-[11px]"
            >
              {shortDate(data[i].date)}
            </text>
          ) : null,
        )}
      </svg>
      {point && active !== null && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{
            left: `${Math.min(Math.max(((pad.left + active * slot + slot / 2) / W) * 100, 10), 90)}%`,
          }}
        >
          <div className="text-neutral-500">{shortDate(point.date)}</div>
          <div className="font-semibold tabular-nums text-neutral-900">
            {format(point.value)} {label.toLowerCase()}
          </div>
        </div>
      )}
    </div>
  );
}
