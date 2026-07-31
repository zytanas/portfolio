<template>
  <li class="prow" :class="{ 'is-open': open }">
    <!-- The header is a flex row, not a button: it now holds a real <a>, and an
         anchor cannot live inside a button. The toggle is a stretched overlay
         button (below) so the whole row is still clickable. -->
    <div :id="`${id}-head`" class="prow-head">
      <span class="prow-index mono" aria-hidden="true">{{ index }}</span>
      <span class="prow-title">{{ project.title }}</span>

      <!-- Collapsed-row chips: hidden below 768px, and hidden while open
           because the panel already lists the full set. -->
      <span class="prow-head-tags" aria-hidden="true">
        <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tag">{{ tech }}</span>
      </span>

      <!-- Visible in both states. Sits above the overlay toggle (z-index) and
           stops propagation, so tapping it opens the project without also
           opening the row. -->
      <a
        v-if="primaryLink"
        class="prow-link"
        :href="primaryLink.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`View project: ${project.title}`"
        @click.stop
      >
        <!-- "view" on mobile, "view project" once the boxed treatment
             returns at 768px -->
        <span class="prow-link-label"
          >view<span class="prow-link-label-rest"> project</span></span
        >
        <span class="prow-link-arrow" aria-hidden="true">↗</span>
      </a>

      <span class="prow-chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>

      <!-- Last in the DOM on purpose: absolutely positioned so its position
           does not affect layout, and it puts the link ahead of the toggle in
           tab order. Enter/Space toggle for free. -->
      <button
        class="prow-toggle"
        type="button"
        :aria-expanded="String(open)"
        :aria-controls="`${id}-panel`"
        @click="$emit('toggle')"
      >
        <span class="sr-only">{{ open ? 'Hide' : 'Show' }} details for {{ project.title }}</span>
      </button>
    </div>

    <!-- The panel stays in the flow so its height can animate; `inert` keeps
         its content out of the accessibility tree while it is closed. -->
    <div
      :id="`${id}-panel`"
      class="prow-panel"
      role="region"
      :aria-labelledby="`${id}-head`"
      :inert="!open || null"
    >
      <div class="prow-panel-clip">
        <div class="prow-panel-inner">
          <p class="prow-desc">{{ project.description }}</p>
          <div class="prow-tags">
            <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: String, required: true },
  id: { type: String, required: true },
  open: { type: Boolean, default: false },
})

// Rows for unlaunched / unlinked work simply have no link in the header.
const primaryLink = computed(() => props.project.links[0] ?? null)

defineEmits(['toggle'])
</script>

<style scoped>
/* ============================================================
   One project = one row in a directory index. Mobile-first:
   base styles are for ~360px, breakpoints only add breathing
   room — the structure never changes.
   ============================================================ */
.prow {
  /* The one non-token colour here: the accent on the link arrow. It lives in a
     single custom property because everything else is theme-driven and all six
     themes are otherwise monochrome. */
  --link-accent: #a3e635;
  border-bottom: 1px solid var(--border-soft);
}
.prow:first-child {
  border-top: 1px solid var(--border-soft);
}

/* ---- header row (always visible) ----
   position: relative anchors the stretched toggle overlay. The title takes the
   free space, so the link + chevron cluster right-aligns without a wrapper. */
.prow-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px; /* also the minimum link-to-chevron gap */
  width: 100%;
  min-height: 48px; /* touch target */
  padding: 12px 4px;
  color: var(--text-dim);
  transition: color 0.2s var(--ease);
}
.prow-head:hover {
  color: var(--text);
}

