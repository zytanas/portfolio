<template>
  <figure class="portrait">
    <!-- The PNG-style cut-outs are transparent, so the frame carries a light
         `--plate` behind them or they would vanish into the dark page. -->
    <div
      class="portrait-frame"
      :class="{ 'is-on': on }"
      role="img"
      tabindex="0"
      aria-label="Julia Almoite — portrait, hover to see it in colour"
      @click="on = !on"
      @keydown.enter.prevent="on = !on"
      @keydown.space.prevent="on = !on"
    >
      <img
        class="p-bnw"
        :src="bnw"
        alt=""
        width="620"
        height="567"
        decoding="async"
        fetchpriority="high"
      />
      <img class="p-color" :src="color" alt="" width="620" height="567" decoding="async" aria-hidden="true" />
    </div>
  </figure>
</template>

<script setup>
import { ref } from 'vue'
import bnw from '../assets/images/hero-avatar-bnw.webp'
import color from '../assets/images/hero-avatar-color.webp'

// Tap and Enter/Space toggle colour where hover never fires.
const on = ref(false)
</script>

<style scoped>
.portrait {
  position: relative;
  margin: 0;
}
.portrait-frame {
  position: relative;
  aspect-ratio: 620 / 567;
  overflow: hidden;
  background: var(--plate);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.portrait-frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 12%;
  transition: opacity var(--dur) var(--ease);
}
.portrait-frame .p-color {
  opacity: 0;
}
.portrait-frame:hover .p-color,
.portrait-frame:focus-visible .p-color,
.portrait-frame.is-on .p-color {
  opacity: 1;
}

@media (max-width: 1024px) {
  .portrait {
    max-width: 210px;
    margin-inline: auto;
  }
}
</style>
