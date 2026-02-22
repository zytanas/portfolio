<template>
  <section
    id="about"
    class="relative py-10 px-6 border-[#A90109]/20 border-2 rounded-3xl overflow-hidden"
    style="background: linear-gradient(180deg, #013ca917 0%, #33978b08 100%)"
  >
    <div class="container relative z-10 mx-auto">
      <!-- Section Title -->
      <h1 class="mb-16 text-4xl font-bold md:text-5xl font-heading">What I Do</h1>

      <!-- Skills Grid -->
      <div class="grid gap-8 mb-16 md:grid-cols-3">
        <div
          v-for="skill in skills"
          :key="skill.title"
          class="p-8 border bg-white/10 rounded-2xl card-hover border-white/20"
        >
          <div class="mb-4" :style="{ color: skill.color }">
            <component :is="skill.icon" class="w-10 h-10 stroke-current" />
          </div>
          <h3 class="mb-3 text-xl font-semibold text-red-500 font-heading">{{ skill.title }}</h3>
          <p class="text-[#D1D5DC] font-body leading-relaxed">{{ skill.description }}</p>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="container mx-auto">
        <!-- Section Title -->
        <h2 class="mb-12 text-2xl font-bold text-white md:text-3xl">Experience & Education</h2>

        <!-- Timeline Grid -->
        <div class="grid border md:grid-cols-2 bg-white/10 border-white/20 rounded-2xl">
          <!-- Experience Items -->
          <div v-for="item in experienceEducation" :key="item.id" class="relative p-6 group">
            <!-- Icon Container -->
            <div class="flex items-start gap-2 lg:gap-4">
              <div
                class="flex items-center justify-center flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 bg-red-500/40 rounded-xl"
              >
                <component
                  :is="item.id === 4 ? GraduationCap : Briefcase"
                  class="w-4 h-4 text-white lg:h-6 lg:w-6"
                />
              </div>

              <!-- Content -->
              <div class="container flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-base font-bold leading-tight text-red-500 lg:text-xl font-heading">
                    {{ item.title }}
                  </h3>
                  <span class="flex-shrink-0 text-sm lg:text-base">
                    {{ item.period }}
                  </span>
                </div>

                <p class="text-xs lg:text-base text-[#D1D5DC] font-body leading-relaxed">
                  {{ item.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto mt-16">
        <!-- Section Title -->
        <h2 class="mb-12 text-2xl font-bold text-white md:text-3xl">Tech Stack</h2>

        <div class="grid gap-6 md:grid-cols-2">
          <!-- Design Section -->
          <div class="relative">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <Palette class="w-10 h-10 text-red-500" />
              <h3 class="text-2xl font-semibold text-white">Design</h3>
            </div>

            <!-- Cards Container with Gradient Background -->
            <div class="relative p-6 overflow-hidden border bg-white/10 border-white/20 rounded-3xl">
              <!-- Grid -->
              <div class="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div
                  v-for="tool in designTools"
                  :key="tool.name"
                  class="flex items-center justify-center p-5 transition-all duration-300 cursor-pointer hover:scale-110"
                  :title="tool.name"
                >
                  <img
                    :src="tool.icon"
                    :alt="tool.name"
                    class="object-contain w-16 h-16 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Development Section -->
          <div class="relative">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <Code class="w-10 h-10 text-red-500" />
              <h3 class="text-2xl font-semibold text-white">Development</h3>
            </div>

            <!-- Cards Container with Gradient Background -->
            <div class="relative p-6 overflow-hidden border bg-white/10 border-white/20 rounded-3xl">
              <!-- Grid -->
              <div class="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div
                  v-for="tech in devTools"
                  :key="tech.name"
                  class="flex items-center justify-center p-5 transition-all duration-300 cursor-pointer hover:scale-110"
                  :title="tech.name"
                >
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="object-contain w-16 h-16 drop-shadow-lg"
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
