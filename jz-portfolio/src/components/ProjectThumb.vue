<template>
  <!-- The box reserves its space from the aspect ratio alone, so the row does
       not jump when a lazy image finally arrives. -->
  <div class="thumb" :class="`thumb--${variant}`">
    <img
      v-if="src"
      class="thumb-img"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :width="WIDTHS[variant]"
      :height="Math.round((WIDTHS[variant] * 10) / 16)"
    />

    <!-- No artwork yet. A tile carrying the project's index keeps the grid
         composed instead of leaving a hole, and it is marked decorative: the
         title next to it already says which project this is, and "no image
         available" is not information a screen reader needs. -->
    <div v-else class="thumb-fallback" aria-hidden="true">
      <span class="thumb-fallback-index">{{ index }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/* Images are resolved by convention rather than imported per project, so that
   the seven files can land later without a code change — and so that a missing
   file degrades to the fallback tile instead of breaking the build the way a
   static `import` of a non-existent path would.

   eager, because the set is seven small files and the alternative is a promise
   per card just to learn a URL. `query: '?url'` keeps Vite's hashed asset URL
   rather than inlining the bytes. */
const FILES = import.meta.glob('../assets/images/work/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// '../assets/images/work/vibeteams.webp' -> 'vibeteams'
const BY_SLUG = Object.fromEntries(
  Object.entries(FILES).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url]),
)

// Roughly the widest each variant is ever painted, doubled for retina. Only
// used for the intrinsic width/height attributes that stop layout shift.
const WIDTHS = { card: 720, panel: 640, hover: 128 }

const props = defineProps({
  project: { type: Object, required: true },
  // Shown in the fallback tile. Already zero-padded by the caller.
  index: { type: String, required: true },
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'panel', 'hover'].includes(v),
  },
})

const src = computed(() => BY_SLUG[props.project.slug] ?? null)

/* The hover preview is decorative — it duplicates a row whose title is right
   there, and it never appears for keyboard or touch users. Everywhere else the
   image is the content, so it gets the real description. */
const alt = computed(() =>
  props.variant === 'hover' ? '' : props.project.imageAlt || props.project.title,
)
</script>

<style scoped>
.thumb {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
  border-radius: calc(var(--radius) * 0.7);
  border: 1px solid var(--border-soft);
}
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* the crop favours the top of a screenshot, where the work usually is */
  object-position: top center;
}

/* ---- fallback tile ----
   Deliberately flat and typographic rather than a grey box with an icon: it
   reads as part of the index, not as a broken image. */
.thumb-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--surface-2);
}
.thumb-fallback-index {
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  font-size: 1.4rem;
}
.thumb--hover .thumb-fallback-index {
  font-size: 0.7rem;
}

@media (prefers-reduced-motion: reduce) {
  .thumb {
    transition: none;
  }
}
</style>
