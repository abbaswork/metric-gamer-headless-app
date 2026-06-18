# Metric Gamer — SEO Flows & Technical Implementation

_Last updated: 2026-06-16. Maps the E-E-A-T publishing framework from metric-gamer-os/writing/eeat.md to the actual technical implementation in the headless app._

---

## SEO Architecture Overview

SEO is split across two layers that must stay in sync:

| Layer | Responsibility | Owner |
|---|---|---|
| WordPress (Yoast SEO) | Meta titles, meta descriptions, canonical URLs, OG tags, Twitter cards, index/noindex | CMS |
| Next.js headless app | Structured data (JSON-LD), sitemaps, robots.txt proxy, URL canonicalization, schema markup | App |

The app fetches Yoast SEO data via GraphQL (`SeoQuery.ts`) and passes it directly to Next.js `generateMetadata()`. This means **Yoast is the source of truth for on-page meta** — changes made in WordPress are live after the next ISR revalidation cycle.

---

## URL Canonicalization

Handled in `src/middleware.ts` before any page renders.

```
Request arrives
    │
    ├── Is host metricgamer.com (non-www)?
    │   └── 301 redirect → https://www.metricgamer.com[path]/
    │
    ├── Does path lack trailing slash? (not API route, not static file)
    │   └── 301 redirect → [path]/
    │
    ├── Does path start with /blog/?
    │   └── 301 redirect → /ranking/[rest-of-path]/
    │
    └── Does WordPress Redirection plugin have a rule for this path?
        └── Apply redirect (301 → 308, 302 → 307)
```

All canonical URLs in `generateMetadata()` are set as relative paths with trailing slashes:
```ts
alternates: { canonical: `/game/${slug}/` }
```

`metadataBase` in `layout.tsx` resolves these to `https://www.metricgamer.com/game/[slug]/`.

---

## Structured Data (JSON-LD)

Implemented in `src/components/seo/GameSchema.tsx`. Only game pages have schema markup currently.

### Schema types emitted per game page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "VideoGame" },
    { "@type": "Review" },
    { "@type": "FAQPage" }
  ]
}
```

### VideoGame schema
| Field | Source | Status |
|---|---|---|
| `name` | `propertiesGame.gameTitle` | Live |
| `description` | `propertiesGame.gameDescription` | Live |
| `image` | `game.featuredImage.node.sourceUrl` | Live |
| `operatingSystem` | Platform taxonomy nodes | Live |
| `applicationCategory` | Hardcoded `"Game"` | Live |
| `genre` | **Hardcoded `"Action RPG"`** | **Bug — needs fix** |

### Review schema
| Field | Source | Status |
|---|---|---|
| `ratingValue` | Calculated average of metric scores | Live |
| `bestRating` / `worstRating` | Hardcoded 100 / 0 | Live |
| `author.name` | Hardcoded `"Metric Gamer"` | Live |
| `publisher.logo` | Hardcoded URL `metricgamer.com/logo.png` | **Needs verification — logo may not exist** |
| `datePublished` | `game.date` (WordPress) | Live |
| `dateModified` | `game.modified` (WordPress) | Live |
| `reviewBody` | `propertiesGame.verdict` | Live |

### FAQPage schema
The FAQ schema in `game/[slug]/page.tsx` currently generates only **3 hardcoded questions** from in-code templates:
- "What platforms is [game] on?"
- "Is [game] cross-platform?"
- "How many players is [game]?"

**Gap**: The full FAQ content written per the `faq-templates.md` framework lives in WordPress but is **not currently being pulled into the FAQPage schema**. Actual game page FAQs (rendered on screen) and schema FAQs are different data sources. See [content-flow.md](content-flow.md) for context on where FAQ content lives.

---

## Sitemap Architecture

Four routes serve the full sitemap system:

```
/sitemap.xml                → Index file listing the three child sitemaps
/sitemap-static.xml         → Static pages (about, privacy, etc.)
/sitemap-games.xml          → All game pages (dynamically generated from WP)
/sitemap-rankings.xml       → All ranking pages (dynamically generated from WP)
```

All sitemaps reference `NEXT_PUBLIC_BASE_URL` for absolute URLs. The `sitemap.xsl` stylesheet makes sitemaps human-readable in browsers.

**Current state**: Sitemaps are dynamically generated at request time and served with no caching headers. They should be regenerated on every content publish (via revalidation webhook) but are not explicitly cached — this is fine for a Cloudflare Workers deployment where edge caching handles response caching.

---

## Robots.txt

`src/app/robots.ts` proxies the robots.txt directly from WordPress:

```ts
fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/robots.txt`)
```

This means robots.txt rules are managed in WordPress (via Yoast SEO settings) and the headless app serves them transparently. Any changes in Yoast's robots settings are reflected immediately — no revalidation required.

**Risk**: If the WordPress server is unavailable, robots.txt returns a fallback that only references `/sitemap.xml`. Crawlers may see inconsistent rules during outages.

---

## Meta Tags & Open Graph

Set per-page via Next.js `generateMetadata()`. The `SeoQuery.ts` query fetches the following from Yoast via WPGraphQL:

```
seo {
  title
  metaDesc
  metaKeywords
  canonical
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphImage { sourceUrl }
  opengraphType
  opengraphUrl
  opengraphAuthor
  twitterTitle
  twitterDescription
  twitterImage { sourceUrl }
  readingTime
}
```

