<template>
  <section id="about" class="relative px-6 py-20 overflow-hidden">
    <!-- Floating Code Symbols -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="code-symbol symbol-1">&lt;/&gt;</div>
      <div class="code-symbol symbol-2">{ }</div>
      <div class="code-symbol symbol-3">[ ]</div>
      <div class="code-symbol symbol-4">&lt;div&gt;</div>
      <div class="code-symbol symbol-5">( )</div>
      <div class="code-symbol symbol-6">===</div>
      <div class="code-symbol symbol-7">=&gt;</div>
      <div class="code-symbol symbol-8">&lt;/&gt;</div>
    </div>

    <div class="container relative z-10 mx-auto">

      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-6 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// about me</p>
          <h2 class="section-title font-heading">
            What I<br /><span class="text-[#FF6668]">Do</span>
          </h2>
        </div>
        <div class="hidden text-right md:block">
          <div class="project-count-bg">03</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase text-white/40">core skills</p>
        </div>
      </div>

      <!-- ── SKILLS ── -->
      <div class="mb-16">
        <!-- Group Label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="group-dot bg-[#FF6668]"></div>
          <span class="group-label-text">Core Skills</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="skill in skills"
            :key="skill.title"
            class="flex flex-col gap-4 p-6 about-card group rounded-2xl"
          >
            <div
              class="flex items-center justify-center w-11 h-11 rounded-xl"
              :style="{ background: skill.color + '22', color: skill.color }"
            >
              <component :is="skill.icon" class="w-5 h-5 stroke-current" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-[#FF6668] font-heading mb-2">{{ skill.title }}</h3>
              <p class="text-sm leading-relaxed text-white font-body">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── EXPERIENCE & EDUCATION ── -->
      <div class="mb-16">
        <!-- Group Label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="group-dot bg-[#FF6668]"></div>
          <span class="group-label-text">Experience & Education</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="item in experienceEducation"
            :key="item.id"
            class="flex items-start gap-4 p-5 about-card group rounded-2xl"
          >
            <!-- Icon -->
            <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF6668]/15 flex items-center justify-center">
              <component
                :is="item.id === 4 ? GraduationCap : Briefcase"
                class="w-5 h-5 text-[#FF6668]"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-base font-bold text-[#FF6668] font-heading leading-tight">
                  {{ item.title }}
                </h3>
                <span class="flex-shrink-0 font-mono text-xs text-white whitespace-nowrap">
                  {{ item.period }}
                </span>
              </div>
              <p class="mt-1 text-sm text-white font-body">{{ item.company }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TECH STACK ── -->
      <div>
        <!-- Group Label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="group-dot bg-[#FF6668]"></div>
          <span class="group-label-text">Tech Stack</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="grid gap-5 md:grid-cols-2">

          <!-- Design Tools -->
          <div class="p-6 about-card rounded-2xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg bg-[#FF6668]/15 flex items-center justify-center">
                <Palette class="w-4 h-4 text-[#FF6668]" />
              </div>
              <h3 class="text-base font-semibold tracking-wide text-white font-heading">Design</h3>
            </div>
            <div class="grid grid-cols-4 gap-3 lg:grid-cols-5">
              <div
                v-for="tool in designTools"
                :key="tool.name"
                class="tech-icon-wrap group/icon"
                :title="tool.name"
              >
                <img :src="tool.icon" :alt="tool.name" class="object-contain w-10 h-10 drop-shadow-md" />
                <span class="tech-tooltip">{{ tool.name }}</span>
              </div>
            </div>
          </div>

          <!-- Dev Tools -->
          <div class="p-6 about-card rounded-2xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg bg-[#FF6668]/15 flex items-center justify-center">
                <Code class="w-4 h-4 text-[#FF6668]" />
              </div>
              <h3 class="text-base font-semibold tracking-wide text-white font-heading">Development</h3>
            </div>
            <div class="grid grid-cols-4 gap-3 lg:grid-cols-5">
              <div
                v-for="tech in devTools"
                :key="tech.name"
                class="tech-icon-wrap group/icon"
                :title="tech.name"
              >
                <img :src="tech.icon" :alt="tech.name" class="object-contain w-10 h-10 drop-shadow-md" />
                <span class="tech-tooltip">{{ tech.name }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Palette, Code, Layers, Briefcase, GraduationCap } from 'lucide-vue-next'
import figma from '../assets/images/tech-stack/fgm.svg'
import elementor from '../assets/images/tech-stack/elementor.svg'
import webflow from '../assets/images/tech-stack/webflo.svg'
import photoshop from '../assets/images/tech-stack/photoshop.svg'
import canva from '../assets/images/tech-stack/canva.svg'
import vueIcon from '../assets/images/tech-stack/vue.svg'
import reactIcon from '../assets/images/tech-stack/react.svg'
import nuxtIcon from '../assets/images/tech-stack/nuxt.svg'
import rekaIcon from '../assets/images/tech-stack/reka.svg'
import tailwindIcon from '../assets/images/tech-stack/tailwid.svg'
import htmlIcon from '../assets/images/tech-stack/html.svg'
import cssIcon from '../assets/images/tech-stack/css.svg'
import jsIcon from '../assets/images/tech-stack/js.svg'

const skills = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive interfaces with a focus on user experience and modern design principles.',
    color: '#C27AFF',
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Building responsive, performant web applications with modern frameworks and technologies.',
    color: '#FB64B6',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Developing scalable design systems that ensure consistency across digital products.',
    color: '#51A2FF',
  },
]

