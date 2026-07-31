<template>
  <div class="dotgrid" aria-hidden="true"></div>
</template>

<style scoped>
/* Dot field behind everything, masked out around the hero so the type sits on
   clean paper and the grid only becomes visible towards the edges. */
.dotgrid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.6;
  -webkit-mask-image: radial-gradient(ellipse 78% 58% at 50% 34%, transparent 18%, #000 92%);
  mask-image: radial-gradient(ellipse 78% 58% at 50% 34%, transparent 18%, #000 92%);
}
</style>