**Fallback behavior** (in `game/[slug]/page.tsx`): If Yoast hasn't set a title or description, the page falls back to:
- Title: `[game.title] Review & Metrics | Metric Gamer`
- Description: `Discover deep performance metrics and detailed analysis for [game.title] on Metric Gamer.`

---

## Analytics Integration

### Google Tag Manager (GTM-PFQ4KMCD)
- Loaded in `layout.tsx` as an inline `<script>` in `<head>` (no next/script wrapper — fires before hydration)
- noscript iframe fallback in `<body>`
- All event tracking must be configured inside GTM — there are no custom `dataLayer.push()` calls in the app code currently

**Gap**: No custom events are being fired from the app. User interactions (metric toggle on ranking pages, game card clicks, FAQ expansion) are not tracked beyond basic pageviews. This is an analytics audit item.

### What GTM can see without custom events
- Pageviews (all routes)
- Form submissions (HubSpot events, if GTM is configured to listen)
- Scroll depth (if configured in GTM)
- Outbound clicks (if configured in GTM)

---

## How the E-E-A-T Framework Maps to Technical Implementation

The `eeat.md` publishing framework defines 31 steps across 7 phases. Here is where each phase intersects with the app:

### Phase 1: Discovery & Planning → No app touchpoint
Keyword research and SERP analysis happen outside the app. Output feeds into WordPress content creation.

### Phase 2: Content Planning → WordPress (brief → post draft)
Content briefs define: primary keyword, secondary keywords, search intent, FAQ opportunities, schema type. The app renders what WordPress produces — the brief quality directly affects SEO output.

### Phase 3: Writing → WordPress + App touchpoints
| E-E-A-T Requirement | App Implementation |
|---|---|
| URL structure — short, keyword-first | `/game/[slug]/` — slug set in WordPress |
| H1, H2, H3 hierarchy | Rendered via `GamePost` component from WordPress WYSIWYG content |
| Featured snippet / FAQ sections | `GameFAQ` component (Storybook) → needs WordPress data wire-up |
| E-E-A-T signals: author name, bio, dates | `lastUpdated` from `game.modified` → displayed in `GamePost`. Author not currently displayed on game pages — **gap** |
| Schema preselection | GameSchema always emits VideoGame + Review + FAQPage |

### Phase 4: Technical → Mostly in-app
| E-E-A-T Requirement | App Implementation |
|---|---|
| Image optimization | Next.js `<Image>` with IGDB remote pattern + Next.js optimization |
| Image filenames & alt text | Set in WordPress per image upload |
| Internal linking | Links added in WordPress WYSIWYG; "Similar Games" section auto-generated from rankings |
| FAQ schema | FAQPage JSON-LD in `GameSchema.tsx` — **partially implemented** (3 hardcoded Qs only) |
| Schema validation | Manual — no automated validation in CI |

### Phase 5: On-Page SEO → WordPress (Yoast)
Meta title, meta description, categories, tags — all managed in Yoast. App fetches and applies automatically.

### Phase 6: Publishing → WordPress + App
| E-E-A-T Requirement | App Implementation |
|---|---|
| Canonical URL | Set in Yoast → fetched by app → applied via `generateMetadata()` |
| Featured image | WordPress featured image → `game.featuredImage.node.sourceUrl` |
| Index/follow settings | Yoast `metaRobotsNoindex` / `metaRobotsNofollow` → applied in `generateMetadata()` |
| Sitemap inclusion | Auto — all published games/rankings appear in sitemaps via GraphQL query |
| ISR cache bust | WordPress publish webhook → `PUT /api/revalidate` → Next.js ISR revalidation |

### Phase 7: Post-Publish & Growth → Tools + App
| E-E-A-T Requirement | App Implementation |
|---|---|
| CTR monitoring | GSC — external tool; no in-app |
| Content freshness | `dateModified` in Review schema signals recency to Google |
| Performance tracking | GTM → GA4 (if configured) |
| Rankings update | Ranking pages use dynamic metric toggle — scores recalculate client-side |

---

## SEO Gaps — Pre-Audit Checklist

These items should be verified and resolved during the technical audit:

| # | Gap | Severity | Location |
|---|---|---|---|
| 1 | `genre` hardcoded as `"Action RPG"` in VideoGame + Review schema | High | `GameSchema.tsx:44`, `game/[slug]/page.tsx:77` |
| 2 | FAQPage schema only includes 3 hardcoded questions, not actual game FAQs from WordPress | High | `game/[slug]/page.tsx:188–203` |
| 3 | Publisher logo URL in Review schema may 404 | Medium | `GameSchema.tsx:69` |
| 4 | Author not displayed on game pages (E-E-A-T signal missing) | Medium | `game/[slug]/page.tsx` |
| 5 | No structured data on ranking pages (ReviewList or ItemList schema) | Medium | `ranking/[slug]/page.tsx` |
| 6 | No breadcrumb schema on any page type | Medium | Site-wide |
| 7 | No custom GTM events for user interactions | Medium | `layout.tsx`, page components |
| 8 | Robots.txt proxied from WordPress — single point of failure | Low | `app/robots.ts` |
| 9 | Sitemaps use `new Date().toISOString()` as `lastmod` (always "now") | Low | `sitemap.xml/route.ts` |
| 10 | AdSense disabled — no revenue integration active | Info | `layout.tsx:50–52` |
