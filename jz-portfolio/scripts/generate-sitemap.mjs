/* Writes dist/sitemap.xml and dist/robots.txt after the build.

   Generated rather than checked into public/ for two reasons. Both files have
   to name an absolute host, and the host is not fixed — VITE_SITE_URL overrides
   it on Netlify deploy previews. A static robots.txt would ship the production
   sitemap URL from every preview, and a static sitemap would invite Google to
   index preview URLs as if they were the real site.

   The route list comes from INDEXABLE_ROUTES, the same array vite.config.js
   prerenders, so a page cannot be built without being listed.

   Run as part of `npm run postbuild`. */

import { writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { SITE_URL, INDEXABLE_ROUTES } from '../src/data/site.js'

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url))

if (!existsSync(dist('index.html'))) {
  console.error('dist/index.html is missing — run this after the build.')
  process.exit(1)
}

/* A deploy preview is not the site. Serving it as indexable would put a second
   copy of every page in the index competing with the real one, and the canonical
   tags on a preview point at the preview. Previews get a blanket disallow. */
const PRODUCTION = 'https://juliaalmoite.netlify.app'
const isPreview = SITE_URL !== PRODUCTION

const lastmod = new Date().toISOString().slice(0, 10)

const urls = INDEXABLE_ROUTES.map(({ path, priority, changefreq }) => {
  // Trailing slash on the root only, matching the canonical tags usePageMeta
  // emits — a sitemap URL that differs from the canonical by a slash is read
  // as a different page.
  const loc = `${SITE_URL}${path === '/' ? '/' : path}`
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = isPreview
  ? `# Deploy preview — not the canonical site.\nUser-agent: *\nDisallow: /\n`
  : `# Everything here is meant to be found. The only disallow is /about, which
# is still the project scaffold's placeholder — it carries a noindex tag too,
# but a crawler has to fetch the page to read that, and this saves the trip.
User-agent: *
Allow: /
Disallow: /about

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(dist('sitemap.xml'), sitemap, 'utf8')
writeFileSync(dist('robots.txt'), robots, 'utf8')

console.log(
  `sitemap.xml — ${INDEXABLE_ROUTES.length} urls at ${SITE_URL}\n` +
    `robots.txt  — ${isPreview ? 'preview: Disallow /' : 'indexable'}`,
)
