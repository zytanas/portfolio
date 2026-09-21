<template>
  <div class="stack-spot" :class="{ 'is-lit': lit }">
    <!-- Off when the component sits inside SectionBlock, which already prints
         the index, title and meta for the section. -->
    <template v-if="showHeader">
      <header class="head">
        <span class="idx" aria-hidden="true">{{ index }}</span>
        <h2>Stack</h2>
        <p class="meta">{{ tools.length }} tools · what I actually reach for</p>
      </header>
      <span class="rule" aria-hidden="true"></span>
    </template>

    <!-- The spotlight lives on the wrapper: --mx/--my are written straight onto
         this element's style on mousemove, so the mask and glow move without a
         Vue re-render. Both layers reveal as one element — staggering the cells
         individually would animate the two grids out of step with each other. -->
    <div ref="wrap" class="wrap" data-reveal="up">
      <!-- Base layer: the real, accessible content, and legible in every
           state — before JS runs, on touch, and at rest under the spotlight. -->
      <ul class="grid base">
        <li v-for="tool in tools" :key="tool.name" class="cell">
          <span class="name">{{ tool.name }}</span>
          <span class="cat">{{ tool.cat }}</span>
        </li>
      </ul>

      <!-- Lit layer: the same grid at full brightness, shown through a radial
           mask at the cursor so it reads as a highlight over the gray beneath.
           Duplicate text, so it is hidden from the a11y tree. -->
      <ul v-if="lit" class="grid lit" aria-hidden="true">
        <li v-for="tool in tools" :key="tool.name" class="cell">
          <span class="name">{{ tool.name }}</span>
          <span class="cat">{{ tool.cat }}</span>
        </li>
      </ul>

      <div v-if="lit" class="glow" aria-hidden="true"></div>
    </div>

    <!-- Affordance only, and only where there is a cursor to move: the grid
         reads fine without it, so it carries nothing a screen reader needs. -->
    <p v-if="lit && hint" class="hint" aria-hidden="true"><span class="sq"></span>{{ hint }}</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  showHeader: { type: Boolean, default: true },
  index: { type: String, default: '04' },
  // empty string removes it entirely
  hint: { type: String, default: 'move your cursor across the grid' },
  tools: {
    type: Array,
    default: () => [
      { name: 'figma', cat: 'design' },
      { name: 'elementor', cat: 'design' },
      { name: 'webflow', cat: 'design' },
      { name: 'photoshop', cat: 'design' },
      { name: 'canva', cat: 'design' },
      { name: 'vue', cat: 'dev' },
      { name: 'react', cat: 'dev' },
      { name: 'nuxt', cat: 'dev' },
      { name: 'reka ui', cat: 'dev' },
      { name: 'tailwind', cat: 'dev' },
      { name: 'html/css/js', cat: 'dev' },
      { name: 'claude code', cat: 'ai' },
      { name: 'chatgpt', cat: 'ai' },
      { name: 'microsoft copilot', cat: 'ai' },
      { name: 'gemini', cat: 'ai' },
      { name: 'github copilot', cat: 'ai' },
    ],
  },
})

const wrap = ref(null)
// Stays false through prerender and through the first client paint, so the
// markup the crawler and a touch visitor get is the plain readable grid.
const lit = ref(false)

