# Metric Gamer — Content Flow

_Last updated: 2026-06-16. Maps how content defined in metric-gamer-os (site-structure.md, faq-templates.md, scoring system) flows through the headless app to rendered pages._

---

## Content System Overview

Metric Gamer content is produced and published through two parallel systems that must stay aligned:

```
metric-gamer-os/                         Content strategy, scoring, writing frameworks
    ↓ (manual authoring workflow)
WordPress (headless CMS)                 Structured content storage, SEO metadata, media
    ↓ (WPGraphQL → Next.js fetch)
metric-gamer-headless-app/               Rendered pages served to users
```

The OS defines **what** to write and **how** to score it. WordPress stores the structured output. The app renders it.

---

## Site Structure → Route Mapping

From `metric-gamer-os/knowledge/site/site-structure.md`:

| Site Structure Entry | App Route | Component |
|---|---|---|
| Home `/` | `app/(home)/page.tsx` | `Hero`, `FeaturedGames`, search bar |
| Game Page `/games/[game-slug]` | `app/game/[slug]/page.tsx` | `GamePost` |
| Ranked List Page `/rankings/[list-slug]` | `app/ranking/[slug]/page.tsx` | Ranking template |
| Find Ranked Lists `/rankings` | `app/ranking/` (implied) | Rankings browse |
| About `/about` | `app/(subpages)/about/` | About template |

**Note on URL convention**: The site structure document uses `/games/[game-slug]` but the app routes to `/game/[slug]/` (singular, trailing slash). This discrepancy should be aligned in the site-structure.md document. The `/blog/` → `/ranking/` redirect in middleware is a legacy remnant of a previous URL structure.

---

## Content Types

### Game (Primary Content Type)

**WordPress post type**: `game`  
**App route**: `/game/[slug]/`  
**GraphQL query**: `GameBySlugQuery`

Fields authored in WordPress (via ACF PRO):

| ACF Field | Maps To | Displayed As |
|---|---|---|
| `gameTitle` | `propertiesGame.gameTitle` | Page H1, schema name |
| `gameDescription` | `propertiesGame.gameDescription` | Introduction section |
| `verdict` | `propertiesGame.verdict` | Verdict section, Review schema `reviewBody` |
| `theGood` (repeater) | `propertiesGame.theGood` | Pros list |
| `theBad` (repeater) | `propertiesGame.theBad` | Cons list |
| `metrics` (repeater) | `propertiesGame.metrics` | Metric score cards + analysis |
| `playtime` | `propertiesGame.playtime` | Sidebar stat |
| `releaseDate` | `propertiesGame.releaseDate` | Header + sidebar stat |
| `contentBlock` | `propertiesGame.contentBlock` | WYSIWYG section (noscript fallback only currently) |

WordPress taxonomies (not ACF):

| Taxonomy | Maps To | Displayed As |
|---|---|---|
| `platform` | `platform.nodes` | Platform tags in header + sidebar |
| `tags` | `tags.nodes` | Genre/tag chips in header |
| `crossplatform` | `crossplatform.nodes` | Crossplay indicator in info section |
| `players` | `players.nodes` | Player count in info + sidebar |

**Missing fields** (not yet in GraphQL query despite being in ACF/WP):
- `genre` — hardcoded as `"Action RPG"` in two places
- `developer` — hardcoded as `"Unknown Developer"`

---

### Ranking (Secondary Content Type)

**WordPress post type**: `ranking` (queried as GamePost in some places — naming inconsistency)  
**App route**: `/ranking/[slug]/`  
**GraphQL query**: `RankingBySlugQuery`

Key fields:
- `propertiesGamePost.selectGames` — ordered list of games with their metrics
- `propertiesGamePost.description` — list introduction copy
- Featured image used as list hero

Rankings are also cross-referenced on game pages: the `fetchRankingsForGame(slug)` utility queries all rankings and filters for those containing the current game, powering the "Similar Games" / "Where to Play" section.

---

### Blog Post

**WordPress post type**: Standard WordPress `post`  
**App route**: `/blogs/[slug]/`  
**GraphQL query**: `BlogContentBySlugQuery`

Less developed than game/ranking content types. Currently separate from the main game content system.

---

## FAQ Content Flow

The FAQ framework is defined in `metric-gamer-os/knowledge/site/faq-templates.md`. Here is how it currently flows (and where it breaks):

```
faq-templates.md defines question types + priority order
    ↓ (author selects relevant questions per game)
WordPress game post → FAQ field (ACF repeater, assumed)
    ↓ (NOT currently fetched)
GameBySlugQuery does NOT pull FAQ content from WordPress
    ↓
FAQs rendered in GamePost component use separate WordPress data (WYSIWYG?)
    ↓
FAQPage JSON-LD schema uses 3 hardcoded questions only
```