/* The toggle: invisible, covers the whole row, sits under the link. */
.prow-toggle {
  position: absolute;
  inset: 0;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.prow-toggle:focus-visible {
  outline: 2px solid var(--text-dim);
  outline-offset: -2px;
  border-radius: calc(var(--radius) * 0.6);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.prow-index {
  flex: none;
  font-size: 0.66rem;
  color: var(--text-faint);
}
.prow-title {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.35;
  color: var(--text);
}
.prow-head-tags {
  display: none; /* no room until 768px */
}

/* ---- the project link ----
   Mobile: no box at all. It carries by size and colour instead — a small mono
   "view" with a hairline under it, plus an oversized lime arrow. The padding
   and the matching negative margin give it a 44px target without drawing
   anything and without stretching the row. */
.prow-link {
  position: relative; /* lifts it out of the toggle overlay's click area */
  z-index: 1;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 44px;
  min-height: 44px;
  padding: 10px 6px;
  /* block only — a negative inline margin would eat into the 12px gap the
     chevron needs, since the visible mark then overhangs the margin box */
  margin-block: -10px;
  border: 0;
  background: none;
  color: var(--link-accent);
  font-family: var(--font-mono);
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.18s var(--ease), transform 0.18s var(--ease),
    color 0.2s var(--ease), border-color 0.2s var(--ease);
}
/* pressed feedback stands in for the missing box */
.prow-link:active {
  opacity: 0.6;
  transform: scale(0.94);
}
.prow-link:focus-visible {
  outline: 2px solid var(--link-accent);
  outline-offset: 2px;
}
.prow-link-arrow {
  font-size: 25px;
  color: var(--link-accent);
}
.prow-link-label {
  font-size: 13px;
  letter-spacing: 0.06em;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.prow-link-label-rest {
  display: none; /* just "view" while the label has no box to sit in */
}

.prow-chevron {
  flex: none;
  display: inline-flex;
  transition: transform 0.3s var(--ease);
}
.prow.is-open .prow-chevron {
  transform: rotate(180deg);
}

/* ---- expanding panel ----
   0fr → 1fr on grid-template-rows animates real height with no measured
   magic number and no jump. The clip element owns the overflow. */
.prow-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.34s var(--ease);
}
.prow.is-open .prow-panel {
  grid-template-rows: 1fr;
}
.prow-panel-clip {
  overflow: hidden;
}
.prow-panel-inner {
  padding: 0 4px 18px 4px;
  opacity: 0;
  transition: opacity 0.2s var(--ease);
}
.prow.is-open .prow-panel-inner {
  opacity: 1;
  transition: opacity 0.3s var(--ease) 0.08s;
}
.prow-desc {
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text-dim);
}
.prow-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

/* ---- 768px+: more horizontal room, chips surface on the closed row, and the
       link earns its label ---- */
@media (min-width: 768px) {
  .prow-head {
    gap: 16px;
    padding: 14px 10px;
  }
  /* the box comes back: pointer input, and there is room for the full label */
  .prow-link {
    min-width: 0;
    min-height: 34px; /* matches .btn height; pointer, so 44px is not needed */
    padding: 0 12px;
    margin: 0;
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) * 0.75);
    background: var(--surface);
    color: var(--text-dim);
    font-size: 0.74rem;
  }
  .prow-link:hover {
    color: var(--text);
    border-color: var(--link-accent);
  }
  .prow-link-arrow {
    font-size: inherit;
  }
  .prow-link-label {
    font-size: inherit;
    letter-spacing: normal;
    text-decoration: none;
  }
  .prow-link-label-rest {
    display: inline;
  }
  .prow-panel-inner {
    padding: 0 10px 22px 10px;
  }
  .prow-title {
    flex: 0 1 auto;
    font-size: 1rem;
  }
  .prow-head-tags {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 6px;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.2s var(--ease);
  }
  .prow.is-open .prow-head-tags {
    opacity: 0; /* the panel repeats them in full */
  }
}

/* ---- 1024px+: comfortable measure on the description ---- */
@media (min-width: 1024px) {
  .prow-head {
    padding: 16px 14px;
  }
  .prow-panel-inner {
    padding: 0 14px 26px 14px;
  }
  .prow-desc {
    max-width: 68ch;
    font-size: 0.9rem;
  }
}

/* No height animation for users who asked for less motion — the rows still
   open and close, they just do it instantly. */
@media (prefers-reduced-motion: reduce) {
  .prow-panel,
  .prow-panel-inner,
  .prow-chevron,
  .prow-link {
    transition: none;
  }
  /* the press still dims, it just does not shrink */
  .prow-link:active {
    transform: none;
  }
}
</style>
