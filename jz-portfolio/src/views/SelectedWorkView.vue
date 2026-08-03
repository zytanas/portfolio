<template>
  <main class="relative z-[1]">
    <div class="wrap page">
      <div v-reveal.now class="page-head">
        <RouterLink class="back" to="/#work">← back</RouterLink>
        <h1>selected work</h1>
        <p class="lede">
          Every project in full — client sites, product UI, and prototypes, with the stack behind
          each one.
        </p>
      </div>

      <div v-reveal class="reveal grid">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.title"
          :project="project"
          :index="String(i + 1).padStart(2, '0')"
        />
      </div>
    </div>

    <SiteFooter />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { projects } from '../data/projects'
import { usePageMeta } from '../composables/usePageMeta'

usePageMeta({
  title: 'Selected work',
  description:
    'Client sites, product UI and prototypes — the full project index, with the stack behind each one.',
  path: '/selected-work',
})
</script>

<style scoped>
/* padding-block, not the shorthand: this scoped rule is unlayered, so it would
   outrank .wrap's padding-inline in @layer components and leave the page flush
   against the screen edge on phones. */
.page {
  padding-block: 126px 60px;
}
.page-head {
  margin-bottom: 44px;
}
.back {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  transition: color 0.2s var(--ease);
}
.back:hover {
  color: var(--text);
}
.page h1 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.4vw, 2rem);
  letter-spacing: -0.03em;
  margin: 16px 0 20px;
}

/* align-items is left at stretch so every card in a row matches the tallest */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* Tablet: three columns squeeze the description to an unreadable measure. */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* Phones: matches /recommendation — the desktop rhythm leaves the short heading
   floating once the grid collapses, so the whole block tightens with it. */
@media (max-width: 620px) {
  .page {
    padding-block: 92px 48px;
  }
  .page-head {
    margin-bottom: 26px;
  }
  .page h1 {
    margin: 12px 0 14px;
  }
  .page-head .lede {
    margin-bottom: 0;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
