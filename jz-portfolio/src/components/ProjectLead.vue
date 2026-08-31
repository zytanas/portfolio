<template>
  <!-- The lead case study. Not a row: it has no collapsed state, because the
       point of promoting it is that its detail is on the page without a click.
       Everything else in the section is a hairline row or a plain link, so a
       dashed frame with a surface fill is all the weight this needs — the same
       "this block is the important one" idiom the contact CTA already uses. -->
  <article class="lead" data-reveal="up">
    <div class="lead-head">
      <div class="lead-headline">
        <span class="lead-index mono" aria-hidden="true">{{ index }}</span>
        <h3 class="lead-title">{{ project.title }}</h3>

        <a
          v-if="primaryLink"
          class="lead-link"
          :href="primaryLink.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View project: ${project.title}`"
        >
          <span>View project</span>
          <span class="lead-link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <!-- Title and tagline as two elements rather than one long heading: the
           full line is "VibeTeams — a chat platform where you consult a team,
           not a chatbot", but set as one h3 it would wrap into a paragraph and
           stop reading as a title. -->
      <p v-if="study?.tagline" class="lead-tagline">{{ study.tagline }}</p>

      <!-- The credit line. Same four facts as the sticky panel, so it is hidden
           at 1024px+ where that panel sits two columns to the right and would
           state them a second time. Below that the panel is above the fold of
           the narrative rather than beside it, and the line under the title is
           the more natural place to read them. -->
      <p v-if="study?.roleLine" class="lead-roleline mono">
        <template v-for="(part, i) in study.roleLine" :key="part">
          <span v-if="i" class="lead-roleline-sep" aria-hidden="true">·</span>
          <span>{{ part }}</span>
        </template>
      </p>

      <span class="lead-tags" aria-hidden="true">
        <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
      </span>
    </div>

    <!-- Two columns from 1024px: narrative left, metadata right. The metadata
         column comes FIRST in the DOM so that the mobile stack puts it above
         the narrative with no order juggling, and grid places it back on the
         right at desktop. -->
    <div class="lead-study">
      <div class="lead-aside">
        <div class="lead-aside-inner">
          <ProjectThumb class="lead-preview" :project="project" variant="panel" />
          <CaseMeta v-if="study?.meta" :items="study.meta" />
        </div>
      </div>

      <div class="lead-narrative">
        <!-- No `description` here: for the lead, the narrative replaces the
             one-line summary rather than repeating it. The rows and the
             /selected-work cards still render it. -->
        <CaseStudyBody v-if="study?.beats" :beats="study.beats" :outcome="project.outcome" />
        <template v-else>
          <p class="lead-desc">{{ project.description }}</p>
          <CaseOutcome
            v-if="project.outcome"
            class="lead-lone-outcome"
            :outcome="project.outcome"
          />
        </template>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import ProjectThumb from './ProjectThumb.vue'
import CaseStudyBody from './CaseStudyBody.vue'
import CaseOutcome from './CaseOutcome.vue'
import CaseMeta from './CaseMeta.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: String, default: '01' },
})

const primaryLink = computed(() => props.project.links[0] ?? null)

/* Whichever project holds the lead slot may or may not have a written study —
   reordering data/projects.js must not break this card. Without one it falls
   back to the summary plus its outcome. */
const study = computed(() => props.project.study ?? null)
</script>

<style scoped>
.lead {
  /* Same lime the work rows and the contact terminal already use. */
  --link-accent: #a3e635;
  position: relative;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--card);
  padding: 26px 20px 22px;
  margin-bottom: 30px;
}
/* The tab that straddles the top border, exactly as the bridge skill card
   labels itself. Opaque background so the dashes stop at its edge. */
.lead::after {
  content: 'lead case study';
  position: absolute;
  top: 0;
  left: 18px;
  transform: translateY(-50%);
  padding: 0 8px;
  background: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ---- header ---- */
.lead-head {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-soft);
}
/* Index + title, with the link pushed hard right by the title's free space. */
.lead-headline {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lead-index {
  flex: none;
  font-size: 0.66rem;
  color: var(--text-faint);
}
.lead-title {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 1.16rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}
/* Indented to the title's axis (index width + gap) so it reads as the second
   half of the heading rather than a new block. */
.lead-tagline {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--text-dim);
  margin-top: 6px;
  padding-left: 30px;
  max-width: 60ch;
}
/* Wraps between facts, never mid-fact — the separators are their own elements
   and each segment is a single unbreakable span. */
.lead-roleline {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 7px;
  font-size: 0.63rem;
  line-height: 1.5;
  text-transform: none;
  color: var(--text-faint);
  margin-top: 9px;
  padding-left: 30px;
}
.lead-roleline-sep {
  opacity: 0.6;
}
.lead-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
  padding-left: 30px;
}
/* Matches .prow-link at 768px+ — same height, box and hover as the rows below,
   so the tiers differ in prominence without differing in vocabulary. */
.lead-link {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.75);
  background: var(--surface);
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  line-height: 1;
  white-space: nowrap;
  transition:
    color 0.2s var(--ease),
    border-color 0.2s var(--ease);
}
.lead-link:hover {
  color: var(--text);
  border-color: var(--link-accent);
}
.lead-link:focus-visible {
  outline: 2px solid var(--link-accent);
  outline-offset: 2px;
}
.lead-link-arrow {
  color: var(--link-accent);
}

/* ---- study body ----
   Mobile: one column. The aside (preview + spec sheet) sits above the
   narrative, which is the right order — it orients you before the long read. */
.lead-study {
  display: grid;
  gap: 22px;
  padding-top: 20px;
}
.lead-aside-inner {
  display: grid;
  gap: 14px;
}
.lead-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text);
}
.lead-lone-outcome {
  margin-top: 16px;
}

@media (min-width: 768px) {
  .lead {
    padding: 30px 26px 26px;
  }
  .lead-title {
    font-size: 1.3rem;
  }
  .lead-tagline {
    font-size: 0.98rem;
  }
  /* The preview and the spec sheet side by side while there is still only one
     column — a 16:10 shot at full width would dwarf the panel beside it. */
  .lead-aside-inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 280px);
    gap: 18px;
    align-items: start;
  }
}

/* ---- 1024px+: the two-column case study ---- */
@media (min-width: 1024px) {
  .lead {
    padding: 34px 30px 30px;
  }
  /* The sticky panel carries these four facts from here up, so the credit line
     under the title would be the same information twice on one screen. */
  .lead-roleline {
    display: none;
  }
  .lead-study {
    grid-template-columns: minmax(0, 1fr) minmax(0, 280px);
    gap: 34px;
    /* NOT align-items: start. A sticky element can only travel within its own
       containing block, so the column it lives in has to be as tall as the
       narrative beside it — start-aligning would shrink-wrap the aside to its
       content height and the panel would barely move. Both children are left at
       the default `stretch` and the sticky sits on the inner element. */
  }
  /* Explicit placement: the aside is first in the DOM so the mobile stack puts
     it above the narrative with no order juggling; here it goes back to the
     right-hand column. */
  .lead-narrative {
    grid-column: 1;
    grid-row: 1;
  }
  .lead-aside {
    grid-column: 2;
    grid-row: 1;
  }
  .lead-aside-inner {
    grid-template-columns: 1fr;
    gap: 14px;
    position: sticky;
    /* 58px fixed site header + 18px breathing room */
    top: 76px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lead-link {
    transition: none;
  }
}
</style>
