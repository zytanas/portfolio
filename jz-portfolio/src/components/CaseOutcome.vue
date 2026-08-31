<template>
  <!-- The result line. Shared by the lead card and the supporting rows, so
       "what came of it" is stated in the same voice and the same box wherever
       it appears — the one piece of every featured study that is a claim rather
       than a description.

       Emphasis is light and rule, never colour: a lime left rule and a surface
       one step up. The accent marks it as the payoff without the block turning
       into a badge. -->
  <div class="outcome" :class="{ 'is-todo': !filled }">
    <p class="outcome-label mono">
      <span class="outcome-mark" aria-hidden="true"></span>
      Outcome<span v-if="!filled" class="outcome-todo-tag"> · [TODO]</span>
    </p>
    <p v-if="filled" class="outcome-body">{{ outcome.body }}</p>
    <p v-else class="outcome-todo">{{ outcome.todo }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  outcome: { type: Object, required: true },
})

// Whitespace-only counts as unwritten, so a stray space in the data file does
// not quietly ship an empty outcome box.
const filled = computed(() => Boolean(props.outcome.body?.trim()))
</script>

<style scoped>
.outcome {
  --link-accent: #a3e635;
  border-left: 2px solid var(--link-accent);
  border-radius: 0 calc(var(--radius) * 0.5) calc(var(--radius) * 0.5) 0;
  background: var(--surface-2);
  padding: 12px 14px;
}
/* Marker + label, matching the narrative beats — the outcome is the last beat,
   so it heads itself the same way. */
.outcome-label {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  color: var(--text);
  margin-bottom: 6px;
}
.outcome-mark {
  flex: none;
  width: 5px;
  height: 5px;
  background: currentColor;
  transform: translateY(-3px);
}
.outcome-todo-tag {
  color: var(--text-faint);
}
.outcome-body {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text);
}

/* ---- unwritten ----
   The accent is what an outcome earns by existing, so a placeholder does not
   get it: the rule goes dashed and drops to the border tone, and the prompt
   sits in italic at --text-faint. It reads as a gap in the page, which is the
   whole point of showing it. */
.outcome.is-todo {
  border-left-style: dashed;
  border-left-color: var(--border);
  background: transparent;
}
/* the marker dims with the label, so the whole block recedes as one unit */
.outcome.is-todo .outcome-label {
  color: var(--text-faint);
}
.outcome-todo {
  font-size: 0.82rem;
  line-height: 1.55;
  font-style: italic;
  color: var(--text-faint);
  max-width: 62ch;
}

@media (min-width: 768px) {
  .outcome {
    padding: 14px 16px;
  }
}
</style>
