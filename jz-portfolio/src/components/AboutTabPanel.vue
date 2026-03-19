<template>
  <div class="tab-panel">
    <!-- Tab bar -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-btn font-mono', activeTab === tab.id && 'tab-btn--active']"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- ── TAB: CORE SKILLS ── -->
    <div v-if="activeTab === 'skills'" class="tab-content">
      <div class="skills-grid">
        <div
          v-for="skill in skills"
          :key="skill.title"
          class="skill-card group"
        >
          <div class="skill-icon-wrap" :style="{ background: skill.color + '18', borderColor: skill.color + '35' }">
            <component :is="skill.icon" class="w-5 h-5" :style="{ color: skill.color }" />
          </div>
          <h3 class="skill-title font-heading">{{ skill.title }}</h3>
          <p class="skill-desc">{{ skill.description }}</p>
        </div>
      </div>
    </div>

    <!-- ── TAB: EXPERIENCE & EDUCATION ── -->
    <div v-if="activeTab === 'experience'" class="tab-content">
      <div class="timeline">
        <div
          v-for="(item, i) in experienceEducation"
          :key="item.id"
          class="timeline-item"
        >
          <!-- Connector -->
          <div class="timeline-left">
            <div :class="['tl-dot', item.type === 'edu' ? 'tl-dot--edu' : 'tl-dot--work']">
              <component :is="item.type === 'edu' ? GraduationCap : Briefcase" :size="12" />
            </div>
            <div v-if="i < experienceEducation.length - 1" class="tl-line" />
          </div>
          <!-- Content -->
          <div class="timeline-body">
            <div class="flex items-start justify-between gap-2 mb-0.5">
              <h3 class="tl-title font-heading">{{ item.title }}</h3>
              <span :class="['tl-period font-mono', item.current && 'tl-period--current']">
                {{ item.period }}
              </span>
            </div>
            <p class="tl-company">{{ item.company }}</p>
            <p v-if="item.note" class="tl-note">{{ item.note }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ── TAB: TECH STACK ── -->
    <div v-if="activeTab === 'stack'" class="tab-content">
      <!-- Design Tools -->
      <div class="stack-group">
        <div class="stack-group-header">
          <div class="stack-group-icon violet">
            <Palette class="w-3.5 h-3.5" />
          </div>
          <span class="font-mono stack-group-label">Design</span>
        </div>
        <div class="stack-icons">
          <div
            v-for="tool in designTools"
            :key="tool.name"
            class="stack-icon-wrap group"
            :title="tool.name"
          >
            <img :src="tool.icon" :alt="tool.name" class="stack-icon-img" />
            <span class="font-mono stack-tooltip">{{ tool.name }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="stack-divider" />

      <!-- Dev Tools -->
      <div class="stack-group">
        <div class="stack-group-header">
          <div class="stack-group-icon teal">
            <Code class="w-3.5 h-3.5" />
          </div>
          <span class="font-mono stack-group-label">Development</span>
        </div>
        <div class="stack-icons">
          <div
            v-for="tech in devTools"
            :key="tech.name"
            class="stack-icon-wrap group"
            :title="tech.name"
          >
            <img :src="tech.icon" :alt="tech.name" class="stack-icon-img" />
            <span class="font-mono stack-tooltip">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Palette, Code, Layers, Briefcase, GraduationCap } from 'lucide-vue-next'

import figma       from '../assets/images/tech-stack/fgm.svg'
import elementor   from '../assets/images/tech-stack/elementor.svg'
import webflow     from '../assets/images/tech-stack/webflo.svg'
import photoshop   from '../assets/images/tech-stack/photoshop.svg'
import canva       from '../assets/images/tech-stack/canva.svg'
import vueIcon     from '../assets/images/tech-stack/vue.svg'
import reactIcon   from '../assets/images/tech-stack/react.svg'
import nuxtIcon    from '../assets/images/tech-stack/nuxt.svg'
import rekaIcon    from '../assets/images/tech-stack/reka.svg'
import tailwindIcon from '../assets/images/tech-stack/tailwid.svg'
import htmlIcon    from '../assets/images/tech-stack/html.svg'
import cssIcon     from '../assets/images/tech-stack/css.svg'
import jsIcon      from '../assets/images/tech-stack/js.svg'

const activeTab = ref('skills')

const tabs = [
  { id: 'skills',     label: 'Core Skills',  icon: '✦' },
  { id: 'experience', label: 'Experience',   icon: '◈' },
  { id: 'stack',      label: 'Tech Stack',   icon: '⬡' },
]

const skills = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'From wireframe to high-fidelity in Figma — I build component systems as I design, so the handoff to code is already half done.',
    color: '#A78BFA',
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Vue, React, Nuxt, Tailwind — I write the code for what I design. Pixel-faithful, responsive, and production-ready.',
    color: '#2DD4BF',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'I build reusable component libraries that keep interfaces consistent at scale — the same system works in Figma and in code.',
    color: '#60A5FA',
  },
]

const experienceEducation = [
  {
    id: 1,
    type: 'work',
    title: 'Junior UI/UX Engineer',
    company: 'Coreproc, Inc. - Remote',
    note: 'Building SaaS products, design systems, and client-facing interfaces.',
    period: '2024 – Present',
    current: true,
  },
  {
    id: 2,
    type: 'work',
    title: 'Web Designer',
    company: 'New Jersey, USA - Freelance',
    note: 'Branding, landing pages, and UI design for independent client.',
    period: '2023 – 2024',
    current: false,
  },
  {
    id: 3,
    type: 'work',
    title: 'Web Developer Intern',
    company: 'NMS PH - Onsite Internship',
    note: 'Frontend development and hands-on industry experience.',
    period: '2023',
    current: false,
  },
  {
    id: 4,
    type: 'edu',
    title: 'BS Information Technology',
    company: 'STI College Baguio',
    note: 'Graduated with focus on web development and system design.',
    period: '2019 – 2023',
    current: false,
  },
]

