"use server";

import { requireSession } from "@/lib/auth";
import { getGoogleAccessToken, readPrivateKey } from "@/lib/google-auth";

export type AnalyticsSummary = {
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDurationSeconds: number;
  engagementRate: number;
  topCountries: { country: string; users: number }[];
  topPages: { path: string; views: number }[];
  devices: { device: string; users: number }[];
};

type GaReport = {
  rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[];
};

async function batchRunReports(
  accessToken: string,
  propertyId: string,
  requests: object[],
): Promise<GaReport[]> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    },
  );
  if (!res.ok) throw new Error(`GA report failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { reports: GaReport[] };
  return data.reports;
}

export async function getAnalyticsSummary() : Promise<AnalyticsSummary | null> {
    await requireSession();

    const propertyId = process.env.GA_PROPERTY_ID;
    const clientEmail = process.env.GA_CLIENT_EMAIL;
    const privateKey = readPrivateKey(process.env.GA_PRIVATE_KEY);
    if (!propertyId || !clientEmail || !privateKey) return null;

    const dateRanges = [{ startDate: "30daysAgo", endDate: "today" }];

    try {
      const accessToken = await getGoogleAccessToken(
        clientEmail,
        privateKey,
        "https://www.googleapis.com/auth/analytics.readonly",
      );

      const [summary, countries, pages, devices] = await batchRunReports(accessToken, propertyId, [
        {
          dateRanges,
          metrics: [
            { name: "totalUsers" },
            { name: "newUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
            { name: "engagementRate" },
          ],
        },
        {
          dateRanges,
          dimensions: [{ name: "country" }],
          metrics: [{ name: "totalUsers" }],
          orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
          limit: 5,
        },
        {
          dateRanges,
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 5,
        },
        {
          dateRanges,
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "totalUsers" }],
          orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
          limit: 5,
        },
      ]);

      const row = summary.rows?.[0]?.metricValues;
      return {
        totalUsers: Number(row?.[0]?.value ?? 0),
        newUsers: Number(row?.[1]?.value ?? 0),
        sessions: Number(row?.[2]?.value ?? 0),
        pageViews: Number(row?.[3]?.value ?? 0),
        avgSessionDurationSeconds: Number(row?.[4]?.value ?? 0),
        engagementRate: Number(row?.[5]?.value ?? 0),
        topCountries: (countries.rows ?? []).map((r) => ({
          country: r.dimensionValues?.[0]?.value ?? "Unknown",
          users: Number(r.metricValues?.[0]?.value ?? 0),
        })),
        topPages: (pages.rows ?? []).map((r) => ({
          path: r.dimensionValues?.[0]?.value ?? "/",
          views: Number(r.metricValues?.[0]?.value ?? 0),
        })),
        devices: (devices.rows ?? []).map((r) => ({
          device: r.dimensionValues?.[0]?.value ?? "Unknown",
          users: Number(r.metricValues?.[0]?.value ?? 0),
        })),
      };
    } catch (error) {
      console.error("Google Analytics report failed:", error);
      return null;
    }
  }
