/* Asserts that the built HTML actually contains what it is supposed to.
   The failure this guards against is silent: the app still works perfectly in
   a browser when prerendering breaks, and only crawlers and unfurlers — who
   never report back — see the empty document.

   Run after `npm run build`, as `npm run verify`. */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.js'
import { recommendations } from '../src/data/recommendations.js'

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url))

const SITE = 'https://juliaalmoite.netlify.app'

const PAGES = [
  {
    file: 'index.html',
    url: `${SITE}/`,
    // Hero copy plus every project title the homepage index renders.
    contains: [
      'Julia Almoite',
      'UI/UX engineer',
      "Most teams split that into two roles",
      'View work',
      ...projects.slice(0, 5).map((p) => p.title),
      // The three testimonials the homepage teases — sliced from the data
      // rather than hardcoded, so re-ordering the list cannot make this pass
      // against a quote the page no longer shows.
      ...recommendations.slice(0, 3).map((r) => r.excerpt),
    ],
  },
  {
    file: 'selected-work/index.html',
    url: `${SITE}/selected-work`,
    // Every project, not just the five featured on the homepage.
    contains: ['selected work', ...projects.map((p) => p.title)],
  },
  {
    file: 'recommendation/index.html',
    url: `${SITE}/recommendation`,
    contains: ['recommendations', 'Celine Terrado', 'Quan Doan'],
  },
]

// Tags every page must carry, with absolute URLs.
const META = [
  /<meta[^>]+property="og:title"[^>]+content="[^"]+"/,
  /<meta[^>]+property="og:description"[^>]+content="[^"]+"/,
  /<meta[^>]+property="og:type"[^>]+content="website"/,
  /<meta[^>]+property="og:image"[^>]+content="https:\/\/[^"]+"/,
  /<meta[^>]+name="twitter:card"[^>]+content="summary_large_image"/,
  /<meta[^>]+name="twitter:title"[^>]+content="[^"]+"/,
  /<meta[^>]+name="twitter:description"[^>]+content="[^"]+"/,
  /<meta[^>]+name="twitter:image"[^>]+content="https:\/\/[^"]+"/,
  /<meta[^>]+name="description"[^>]+content="[^"]+"/,
]

let failures = 0
const fail = (msg) => {
  console.error(`  FAIL  ${msg}`)
  failures++
}

// Decode the entities the minifier emits so plain-text assertions still match.
const decode = (s) =>
  s
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')

for (const page of PAGES) {
  console.log(`\n${page.file}`)
  const before = failures
  const path = dist(page.file)
  if (!existsSync(path)) {
    fail(`not emitted — route was not prerendered`)
    continue
  }
  const raw = readFileSync(path, 'utf8')
  const html = decode(raw)

  // The bug being guarded against: a body containing nothing but the mount div.
  const body = html.slice(html.indexOf('<body'))
  if (body.replace(/<script[\s\S]*?<\/script>/g, '').length < 2000) {
    fail('body is essentially empty — content is not in the HTML')
  }

  for (const needle of page.contains) {
    if (!html.includes(needle)) fail(`missing content: "${needle}"`)
  }
  for (const re of META) {
    if (!re.test(html)) fail(`missing meta: ${re}`)
  }

  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)
  if (!canonical) fail('no canonical link')
  else if (canonical[1] !== page.url) fail(`canonical is ${canonical[1]}, expected ${page.url}`)

  const ogUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/)
  if (!ogUrl) fail('no og:url')
  else if (ogUrl[1] !== page.url) fail(`og:url is ${ogUrl[1]}, expected ${page.url}`)

  /* The stylesheet has to be in <head>, as a real stylesheet.

     vite-ssg turns beasties on by default whenever the package is installed,
     and beasties' default preload mode demotes the head <link rel=stylesheet>
     to a bare rel=preload hint and appends the real link at the end of <body>.
     That is only safe when the critical CSS it extracts is inlined into <head>
     — and it is not, because mergeStylesheets folds it into the first <style>
     in the document, which here is the noscript reveal fallback in index.html.
     CSS inside <noscript> never applies in a browser with JS on.

     The result is a fully prerendered page painted with no CSS at all until
     the tail-of-body link lands: raw blue links, images at intrinsic size.
     It looks fine locally, where the file is already warm. */
  const head = raw.slice(0, raw.indexOf('</head>'))
  const tail = raw.slice(raw.indexOf('</head>'))
  if (!/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/.test(head))
    fail('no app stylesheet in <head> — the page paints unstyled')
  if (/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/.test(tail))
    fail('app stylesheet is linked after </head> — it cannot style first paint')
  if (/<noscript>[\s\S]*?--tw-|<noscript>[\s\S]*?\.wrap\{/.test(raw))
    fail('critical CSS was merged into the <noscript> block, where it is inert')

  // A relative og:image is dropped by every unfurler that reads it.
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)="(og:image|twitter:image)"[^>]+content="([^"]+)"/g)) {
    if (!m[2].startsWith('http')) fail(`${m[1]} is not absolute: ${m[2]}`)
  }

  // `failures` is cumulative, so compare against the count on entry — testing
  // it directly would silence the tick for every page after the first failure.
  if (failures === before) console.log('  ok')
}

