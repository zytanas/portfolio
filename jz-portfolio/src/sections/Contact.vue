<template>
  <!-- The only section without a numbered heading: the CTA carries its own
       "06 — contact" label, so SectionBlock would duplicate it. -->
  <section v-reveal id="contact" class="wrap reveal">
    <ContactCta />
  </section>
</template>

<script setup>
import ContactCta from '../components/ContactCta.vue'
</script>
