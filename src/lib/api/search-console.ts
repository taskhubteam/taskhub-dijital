"use server";

import { requireSession } from "@/lib/auth";
import { SITE_URL } from "@/lib/site";
import { getGoogleAccessToken, readPrivateKey } from "@/lib/google-auth";

export type GscTotals = { clicks: number; impressions: number; ctr: number; position: number };
export type GscRow = GscTotals & { key: string };

export type SearchConsoleSummary = {
  startDate: string;
  endDate: string;
  totals: GscTotals;
  previous: GscTotals;
  daily: GscRow[];
  queries: GscRow[];
  pages: GscRow[];
  countries: GscRow[];
  devices: GscRow[];
  sitemaps: {
    path: string;
    submitted: number;
    errors: number;
    warnings: number;
    lastDownloaded?: string;
  }[];
};

const API = "https://searchconsole.googleapis.com/webmasters/v3";
const DAYS = 28;
// Search Console data lags ~2–3 days; ending the window 2 days back avoids a half-empty last day.
const LAG_DAYS = 2;

function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

type ApiRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

// The API orders by clicks only; with few clicks most rows tie at 0, so rank by impressions next.
const byClicks = (a: ApiRow, b: ApiRow) => b.clicks - a.clicks || b.impressions - a.impressions;
const byImpressions = (a: ApiRow, b: ApiRow) =>
  b.impressions - a.impressions || b.clicks - a.clicks;
const top = (rows: ApiRow[], n: number, cmp: (a: ApiRow, b: ApiRow) => number) =>
  [...rows].sort(cmp).slice(0, n);

const EMPTY: GscTotals = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

function toRow(r: ApiRow): GscRow {
  return {
    key: r.keys?.[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  };
}

// ISO 3166-1 alpha-3 (what Search Console returns) → readable name, via Intl.
function countryName(alpha3: string): string {
  const alpha2 = ALPHA3_TO_2[alpha3.toUpperCase()];
  if (!alpha2) return alpha3.toUpperCase();
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(alpha2) ?? alpha3;
  } catch {
    return alpha3.toUpperCase();
  }
}

// Only the markets that realistically show up; anything else falls back to the code.
const ALPHA3_TO_2: Record<string, string> = {
  usa: "US",
  gbr: "GB",
  can: "CA",
  aus: "AU",
  deu: "DE",
  fra: "FR",
  nld: "NL",
  bel: "BE",
  che: "CH",
  aut: "AT",
  irl: "IE",
  esp: "ES",
  ita: "IT",
  prt: "PT",
  swe: "SE",
  nor: "NO",
  dnk: "DK",
  fin: "FI",
  pol: "PL",
  bgd: "BD",
  ind: "IN",
  pak: "PK",
  are: "AE",
  sau: "SA",
  sgp: "SG",
  mys: "MY",
  phl: "PH",
  idn: "ID",
  nga: "NG",
  zaf: "ZA",
  bra: "BR",
  mex: "MX",
  nzl: "NZ",
  jpn: "JP",
  kor: "KR",
  chn: "CN",
  tur: "TR",
  egy: "EG",
  ken: "KE",
  lka: "LK",
  npl: "NP",
  vnm: "VN",
  tha: "TH",
  ukr: "UA",
  rou: "RO",
  cze: "CZ",
  grc: "GR",
  hun: "HU",
  isr: "IL",
  arg: "AR",
  col: "CO",
  chl: "CL",
  per: "PE",
  hkg: "HK",
  twn: "TW",
  qat: "QA",
  kwt: "KW",
  isl: "IS",
  omn: "OM",
  bhr: "BH",
  jor: "JO",
  lbn: "LB",
  mar: "MA",
  gha: "GH",
  rus: "RU",
};

