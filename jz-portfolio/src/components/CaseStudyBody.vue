<template>
  <!-- The narrative. Beats in a fixed order — problem, the decision, why owning
       both ends mattered, the supporting calls, the outcome — because that
       sequence is an argument, where a list of features is not.

       Each beat is a square marker and a mono label over its prose: the same
       structural language the work rows and the contact terminal use, so a long
       read still scans like the rest of the page. -->
  <div class="study">
    <section v-for="beat in beats" :key="beat.label" class="beat">
      <h4 class="beat-label mono">
        <span class="beat-mark" aria-hidden="true"></span>
        <span>
          {{ beat.label }}
          <!-- The clause after the label — "The key decision — make the
               invisible work legible". Part of the heading, but unshouted: it
               keeps sentence case where the label is uppercased. -->
          <span v-if="beat.kicker" class="beat-kicker">— {{ beat.kicker }}</span>
        </span>
      </h4>

      <p v-if="beat.body" class="beat-body">{{ beat.body }}</p>

      <!-- Bullet beats (the supporting decisions). Each item leads with the
           call, then the tradeoff — the lead-in carries at full text strength so
           the two decisions are scannable without reading both in full. -->
      <ul v-if="beat.items" class="beat-list">
        <li v-for="item in beat.items" :key="item.lead" class="beat-item">
          <span class="beat-item-mark" aria-hidden="true"></span>
          <p class="beat-item-body">
            <strong class="beat-item-lead">{{ item.lead }}:</strong> {{ item.body }}
          </p>
        </li>
      </ul>
    </section>

    <!-- The final beat, in the shared box every featured study uses. -->
    <CaseOutcome v-if="outcome" class="study-outcome" :outcome="outcome" />
  </div>
</template>

<script setup>
import CaseOutcome from './CaseOutcome.vue'

defineProps({
  beats: { type: Array, required: true },
  outcome: { type: Object, default: null },
})
</script>

<style scoped>
.study {
  display: grid;
  gap: 22px;
}

.beat-label {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.63rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  color: var(--text);
  margin-bottom: 9px;
}
/* A 5px CSS box rather than a ■ glyph: it takes a token colour, and it stays
   optically the same size across the six themes instead of depending on how
   each typeface draws the character. */
.beat-mark {
  flex: none;
  width: 5px;
  height: 5px;
  background: currentColor;
  /* nudged up onto the cap line — baseline alignment would sit it on the floor
     of the text */
  transform: translateY(-3px);
}
.beat-kicker {
  letter-spacing: 0.06em;
  text-transform: none;
  color: var(--text-dim);
}

.beat-body {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 72ch;
}

/* ---- bullet beats ---- */
.beat-list {
  list-style: none;
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
}
.beat-item {
  display: flex;
  gap: 9px;
}
/* Hollow, and smaller than a beat marker: one level down in the same idiom. */
.beat-item-mark {
  flex: none;
  width: 4px;
  height: 4px;
  margin-top: 9px;
  border: 1px solid var(--text-faint);
}
.beat-item-body {
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--text-dim);
  max-width: 70ch;
}
.beat-item-lead {
  font-weight: 500;
  color: var(--text);
}

.study-outcome {
  margin-top: 4px;
}

@media (min-width: 1024px) {
  .study {
    gap: 26px;
  }
}
</style>
