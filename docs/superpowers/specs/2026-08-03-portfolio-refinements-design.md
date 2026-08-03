# Portfolio Refinements — Design

Date: 2026-08-03
Scope: 10-item change request against `jz-portfolio`.
Excluded: case-study pages, motion/animation work.

## Premise corrections

Three premises in the request do not match the repository. The design targets
reality, not the request's wording.

| Request states | Repository actually has |
| --- | --- |
| Nuxt; fix via `nuxt generate` | Vue 3 + Vite SPA on vue-router 5. Prerender via `vite-ssg`. |
| "20 tools" as a hardcoded figure | `stackTotal` in `src/data/stack.js` is derived via `reduce`. Current value 18. No stale number is possible; only the data changes. |
| Six projects | Seven in `src/data/projects.js`. Five featured on the homepage accordion, all seven on `/selected-work`. |

## Decisions taken

Settled with the requester before design:

- **Project imagery** — the requester supplies files later. Build the full
  pipeline plus a graceful no-image fallback. Invent nothing.
- **Prerendering** — `vite-ssg`, not a Nuxt migration.
- **Stack curation** — collapse HTML/CSS/JS only. Leave every other entry.
- **Naming** — "Recommendations" wins over "Praise".
- **Domain** — `https://juliaalmoite.netlify.app`.
- **Logo** — redraw as a clean SVG preserving the blocky identity.
- **Testimonials** — hand-picked verbatim excerpts; full text preserved.

---

## 01 — Visual proof of work

Add optional `image` and `imageAlt` fields to each entry in `projects.js`.

A single new component, `ProjectThumb.vue`, owns every appearance of project
imagery so the treatment cannot drift between surfaces, and owns the fallback:
a typographic tile showing the project's index numeral on `--surface-2` when no
image is supplied. The grid therefore never shows holes before assets arrive.

Placements:

- `/selected-work` cards — 16:10 thumbnail above the title.
- Homepage accordion panel — preview beside the description at ≥768px,
  stacked below it on narrower screens.
- Collapsed accordion row — small hover thumbnail, gated behind
  `@media (hover: hover) and (pointer: fine)` so touch never depends on it.

Every image carries `loading="lazy"` and explicit `width`/`height`; the
container reserves space via `aspect-ratio` so there is no layout shift. `alt`
comes from `imageAlt`. The decorative hover thumbnail takes `alt=""` — the row
title is already its accessible name.

Clowder keeps its existing Figma iframe as its panel visual. A live prototype
beats a screenshot.

## 02 — Vertical rhythm

`--sec-pad` (44–72px) and `--sec-gap` (56–92px) collapse into one token:

```
--sec-space: clamp(30px, 4vw, 56px);
```

applied symmetrically as `section { padding-block: var(--sec-space) }`.

Cross-hairline gap falls from 164px to 112px, a 32% reduction, inside the
requested 30–40% band. The divider also gains a consistent offset: it currently
sits 92px from the following block and 72px from the preceding one.

## 03 — Body text contrast

Measured across all six theme combinations rather than assumed.

`--text-dim` — body copy in skill cards, experience descriptions, and project
blurbs — **already passes** at 6.70–7.57:1. The entire failure is
`--text-faint` at 3.23–3.74:1, which is exactly the micro-label set the request
flagged as the worst offenders: `SHIPPING SINCE`, `TOOLS IN STACK`, `.tag`,
testimonial role subtitles, and section numerals.

Replacement values preserve each ink's hue and clear 4.5:1 against `--bg`,
`--card`, and `--card-hi`:

| Theme | Current | New | Worst ratio |
| --- | --- | --- | --- |
| dark / neutral | `#6a6a6a` | `#868686` | 4.53 |
| light / neutral | `#8c8c8c` | `#6f6f6f` | 4.52 |
| dark / warm | `#6d675e` | `#8b857c` | 4.55 |
| light / warm | `#8d8578` | `#736b5e` | 4.51 |
| dark / cool | `#646c74` | `#808890` | 4.56 |
| light / cool | `#848d94` | `#666f76` | 4.55 |

The contrast checker is committed as `scripts/check-contrast.mjs` so the result
is re-runnable rather than a one-time assertion.

## 04 — Stack curation

`'HTML', 'CSS', 'JavaScript'` become a single `'HTML/CSS/JS'` entry. Total
18 → 16. The section header and the hero stat bar both already read from
`stackTotal`, so they update with no further edit.

## 05 — Testimonial cards

Add an `excerpt` field per testimonial, quoted **verbatim** from the real text.
No paraphrase, no invention. Homepage cards render `excerpt` with the four-line
clamp removed, so nothing cuts mid-word. `/recommendation` continues to render
the complete quote through the existing `full` prop. `.recs` switches from
`align-items: start` to `stretch` to equalize card heights.

## 06 — Hero CTA hierarchy

The request asks to add "View work", demote "What I do" to match GitHub and
LinkedIn, and cap the row at three buttons — which totals four. Resolved as:

