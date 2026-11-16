"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Globe2,
  LayoutDashboard,
  Map as MapIcon,
  MonitorSmartphone,
  MousePointerClick,
  PencilLine,
  Percent,
  Plus,
  Search,
  TrendingUp,
  UserPlus,
  Users,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { AdminPageHeader } from "@/components/admin-shell";
import { DailyBars, Delta, MeterList, Panel, StatCard } from "@/components/admin/dashboard-widgets";
import type { AnalyticsSummary } from "@/lib/api/analytics";
import type { AdminPost } from "@/lib/api/posts";
import type { GscRow, SearchConsoleSummary } from "@/lib/api/search-console";
import { isPostScheduled } from "@/lib/post-status";

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  return `${minutes}m ${remaining}s`;
}

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const compact = (n: number) =>
  n >= 10000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : Math.round(n).toLocaleString();

function formatRange(start: string, end: string) {
  const f = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  return `${f(start)} – ${f(end)}`;
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function SearchTable({ rows, keyLabel }: { rows: GscRow[]; keyLabel: string }) {
  if (rows.length === 0) return <p className="text-sm text-neutral-500">No data yet.</p>;
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left text-xs text-neutral-500">
            <th className="px-5 pb-2 font-medium">{keyLabel}</th>
            <th className="px-2 pb-2 text-right font-medium">Clicks</th>
            <th className="px-2 pb-2 text-right font-medium">Impr.</th>
            <th className="px-2 pb-2 text-right font-medium">CTR</th>
            <th className="pb-2 pl-2 pr-5 text-right font-medium">Pos.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-neutral-50 last:border-0">
              <td className="max-w-0 truncate px-5 py-2 text-neutral-800" title={r.key}>
                {r.key}
              </td>
              <td className="px-2 py-2 text-right font-medium tabular-nums text-neutral-900">
                {r.clicks.toLocaleString()}
              </td>
              <td className="px-2 py-2 text-right tabular-nums text-neutral-600">
                {r.impressions.toLocaleString()}
              </td>
              <td className="px-2 py-2 text-right tabular-nums text-neutral-600">{pct(r.ctr)}</td>
              <td className="py-2 pl-2 pr-5 text-right tabular-nums text-neutral-600">
                {r.position.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ChartMetric = "clicks" | "impressions";

export default function AdminDashboard({
  posts,
  analytics,
  search,
}: {
  posts: AdminPost[];
  analytics: AnalyticsSummary | null;
  search: SearchConsoleSummary | null;
}) {
  const [metric, setMetric] = useState<ChartMetric>("clicks");
  const scheduled = posts.filter((p) => isPostScheduled(p)).length;
  const published = posts.filter((p) => p.status === "published").length - scheduled;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const recent = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  return (
    <div className="space-y-10">
      <AdminPageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description={`${greeting()}! Here's how the site and blog are doing.`}
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            New post
          </Link>
        }
      />

      {/* Blog */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={FileText} label="Total posts" value={posts.length} tone="blue" />
          <StatCard icon={CheckCircle2} label="Published" value={published} tone="emerald" />
          <StatCard icon={CalendarClock} label="Scheduled" value={scheduled} tone="violet" />
          <StatCard icon={PencilLine} label="Drafts" value={drafts} tone="amber" />
        </div>
        <Panel
          title="Recently updated"
          icon={Clock}
          actions={
            <Link href="/admin/posts" className="text-xs font-medium text-blue-700 hover:underline">
              All posts
            </Link>
          }
        >
          {recent.length === 0 ? (
            <p className="text-sm text-neutral-500">No posts yet.</p>
          ) : (
            <ul className="-my-2 divide-y divide-neutral-100">
              {recent.map((p) => {
                const isScheduled = isPostScheduled(p);
                const status = isScheduled
                  ? "Scheduled"
                  : p.status === "published"
                    ? "Live"
                    : "Draft";
                const tone =
                  status === "Live"
                    ? "bg-emerald-50 text-emerald-700"
                    : status === "Scheduled"
                      ? "bg-violet-50 text-violet-700"
                      : "bg-amber-50 text-amber-700";
                return (
                  <li key={p.id} className="flex items-center gap-3 py-2">
                    <Link
                      href={`/admin/posts/${p.id}`}
                      className="min-w-0 flex-1 truncate text-sm text-neutral-800 hover:text-blue-700"
                      title={p.title}
                    >
                      {p.title}
                    </Link>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}
                    >
                      {status}
                    </span>
                    <span className="hidden shrink-0 text-xs tabular-nums text-neutral-400 sm:inline">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>

      {/* Google Search */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <Search className="size-5 text-blue-700" aria-hidden="true" />
              Google Search
            </h2>
            <p className="mt-0.5 text-sm text-neutral-500">
              {search
                ? `Search Console, last 28 days (${formatRange(search.startDate, search.endDate)}). Data lags 2–3 days.`
                : "From Google Search Console."}
            </p>
          </div>
          {search && (
            <a
              href="https://search.google.com/search-console?resource_id=https%3A%2F%2Fmofizul.com%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-700 hover:underline"
            >
              Open Search Console
            </a>
          )}
        </div>

        {!search ? (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-600">
            Search Console isn't connected yet. Add <code>GSC_CLIENT_EMAIL</code> and{" "}
            <code>GSC_PRIVATE_KEY</code> (a service account that's a user on the Search Console
            property) as Cloudflare Worker secrets, then redeploy.
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                icon={MousePointerClick}
                label="Clicks"
                value={search.totals.clicks.toLocaleString()}
                tone="blue"
                delta={<Delta current={search.totals.clicks} previous={search.previous.clicks} />}
              />
              <StatCard
                icon={Eye}
                label="Impressions"
                value={compact(search.totals.impressions)}
                tone="violet"
                delta={
                  <Delta
                    current={search.totals.impressions}
                    previous={search.previous.impressions}
                  />
                }
              />
              <StatCard
                icon={Percent}
                label="Click-through rate"
                value={pct(search.totals.ctr)}
                tone="emerald"
                delta={<Delta current={search.totals.ctr} previous={search.previous.ctr} />}
              />
              <StatCard
                icon={TrendingUp}
                label="Avg. position"
                value={search.totals.position ? search.totals.position.toFixed(1) : "–"}
                tone="amber"
                delta={
                  <Delta
                    current={search.totals.position}
                    previous={search.previous.position}
                    higherIsBetter={false}
                    format="points"
                  />
                }
              />
            </div>

            <Panel
              title={metric === "clicks" ? "Clicks per day" : "Impressions per day"}
              icon={BarChart3}
              actions={
                <div className="inline-flex rounded-lg bg-neutral-100 p-0.5 text-xs font-medium">
                  {(["clicks", "impressions"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMetric(m)}
                      aria-pressed={metric === m}
                      className={`rounded-md px-3 py-1 capitalize ${
                        metric === m
                          ? "bg-white text-neutral-900 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              }
            >
              <DailyBars
                label={metric === "clicks" ? "Clicks" : "Impressions"}
                format={compact}
                data={search.daily.map((d) => ({ date: d.key, value: d[metric] }))}
              />
            </Panel>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Top search queries" icon={Search}>
                <SearchTable rows={search.queries} keyLabel="Query" />
              </Panel>
              <Panel title="Top pages in Google" icon={FileText}>
                <SearchTable rows={search.pages} keyLabel="Page" />
              </Panel>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Panel title="Countries" description="Impressions" icon={Globe2}>
                <MeterList
                  rows={search.countries.map((c) => ({ label: c.key, value: c.impressions }))}
                  format={compact}
                />
              </Panel>
              <Panel title="Devices" description="Impressions" icon={MonitorSmartphone}>
                <MeterList
                  rows={search.devices.map((d) => ({ label: d.key, value: d.impressions }))}
                  format={compact}
                />
              </Panel>
              <Panel title="Sitemaps" icon={MapIcon}>
                {search.sitemaps.length === 0 ? (
                  <p className="text-sm text-neutral-500">No sitemap submitted.</p>
                ) : (
                  <ul className="space-y-3 text-sm">
                    {search.sitemaps.map((s) => (
                      <li key={s.path}>
                        <div className="truncate font-medium text-neutral-800" title={s.path}>
                          {s.path.replace(/^https?:\/\/[^/]+/, "")}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                          <span>{s.submitted} URLs</span>
                          {s.errors > 0 ? (
                            <span className="font-medium text-red-700">{s.errors} errors</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-700">
                              <CheckCircle2 className="size-3.5" aria-hidden="true" /> No errors
                            </span>
                          )}
                          {s.warnings > 0 && (
                            <span className="text-amber-700">{s.warnings} warnings</span>
                          )}
                        </div>
                        {s.lastDownloaded && (
                          <div className="mt-0.5 text-xs text-neutral-400">
                            Read by Google {new Date(s.lastDownloaded).toLocaleDateString()}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          </div>
        )}
      </section>

      {/* Google Analytics */}
      {analytics && (
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
            <Activity className="size-5 text-blue-700" aria-hidden="true" />
            Visitors
          </h2>
          <p className="mt-0.5 text-sm text-neutral-500">Google Analytics, last 30 days.</p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            <StatCard
              icon={Users}
              label="Visitors"
              value={analytics.totalUsers.toLocaleString()}
              tone="blue"
            />
            <StatCard
              icon={UserPlus}
              label="New visitors"
              value={analytics.newUsers.toLocaleString()}
              tone="cyan"
            />
            <StatCard
              icon={Activity}
              label="Sessions"
              value={analytics.sessions.toLocaleString()}
              tone="violet"
            />
            <StatCard
              icon={Eye}
              label="Page views"
              value={analytics.pageViews.toLocaleString()}
              tone="slate"
            />
            <StatCard
              icon={Clock}
              label="Avg. session"
              value={formatDuration(analytics.avgSessionDurationSeconds)}
              tone="amber"
            />
            <StatCard
              icon={Percent}
              label="Engagement rate"
              value={pct(analytics.engagementRate)}
              tone="emerald"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Panel title="Top countries" description="Visitors" icon={Globe2}>
              <MeterList
                rows={analytics.topCountries.map((c) => ({ label: c.country, value: c.users }))}
              />
            </Panel>
            <Panel title="Top pages" description="Page views" icon={FileText}>
              <MeterList
                rows={analytics.topPages.map((p) => ({ label: p.path, value: p.views }))}
              />
            </Panel>
            <Panel title="Devices" description="Visitors" icon={MonitorSmartphone}>
              <MeterList
                rows={analytics.devices.map((d) => ({
                  label: d.device.charAt(0).toUpperCase() + d.device.slice(1),
                  value: d.users,
                }))}
              />
            </Panel>
          </div>
        </section>
      )}
    </div>
  );
}
