# Metric Gamer — Headless App: Technical Specs

_Last updated: 2026-06-16. Baseline audit snapshot for future technical audit sessions._

---

## Architecture Overview

Metric Gamer is a **headless WordPress + Next.js** architecture deployed on Cloudflare Workers.

```
Content layer       WordPress (AWS EC2)     → Custom post types, ACF fields, Yoast SEO
Data layer          WPGraphQL               → GraphQL API endpoint at /graphql
Application layer   Next.js 15 (App Router) → TypeScript, Server Components, ISR
Rendering layer     OpenNextJS              → Adapter for Cloudflare Workers runtime
Cache layer         Cloudflare R2           → Regional incremental static regeneration cache
Deployment          Cloudflare Workers      → Edge runtime, global CDN
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | Latest |
| Language | TypeScript | 5.x (strict mode) |
| React | React | 18.3.1 |
| Styling | Tailwind CSS | 3.4.19 |
| UI Primitives | Radix UI | 1.1–1.2.x |
| Animation | Framer Motion | 12.23.26 |
| GraphQL client | graphql + codegen | 16.9.0 |
| CSS-in-JS | Emotion | — |
| Icons | Lucide React | — |
| Fonts | Inter, Space Grotesk, Rajdhani (Google Fonts) | — |
| Testing | Vitest + Playwright | 3.1.2 / 1.52.0 |
| Design system | Storybook | 8.6.12 |
| Deployment adapter | OpenNextJS (Cloudflare) | — |
| Infrastructure | Cloudflare Workers + R2 | — |
| CMS | WordPress + WPGraphQL | — |

---

## Project Structure

```
metric-gamer-headless-app/
├── src/
│   ├── app/                        Next.js App Router pages
│   │   ├── (home)/page.tsx         Homepage
│   │   ├── (subpages)/             Static pages: about, privacy, [...slug]
│   │   ├── api/                    Backend routes (revalidate, exit-preview)
│   │   ├── blogs/[slug]/page.tsx   Blog posts
│   │   ├── game/[slug]/page.tsx    Game review pages (primary content type)
│   │   ├── metrics/page.tsx        Metrics methodology overview
│   │   ├── ranking/[slug]/page.tsx Ranked list pages
│   │   ├── robots.ts               Dynamic robots.txt (proxied from WordPress)
│   │   ├── sitemap.xml/            Sitemap index
│   │   ├── sitemap-games.xml/      Games sitemap
│   │   ├── sitemap-rankings.xml/   Rankings sitemap
│   │   ├── sitemap-static.xml/     Static pages sitemap
│   │   ├── sitemap.xsl/            Sitemap browser stylesheet
│   │   └── layout.tsx              Root layout (GTM, fonts, global metadata)
│   ├── components/
│   │   ├── seo/GameSchema.tsx      JSON-LD structured data for game pages
│   │   ├── Globals/                Navbar, PreviewNotice
│   │   ├── HelpBubble/             Help icon + popup
│   │   └── ui/                     Shared UI primitives
│   ├── queries/                    GraphQL queries (per content type)
│   │   ├── game/                   AllGamesQuery, GameBySlugQuery
│   │   ├── ranking/                AllRankingsQuery, RankingBySlugQuery
│   │   ├── blog/                   BlogContentByIdQuery, BlogContentBySlugQuery
│   │   ├── home/                   HomeFeaturedGamesQuery
│   │   └── general/                AllMetricsQuery, SeoQuery, ContentInfoQuery
│   ├── gql/                        GraphQL codegen output (auto-generated)
│   ├── hooks/useHubSpotForm.ts     HubSpot newsletter form integration
│   ├── middleware.ts               URL normalization + WordPress redirect proxy
│   ├── stories/                    Storybook component library (162+ files)
│   └── utils/                      fetchGraphQL, fetchAllRankings, sanitizeUrl
├── public/
│   ├── _headers                    Cloudflare cache-control rules
│   └── ads.txt                     AdSense verification
├── docs/                           ← YOU ARE HERE
├── next.config.ts                  Image remote patterns (IGDB, EC2, metricgamer.com)
├── tailwind.config.ts              Custom HSL colors, font variables
├── wrangler.jsonc                  Cloudflare Worker + R2 cache config
├── open-next.config.ts             Regional cache config for R2
├── codegen.ts                      GraphQL schema + types generation from WordPress
└── vitest.config.ts                Browser test config
```

---

## Routing

All routes follow Next.js App Router conventions. Middleware enforces URL normalization before any page is served.

| Route | Page | Data Source |
|---|---|---|
| `/` | Homepage with featured games + search | `HomeFeaturedGamesQuery` |
| `/game/[slug]/` | Game review page | `GameBySlugQuery` |
| `/ranking/[slug]/` | Ranked list page | `RankingBySlugQuery` |
| `/rankings/` | Browse all rankings | `AllRankingsQuery` |
| `/blogs/[slug]/` | Blog post | `BlogContentBySlugQuery` |
| `/metrics/` | Scoring methodology | Static |
| `/about/` | About / author profiles | Static (subpages) |
| `/privacy-policy/` | Privacy policy | Static (subpages) |

### Middleware Behavior (`src/middleware.ts`)

Runs on every request before page rendering:

1. **www enforcement** — `metricgamer.com` → `www.metricgamer.com` (301)
2. **Trailing slash** — appends `/` to all paths except API routes and static files (301)
3. **Legacy redirects** — `/blog/*` → `/ranking/*` (301)
4. **WordPress redirect proxy** — fetches Redirection plugin rules from WordPress REST API and applies them dynamically

**Known issue**: Middleware fetches WordPress on every non-cached request. This is a latency risk on cache misses. Needs evaluation during technical audit.

---

## Data Flow (Game Page Example)

```
Request /game/[slug]/
    │
    ├── middleware.ts
    │   └── Enforce trailing slash, check WP redirects
    │
    ├── page.tsx (Server Component)
    │   ├── fetchGraphQL(GameBySlugQuery, { slug })
    │   │   └── POST to WordPress /graphql (Basic Auth)
    │   ├── fetchRankingsForGame(slug)
    │   │   └── POST to WordPress /graphql (AllRankingsQuery)
    │   └── Map data → component props
    │
    ├── GameSchema (JSON-LD)
    │   └── VideoGame + Review + FAQPage schema
    │
    └── GamePost (Client Component tree)
        ├── Header (title, genre, platforms, tags, hero image)
        ├── Info (description, pros, cons, verdict)
        ├── Metrics (per-metric scores + analysis)
        ├── Sidebar (average score, stats)
        └── SimilarGames (ranking lists featuring this game)
```

---

## Caching Strategy

| Layer | Mechanism | Config |
|---|---|---|
| Next.js ISR | Per-page revalidation | Via `revalidate` export on pages |
| Cloudflare R2 | Regional incremental cache | `open-next.config.ts` → `cache` bucket |
| Cloudflare CDN | Edge caching | `public/_headers` rules |
| WordPress webhook | `PUT /api/revalidate` | Triggered on WP post publish/update |

Cache revalidation is webhook-driven from WordPress. When a post is saved, WordPress calls `/api/revalidate` which purges the Next.js ISR cache for that page.

---

## Third-Party Integrations

### WordPress (Headless CMS)
- **Host**: AWS EC2 (`ec2-18-213-34-154.compute-1.amazonaws.com`)
- **Protocol**: WPGraphQL (Basic Auth with app passwords)
- **Custom post types**: Game, Ranking
- **Field management**: Advanced Custom Fields PRO (ACF)
- **SEO metadata**: Yoast SEO + WPGraphQL SEO
- **Redirects**: Redirection plugin + WP REST API
- **Preview**: Draft mode via JWT (WPGraphQL JWT Authentication)
- **Required plugins**: WPGraphQL, WPGraphQL SEO, WPGraphQL JWT Authentication, ACF PRO, WPGraphQL for ACF, Yoast SEO, Redirection, Classic Editor

### Google Tag Manager
- **Container**: GTM-PFQ4KMCD
- **Implementation**: Inline script in `<head>` + noscript iframe in `<body>` (in `layout.tsx`)
- **Status**: Active

### HubSpot
- **Portal ID**: 341872712
- **Form ID**: 91132ed5-cb00-409d-bc16-d39d90617349
- **Use**: Newsletter subscription
- **Surfaces**: Navbar subscribe popup, About page
- **Implementation**: `useHubSpotForm.ts` hook

### Google AdSense
- **Publisher ID**: ca-pub-5979443933088571
- **Status**: Commented out in `layout.tsx` — not currently running

### Yandex Search
- **Verification**: Meta tag in `layout.tsx` (`3a6d09689b70131f`)
- **Status**: Active

### IGDB (Internet Game Database)
- **Use**: Game cover images
- **Integration**: Next.js `remotePatterns` in `next.config.ts`
- **No API key required**: Public CDN images only

---

## Environment Variables

| Variable | Description | Used In |
|---|---|---|
| `NEXT_PUBLIC_WP_DOMAIN` | WordPress domain | GraphQL client |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Full GraphQL endpoint URL | Queries, middleware |
| `NEXT_PUBLIC_BASE_URL` | Frontend base URL (https://www.metricgamer.com) | Sitemaps, middleware |
| `WP_USER` / `WP_USERNAME` | WordPress username | Basic auth |
| `WP_APP_PASS` / `WP_PASSWORD` | WordPress app password | Basic auth |
| `HEADLESS_SECRET` | Security token for revalidation endpoint | `/api/revalidate` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account | Wrangler deploy |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | Wrangler deploy |

Local dev uses `.env.local.example` as template. Production uses `.env` + `.dev.vars` for Cloudflare.

---

## Known Issues / Open TODOs

These are hardcoded mocks or incomplete implementations identified in the codebase at time of this audit. Flag these for the technical audit.

| File | Issue | Impact |
|---|---|---|
| `game/[slug]/page.tsx:78` | `genre: "Action RPG"` — hardcoded mock | All game pages show wrong genre |
| `game/[slug]/page.tsx:79` | `developer: "Unknown Developer"` — field missing in query | All game pages show wrong developer |
| `GameSchema.tsx:44` | `genre: "Action RPG"` — hardcoded in structured data | Schema incorrect for all games |
| `GameSchema.tsx:69` | Logo URL `https://www.metricgamer.com/logo.png` — file may not exist | Schema Review publisher logo broken |
| `middleware.ts` | WordPress redirect API called on every non-matched request | Latency on cache misses |
| `api/preview/route.bak.txt` | Preview route backed up, not active | Draft preview partially implemented |
| `layout.tsx:50-52` | AdSense script commented out | Revenue currently disabled |
| `app/(subpages)/[...slug]/` | Catch-all static route — unclear what pages live here | Needs content audit |
| `middleware.ts:80` | 308 used instead of 301 for WP redirects | May cause issues with some clients |

---

## Deployment

```
npm run build          → Next.js build
npm run deploy         → OpenNextJS Cloudflare build + wrangler deploy
npm run deploy:production → Same with .env injected
npm run preview        → Local Cloudflare Workers preview
npm run storybook      → Storybook dev server
npm run codegen        → Regenerate GraphQL types from WordPress schema
```

**Build command for Cloudflare**: `npx @opennextjs/cloudflare build`  
**Wrangler config**: `wrangler.jsonc` — Worker named from project, R2 bucket `cache`
