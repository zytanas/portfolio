/* Emits src/assets/images/jzoa-logo.svg.

   The previous wordmark was a 390x160 raster with the pixel blocks and a hard
   drop shadow baked in. At the nav's 26px the Z ran into the O and the mark
   stopped reading as four letters. Nothing could be dialled down, because
   nothing was live — it was pixels.

   So the mark is defined here as a bitmap on a 6x9 grid per letter, one unit
   of tracking between them, and rendered to vector rects. Same blocky pixel
   identity, but the edges are crisp at any size and the counters stay open at
   nav scale. Every rect uses currentColor, so the header no longer needs
   `filter: invert(1)` to get a dark-theme version.

   Run with `npm run logo`. */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const OUT = fileURLToPath(new URL('../src/assets/images/jzoa-logo.svg', import.meta.url))

/* 7 wide, 9 tall, 2-unit stroke — heavy enough to match the weight of the
   original mark. Written out as bitmaps rather than rect coordinates because
   the letterforms are far easier to check by eye this way.

   The cell is 7 and not 6 so that every counter is 3 units against a 2-unit
   stroke. At 6 the counters were narrower than the strokes around them and the
   O and the A silted up at nav size — the same failure as the raster, just
   arrived at differently. */
const GLYPHS = {
  // Full top bar, stem down the right, hooking left along the bottom.
  J: [
    '1111111',
    '1111111',
    '0000110',
    '0000110',
    '0000110',
    '0000110',
    '1100110',
    '1111110',
    '1111110',
  ],
  // Diagonal steps down from the top bar's right to the bottom bar's left.
  // Consecutive rows overlap by a column so the stair stays connected.
  Z: [
    '1111111',
    '1111111',
    '0000110',
    '0001100',
    '0011000',
    '0011000',
    '0110000',
    '1111111',
    '1111111',
  ],
  O: [
    '1111111',
    '1111111',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1111111',
    '1111111',
  ],
  A: [
    '1111111',
    '1111111',
    '1100011',
    '1100011',
    '1111111',
    '1111111',
    '1100011',
    '1100011',
    '1100011',
  ],
}

const WORD = 'JZOA'
const CELL_W = 7
const CELL_H = 9
const TRACK = 1 // units of space between letters

const width = WORD.length * CELL_W + (WORD.length - 1) * TRACK
const height = CELL_H

/* Merge horizontal runs of set pixels into single rects. A rect per pixel would
   be 200-odd nodes and would show hairline seams between neighbours when the
   renderer antialiases; runs cut it to a few dozen and butt cleanly. */
function rects() {
  const out = []
  WORD.split('').forEach((char, i) => {
    const bitmap = GLYPHS[char]
    if (!bitmap) throw new Error(`No glyph defined for "${char}"`)
    const originX = i * (CELL_W + TRACK)
    bitmap.forEach((row, y) => {
      let runStart = null
      for (let x = 0; x <= CELL_W; x++) {
        const on = row[x] === '1'
        if (on && runStart === null) runStart = x
        if (!on && runStart !== null) {
          out.push({ x: originX + runStart, y, w: x - runStart, h: 1 })
          runStart = null
        }
      }
    })
  })
  return out
}

const body = rects()
  .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/>`)
  .join('')

/* The original had a hard offset shadow. Kept, but as a live element at low
   opacity rather than baked ink: it still gives the mark depth at hero size,
   and at 26px it is faint enough that it cannot close the counters the way the
   raster's did. */
/* aria-hidden, not role="img": every placement sits inside an element that
   already carries the accessible name (the header's <a aria-label>), and a
   labelled image inside it would announce the brand twice. */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width + 1} ${height + 1}" width="${width + 1}" height="${height + 1}" fill="currentColor" aria-hidden="true" focusable="false">
<g opacity="0.18" transform="translate(1 1)">${body}</g>
<g>${body}</g>
</svg>
`

writeFileSync(OUT, svg)
console.log(`Wrote ${OUT} — ${width + 1}x${height + 1} units, ${body.match(/<rect/g).length} rects`)
