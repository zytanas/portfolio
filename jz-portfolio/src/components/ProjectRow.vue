<template>
  <li class="prow" :class="{ 'is-open': open }">
    <!-- The header is a flex row, not a button: it now holds a real <a>, and an
         anchor cannot live inside a button. The toggle is a stretched overlay
         button (below) so the whole row is still clickable. -->
    <div :id="`${id}-head`" class="prow-head">
      <span class="prow-index mono" aria-hidden="true">{{ index }}</span>
      <span class="prow-title">{{ project.title }}</span>

      <!-- Chips and the hover preview share this slot and cross-fade, so the
           row never changes height or reflows on hover. Both are decorative:
           hidden below 768px, and hidden while open because the panel carries
           the full set and a full-size preview. -->
      <span class="prow-head-aside" aria-hidden="true">
        <span class="prow-head-tags">
          <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tag">{{ tech }}</span>
        </span>
        <ProjectThumb class="prow-head-thumb" :project="project" variant="hover" />
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
        :aria-label="linkAria"
        @click.stop
      >
        <!-- Short on mobile ("view" / "figma"), full once the boxed treatment
             returns at 768px ("view project" / "open in figma") -->
        <span class="prow-link-label"
          ><span class="prow-link-label-rest">{{ linkLabel.lead }}</span
          >{{ linkLabel.base }}<span class="prow-link-label-rest">{{ linkLabel.trail }}</span></span
        >
        <span class="prow-link-arrow" aria-hidden="true">↗</span>
      </a>

      <span class="prow-chevron" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
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
          <!-- Preview beside the copy, so an opened row shows the work rather
               than only describing it. The Clowder row is the exception: it
               already renders a live prototype below, and a still of the same
               screens above it would just be the same thing twice. -->
          <div class="prow-body" :class="{ 'has-preview': showPreview }">
            <div class="prow-body-text">
              <!-- The credit line, in the same mono voice as the lead card's
                   roleLine. Above the description because the honest scope of
                   the involvement ("Supporting UI + dev") frames how the rest
                   of the panel should be read. Only the featured tier carries
                   one. -->
              <p v-if="project.role" class="prow-role mono">{{ project.role }}</p>

              <p class="prow-desc">{{ project.description }}</p>

              <!-- The result line, in the same box the lead card uses for its
                   final beat. Only the featured tier carries an `outcome`, so
                   the rows on /selected-work simply do not render one. -->
              <CaseOutcome v-if="project.outcome" class="prow-outcome" :outcome="project.outcome" />

              <div class="prow-tags">
                <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
              </div>
            </div>
            <ProjectThumb
              v-if="showPreview"
              class="prow-preview"
              :project="project"
              variant="panel"
            />
          </div>

          <!-- Phone prototype: portrait frame, centred, canvas edge to edge.
               `mounted` only flips once the row has been opened, so a collapsed
               row never pays for the embed; loading="lazy" is the belt to that
               brace. The loader sits behind the iframe and is uncovered until
               the frame paints. -->
          <div v-if="project.type === 'figma' && project.embedSrc" class="prow-proto">
            <div class="prow-proto-frame">
              <div v-if="!embedLoaded" class="prow-proto-loader" aria-hidden="true">
                <span class="prow-proto-spinner"></span>
                <span class="prow-proto-loading mono">loading prototype</span>
              </div>
              <iframe
                v-if="embedMounted"
                class="prow-proto-iframe"
                :class="{ 'is-loaded': embedLoaded }"
                :src="project.embedSrc"
                :title="`${project.title} interactive prototype`"
                width="100%"
                height="100%"
                loading="lazy"
                allowfullscreen
                @load="embedLoaded = true"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ProjectThumb from './ProjectThumb.vue'
import CaseOutcome from './CaseOutcome.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: String, required: true },
  id: { type: String, required: true },
  open: { type: Boolean, default: false },
})

// Rows for unlaunched / unlinked work simply have no link in the header.
const primaryLink = computed(() => props.project.links[0] ?? null)

// A figma row's panel is the live prototype; a still would be redundant.
const showPreview = computed(() => props.project.type !== 'figma')