- `View work →` — solid, targets `#work`
- `What I do →` — ghost, targets `#skills`
- `LinkedIn ↗` — ghost

GitHub leaves the hero because `ContactCta.vue` already carries it. LinkedIn is
added to `ContactCta.vue` in the same pass so no link is lost from the site.

## 07 — Logo legibility

The current mark is a baked 390×160 raster whose Z collapses into the O at the
nav's 26px. It is not a CSS filter that can be dialled down.

Hand-author `jzoa-logo.svg` on a true pixel grid: same blocky JZOA identity,
crisp vector edges, drop shadow softened to a subtle offset. The mark uses
`currentColor`, which retires the `filter: invert(1)` rule in `SiteHeader.vue`.
The same vector feeds the 1200×630 social preview image.

## 08 — Nav / section label

"Recommendations" everywhere. Only the nav label changes; the section heading,
route, and page heading already agree.

## 09 + 10 — Prerender and social metadata

Interdependent, built together. `vite-ssg@28` declares
`vue-router: ^4.0.1 || ^5.0.0-0` and `vite: ^7`, so it is compatible with what
is installed.

- `main.js` converts to the `ViteSSG` entry form.
- `build` becomes `vite-ssg build`.
- All four routes (`/`, `/about`, `/selected-work`, `/recommendation`) are
  listed in `includedRoutes` so none is silently missed.
- `@unhead/vue` supplies per-route title, description, canonical, the full
  Open Graph set, and `twitter:card=summary_large_image`.
- All URLs are absolute against one `SITE_URL` constant
  (`https://juliaalmoite.netlify.app`), so a custom domain is a one-line change.
- A build script renders the 1200×630 preview from SVG through the existing
  `sharp` dependency, using the real tokens and the new wordmark.

`netlify.toml`'s SPA catch-all redirect needs care: it must not shadow the
prerendered HTML files.

## Verification

Part of the work, not a follow-up:

- Run `scripts/check-contrast.mjs`; every pair must clear 4.5:1.
- Build, then grep each route's emitted `index.html` for hero copy and every
  project title.
- Assert the OG and Twitter tags are present with absolute URLs.

## Deviations found during implementation

Recorded here so the spec matches what shipped.

- **`/about` is not prerendered.** It is still the `npm create vue` stub
  ("This is an about page"), unlinked from the nav. Prerendering it would
  publish an indexable placeholder — the opposite of what item 09 is for. It is
  excluded from `includedRoutes` and carries `noindex, nofollow`. **It should
  be written or deleted; the route is dead weight either way.**
- **The fallback tile is a hatched plate, not a numeral.** The first version
  showed the project index, which landed directly above the card's own index
  label and read as a duplication rather than a placeholder.
- **`manualChunks` is client-only.** vite-ssg also runs a server build where
  `vue` is external, and naming an external in `manualChunks` is a hard rollup
  error that fails the whole static build.
- **`dirStyle: 'nested'`.** The default emits `/selected-work.html`, which only
  resolves on hosts that map extensionless paths to `.html` files and leans on
  that mapping beating the SPA catch-all. A real directory index cannot be
  shadowed by the fallback.
- **SSR-safety fixes.** `useTheme.js` read `document.documentElement` at module
  scope and `SiteHeader.vue` called `window.matchMedia` in `setup`; both crash
  during a server render and are now guarded.
- **`@unhead/vue` is pinned to v2.** npm resolved v3 at the top level while
  vite-ssg depends on `^2.1.2`. Two copies means `useHead` writes to a
  different head instance than the one vite-ssg renders — the tags silently
  never appear. Verified as a single deduped copy.
- **Contrast is narrower than the request assumed.** `--text-dim` already
  passed; only `--text-faint` failed. Documented in section 03.
- **Hero CTA count.** The request's three instructions sum to four buttons.
  Resolved in section 06.

## Verification results

All committed as runnable scripts, not one-time claims.

- `npm run check-contrast` — 72 pairs, all clear 4.5:1.
- `npm run verify` (wired to `postbuild`) — asserts each route's HTML contains
  the hero copy, every project title, the testimonial excerpts, the curated
  tool count, the CTA hierarchy, the nav label, and absolute OG/Twitter tags.
- Netlify's serve order simulated locally: each route resolves to its own
  prerendered file; only unknown paths reach the SPA fallback.

## Out of scope

Case-study pages and motion work, per the request.

## Blocked / outstanding

- **The seven project images.** Everything else ships; the hatched plate holds
  their place until files land in `src/assets/images/work/<slug>.webp`.
- **No live browser pass.** This environment has no headless browser, so the
  layout changes (02, 05, 06, and the thumbnails in 01) were verified by build
  output and static assertion, not by looking at rendered pages. The logo was
  verified visually by rasterising it at nav sizes. A human should look at the
  running site before merging.
- **Validate the card with a real debugger** once deployed — LinkedIn Post
  Inspector and Slack unfurl. `OG_IMAGE` carries a `?v=1` cache-buster to bump
  when the artwork changes.
