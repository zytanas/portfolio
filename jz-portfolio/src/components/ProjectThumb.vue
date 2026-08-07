<template>
  <!-- The box reserves its space from the aspect ratio alone, so the row does
       not jump when a lazy image finally arrives.

       The hover preview is the one variant excluded from the reveal: its
       visibility is already owned by the row's hover rules, and a revealed
       element holding opacity 1 would leave it permanently on show. -->
  <div
    class="thumb"
    :class="`thumb--${variant}`"
    :data-reveal="variant === 'hover' ? null : 'clip'"
  >
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

    <!-- No artwork yet. A hatched plate keeps the grid composed instead of
         leaving a hole. Deliberately wordless: an earlier version put the
         project's index here, which sat directly above the card's own index
         label and read as a duplication rather than a placeholder. Decorative,
         so it stays out of the accessibility tree entirely — "no image yet" is
         not something a screen reader needs to hear seven times. -->
    <div v-else class="thumb-fallback" aria-hidden="true"></div>
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
  Object.entries(FILES).map(([path, url]) => [
    path
      .split('/')
      .pop()
      .replace(/\.\w+$/, ''),
    url,
  ]),
)

// Roughly the widest each variant is ever painted, doubled for retina. Only
// used for the intrinsic width/height attributes that stop layout shift.
const WIDTHS = { card: 720, panel: 640, hover: 128 }

const props = defineProps({
  project: { type: Object, required: true },
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

/* ---- fallback plate ----
   A quiet diagonal hatch in the border tone. Flat enough to read as a
   deliberate surface rather than a failed <img>, and it uses the same
   token ramp as everything else, so it works in all six themes without a
   single per-theme rule. */
.thumb-fallback {
  position: absolute;
  inset: 0;
  background-color: var(--surface-2);
  background-image: repeating-linear-gradient(
    -45deg,
    var(--border-soft) 0 1px,
    transparent 1px 9px
  );
}

@media (prefers-reduced-motion: reduce) {
  .thumb {
    transition: none;
  }
}
</style>