const experienceEducation = [
  {
    id: 1,
    title: 'Junior UI/UX Engineer',
    company: 'Coreproc, Inc. - Remote',
    period: '2024 - Present',
  },
  {
    id: 2,
    title: 'Web Designer',
    company: 'Freelance - Remote',
    period: '2023 - 2024',
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'Internship - Onsite',
    period: '2023',
  },
  {
    id: 4,
    title: 'BS Information Technology',
    company: 'STI College Baguio',
    period: '2019 - 2023',
  },
]

const designTools = [
  { name: 'Figma', icon: figma },
  { name: 'Elementor', icon: elementor },
  { name: 'Webflow', icon: webflow },
  { name: 'Photoshop', icon: photoshop },
  { name: 'Canva', icon: canva },
]

const devTools = [
  { name: 'Vue.js', icon: vueIcon },
  { name: 'React', icon: reactIcon },
  { name: 'Nuxt', icon: nuxtIcon },
  { name: 'Reka', icon: rekaIcon },
  { name: 'Tailwind CSS', icon: tailwindIcon },
  { name: 'HTML', icon: htmlIcon },
  { name: 'CSS', icon: cssIcon },
  { name: 'JavaScript', icon: jsIcon },
]
</script>

<style scoped>
/* ── SECTION HEADER ── */
.section-header-border {
  border-bottom: 1px solid rgba(255, 102, 104, 0.18);
}

.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF6668;
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: #fff;
}

.project-count-bg {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: #FF6668;
  opacity: 0.2;
}

/* ── GROUP LABELS ── */
.group-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.group-label-text {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #66ff99;
  white-space: nowrap;
}

.group-line {
  background: rgba(255, 102, 104, 0.15);
}

/* ── CARDS ── */
.about-card {
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.2);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}

.about-card:hover {
  border-color: rgba(255, 102, 104, 0.45);
  background: rgba(255, 102, 104, 0.12);
  transform: translateY(-2px);
}

/* ── TECH ICONS ── */
.tech-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 102, 104, 0.1);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.tech-icon-wrap:hover {
  background: rgba(255, 102, 104, 0.12);
  border-color: rgba(255, 102, 104, 0.35);
  transform: translateY(-3px) scale(1.08);
}

.tech-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 8, 8, 0.95);
  border: 1px solid rgba(255, 102, 104, 0.25);
  color: #fff;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.05em;
  padding: 4px 9px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.tech-icon-wrap:hover .tech-tooltip {
  opacity: 1;
}

/* ── FLOATING CODE SYMBOLS ── */
.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.08;
  pointer-events: none;
}

.symbol-1 { font-size: 3rem; top: 15%; left: 10%; animation: floatCode 8s ease-in-out infinite; }
.symbol-2 { font-size: 2.5rem; top: 25%; right: 15%; animation: floatCode 7s ease-in-out infinite; animation-delay: -2s; }
.symbol-3 { font-size: 2rem; top: 45%; left: 20%; animation: floatCode 9s ease-in-out infinite; animation-delay: -4s; }
.symbol-4 { font-size: 2.8rem; bottom: 30%; right: 25%; animation: floatCode 6.5s ease-in-out infinite; animation-delay: -1s; }
.symbol-5 { font-size: 2.2rem; top: 60%; left: 8%; animation: floatCode 7.5s ease-in-out infinite; animation-delay: -5s; }
.symbol-6 { font-size: 2rem; bottom: 20%; left: 30%; animation: floatCode 8.5s ease-in-out infinite; animation-delay: -3s; }
.symbol-7 { font-size: 2.5rem; top: 35%; right: 8%; animation: floatCode 7s ease-in-out infinite; animation-delay: -6s; }
.symbol-8 { font-size: 2rem; bottom: 15%; right: 12%; animation: floatCode 9s ease-in-out infinite; animation-delay: -7s; }

@keyframes floatCode {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.08; }
  25%       { transform: translateY(-20px) translateX(10px) rotate(5deg); opacity: 0.12; }
  50%       { transform: translateY(-40px) translateX(-10px) rotate(-5deg); opacity: 0.06; }
  75%       { transform: translateY(-20px) translateX(15px) rotate(3deg); opacity: 0.1; }
}
</style>