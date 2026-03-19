<template>
  <div>
    <div ref="heroRef" class="scroll-section" :class="{ 'is-visible': heroVisible }">
      <Hero />
    </div>
    <div ref="projectsRef" class="scroll-section" :class="{ 'is-visible': projectsVisible }">
      <Projects />
    </div>
    <div ref="processRef" class="scroll-section" :class="{ 'is-visible': processVisible }">
      <Process />
    </div>
    <div ref="aboutRef" class="scroll-section" :class="{ 'is-visible': aboutVisible }">
      <About />
    </div>
    <div ref="contactRef" class="scroll-section" :class="{ 'is-visible': contactVisible }">
      <Contact />
    </div>
    <div ref="footerRef" class="scroll-section" :class="{ 'is-visible': footerVisible }">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hero from '../sections/Hero.vue'
import Process from '../sections/Process.vue'
import Projects from '../sections/Projects.vue'
import About from '../sections/About.vue'
import Contact from '../sections/Contact.vue'
import Footer from '../sections/Footer.vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'

// Refs for each section
const heroRef = ref(null)
const projectsRef = ref(null)
const processRef = ref(null)
const aboutRef = ref(null)
const contactRef = ref(null)
const footerRef = ref(null)

// Track visibility for each section
const heroVisible = useIntersectionObserver(heroRef, { threshold: 0.15 })
const projectsVisible = useIntersectionObserver(projectsRef, { threshold: 0.15 })
const processVisible = useIntersectionObserver(processRef, { threshold: 0.15 })
const aboutVisible = useIntersectionObserver(aboutRef, { threshold: 0.15 })
const contactVisible = useIntersectionObserver(contactRef, { threshold: 0.15 })
const footerVisible = useIntersectionObserver(footerRef, { threshold: 0.15 })
</script>

<style scoped>
/* Scroll animation setup */
.scroll-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
