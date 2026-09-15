<template>
  <!-- Three panels sharing one row. The pointed-at panel takes most of the
       width and shows its name, its line and its link; the other two fall back
       to a spine — the name set vertically, nothing else. One project is always
       open, so the section never reads as three closed doors.

       The open panel is tracked here rather than left to :hover so that it
       survives the pointer leaving the strip, and so that tabbing through the
       links opens the panel the focus is in. -->
  <div class="panels" data-reveal-stagger>
    <article
      v-for="(project, i) in items"
      :key="project.slug"
      class="panel"
      :class="{ 'is-open': open === i }"
      data-reveal="up"
      @mouseenter="open = i"
      @focusin="open = i"
    >
      <!-- The backdrop, not an illustration: it is dimmed to near-nothing while
           the panel is a spine and comes up only for the open one, so the strip
           reads as one image at a time instead of three competing. -->
      <ProjectThumb class="panel-media" :project="project" variant="fill" />
      <span class="panel-scrim" aria-hidden="true"></span>

      <!-- The collapsed state. Decorative: the same title is in the body below,
           which stays in the accessibility tree at every width, so announcing
           it twice would be the only thing this adds. -->
      <span class="panel-spine" aria-hidden="true">
        <span class="panel-index mono">{{ indexOf(i) }}</span>
        <span class="panel-spine-title">{{ project.title }}</span>
      </span>

      <div class="panel-body">
        <span class="panel-index mono" aria-hidden="true">{{ indexOf(i) }}</span>
        <h3 class="panel-title">{{ project.title }}</h3>
        <p class="panel-blurb">{{ blurbOf(project) }}</p>

        <!-- Stretched over the whole panel by ::after, so the panel is one
             target for a pointer while staying a single ordinary link for a
             screen reader and for the keyboard. Unlinked projects keep the
             label off entirely rather than showing a dead affordance. -->
        <a
          v-if="linkOf(project)"
          class="panel-link"
          :href="linkOf(project).href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View project: ${project.title}`"
        >
          <span>View project</span>
          <span class="panel-link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectThumb from './ProjectThumb.vue'

defineProps({
  items: { type: Array, required: true },
})

// The first project starts open — see the ordering note in data/projects.js.
const open = ref(0)

const indexOf = (i) => String(i + 1).padStart(2, '0')
const linkOf = (project) => project.links?.[0] ?? null
/* `blurb` is the line written for this panel; `description` is the full card
   summary and is a fallback, clamped by CSS. See data/projects.js. */
const blurbOf = (project) => project.blurb || project.description
</script>

<style scoped>
/* ---- mobile first: a plain stack of cards ----
   There is no hover on a phone, and making the panels tap-to-expand would put
   a second meaning on the tap that already opens the project. So below 900px
   every panel is simply open: image, name, line, link. */
.panels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  min-height: 250px;
  display: flex;
}

/* ---- backdrop ---- */
.panel-media {
  position: absolute;
  inset: 0;
}
/* Dark from the foot up. The panels carry white text over a screenshot whose
   own tone we do not control, so the legibility comes from the scrim rather
   than from the theme — this one gradient is the same in all six. */
.panel-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.72) 32%,
    rgba(0, 0, 0, 0.34) 62%,
    rgba(0, 0, 0, 0.18) 100%
  );
}

/* ---- content ---- */
.panel-body {
  position: relative;
  align-self: flex-end;
  width: 100%;
  padding: 18px 18px 16px;
  color: #fff;
}
.panel-index {
  display: block;
  font-size: 0.63rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 8px;
}
.panel-title {
  font-size: 1.12rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: #fff;
}
.panel-blurb {
  font-size: 0.88rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 7px;
  max-width: 46ch;
  /* only ever bites on the `description` fallback */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* Same box as .prow-link and .lead-link elsewhere in the section, recoloured
   for the dark scrim it sits on. */
.panel-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  margin-top: 14px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: calc(var(--radius) * 0.75);
  background: rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.86);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  line-height: 1;
  white-space: nowrap;
  transition:
    color 0.2s var(--ease),
    border-color 0.2s var(--ease),
    background 0.2s var(--ease);
}
.panel-link:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.4);
}
/* The whole panel is the target. Outlined on focus-visible instead of the link
   alone, so keyboard focus lands on the same shape the pointer gets. */
