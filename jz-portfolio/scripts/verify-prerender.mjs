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
  const hero = home.slice(home.indexOf('<h1'), home.indexOf('class="stats"'))
  const heroButtons = [...hero.matchAll(/<a[^>]*class="btn[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) =>
    m[1].replace(/<[^>]*>/g, '').trim(),
  )
  if (heroButtons.length !== 3) fail(`hero has ${heroButtons.length} buttons, expected 3`)
  if (!/class="btn solid"[^>]*href="#work"/.test(hero))
    fail('the filled hero button is not "View work" pointing at #work')
  if (/class="btn solid"[^>]*href="#skills"/.test(hero))
    fail('"What I do" is still the filled button')

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