function onMove(e) {
  const el = wrap.value
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

onMounted(() => {
  // A pointer that cannot hover would leave the grid permanently dark, so the
  // effect is opt-in per device rather than per viewport width.
  if (!window.matchMedia('(hover: hover)').matches) return
  lit.value = true
  window.addEventListener('mousemove', onMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
})
</script>

<style scoped>
/* Local fallbacks so the component stands alone; each one defers to the global
   token when the page defines it. Swap the right-hand defaults for your own. */
.stack-spot {
  --fg: var(--text, #f4f4f4);
  --fg2: var(--text-dim, #a0a0a0);
  --dim: var(--text-faint, #868686);
  --line: var(--border, #282828);
  --mono: var(--font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace);
  --r: 160px;

  /* The rest state is a legible muted gray, not near-black: the spotlight
     brightens what is already readable rather than revealing it from nothing.
     A grid that is unreadable until hovered asks the visitor to gamble a hover
     on a section that looks empty, and has nothing at all to offer on touch. */
  --rest: var(--text-faint, #868686);
  --rest-line: var(--border-soft, #1e1e1e);
  --lit-rgb: 255, 255, 255;

  font-family: var(--mono);
  color: var(--fg2);
}

/* The site's ink picker can put this section on a near-white page, where a
   white spotlight is invisible and black is the bright pole. Only the lit ink
   flips — the rest state is a readable gray in both modes, so it rides the
   theme's own contrast-checked tokens.

   The whole selector is wrapped, not just the ancestor: `:global(html…)
   .stack-spot` compiles down to a bare `html[data-mode=light]` rule here and
   leaks the vars onto the document root. */
:global(html[data-mode='light'] .stack-spot) {
  --lit-rgb: 0, 0, 0;
}

.head {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.idx {
  font-size: 0.64rem;
  color: var(--dim);
}
.head h2 {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--fg);
}
.meta {
  margin-left: auto;
  text-align: right;
  font-size: 0.64rem;
  color: var(--dim);
}
.rule {
  display: block;
  margin: 12px 0 16px;
  border-top: 1px dashed var(--line);
}

/* Both layers are placed in the same single grid cell rather than one being
   absolutely positioned over the other. An abspos layer resolves its
   `auto-fit` columns against a different box than the in-flow one, and a
   sub-pixel difference there flips a column count — which showed up as the
   dimmed base text ghosting out from behind the lit text. Sharing one track
   makes identical geometry structural rather than a coincidence. */
.wrap {
  display: grid;
  /* Dot texture only behind the grid — the page keeps owning its own bg. */
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(var(--lit-rgb), 0.045) 1px,
    transparent 0
  );
  background-size: 22px 22px;
}

.grid {
  grid-area: 1 / 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  /* rows size to content in both layers instead of stretching to the taller
     one, so the second and later rows cannot drift apart vertically */
  align-content: start;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cell {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 11px 12px;
  border: 1px dashed var(--line);
  border-radius: 8px;
}
.name {
  font-size: 0.78rem;
}
.cat {
  margin-left: auto;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
}

/* --- spotlight, client + hover only ------------------------------------ */

/* The base layer settles a step below its usual gray so the lit layer has
   somewhere to pop to — still comfortably readable, never a blank section. */
.is-lit .base {
  color: var(--rest);
  transition: color 0.25s ease;
}
.is-lit .base .cell {
  border-color: var(--rest-line);
}

.lit {
  pointer-events: none;
  color: rgb(var(--lit-rgb));
  /* Solid at the cursor, gone by ~72% of the radius — the soft edge is what
     makes it read as a light rather than a cut-out hole. */
  -webkit-mask-image: radial-gradient(
    circle var(--r) at var(--mx, -999px) var(--my, -999px),
    #000 0%,
    rgba(0, 0, 0, 0.92) 38%,
    transparent 72%
  );
  mask-image: radial-gradient(
    circle var(--r) at var(--mx, -999px) var(--my, -999px),
    #000 0%,
    rgba(0, 0, 0, 0.92) 38%,
    transparent 72%
  );
}
.lit .cat {
  color: rgba(var(--lit-rgb), 0.72);
}
.lit .cell {
  border-style: solid;
  border-color: rgba(var(--lit-rgb), 0.34);
}

.glow {
  grid-area: 1 / 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    circle calc(var(--r) * 1.25) at var(--mx, -999px) var(--my, -999px),
    rgba(var(--lit-rgb), 0.07) 0%,
    rgba(var(--lit-rgb), 0.03) 45%,
    transparent 70%
  );
}
.wrap:hover .glow {
  opacity: 1;
}

.hint {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 14px 0 0;
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dim);
  opacity: 0.75;
  transition: opacity 0.3s ease;
}
.hint .sq {
  width: 5px;
  height: 5px;
  flex: none;
  background: currentColor;
}
/* It has done its job the moment the cursor is on the grid — no reason to keep
   instructing someone mid-gesture. */
.wrap:hover + .hint {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .is-lit .base,
  .glow,
  .hint {
    transition: none;
  }
}
</style>