const designTools = [
  { name: 'Figma',      icon: figma },
  { name: 'Elementor',  icon: elementor },
  { name: 'Webflow',    icon: webflow },
  { name: 'Photoshop',  icon: photoshop },
  { name: 'Canva',      icon: canva },
]

const devTools = [
  { name: 'Vue.js',       icon: vueIcon },
  { name: 'React',        icon: reactIcon },
  { name: 'Nuxt',         icon: nuxtIcon },
  { name: 'Reka',         icon: rekaIcon },
  { name: 'Tailwind CSS', icon: tailwindIcon },
  { name: 'HTML',         icon: htmlIcon },
  { name: 'CSS',          icon: cssIcon },
  { name: 'JavaScript',   icon: jsIcon },
]
</script>

<style scoped>
.tab-panel {
  display: flex; flex-direction: column;
}

/* Tab bar */
.tab-bar {
  display: flex; gap: 0;
  border-bottom: 1px solid rgba(123,92,250,0.12);
  margin-bottom: 2rem;
}
.tab-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.7rem 1.1rem;
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(240,237,248,0.45);
  background: transparent; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  margin-bottom: -1px;
}
.tab-btn:hover { color: rgba(240,237,248,0.75); }
.tab-btn--active { color: #A78BFA; border-bottom-color: #7B5CFA; }
.tab-icon { font-size: 16px; opacity: 0.7; }

.tab-content { animation: tabIn 0.2s ease; }
@keyframes tabIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── SKILLS TAB ── */
.skills-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 480px) { .skills-grid { grid-template-columns: 1fr; } }

.skill-card {
  padding: 1.4rem;
  border-radius: 14px;
  background: rgba(20,20,40,0.6);
  border: 1px solid rgba(123,92,250,0.1);
  transition: border-color 0.25s, transform 0.25s;
  display: flex; flex-direction: column; gap: 0.6rem;
}
.skill-card:hover {
  border-color: rgba(123,92,250,0.28);
  transform: translateY(-2px);
}

.skill-icon-wrap {
  width: 42px; height: 42px;
  border-radius: 10px; border: 1px solid;
  display: flex; align-items: center; justify-content: center;
}

.skill-title { font-size: 1.2rem; font-weight: 800; color: #F0EDF8; line-height: 1; }
.skill-desc { font-size: 0.9rem; color: rgba(240,237,248,0.5); line-height: 1.6; }

/* ── EXPERIENCE TAB ── */
.timeline { display: flex; flex-direction: column; }

.timeline-item {
  display: flex; gap: 1.1rem;
}

.timeline-left {
  display: flex; flex-direction: column; align-items: center;
  flex-shrink: 0; width: 28px;
}

.tl-dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; z-index: 1;
}
.tl-dot--work {
  background: rgba(123,92,250,0.15);
  border: 1px solid rgba(123,92,250,0.35);
  color: #A78BFA;
}
.tl-dot--edu {
  background: rgba(45,212,191,0.12);
  border: 1px solid rgba(45,212,191,0.3);
  color: #2DD4BF;
}

.tl-line {
  flex: 1; width: 1px;
  background: rgba(123,92,250,0.1);
  margin: 4px 0;
}

.timeline-body {
  padding-bottom: 1.75rem;
  flex: 1; min-width: 0;
}

.tl-title { font-size: 1.2rem; font-weight: 700; color: #F0EDF8; line-height: 1.2; }
.tl-company { font-size: 0.9rem; color: rgba(167,139,250,0.7); margin-top: 0.2rem; }
.tl-note { font-size: 0.8rem; color: rgba(240,237,248,0.4); line-height: 1.6; margin-top: 0.35rem; }
.tl-period {
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(240,237,248,0.3); white-space: nowrap; flex-shrink: 0; padding-top: 2px;
}
.tl-period--current { color: #22c55e; }

/* ── STACK TAB ── */
.stack-group { margin-bottom: 0.5rem; }
.stack-group-header {
  display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem;
}
.stack-group-icon {
  width: 32px; height: 32px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
}
.stack-group-icon.violet { background: rgba(123,92,250,0.15); color: #A78BFA; border: 1px solid rgba(123,92,250,0.25); }
.stack-group-icon.teal   { background: rgba(45,212,191,0.12); color: #2DD4BF; border: 1px solid rgba(45,212,191,0.25); }
.stack-group-label {
  font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(240,237,248,0.4);
}

.stack-icons { display: flex; flex-wrap: wrap; gap: 0.6rem; }

.stack-icon-wrap {
  position: relative;
  width: 52px; height: 52px;
  border-radius: 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(123,92,250,0.1);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.stack-icon-wrap:hover {
  background: rgba(123,92,250,0.1);
  border-color: rgba(123,92,250,0.35);
  transform: translateY(-3px) scale(1.06);
}

.stack-icon-img {
  width: 28px; height: 28px; object-fit: contain;
}

.stack-tooltip {
  position: absolute;
  bottom: calc(100% + 6px); left: 50%;
  transform: translateX(-50%);
  background: rgba(10,10,20,0.96);
  border: 1px solid rgba(123,92,250,0.25);
  color: #C4B5FD;
  font-size: 9px; letter-spacing: 0.06em;
  padding: 3px 9px; border-radius: 6px;
  white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity 0.15s;
}
.stack-icon-wrap:hover .stack-tooltip { opacity: 1; }

.stack-divider {
  height: 1px; background: rgba(123,92,250,0.08);
  margin: 1.5rem 0;
}
</style>
