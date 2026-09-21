<template>
  <!-- Absent rather than hidden below `min`, so it takes no space in a bar that
       is already tight. Note that count is 0 until the socket reports back, so
       even at min 1 the indicator appears a beat after the header paints. -->
  <div v-if="count >= min" class="live" :title="label" role="status" :aria-label="label">
    <span class="faces" aria-hidden="true">
      <span v-for="seed in shown" :key="seed" class="face">
        <PixelAvatar :seed="seed" />
      </span>
      <span v-if="extra > 0" class="face more">+{{ extra }}</span>
    </span>
    <!-- aria-hidden: the same sentence is already on the wrapper as aria-label,
         which is what gets announced whether or not `.words` is showing. -->
    <span class="n" aria-hidden="true">
      <b>{{ count }}</b>
      <span class="words">viewing now</span>
    </span>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import PixelAvatar from './PixelAvatar.vue'
import { useLivePresence } from '../composables/useLivePresence'

const props = defineProps({
  // Three sprites plus a "+N" is the most the bar holds before it starts
  // crowding the theme toggle.
  max: { type: Number, default: 3 },
  // Lowest count that still renders. 1 means the indicator is up whenever the
  // socket is connected, including when the only viewer is the visitor.
  min: { type: Number, default: 1 },
})

const { viewers, join, leave } = useLivePresence()

const count = computed(() => viewers.value.length)
/* Sliced from the front of the presence list, which Supabase keys stably, so
   the same faces stay put as others come and go rather than reshuffling on
   every sync. */
const shown = computed(() => viewers.value.slice(0, props.max))
const extra = computed(() => Math.max(0, count.value - props.max))

// No person/people: "N viewing now" reads the same at every count, which keeps
// the bar from reflowing as the number changes.
const label = computed(() => `${count.value} viewing now`)

onMounted(join)
onUnmounted(leave)
</script>

<style scoped>
.live {
  display: flex;
  align-items: center;
  gap: 8px;
  /* cursor: default stops the title tooltip reading as something clickable. */
  cursor: default;
}

.faces {
  display: flex;
  align-items: center;
}
.face {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  /* Two rings, and the order matters. The inner one is the page background —
     it punches each circle out of the one behind it, which is what makes an
     overlapped stack read as separate people rather than a smear. The outer
     one is the visible edge that gives each sprite a defined rim against the
     bar. Mixed from --text-faint rather than --border because --border is
     tuned for large card edges and all but disappears on a 22px circle; the
     mix keeps it theme-driven, so it tracks every palette. */
  box-shadow:
    0 0 0 1.5px var(--bg),
    0 0 0 2.5px color-mix(in srgb, var(--text-faint) 55%, transparent);
  color: var(--text-faint);
}
/* One extra pixel of overlap to absorb the new outer ring, so the visible gap
   between sprites stays what it was. */
.face + .face {
  margin-left: -8px;
}
/* Later faces sit on top of earlier ones by document order; reversing that
   would need explicit z-index per item for no visual gain. */
.face :deep(svg) {
  width: 14px;
  height: 14px;
}
.face.more {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: -0.02em;
  color: var(--text-dim);
  background: var(--surface-2);
}

.n {
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  white-space: nowrap;
}
/* The count is the live part of the sentence, so it carries full text colour
   while the words stay dim — the same emphasis the bar already uses for the
   stat figures over their labels. Tabular figures keep the sentence from
   shifting sideways as the number changes under it. */
.n b {
  color: var(--text);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* Between 920px and 1100px the six nav links, the logo and the actions cluster
   have no room for a five-word sentence, so it degrades to the sprites plus
   the figure rather than wrapping or pushing the links. The full sentence is
   still on the wrapper's title and aria-label at every width. */
@media (max-width: 1100px) {
  .words {
    display: none;
  }
}

/* Below 920px the links are already tightening, and at 720px the burger
   arrives. The indicator is the first thing that should go. */
@media (max-width: 920px) {
  .live {
    display: none;
  }
}
</style>