.panel-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
}
.panel-link:focus-visible {
  outline: none;
}
.panel-link:focus-visible::after {
  outline: 2px solid #fff;
  outline-offset: -3px;
}
/* The arrow is the only mark that was ever a colour of its own. It takes the
   panel's own white instead, a step brighter than the label beside it — the
   panel's palette is the theme plus the scrim, nothing else. */
.panel-link-arrow {
  color: #fff;
}

/* The spine has no job while the panels are stacked. */
.panel-spine {
  display: none;
}

/* ---- 900px+: the strip ---- */
@media (min-width: 900px) {
  .panels {
    flex-direction: row;
    height: clamp(360px, 38vw, 440px);
    gap: 10px;
  }

  /* flex-grow is the only thing that animates — widths stay proportional, so
     the three panels always fill the row exactly and nothing reflows around
     them. The closed pair keep a floor wide enough for the vertical name. */
  .panel {
    flex: 1 1 0;
    min-width: 76px;
    min-height: 0;
    transition: flex-grow 0.5s var(--ease);
  }
  .panel.is-open {
    flex-grow: 4.2;
  }

  /* Closed: a quiet plate with a name down it. Open: the screenshot. */
  .panel-media {
    opacity: 0.16;
    filter: grayscale(1);
    transition:
      opacity 0.5s var(--ease),
      filter 0.5s var(--ease);
  }
  .panel.is-open .panel-media {
    opacity: 1;
    filter: none;
  }
  .panel-scrim {
    opacity: 0;
    transition: opacity 0.5s var(--ease);
  }
  .panel.is-open .panel-scrim {
    opacity: 1;
  }

  .panel-spine {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 76px;
    flex: none;
    padding: 18px 0;
    color: var(--text-dim);
    transition: opacity 0.3s var(--ease);
  }
  /* Reads bottom-to-top, which keeps the name beside the panel's own edge
     rather than upside down against it. */
  .panel-spine-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.9rem;
    letter-spacing: -0.01em;
    white-space: nowrap;
    /* The spine is only ever as tall as the strip, and one of these names is
       long ("CoreProc, Inc. Website"). Ellipsis rather than a hard clip — the
       inline axis is vertical here, so it truncates down the panel. */
    flex: 0 1 auto;
    min-height: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .panel-spine .panel-index {
    margin-bottom: 0;
    color: var(--text-faint);
  }
  /* Faster out than the panel opens, so the two labels never overlap. */
  .panel.is-open .panel-spine {
    opacity: 0;
    transition-duration: 0.18s;
  }

  /* Absolute, so the body's natural width never props the closed panel open —
     the text is clipped by the panel instead of setting its size. Pinned to the
     panel's own width at full size so the lines do not re-wrap while it
     expands, which would read as the text twitching. */
  .panel-body {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 420px;
    padding: 26px 24px 22px;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.3s var(--ease),
      transform 0.4s var(--ease);
  }
  .panel.is-open .panel-body {
    opacity: 1;
    transform: none;
    /* held back until the panel is most of the way open */
    transition-delay: 0.16s;
  }
  /* Nothing to click on a closed panel — its link is invisible and its spine is
     the only thing showing. Focus still reaches it, and :focus-within opens the
     panel first, so the keyboard never chases a hidden target. */
  .panel:not(.is-open) .panel-body {
    pointer-events: none;
  }
  .panel:not(.is-open):focus-within .panel-body {
    pointer-events: auto;
  }

  .panel-title {
    font-size: 1.3rem;
  }
}

@media (min-width: 1200px) {
  .panel.is-open {
    flex-grow: 5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel,
  .panel-media,
  .panel-scrim,
  .panel-spine,
  .panel-body,
  .panel-link {
    transition: none;
  }
  .panel-body {
    transform: none;
  }
}
</style>