// The card itself has to exist, at the exact size the tags advertise.
console.log('\nog-image')
if (!existsSync(dist('og-image.png'))) fail('dist/og-image.png missing')
else console.log('  ok')

/* ------------------------------------------------------------------
   The rest of the change request, asserted against the built HTML.
   These are the things that look fine in review and regress silently.
   ------------------------------------------------------------------ */
console.log('\nchange request')
{
  const before = failures
  const home = decode(readFileSync(dist('index.html'), 'utf8'))
  const work = decode(readFileSync(dist('selected-work/index.html'), 'utf8'))

  // 06 — hero CTA hierarchy: three buttons, and the filled one is the work.
  // `class="stats` without the closing quote: the row also carries the reveal
  // classes now, and an exact match silently returned -1 and slurped the page.
  const hero = home.slice(home.indexOf('<h1'), home.indexOf('class="stats'))
  /* `class="[^"]*btn` rather than `class="btn`, and href checked separately from
     class: the two section buttons are RouterLinks now, which emit href first
     and prefix the class with router-link-active. */
  const heroButtons = [
    ...hero.matchAll(/<a[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/a>/g),
  ].map((m) => m[1].replace(/<[^>]*>/g, '').trim())
  if (heroButtons.length !== 3) fail(`hero has ${heroButtons.length} buttons, expected 3`)
  // `/#work`, not `#work`: a bare hash resolves against the current path, so the
  // nav and the hero both address home explicitly.
  const heroAnchor = (hash) =>
    new RegExp(`<a(?=[^>]*href="/${hash.replace('#', '\\#')}")[^>]*class="[^"]*\\bbtn solid\\b`)
  if (!heroAnchor('#work').test(hero))
    fail('the filled hero button is not "View work" pointing at /#work')
  if (heroAnchor('#skills').test(hero)) fail('"What I do" is still the filled button')

  // 08 — one term everywhere.
  if (home.includes('>Praise<')) fail('nav still says "Praise"')

  // 04 — the derived stack count reflects the curated list.
  if (!/16[\s\S]{0,80}tools in stack/.test(home))
    fail('hero stat bar does not show the curated tool count of 16')

  // 05 — teasers carry the excerpt, and nothing is clamped mid-word.
  if (!home.includes(recommendations[0].excerpt))
    fail('homepage testimonial is not the curated excerpt')
  if (home.includes(recommendations[0].quote))
    fail('homepage is rendering the full quote instead of the excerpt')

  // 01 — one thumbnail per card on the work grid, and images (once supplied)
  // are lazy and described.
  const thumbs = (work.match(/class="thumb /g) || []).length
  if (thumbs !== projects.length)
    fail(`work grid has ${thumbs} thumbnails for ${projects.length} projects`)
  for (const m of work.matchAll(/<img[^>]*class="thumb-img"[^>]*>/g)) {
    if (!/loading="lazy"/.test(m[0])) fail(`project image without loading="lazy": ${m[0]}`)
    if (!/\salt="[^"]+"/.test(m[0])) fail(`project image without alt text: ${m[0]}`)
    if (!/width="\d+"/.test(m[0]) || !/height="\d+"/.test(m[0]))
      fail(`project image without intrinsic size: ${m[0]}`)
  }

  if (failures === before) console.log('  ok')
}

if (failures) {
  console.error(`\n${failures} check(s) failed.`)
  process.exit(1)
}
console.log('\nAll prerender and metadata checks passed.')