// Type-aware header label. `lead`/`trail` are the parts that only appear at
// 768px+, where the link has a box to fill; `base` always shows.
const linkLabel = computed(() =>
  props.project.type === 'figma'
    ? { lead: 'Open in ', base: 'Figma', trail: '' }
    : { lead: '', base: 'View', trail: ' project' },
)
const linkAria = computed(
  () =>
    `${props.project.type === 'figma' ? 'Open in Figma' : 'View project'}: ${props.project.title}`,
)

// Lazy mount: the embed is created the first time the row opens and then kept,
// so re-opening is instant but a row that is never touched costs nothing.
const embedMounted = ref(false)
const embedLoaded = ref(false)
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) embedMounted.value = true
  },
  { immediate: true },
)

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
.prow-head-aside {
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
  transition:
    opacity 0.18s var(--ease),
    transform 0.18s var(--ease),
    color 0.2s var(--ease),
    border-color 0.2s var(--ease);
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
/* Panel body. One column on phones — the preview sits under the copy, which is
   the right order on a narrow screen; two columns from 768px. */
.prow-body {
  display: grid;
  gap: 16px;
}
/* Sized to match .lead-roleline on the lead card — same size, same tone, so a
   credit reads identically wherever it appears. */
.prow-role {
  font-size: 0.63rem;
  line-height: 1.5;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  margin-bottom: 8px;
}
.prow-desc {
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text-dim);
}
/* Sits between the description and the chips: the chips are metadata and belong
   last, but the outcome is the point of opening the row. */
.prow-outcome {
  margin-top: 14px;
}
.prow-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

/* ---- phone prototype ----
   A phone flow shown in a landscape box reads as a website, so the frame is
   portrait and centred at every width; only the clamp changes what that means
   in pixels. The frame is prussian ink so the surface under a loading (or
   letterboxed) canvas looks deliberate in all six themes. */
.prow-proto {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}
.prow-proto-frame {
  position: relative;
  width: min(240px, 70%);
  min-width: 200px;
  aspect-ratio: 9 / 19;
  border: 0.5px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #0f172a; /* prussian ink */
}
/* no padding: the canvas runs to the frame edge */
.prow-proto-iframe {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity 0.25s var(--ease);
}
.prow-proto-iframe.is-loaded {
  opacity: 1;
}
/* sits under the iframe and shows through until it paints */
.prow-proto-loader {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.prow-proto-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(163, 230, 53, 0.25);
  border-top-color: var(--link-accent);
  border-radius: 50%;
  animation: prow-proto-spin 0.9s linear infinite;
}
.prow-proto-loading {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
}
@keyframes prow-proto-spin {
  to {
    transform: rotate(360deg);
  }
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

  /* The shared slot. Fixed height and a right-aligned stack, so the chips and
     the preview can swap without either one moving the row. */
  .prow-head-aside {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
    height: 40px;
  }
  .prow-head-tags {
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.2s var(--ease);
  }
  .prow.is-open .prow-head-tags {
    opacity: 0; /* the panel repeats them in full */
  }

  /* Out of flow so it cannot widen the row, and never a click target — the
     stretched toggle underneath must keep the whole row activatable. */
  .prow-head-thumb {
    position: absolute;
    right: 0;
    height: 40px;
    width: 64px; /* 16:10 at 40px tall */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s var(--ease);
  }

  /* Hover only where hovering is real. A coarse pointer never resolves this
     media query, so touch gets the chips and nothing depends on a state it
     cannot enter. */
  @media (hover: hover) and (pointer: fine) {
    .prow:not(.is-open) .prow-head:hover .prow-head-thumb {
      opacity: 1;
    }
    .prow:not(.is-open) .prow-head:hover .prow-head-tags {
      opacity: 0;
    }
  }

  /* Two columns once the panel is wide enough for the copy to keep a readable
     measure beside an image. */
  .prow-body.has-preview {
    grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
    gap: 22px;
    align-items: start;
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
  .prow-link,
  .prow-head-tags,
  .prow-head-thumb,
  .prow-proto-iframe {
    transition: none;
  }
  /* the loader still reads as busy, it just stops spinning */
  .prow-proto-spinner {
    animation: none;
    border-top-color: var(--link-accent);
    opacity: 0.7;
  }
  /* the press still dims, it just does not shrink */
  .prow-link:active {
    transform: none;
  }
}
</style>
