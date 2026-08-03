/* Renders public/og-image.png — the 1200x630 card that LinkedIn, Slack and
   the rest show when the URL is pasted.

   Built from the real design tokens and the real wordmark rather than drawn
   somewhere else and exported, so the card cannot drift away from the site it
   advertises. PNG and not SVG: no major unfurler renders SVG for og:image.

   Run with `npm run og-image`. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))

const W = 1200
const H = 630

// Mirrors the dark / neutral ink in src/assets/main.css.
const BG = '#0a0a0a'
const TEXT = '#f4f4f4'
const DIM = '#a0a0a0'
const FAINT = '#868686'
const BORDER = '#282828'

/* The wordmark, inlined from the generated SVG so there is one source for it.
   The outer <svg> wrapper is stripped and the inner drawing re-placed at the
   size and position wanted here; currentColor is resolved explicitly because
   there is no document to inherit from. */
const logoSrc = readFileSync(here('../src/assets/images/jzoa-logo.svg'), 'utf8')
const logoInner = logoSrc.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
const logoViewBox = logoSrc.match(/viewBox="([^"]+)"/)[1]
const [, , logoW, logoH] = logoViewBox.split(/\s+/).map(Number)

const LOGO_H = 54
const LOGO_W = Math.round((LOGO_H * logoW) / logoH)

/* JetBrains Mono and Inter are webfonts on the site. A headless renderer has
   neither, so the card asks for them and names the same fallbacks the CSS
   does — the shapes shift slightly, the hierarchy does not. */
const MONO = "'JetBrains Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
const SANS = "'Inter', 'DejaVu Sans', system-ui, sans-serif"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- the dot field from the site background, at card scale -->
  <defs>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="${TEXT}" opacity="0.055"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- hairline frame, echoing the dashed contact block -->
  <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="none" stroke="${BORDER}" stroke-width="2" rx="18"/>

  <g fill="${TEXT}" transform="translate(96 96) scale(${LOGO_H / logoH})">${logoInner}</g>

  <!-- The URL rides on the wordmark's line rather than the footer's. Sharing
       the footer with the stack list overran the 1008px of usable width and
       the two ran into each other. -->
  <text x="${W - 96}" y="138" text-anchor="end" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${FAINT}">JULIAALMOITE.NETLIFY.APP</text>

  <text x="96" y="286" font-family="${MONO}" font-size="72" font-weight="500" letter-spacing="-3" fill="${TEXT}">Julia Almoite</text>

  <text x="96" y="352" font-family="${MONO}" font-size="26" letter-spacing="5" fill="${DIM}">UI/UX ENGINEER</text>

  <text x="96" y="432" font-family="${SANS}" font-size="30" fill="${DIM}">Need a design? Done. Need it built? Also me.</text>

  <line x1="96" y1="486" x2="${W - 96}" y2="486" stroke="${BORDER}" stroke-width="2"/>

  <text x="96" y="534" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${FAINT}">DESIGN SYSTEMS · VUE · REACT · NUXT · TAILWIND</text>
</svg>
`

const outDir = here('../public')
mkdirSync(outDir, { recursive: true })

// Keep the SVG next to the PNG — it is the editable source for the card.
writeFileSync(here('../public/og-image.svg'), svg)

const out = here('../public/og-image.png')
const info = await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .png({ compressionLevel: 9 })
  .toFile(out)

console.log(`Wrote ${out} — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB`)

if (info.width !== 1200 || info.height !== 630) {
  console.error(`Expected 1200x630, got ${info.width}x${info.height}`)
  process.exit(1)
}
