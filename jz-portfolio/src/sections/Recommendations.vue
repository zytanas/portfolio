<template>
  <SectionBlock id="recommendations" number="05" title="Recommendations">
    <template #action>
      <RouterLink class="more" to="/recommendation">all recommendations →</RouterLink>
    </template>

    <div class="recs">
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
.recs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  align-items: start;
}
</style>
