<template>
  <main class="relative z-[1]">
    <div class="wrap page">
      <div v-reveal.now class="page-head">
        <RouterLink class="back" to="/">← back</RouterLink>
        <h1>recommendations</h1>
        <p class="lede">
          What leaders, teammates, and mentors say about working with me — straight from LinkedIn.
        </p>
      </div>

      <!-- Masonry: CSS columns let a long quote sit next to two short ones
           without either card stretching to match the other. -->
      <div v-reveal class="reveal masonry">
        <RecommendationCard
          v-for="(recommendation, i) in recommendations"
          :key="i"
          :recommendation="recommendation"
          full
        />
      </div>
    </div>

    <SiteFooter />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import RecommendationCard from '../components/RecommendationCard.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { recommendations } from '../data/recommendations'
</script>

<style scoped>
/* padding-block, not the shorthand: this scoped rule is unlayered, so it would
   outrank .wrap's `padding: 0 24px` in @layer components and reset the side
   padding to zero — leaving the page flush against the screen edge on phones. */
.page {
  padding-block: 126px 60px;
}
.page-head {
  margin-bottom: 44px;
}
.back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.2s var(--ease);
}
.back:hover {
  color: var(--text);
}
.page h1 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.4vw, 2rem);
  letter-spacing: -0.03em;
  margin: 16px 0 20px;
}

.masonry {
  columns: 3;
  column-gap: 14px;
}
/* A card must not be split down the middle of a column break. */
.masonry > * {
  break-inside: avoid;
  margin-bottom: 14px;
}

@media (max-width: 1024px) {
  .masonry {
    columns: 2;
  }
}
/* Phones: the desktop rhythm (126px above the head, 44px below it) leaves the
   short heading floating in dead space once the column collapses, so the whole
   block tightens and the card gap comes up to match. */
@media (max-width: 620px) {
  .page {
    padding-block: 92px 48px;
  }
  .page-head {
    margin-bottom: 26px;
  }
  .page h1 {
    margin: 12px 0 14px;
  }
  .page-head .lede {
    margin-bottom: 0;
  }
  .masonry {
    columns: 1;
  }
  .masonry > * {
    margin-bottom: 12px;
  }
  .masonry > *:last-child {
    margin-bottom: 0;
  }
}
</style>
