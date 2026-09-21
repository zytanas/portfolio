<template>
  <!-- Rendered only once there is genuinely a crowd. A live counter reading
       "1 viewing" on a personal site is the owner looking at their own page,
       and it deflates the thing it is meant to signal. Below `min` the element
       is absent rather than hidden, so it takes no space in a bar that is
       already tight. -->
  <div v-if="count >= min" class="live" :title="label" role="status" :aria-label="label">
    <span class="faces" aria-hidden="true">
      <span v-for="seed in shown" :key="seed" class="face">
        <PixelAvatar :seed="seed" />
      </span>
      <span v-if="extra > 0" class="face more">+{{ extra }}</span>
    </span>
    <!-- aria-hidden: the count is already in the label above, and a screen
         reader announcing "6" after "6 people viewing now" is just an echo. -->
    <span class="n" aria-hidden="true">
      <i class="dot"></i>
      {{ count }}
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
  // Set to 1 to show the indicator even when the visitor is alone.
  min: { type: Number, default: 2 },
})

const { viewers, join, leave } = useLivePresence()

const count = computed(() => viewers.value.length)
/* Sliced from the front of the presence list, which Supabase keys stably, so
   the same faces stay put as others come and go rather than reshuffling on
   every sync. */
const shown = computed(() => viewers.value.slice(0, props.max))
const extra = computed(() => Math.max(0, count.value - props.max))

const label = computed(() => `${count.value} people viewing now`)

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
  /* The ring is the page background, not a border colour: it punches each
     circle out of the one behind it, which is what makes an overlapped stack
     read as separate people instead of a smear. */
  box-shadow: 0 0 0 1.5px var(--bg);
  color: var(--text-faint);
}
.face + .face {
  margin-left: -7px;
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
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}

/* The page is monochrome by design, so "live" is carried by movement rather
   than by the green dot the pattern usually uses. */
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-dim);
  animation: pulse 2.4s var(--ease) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

/* Below 920px the six nav links are already tightening against the actions
   cluster, and at 720px the burger arrives. The indicator is the first thing
   that should go. */
@media (max-width: 920px) {
  .live {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
    opacity: 0.8;
  }
}
</style>
