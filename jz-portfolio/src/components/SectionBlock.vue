<template>
  <!-- The fading hairline above each section comes from the global
       `section + section::before` rule in main.css, so it only appears where
       one section actually follows another. -->
  <section v-reveal :id="id" class="wrap reveal">
    <div class="sec-head">
      <span class="mono">{{ number }}</span>
      <h2>{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  number: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<style scoped>
.sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  padding-bottom: 16px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--border-soft);
}
.sec-head h2 {
  font-size: 1.26rem;
}
/* the slotted action sits hard right, whether it is a note, a link or a button */
.sec-head :slotted(*) {
  margin-left: auto;
}

/* Mobile and tablet: the number/title pair centres, and the action drops onto
   its own centred line instead of being pushed to an edge that no longer
   reads as "the right end of the heading". */
@media (max-width: 1024px) {
  .sec-head {
    justify-content: center;
    text-align: center;
  }
  .sec-head :slotted(*) {
    margin-left: 0;
    flex-basis: 100%;
    /* reaches inside a slotted flex wrapper too, not just centring its text */
    justify-content: center;
  }
}
</style>
