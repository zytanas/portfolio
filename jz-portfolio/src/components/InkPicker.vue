<template>
  <div class="flex items-center gap-[9px]">
    <span class="mono">ink</span>
    <button
      v-for="option in inks"
      :key="option.id"
      class="ink"
      type="button"
      :data-ink="option.id"
      :title="option.label"
      :aria-label="`${option.label} ink`"
      :aria-pressed="String(ink === option.id)"
      @click="setInk(option.id)"
    ></button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { ink, setInk } = useTheme()

const inks = [
  { id: 'neutral', label: 'Neutral' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
]
</script>

<style scoped>
/* Split circles: the light half of each ink over its dark half. These are the
   only hexes on the site with any saturation at all, and they are the ink
   tints themselves. */
.ink {
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid var(--border);
  position: relative;
  transition: 0.2s var(--ease);
}
.ink:hover {
  transform: scale(1.12);
  border-color: var(--text-dim);
}
.ink[aria-pressed='true'] {
  border-color: var(--text);
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 3px var(--text);
}
.ink[data-ink='neutral'] {
  background: linear-gradient(135deg, #f4f4f4 50%, #101010 50%);
}
.ink[data-ink='warm'] {
  background: linear-gradient(135deg, #f6f2ec 50%, #14110c 50%);
}
.ink[data-ink='cool'] {
  background: linear-gradient(135deg, #eef1f4 50%, #0d1114 50%);
}
</style>
