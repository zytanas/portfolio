<template>
  <!-- One project as a card. Where the accordion row hides its detail behind a
       toggle, the card has nothing to hide — description and the full chip set
       are always on. A project with a link renders as an <a> so the whole card
       is the target; the two unlinked ones render as a plain <article>. -->
  <component
    :is="primaryLink ? 'a' : 'article'"
    class="pcard"
    :class="{ 'is-link': primaryLink }"
    v-bind="
      primaryLink
        ? {
            href: primaryLink.href,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': linkAria,
          }
        : {}
    "
  >
    <!-- The work first, then who it is for. A UI/UX index that leads with a
         paragraph asks the reader to take the design on trust. -->
    <ProjectThumb class="pcard-thumb" :project="project" variant="card" />

    <span class="pcard-index mono" aria-hidden="true">{{ index }}</span>
    <h3 class="pcard-title">{{ project.title }}</h3>
    <p class="pcard-desc">{{ project.description }}</p>

    <div class="pcard-tags">
      <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
    </div>

    <!-- Pushed to the bottom by margin-top:auto so the cue sits on the same
         line across a row of cards whose descriptions differ in length. -->
    <span v-if="primaryLink" class="pcard-link" aria-hidden="true">
      <span class="pcard-link-label">{{ linkLabel }}</span>
      <span class="pcard-link-arrow">↗</span>
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import ProjectThumb from './ProjectThumb.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: String, required: true },
})

const primaryLink = computed(() => props.project.links[0] ?? null)

// Same type-aware wording as the accordion row, so a project reads the same
// whichever surface you meet it on.
const isFigma = computed(() => props.project.type === 'figma')
const linkLabel = computed(() => (isFigma.value ? 'Open in Figma' : 'View project'))
const linkAria = computed(
  () => `${isFigma.value ? 'Open in Figma' : 'View project'}: ${props.project.title}`,
)
</script>

<style scoped>
/* Mobile-first: base styles are for ~360px and the breakpoints below only add
   room. The grid itself is owned by the page, not the card. */
.pcard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* stretches to the tallest card in its grid row */
  height: 100%;
  padding: 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition:
    background 0.25s var(--ease),
    border-color 0.25s var(--ease);
}
/* Theme-driven, same as the global `.card` rule: the surface lifts and the
   hairline firms up. No accent — every one of the six themes is monochrome. */
.pcard.is-link:hover {
  background: var(--card-hi);
  border-color: var(--text-dim);
}
.pcard.is-link:focus-visible {
  outline: 2px solid var(--text-dim);
  outline-offset: 2px;
}

/* Full-bleed across the card: the 20px padding is pulled back on three sides so
   the image meets the border, which reads as a plate rather than a picture
   sitting in a box. The 10px gap below comes from the card's own flex gap. */
.pcard-thumb {
  margin: -20px -20px 2px;
  width: calc(100% + 40px);
  border-radius: var(--radius) var(--radius) 0 0;
  border-width: 0 0 1px 0;
}
.pcard.is-link:hover .pcard-thumb {
  border-bottom-color: var(--text-dim);
}

.pcard-index {
  font-size: 0.66rem;
}
.pcard-title {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.35;
  color: var(--text);
}
.pcard-desc {
  /* not clamped: this page is the read-everything destination */
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text-dim);
}
.pcard-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.pcard-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 14px;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  transition: color 0.2s var(--ease);
}
.pcard.is-link:hover .pcard-link {
  color: var(--text);
}
.pcard-link-arrow {
  color: var(--text-faint);
  transition: color 0.2s var(--ease);
}
.pcard.is-link:hover .pcard-link-arrow {
  color: var(--text);
}

@media (min-width: 768px) {
  .pcard {
    padding: 22px;
  }
  /* the bleed has to track the padding it is cancelling */
  .pcard-thumb {
    margin: -22px -22px 2px;
    width: calc(100% + 44px);
  }
  .pcard-desc {
    font-size: 0.88rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pcard,
  .pcard-link {
    transition: none;
  }
}
</style>
