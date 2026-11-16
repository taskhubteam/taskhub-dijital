import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Cloudflare Workers can't run sharp; images are pre-sized (admin uploads get WebP variants).
  images: { unoptimized: true },
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    // One canonical host: www → apex (301).
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.taskhubdijital.com" }],
        destination: "https://taskhubdijital.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;

// Makes the D1 binding (and other Cloudflare bindings) available in `next dev`.
initOpenNextCloudflareForDev();
