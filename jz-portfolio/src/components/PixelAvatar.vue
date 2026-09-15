<template>
  <svg
    class="px"
    :viewBox="`0 0 ${GRID} ${GRID}`"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <rect v-for="c in cells" :key="c" :x="c % GRID" :y="Math.floor(c / GRID)" width="1" height="1" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

/* A deterministic pixel-art identicon, drawn from the recommender's name.
   Chosen over initials because a sprite carries no gender and no cultural
   reading of a name, and over a single shared person glyph because six
   identical circles gave every card the same mark. Same name in always means
   the same sprite out — nothing is stored, and it renders identically on the
   server during prerender and in the browser. */
const props = defineProps({
  seed: { type: String, required: true },
})

const GRID = 5

// FNV-1a. Not for security — just a cheap, stable, well-mixed 32-bit spread so
// two names as close as "Justin Barnes" and "Quan Doan" land on unlike sprites.
function hash(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/* Only the left half plus the centre column is hashed; columns 3 and 4 mirror
   columns 1 and 0. The symmetry is what makes an otherwise random grid read as
   a little face rather than as noise.

   All five rows are used. At the 20px render size the grid's corners sit ~14px
   from centre, inside the 16px circle, so nothing is clipped by the frame. */
const cells = computed(() => {
  const h = hash(props.seed)
  const out = []
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x <= 2; x += 1) {
      // one bit per hashed cell — 15 cells into the low 15 bits of the hash
      const bit = (h >>> (y * 3 + x)) & 1
      if (!bit) continue
      out.push(y * GRID + x)
      if (x < 2) out.push(y * GRID + (GRID - 1 - x))
    }
  }
  /* A hash can legitimately come up all-zero (or near it) and leave a blank
     circle, which reads as a loading failure. Guarantee the centre pixel so
     every sprite has a body to build from. */
  if (out.length === 0) out.push(2 * GRID + 2)
  return out
})
</script>

<style scoped>
.px {
  display: block;
  /* currentColor keeps the sprite on the same inversion as its frame — the card
     hover flips the circle to solid text colour and the pixels follow. */
  fill: currentColor;
}
</style>
