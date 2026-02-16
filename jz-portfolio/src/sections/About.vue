<template>
  <section
    id="about"
    class="py-10 px-6 border-[#6192fb] border-2 rounded-3xl "
    style="background: linear-gradient(180deg, #013ca917 0%, #33978808 100%)"
  >
    <div class="container mx-auto">
      <!-- Section Title -->
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-16">What I Do</h1>

      <!-- Skills Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="skill in skills"
          :key="skill.title"
          class="bg-white/10 p-8 rounded-2xl card-hover border border-white/20"
        >
          <div class="mb-4" :style="{ color: skill.color }">
            <component :is="skill.icon" class="w-10 h-10 stroke-current" />
          </div>
          <h3 class="text-xl font-heading font-semibold mb-3 text-[#FF834D]">{{ skill.title }}</h3>
          <p class="text-[#D1D5DC] font-body leading-relaxed">{{ skill.description }}</p>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="container mx-auto">
        <!-- Section Title -->
        <h2 class="text-2xl md:text-3xl font-bold mb-12 text-white">Experience & Education</h2>

        <!-- Timeline Grid -->
        <div class="grid md:grid-cols-2 bg-white/10 border border-white/20 rounded-2xl">
          <!-- Experience Items -->
          <div v-for="item in experienceEducation" :key="item.id" class="group relative p-6">
            <!-- Icon Container -->
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-[#FF834D]/40 rounded-xl flex items-center justify-center"
              >
                <component
                  :is="item.id === 4 ? GraduationCap : Briefcase"
                  class="w-6 h-6 text-white"
                />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0 container">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-xl font-bold font-heading text-[#FF834D] leading-tight">
                    {{ item.title }}
                  </h3>
                  <span class="flex-shrink-0">
                    {{ item.period }}
                  </span>
                </div>

                <p>
                  {{ item.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto mt-16">
        <!-- Section Title -->
        <h2 class="text-2xl md:text-3xl font-bold mb-12 text-white">Tech Stack</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Design Section -->
          <div class="relative">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <Palette class="w-10 h-10 text-orange-500" />
              <h3 class="text-2xl font-semibold text-white">Design</h3>
            </div>

            <!-- Cards Container with Gradient Background -->
            <div class="relative overflow-hidden p-6 rounded-3xl shadow-lg bg-slate-900/50">
              <!-- Gradient Background -->
              <div
                class="absolute inset-0 bg-cover bg-center opacity-10 rounded-3xl shadow-lg"
                :style="{ backgroundImage: `url(${lineCard})` }"
              ></div>

              <!-- Grid -->
              <div class="relative grid lg:grid-cols-4 grid-cols-2 gap-4">
                <div
                  v-for="tool in designTools"
                  :key="tool.name"
                  class="flex items-center justify-center p-5 hover:scale-105 transition-all duration-300 cursor-pointer"
                  :title="tool.name"
                >
                  <img
                    :src="tool.icon"
                    :alt="tool.name"
                    class="w-16 h-16 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Development Section -->
          <div class="relative">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <Code class="w-10 h-10 text-orange-500" />
              <h3 class="text-2xl font-semibold text-white">Development</h3>
            </div>

            <!-- Cards Container with Gradient Background -->
            <div class="relative overflow-hidden p-6 rounded-3xl shadow-lg bg-slate-900/50">
              <!-- Gradient Background -->
              <div
                class="absolute inset-0 bg-cover bg-center opacity-10 rounded-3xl shadow-lg"
                :style="{ backgroundImage: `url(${lineCard})` }"
              ></div>

              <!-- Grid -->
              <div class="relative grid lg:grid-cols-4 grid-cols-2 gap-4">
                <div
                  v-for="tech in devTools"
                  :key="tech.name"
                  class="flex items-center justify-center p-5 hover:scale-105 transition-all duration-300 cursor-pointer"
                  :title="tech.name"
                >
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="w-16 h-16 object-contain drop-shadow-lg"
                  />
                </div>
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
import lineCard from '../assets/images/line-card.png'

const skills = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Creating intuitive interfaces with a focus on user experience and modern design principles.',
    color: '#C27AFF',
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description:
      'Building responsive, performant web applications with modern frameworks and technologies.',
    color: '#FB64B6',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description:
      'Developing scalable design systems that ensure consistency across digital products.',
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
    title: 'Web Developer',
    company: 'Internship - Onsite',
    period: '2023',
  },
  {
    id: 3,
    title: 'Web Designer',
    company: 'Freelance - Remote',
    period: '2023 - 2024',
  },
  {
    id: 4,
    title: 'BS Information Technology',
    company: 'STI College Baguio',
    period: '2019 - 2023',
  },
]

// Design tools - update paths to match your project structure
const designTools = [
  { name: 'Figma', icon: figma },
  { name: 'Elementor', icon: elementor },
  { name: 'Webflow', icon: webflow },
  { name: 'Photoshop', icon: photoshop },
  { name: 'Canva', icon: canva },
]

// Development tools - update paths to match your project structure
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
