/* WCAG contrast audit for the six theme combinations.
   The palette lives in custom properties across a 2 x 3 matrix (mode x ink),
   which no automated page scanner walks on its own — it only ever sees the one
   theme that happens to be active. So the ramps are mirrored here and checked
   exhaustively instead.

   Run with `npm run check-contrast`. Exits non-zero on any failure, so it can
   gate a build. */

const AA_BODY = 4.5

// Mirrors the ramps in src/assets/main.css. Keep in step with them.
const THEMES = {
  'dark / neutral': {
    surfaces: { bg: '#0a0a0a', card: '#161616', 'card-hi': '#1f1f1f', surface: '#121212' },
    text: { text: '#f4f4f4', 'text-dim': '#a0a0a0', 'text-faint': '#868686' },
  },
  'light / neutral': {
    surfaces: { bg: '#fbfbfa', card: '#ffffff', 'card-hi': '#f5f5f3', surface: '#ffffff' },
    text: { text: '#101010', 'text-dim': '#585858', 'text-faint': '#6f6f6f' },
  },
  'dark / warm': {
    surfaces: { bg: '#0b0a08', card: '#17150f', 'card-hi': '#211e17', surface: '#141210' },
    text: { text: '#f6f2ec', 'text-dim': '#a39c92', 'text-faint': '#8b857c' },
  },
  'light / warm': {
    surfaces: { bg: '#faf7f2', card: '#fffdfa', 'card-hi': '#f5f0e7', surface: '#fffdfa' },
    text: { text: '#14110c', 'text-dim': '#5d564b', 'text-faint': '#736b5e' },
  },
  'dark / cool': {
    surfaces: { bg: '#08090b', card: '#13161a', 'card-hi': '#1c2024', surface: '#101214' },
    text: { text: '#eef1f4', 'text-dim': '#98a0a8', 'text-faint': '#808890' },
  },
  'light / cool': {
    surfaces: { bg: '#f8fafb', card: '#ffffff', 'card-hi': '#f1f5f7', surface: '#ffffff' },
    text: { text: '#0d1114', 'text-dim': '#525a61', 'text-faint': '#666f76' },
  },
}

const channel = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  )
}

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

let failures = 0

for (const [name, { surfaces, text }] of Object.entries(THEMES)) {
  console.log(`\n${name}`)
  for (const [textName, textHex] of Object.entries(text)) {
    for (const [surfaceName, surfaceHex] of Object.entries(surfaces)) {
      const r = ratio(textHex, surfaceHex)
      const ok = r >= AA_BODY
      if (!ok) failures++
      const label = `${textName} on ${surfaceName}`.padEnd(26)
      console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label} ${r.toFixed(2)}:1`)
    }
  }
}

if (failures) {
  console.error(`\n${failures} pair(s) below WCAG AA (${AA_BODY}:1).`)
  process.exit(1)
}
console.log(`\nAll pairs clear WCAG AA (${AA_BODY}:1).`)
