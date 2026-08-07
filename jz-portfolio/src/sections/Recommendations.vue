<template>
  <SectionBlock id="recommendations" number="05" title="Recommendations">
    <template #action>
      <RouterLink class="more" to="/recommendation">all recommendations →</RouterLink>
    </template>

    <!-- wraps at 3, the widest the row ever gets -->
    <div class="recs" data-reveal-stagger="3">
      <RecommendationCard
        v-for="(recommendation, i) in featured"
        :key="i"
        :recommendation="recommendation"
      />
    </div>
  </SectionBlock>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SectionBlock from '../components/SectionBlock.vue'
import RecommendationCard from '../components/RecommendationCard.vue'
import { recommendations } from '../data/recommendations'

// Three fit the row without wrapping; the rest live on /recommendation.
const featured = recommendations.slice(0, 3)
</script>

<style scoped>
/* align-items is left at stretch (the default) so the three cards match the
   tallest in the row and sit flush, whatever the excerpt lengths are. It was
   `start`, which let each card size to its own quote and left the row ragged
   along the bottom. */
.recs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}
</style>
