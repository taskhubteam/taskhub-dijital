# TaskHub Dijital

Agency website + blog for **TaskHub Dijital** (TASKHUB Recruitment Solutions).

**Stack:** Next.js 16 (App Router, React 19) on **Cloudflare Workers** via
[OpenNext](https://opennext.js.org/cloudflare) · Tailwind CSS 3 · Framer Motion / GSAP / Three.js ·
**Cloudflare D1** (blog posts, categories, admin users, contact messages, uploaded images).

## SEO / GEO built in

- Every marketing page is pre-rendered HTML with its own title, description, canonical, Open Graph
  and Twitter card (`pageMetadata()` in `src/lib/seo.ts`).
- JSON-LD: Organization + ProfessionalService (NAP), WebSite, WebPage, Service (with prices shown on
  that page), FAQPage (home), BreadcrumbList, Blog, BlogPosting.
- `/sitemap.xml`, `/robots.txt` (AI crawlers allowed), `/rss.xml`, `/llms.txt`, `/llms-full.txt`
  are generated from the site data and D1.
- Publishing a post pings **IndexNow** (Bing, Yandex… → ChatGPT search / Copilot) in production.
  The key file lives in `public/<key>.txt` and must match `INDEXNOW_KEY` in `src/lib/indexnow.ts`.
- Admin post editor has a Yoast-style SEO + readability panel.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars        # SESSION_SECRET, GROQ_API_KEY…
npm run db:migrate:local              # create tables in the local D1 (.wrangler/state)
npm run admin:create                  # create your admin login (local)
npm run dev                           # http://localhost:3000 — admin at /admin
npm run preview                       # production build inside the real Workers runtime (:8787)
```

Public env vars (build time) go in `.env`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## Deploy to Cloudflare (one-time setup)

Next.js on Cloudflare runs as a **Worker** (Cloudflare's dashboard lists it under
*Workers & Pages*). This is Cloudflare's recommended path for Next.js; the older
`next-on-pages` adapter for Pages is deprecated.

1. `npx wrangler login`
2. Create the database and paste the printed `database_id` into `wrangler.jsonc`:
   ```bash
   npx wrangler d1 create taskhub-dijital
   npm run db:migrate:remote
   ```
3. Secrets (never commit them):
   ```bash
   npx wrangler secret put SESSION_SECRET   # any long random string: openssl rand -hex 32
   npx wrangler secret put GROQ_API_KEY     # AI chat assistant
   npx wrangler secret put BREVO_API_KEY    # emails form messages to taskhubdijital@gmail.com (cc taskhubteam1@gmail.com)
   # optional: BREVO_SENDER (verified Brevo sender), GA_*/GSC_* (dashboard)
   ```
4. Production admin: `npm run admin:create -- --remote`
5. Deploy: `npm run deploy` — or connect the GitHub repo in the dashboard
   (**Workers & Pages → Create → Import a repository**): build command
   `npx opennextjs-cloudflare build`, deploy command `npx opennextjs-cloudflare deploy`,
   Worker name `taskhub-dijital`. Add any `NEXT_PUBLIC_*` values as build variables.
6. Add the domain: Worker → **Settings → Domains & Routes → Custom domain**.
7. After launch: submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster
   Tools.

## Code map

| Path | What |
|---|---|
| `src/app/(site)/*` | Public pages (metadata + JSON-LD) → render `src/views/*` |
| `src/views/*`, `src/components/*.jsx` | Page designs (client components, SSR'd) |
| `src/app/(site)/blog/*` | Blog list + article |
| `src/app/admin/*`, `src/components/admin*` | Admin (posts, categories, media, messages, settings) |
| `src/lib/api/*` | Server actions (D1 queries; admin ones require a session) |
| `src/lib/site.ts` | Business facts (domain, NAP, socials) — single source of truth |
| `src/lib/seo.ts` | Metadata + JSON-LD helpers |
| `src/content/faqs.ts` | Home FAQ (rendered + FAQPage schema + llms.txt) |
| `src/app/api/chat/route.ts`, `src/lib/chat-prompt.ts` | AI chat assistant (Groq, server-side) |
| `migrations/` | D1 schema |
