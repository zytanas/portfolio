<template>
  <main id="top" class="relative z-[1]">
    <!-- ================= HERO ================= -->
    <div class="wrap hero">
      <div class="hero-split">
        <PortraitFrame />

        <!-- starts in view, so it plays on load instead of waiting for a scroll -->
        <div v-reveal.now class="reveal-hero">
          <h1>Julia Almoite</h1>
          <p class="lede">
            I'm a <span class="name">UI/UX engineer</span> — need a design? Done. Need it built?
            Also me. Most teams split that into two roles; I've always thought that was one
            conversation too many.
          </p>
          <div class="mt-6 flex flex-wrap gap-[10px]">
            <a class="btn solid" href="#skills">what I do →</a>
            <a class="btn ghost" href="https://github.com/zytanas" target="_blank" rel="noopener noreferrer">github ↗</a>
            <a class="btn ghost" href="https://www.linkedin.com/in/almoitejuliazyrene/ " target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          </div>
        </div>
      </div>

      <!-- Metrics drawn only from the CV: first role 2023, the tool count summed
           from the stack data, design + development. -->
      <StatsRow />
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
import PortraitFrame from '../components/PortraitFrame.vue'
import StatsRow from '../components/StatsRow.vue'
import SiteFooter from '../components/SiteFooter.vue'
import CoreSkills from '../sections/CoreSkills.vue'
import SelectedWork from '../sections/SelectedWork.vue'
import Experience from '../sections/Experience.vue'
import Stack from '../sections/Stack.vue'
import Recommendations from '../sections/Recommendations.vue'
import Contact from '../sections/Contact.vue'
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
  .hero-split .reveal-hero > div {
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