export async function getSearchConsoleSummary() : Promise<SearchConsoleSummary | null> {
    await requireSession();

    // Prefer a dedicated Search Console service account; fall back to the GA one if it has
    // also been added as a user on the Search Console property.
    const clientEmail = process.env.GSC_CLIENT_EMAIL ?? process.env.GA_CLIENT_EMAIL;
    const privateKey = readPrivateKey(process.env.GSC_PRIVATE_KEY ?? process.env.GA_PRIVATE_KEY);
    const siteUrl = process.env.GSC_SITE_URL ?? `${SITE_URL}/`;
    if (!clientEmail || !privateKey) return null;

    const endDate = isoDay(LAG_DAYS);
    const startDate = isoDay(LAG_DAYS + DAYS - 1);
    const prevEnd = isoDay(LAG_DAYS + DAYS);
    const prevStart = isoDay(LAG_DAYS + 2 * DAYS - 1);

    try {
      const token = await getGoogleAccessToken(
        clientEmail,
        privateKey,
        "https://www.googleapis.com/auth/webmasters.readonly",
      );
      const site = encodeURIComponent(siteUrl);

      const query = async (body: object): Promise<ApiRow[]> => {
        const res = await fetch(`${API}/sites/${site}/searchAnalytics/query`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok)
          throw new Error(`Search Console query failed: ${res.status} ${await res.text()}`);
        return ((await res.json()) as { rows?: ApiRow[] }).rows ?? [];
      };
      const range = { startDate, endDate };

      const [totals, previous, daily, queries, pages, countries, devices, sitemapsRes] =
        await Promise.all([
          query(range),
          query({ startDate: prevStart, endDate: prevEnd }),
          query({ ...range, dimensions: ["date"], rowLimit: DAYS }),
          query({ ...range, dimensions: ["query"], rowLimit: 1000 }),
          query({ ...range, dimensions: ["page"], rowLimit: 1000 }),
          query({ ...range, dimensions: ["country"], rowLimit: 250 }),
          query({ ...range, dimensions: ["device"], rowLimit: 5 }),
          fetch(`${API}/sites/${site}/sitemaps`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => (r.ok ? r.json() : { sitemap: [] })),
        ]);

      // Fill missing days with zeros so the chart has one bar per day.
      const byDate = new Map(daily.map((r) => [r.keys?.[0], r]));
      const allDays: GscRow[] = [];
      for (let i = LAG_DAYS + DAYS - 1; i >= LAG_DAYS; i--) {
        const day = isoDay(i);
        const r = byDate.get(day);
        allDays.push(r ? toRow(r) : { key: day, ...EMPTY });
      }

      type Sitemap = {
        path: string;
        errors?: string;
        warnings?: string;
        lastDownloaded?: string;
        contents?: { submitted?: string }[];
      };

      return {
        startDate,
        endDate,
        totals: totals[0] ? toRow(totals[0]) : EMPTY,
        previous: previous[0] ? toRow(previous[0]) : EMPTY,
        daily: allDays,
        queries: top(queries, 10, byClicks).map(toRow),
        pages: top(pages, 10, byClicks).map((r) => {
          const row = toRow(r);
          return { ...row, key: row.key.replace(/^https?:\/\/[^/]+/, "") || "/" };
        }),
        countries: top(countries, 6, byImpressions).map((r) => {
          const row = toRow(r);
          return { ...row, key: countryName(row.key) };
        }),
        devices: top(devices, 5, byImpressions).map((r) => {
          const row = toRow(r);
          return { ...row, key: row.key.charAt(0) + row.key.slice(1).toLowerCase() };
        }),
        sitemaps: ((sitemapsRes as { sitemap?: Sitemap[] }).sitemap ?? []).map((m) => ({
          path: m.path,
          submitted: (m.contents ?? []).reduce((n, c) => n + Number(c.submitted ?? 0), 0),
          errors: Number(m.errors ?? 0),
          warnings: Number(m.warnings ?? 0),
          lastDownloaded: m.lastDownloaded,
        })),
      };
    } catch (error) {
      console.error("Search Console report failed:", error);
      return null;
    }
  }
