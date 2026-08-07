<template>
  <!-- The only section without a numbered heading: the CTA carries its own
       "06 — contact" label, so SectionBlock would duplicate it. -->
  <section id="contact" class="wrap">
    <ContactCta />
  </section>
</template>

<script setup>
import ContactCta from '../components/ContactCta.vue'
</script>