**The disconnect**: There are two FAQ surfaces on game pages:
1. **Rendered FAQ section** — likely from WordPress WYSIWYG content block or a separate ACF repeater (not confirmed — needs query audit)
2. **FAQPage JSON-LD schema** — in `GameSchema.tsx`, populated from a hardcoded 3-question array in `page.tsx`

For the FAQ schema to be complete and aligned with the FAQ templates framework, the `GameBySlugQuery` needs to fetch FAQ data from WordPress and pass it into `GameSchema` instead of the hardcoded fallback.

---

## Scoring System → Metrics Display

The scoring system is defined in `metric-gamer-os/scoring-system/`. Metrics are genre-specific (Fighting, Racing, Shooters) with sub-genre and tag overlays.

**How scores reach the page:**

```
Scoring rubric (metric-gamer-os/scoring-system/metrics/genres/[genre]/)
    ↓ (author applies rubric, enters scores + analysis)
WordPress game post → metrics ACF repeater
    → { score: number, description: string, metric: taxonomy node }
    ↓
GameBySlugQuery → propertiesGame.metrics
    ↓
game/[slug]/page.tsx → metricsData array
    → { id, score, label, icon, analysis }
    ↓
GamePost → metric score cards
    ↓
Average score calculated client-side from metricsData
    → Displayed in sidebar + used in Review schema ratingValue
```

**Icon mapping** (`page.tsx:103–109`):
Currently only 5 metric names have icons assigned. Any metric not in the map falls back to `"TrendingUp"`. This will silently produce generic icons for new metric types added in the scoring system.

```ts
const metricIconsMap = {
  "Gameplay": "Gamepad2",
  "Story": "BookOpen",
  "Graphics": "Monitor",
  "Co-op and Multiplayer": "Swords",
  "Co-op Customisation": "Trophy",
}
```

---

## Content Journey → User Traffic Flow

From `site-structure.md`, each entry point has a defined intent. Here is how that maps to what the app serves:

| Traffic Source | Landing Page | Content Served | SEO Signal |
|---|---|---|---|
| Google (game name query) | `/game/[slug]/` | GamePost — intro, metrics, pros/cons, verdict, FAQs | VideoGame + Review + FAQPage schema |
| Google (list query) | `/ranking/[slug]/` | Ranked list — ordered games with metric toggle | No structured data currently |
| Social (IG/YT/TT) | `/` (Home) | Featured games, search bar | Basic page metadata |
| Backlinks (guest posts) | `/game/[slug]/` | Same as Google game intent | Same schema |
| Direct / brand | `/` or any page | Same as entry point | — |

The game page is the **primary organic landing page** and the most technically built-out route. The ranking page is the **secondary organic landing page** and is currently under-served from a structured data standpoint.

---

## Content Publishing Workflow

```
1. Keyword research (E-E-A-T Phase 1 — outside app)
2. Game scoring via metric-gamer-os scoring system + skills/write-game-page
3. Draft game post in WordPress:
   - Fill ACF fields: description, verdict, pros, cons, metrics, playtime, release date
   - Assign taxonomies: platform, tags, crossplatform, players
   - Write FAQ section in WYSIWYG (or FAQ ACF repeater if it exists)
   - Set Yoast SEO: meta title, description, canonical, OG image
   - Upload featured image (IGDB source or custom)
4. Save draft → WordPress webhook fires → ISR revalidation via /api/revalidate
5. Preview via draft mode (JWT auth, /api/exit-preview to leave)
6. Publish → page goes live, sitemaps auto-update on next sitemap request
7. Submit URL to Google Search Console (E-E-A-T Phase 6 — Indexing Process)
```

---

## Content Flow Gaps — Pre-Audit Checklist

| # | Gap | Impact | Priority |
|---|---|---|---|
| 1 | FAQ content not fetched from WordPress into GameBySlugQuery | FAQPage schema has only 3 hardcoded questions | High |
| 2 | `genre` and `developer` ACF fields missing from GraphQL query | Wrong data displayed + incorrect schema | High |
| 3 | Metric icon map only covers 5 metric names | New metrics get generic icons silently | Medium |
| 4 | `contentBlock` WYSIWYG only shown in `<noscript>` fallback | Content not visible to JS users | Medium |
| 5 | No author attribution on game pages | E-E-A-T signal missing; author personas defined in OS but not surfaced | Medium |
| 6 | Ranking pages have no structured data | Missing ItemList/ReviewList schema opportunity | Medium |
| 7 | `/game/` vs `/games/` URL discrepancy between site-structure.md and app | Documentation confusion | Low |
| 8 | Blog content type is separate from game/ranking system | No clear integration with scoring or FAQ frameworks | Low |
| 9 | `GameBySlugQuery` fields partially hardcoded — ACF schema for FAQs not confirmed | Query may need extension once FAQ field structure is verified | High |
| 10 | Author personas (8-bit-bandit, abossgaming, etc.) defined in OS writing/ but not linked to any WordPress author or game page field | E-E-A-T author signals absent from rendered pages | Medium |
