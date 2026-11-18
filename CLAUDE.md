# CLAUDE.md — taskhubdijital.com

Agency website + blog of **TaskHub Dijital** (legal entity: TASKHUB Recruitment Solutions,
PO Box 494995, Dallas, TX 75044 · 469-577-0392 · taskhubdijital@gmail.com).
Repo: `github.com/taskhubteam/taskhub-dijital` (branch `main`, **public**). Live: https://taskhubdijital.com

## The goal (read first)

Rank on Google/Bing **and** get recommended by ChatGPT, Gemini, Claude and Perplexity (SEO + GEO),
then turn visitors into leads (WhatsApp button, home contact form, GHL form on /contact, "Get Started"
→ taskhubrecruitmentsolutions.com/schedule). Every change should help a page get found, build trust or
convert — and keep the site fast (speed is part of SEO).

The owner said Claude may rewrite content "as you think best to get ranks" — but **only with real facts**
(live site, owner, client sites). Never invent reviews, ratings, stats, client names or promises.

## Stack

- **Next.js 16 App Router** (React 19) on **Cloudflare Workers** via **@opennextjs/cloudflare**
  (`wrangler.jsonc`, Worker `taskhub-dijital`, account `taskhubteam1@gmail.com`).
  It is a Worker, not Pages (Pages' next-on-pages is deprecated).
- **Cloudflare D1** `taskhub-dijital` (binding `DB`, id `3fa88e0c-…` in wrangler.jsonc): posts,
  categories, admin users, contact messages, uploaded images (chunked blobs, `src/lib/blob-store.ts`).
- **Tailwind CSS 3** (`tailwind.config.cjs`, red `primary-600 #dc2626`, dark mode via `.dark` class).
  shadcn UI tokens are RGB CSS vars in `src/app/globals.css` (used by the admin only).
- Framer Motion, GSAP, Three.js for the design. Next/Image is unoptimized (Workers can't run sharp).
- Blog + `/admin` were ported from the owner's portfolio (`~/Sites/mofizulportfolio`, TanStack Start).
  TanStack server fns became `"use server"` actions in `src/lib/api/*` keeping the `fn({ data })` shape.
  Admin auth: PBKDF2 + HMAC cookie `th_admin_session` (`src/lib/auth.ts`). Admin actions call
  `requireSession()` — keep that on every new admin action.

## Deploy & local dev

- **Deploy = `npm run deploy`** (opennextjs build + wrangler deploy). Cloudflare's GitHub auto-deploy
  did NOT fire when tested (2026-11-16) — deploy manually and verify the live URL.
- Custom domains `taskhubdijital.com` + `www` are Worker routes in `wrangler.jsonc`; `www` 308→apex in
  `next.config.ts`. The `*.workers.dev` URL is disabled (expected 404).
- Local: `npm run dev` (Next, :3000) or `npm run preview` (real Workers runtime, :8787). Local D1 lives
  in `.wrangler/state`; `npm run db:migrate:local`; local test admin `test-admin@example.com` /
  `testpass123` (local only). Before deploying: `npx tsc --noEmit -p .` and `npx next build`.
- Production admin: owner created it (`npm run admin:create -- --remote`). Login at `/admin/login`.
- Schema changes: add `migrations/000N_*.sql`, then `npm run db:migrate:local` and `db:migrate:remote`.
- If `next build` complains about a deleted route in `.next/types`, run `rm -rf .next`.
- This Mac's DNS (1.1.1.1) sometimes caches NXDOMAIN for the domain — test with
  `curl --resolve taskhubdijital.com:443:172.67.147.96 …`.

### Secrets & config (never commit, never print values)

Worker secrets (`npx wrangler secret put NAME`): `SESSION_SECRET`, `BREVO_API_KEY`, `GSC_CLIENT_EMAIL`,
`GSC_PRIVATE_KEY`, `GROQ_API_KEY` (unused since the AI chat was removed — owner deciding whether to
delete/rotate; it was once leaked in old git history). Vars in wrangler.jsonc: `SITE_ENV`,
`GSC_SITE_URL=sc-domain:taskhubdijital.com`. Local copies in `.dev.vars` (gitignored).
`creds/` (gitignored) holds `ssh.txt` (passwords + Brevo key on line 9) and the Google service-account
JSON `creds/taskhub-dijital-5b0238b61abf.json` — read values only to pipe into `wrangler secret put`.
Optional build vars: `NEXT_PUBLIC_GA_ID` (GA4 tag, off until set), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`,
`NEXT_PUBLIC_BING_SITE_VERIFICATION`, `NEXT_PUBLIC_SITE_URL`.

GitHub: push over HTTPS with the `taskhubteam` gh login (SSH resolves to `mofizul21`, no access).

## Integrations

- **Forms**: home contact form + AI assessment modal → `sendMessage` server action → saved to D1
  (admin → Messages) **and** emailed via **Brevo** from `no-reply@taskhubdijital.com` (domain
  authenticated) to `taskhubdijital@gmail.com`, CC `taskhubteam1@gmail.com` (`src/lib/brevo.ts`).
  Brevo IP allow-listing must stay **off** (Workers have no fixed IP). EmailJS was removed.
- **/contact uses a GoHighLevel (GHL) iframe form** (`src/components/GHLContactForm.jsx`, form id
  `FO8fYwQmYQ42ElcmflCg`). Do not replace it. The site wraps it in a branded card whose background is
  `#fffcfc` (= GHL's form background) with no inner padding, iframe height 620px, `display:block`.
  Remaining whitespace (fixed narrow form width, top padding, centering) and the navy submit button are
  inside the cross-origin iframe — only fixable in the GHL builder → Styles/Layout: form width 100%,
  padding ≤16px, white/transparent background, button `#dc2626` white text radius 12px, fields radius
  12px, font Inter. Changes there show live without a redeploy.
- **WhatsApp** floating button +1 (469) 396-4221 (`WHATSAPP_*` in `src/lib/site.ts`,
  `src/components/WhatsAppButton.tsx`). It replaced the AI chat (Groq) at the owner's request.
- **Google Search Console**: Domain property `sc-domain:taskhubdijital.com`; service account
  `taskhub-dijital-seo@taskhub-dijital.iam.gserviceaccount.com` (full user). Sitemap submitted via API.
  Admin dashboard shows GSC data.
- **GA4** live since 2026-11-17: measurement ID `G-DTHV71Q962` (stream 16356367532), hard-coded default in
  `src/lib/site.ts`; tag in `src/app/(site)/layout.tsx` loads lazily and only on `taskhubdijital.com`
  (never admin/localhost). Events: `generate_lead` (WhatsApp click, home contact form, assessment form),
  `search`. Owner's GTM container `GTM-5PMNWX76` is intentionally NOT loaded (would double-count).
  Dashboard GA widget still needs the numeric **property ID** (`GA_PROPERTY_ID` secret, plus
  `GA_CLIENT_EMAIL`/`GA_PRIVATE_KEY` = same service account) and the Analytics Data API enabled.
- **Bing**: owner to import from GSC. **IndexNow** key file `public/<key>.txt` = `INDEXNOW_KEY` in
  `src/lib/indexnow.ts`; publishing from the admin pings it. Scheduled posts are NOT pinged.
- DNS is on Cloudflare (nameservers `eric`/`surina.ns.cloudflare.com`); email is Hostinger (MX/SPF kept).
  Ask the owner before any DNS/domain change.

## Code map

| Path | What |
|---|---|
| `src/app/(site)/*/page.tsx` | Public routes: metadata (`pageMetadata`) + JSON-LD, render `src/views/*` |
| `src/views/*.jsx`, `src/components/*.jsx` | Original page designs (client components, SSR'd) |
| `src/app/(site)/blog/*`, `src/components/blog/*` | Blog list (category chips) + article page |
| `src/app/(site)/portfolio`, `src/content/portfolio.ts` | 16 client sites, screenshots in `public/images/work` |
| `src/app/(site)/privacy-policy`, `terms-of-service`, `src/components/LegalPage.tsx` | Legal pages |
| `src/app/admin/*`, `src/components/admin*` | Admin: posts (SEO panel), categories, media, messages, settings |
| `src/lib/site.ts` | **Single source of truth** for NAP, URLs, PAGES list (nav/sitemap/llms/search) |
| `src/lib/seo.ts`, `src/components/seo/JsonLd.tsx` | Metadata + JSON-LD helpers (Organization/ProfessionalService, Service, FAQ…) |
| `src/content/faqs.ts` | Home FAQ (rendered + FAQPage schema + llms.txt) |
| `src/lib/search.ts`, `src/components/search/*` | ⌘K site search (pages, services, pricing, FAQ, portfolio, posts) |
| `src/app/sitemap.ts`, `robots.ts`, `rss.xml`, `llms.txt`, `llms-full.txt` | Feeds; robots allows AI crawlers |
| `src/app/uploads/[filename]/route.ts` | Serves admin uploads from D1 (`?w=` WebP variants) |

## SEO / GEO rules (keep)

- Lighthouse mobile baseline (2026-11-16): Performance 94–97, Accessibility/Best practices/SEO 100.
- **Hero content must be visible at first paint**: in hero sections use `initial={false}` on motion
  elements and the CSS `.hero-rise` class on the H1 (transform-only). Never fade above-the-fold text from
  opacity 0. Heavy visuals (Three.js `HeroSphere`) load via `next/dynamic` with `ssr: false`.
- **No main-thread animation loops**: decorative motion uses CSS keyframes (transform/opacity only —
  see `.ab-*` and `.marquee-track` in globals.css). `HeroSphere` (Three.js) loads via
  `DeferredHeroSphere` ONLY on first real interaction (never a timer) and only with a hardware GPU
  (software WebGL gave PSI desktop 12.7 s TBT); it pauses off-screen/hidden; the
  integrations orbit only spins while on screen; `CustomCursor` is off on touch devices and idles.
  Lighthouse 2026-11-17 (live, home): desktop 100/100/100/100, mobile 100/100/100/100.
- Don't enable `experimental.inlineCss`: Next repeats the 123 KB CSS ~6× in the RSC payload (3× bigger HTML).
- One H1 per page, no skipped heading levels, titles ≤ 60 chars, descriptions 120–158 chars, images
  with width/height + alt. Logo is `public/images/logo.webp` (17 KB); OG image `images/og-image.jpg`.
- Structured data must match visible content. Never add reviews/ratings to schema.
- No fake urgency: no restarting countdowns or "limited time" claims (one was removed from the WordPress card).
- Mobile: big hero/CTA buttons use `px-6 py-3 text-base` below `sm`; badges that hang over a card edge
  need `whitespace-nowrap`. `.btn-primary`/`.btn-secondary` include `justify-center`, so `w-full`
  buttons (pricing cards, forms) stay centered — don't remove it. Join short words in headlines with
  `&nbsp;` (e.g. "AI&nbsp;&amp;") to avoid orphaned symbols on small screens.
- Mobile QA: headless Chrome screenshots at 500px width (its minimum) and check no horizontal overflow
  at 390px; the Chrome extension can be blocked by other extensions.
- Footer (`src/components/Footer.jsx`, server component): compact two-column — brand + NAP with icons
  left, 3-column link grid + social icons right; bottom bar © + "Powered by" left, Privacy · Terms right;
  `pb-16 sm:pr-52` keeps it clear of the WhatsApp button.
- Pricing (source of truth = live pages): home **Starter $800 / Gold $1,500 / Diamond $2,500** + monthly;
  `/traditional-websites` **Essential $2,500 / Growth $4,500 / Professional $6,500 / Enterprise $9,500**
  (renamed so they don't clash); hosting $49.99 / $69.99 / $99.99 per month; setup $49.99 / $69.99;
  add-ons $10/hr; custom MERN $2.5k–$150k+, $60–$120/hr. Change prices everywhere (pages, JSON-LD
  offers, FAQ, search index, blog posts in D1).
- Brand spelling: **TaskHub Dijital** (the logo image itself says "Digital" — owner may re-export it).

## Blog

- Published 2026-11-16: `small-business-website-cost`, `ai-ready-website`,
  `agentic-ai-for-small-business`, `managed-website-hosting`.
- Scheduled one per day at 15:00 UTC (9 AM Dallas), Nov 17 → Dec 1 2026:
  `wordpress-vs-custom-website`, `ai-chatbot-for-small-business`, `website-redesign-checklist`,
  `local-seo-for-small-business`, `choose-a-web-design-company`, `shopify-vs-woocommerce`,
  `website-maintenance-plan`, `website-security-for-small-business`,
  `how-long-does-it-take-to-build-a-website`, `website-speed-optimization`, `ai-workflow-automation`,
  `e-commerce-website-cost`, `sports-organization-website`, `mern-stack-web-app`, `geo-vs-seo`.
  Each slug equals its focus keyphrase — keep keyphrases unique.
- Categories: Web Development, AI Websites, Agentic AI, Hosting, SEO, E-commerce, Sports Websites.
- Post rules: 900+ words where possible, keyphrase in SEO title start + slug + meta + image alt, no
  `<h1>` in content, internal links to service pages and **only to posts already published**, outbound
  links only to official sources, an FAQ section, soft CTA to /contact. Aim Good/Good in the admin panel.
- Batch recipe: write HTML → score with `analyzeSeo`/`analyzeReadability` from
  `src/lib/seo-analysis.ts` via `npx tsx` → render 1600×900 images with headless Chrome (dark #030712,
  red #dc2626, Inter, logo, red network sphere, icon tile) → JPEG + WebP 400/640/960/1280 with Pillow →
  insert media/chunks/posts with `wrangler d1 execute --remote --file` (≤40 KB binary per chunk
  statement). Never auto-insert transition words (it produced nonsense) — edit by hand.

## Status & TODO

- [x] 2026-11-17: full-width buttons centered site-wide; /contact form card made seamless (#fffcfc,
  no extra padding, compact mobile header/cards).
- [ ] Owner: style the GHL form in GoHighLevel to match the site (settings listed under Integrations).
- [ ] Owner: decide on `GROQ_API_KEY` (delete with `npx wrangler secret delete GROQ_API_KEY` or rotate).
- [ ] Owner: send GA4 numeric property ID; add the service account as Viewer; enable Analytics Data API.
- [ ] Owner: in GA4 mark `generate_lead` as a key event once it appears (Admin → Events).
- [x] 2026-11-17: Bing verification file `public/BingSiteAuth.xml` (copied from `creds/`) is live.
- [ ] Owner: in Bing Webmaster Tools verify + submit `https://taskhubdijital.com/sitemap.xml`.
- Cloudflare still injects `beacon.min.js` (RUM) for browsers even though RUM shows as off — negligible (~4 KB, async); left as is.
- [ ] Fix Cloudflare Workers Builds (GitHub auto-deploy) or keep deploying manually.
- [ ] Optional: daily cron that pings IndexNow for posts that went live that day.
- [ ] Optional: set Hostinger mail CNAMEs (autoconfig, autodiscover, hostingermail-a/b/c) to DNS only.
- [ ] Optional: delete the old `nextjs` branch on GitHub; re-export logo with "Dijital" spelling.
- Ideas: more service landing pages (e.g. WordPress development, Shopify development), case studies
  with real client quotes (only with permission), keep publishing posts after Dec 1.
