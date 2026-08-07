<template>
  <main id="top" class="relative z-[1]">
    <!-- ================= HERO ================= -->
    <div class="wrap hero">
      <div class="hero-split">
        <PortraitFrame />

        <!-- Starts in view, so the observer fires on load and the three lines
             arrive in sequence rather than waiting for a scroll that may never
             come. -->
        <div class="hero-copy" data-reveal-stagger>
          <h1 data-reveal="up">Julia Almoite</h1>
          <p class="lede" data-reveal="up">
            I'm a <span class="name">UI/UX engineer</span> — need a design? Done. Need it built?
            Also me. Most teams split that into two roles; I've always thought that was one
            conversation too many.
          </p>
          <!-- Three buttons, one filled. The work is the highest-value first
               action on a portfolio, so it takes the solid treatment; "what I
               do" drops to outlined beside it. GitHub is not repeated here —
               the contact block at the foot of the page already carries it,
               and a fourth button would flatten the hierarchy this fixes. -->
          <div class="mt-6 flex flex-wrap gap-[10px]" data-reveal="up">
            <!-- Routed rather than bare hashes so the scroll clears the fixed
                 header, same as the nav. -->
            <RouterLink
              class="btn solid"
              :to="{ path: '/', hash: '#work' }"
              aria-current-value="false"
              >View work →</RouterLink
            >
            <RouterLink
              class="btn ghost"
              :to="{ path: '/', hash: '#skills' }"
              aria-current-value="false"
              >What I do →</RouterLink
            >
            <a
              class="btn ghost"
              href="https://www.linkedin.com/in/almoitejuliazyrene/"
              target="_blank"
              rel="noopener noreferrer"
              >LinkedIn ↗</a
            >
          </div>
        </div>
      </div>

      <!-- Metrics drawn only from the CV: first role 2023, the tool count summed
           from the stack data, design + development. -->
      <StatsRow data-reveal="up" />
    </div>

    <CoreSkills />
    <SelectedWork />
    <Experience />
    <Stack />
    <Recommendations />
    <Contact />

    <SiteFooter />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import PortraitFrame from '../components/PortraitFrame.vue'
import StatsRow from '../components/StatsRow.vue'
import SiteFooter from '../components/SiteFooter.vue'
import CoreSkills from '../sections/CoreSkills.vue'
import SelectedWork from '../sections/SelectedWork.vue'
import Experience from '../sections/Experience.vue'
import Stack from '../sections/Stack.vue'
import Recommendations from '../sections/Recommendations.vue'
import Contact from '../sections/Contact.vue'
import { usePageMeta } from '../composables/usePageMeta'

// No `title` — the homepage carries the full site title on its own rather than
// reading "Home — Julia Almoite".
usePageMeta({ path: '/' })
</script>

<style scoped>
/* padding-block, not the shorthand — see the note in RecommendationsView: the
   shorthand would wipe out .wrap's side padding, which sits in a lower layer. */
.hero {
  padding-block: 126px 60px;
}
.hero-split {
  display: grid;
  grid-template-columns: minmax(0, 290px) minmax(0, 1fr);
  gap: 56px;
  align-items: center;
}
.hero h1 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2rem, 5.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

/* Tablet and below: one column, so the stack centres on itself — portrait,
   name, lede and buttons all on a single axis. 1024px is the shared
   mobile/tablet breakpoint used by every section on the page. */
@media (max-width: 1024px) {
  .hero-split {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
  /* Auto margins opt the grid item out of `stretch`, which leaves it sized by
     fit-content — and the frame's only children are absolutely positioned, so
     that measures zero and the aspect-ratio box collapses. A definite `width`
     sidesteps the intrinsic sizing and still centres. */
  .hero-split :deep(.portrait) {
    width: 210px;
    max-width: 100%;
    margin-inline: auto;
  }
  .hero .lede {
    margin-inline: auto;
  }
  .hero-split .hero-copy > div {
    justify-content: center;
  }
}

@media (max-width: 620px) {
  .hero {
    padding-top: 106px;
  }
  .hero-split {
    gap: 28px;
  }
  .hero-split :deep(.portrait) {
    width: 180px;
  }
}
</style>
