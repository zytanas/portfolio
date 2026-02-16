<template>
  <section id="projects" class="py-20 px-6">
    <div class="container mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-heading font-bold mb-4">
          Featured <span class="gradient-text">Projects</span>
        </h2>
        <p class="text-gray-400 font-body max-w-2xl mx-auto">
          A collection of projects I've worked on, showcasing my skills in web development and design.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div 
          v-for="project in projects" 
          :key="project.title"
          class="bg-dark-card rounded-2xl overflow-hidden border border-gray-800 card-hover"
        >
          <!-- Project Image -->
          <div class="relative h-64 bg-gradient-to-br from-orange-400/20 to-pink-600/20 overflow-hidden">
            <img 
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3 class="text-2xl font-heading font-bold mb-3">{{ project.title }}</h3>
            <p class="text-gray-400 font-body mb-4 leading-relaxed">{{ project.description }}</p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tech in project.tech" 
                :key="tech"
                class="px-3 py-1 bg-dark-bg border border-gray-700 rounded-full text-sm text-gray-300"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex gap-4">
              <a 
                :href="project.liveUrl"
                target="_blank"
                class="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Live Demo</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a 
                :href="project.githubUrl"
                target="_blank"
                class="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span>GitHub</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="text-center">
        <button class="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-full font-body font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
          Explore All Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Task Dashboard Platform',
    description: 'A comprehensive task management dashboard with real-time collaboration features and analytics.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tech: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Mobile Banking App',
    description: 'Modern banking application with intuitive UI and secure transaction handling.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    tech: ['React', 'TypeScript', 'Firebase'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Design System Library',
    description: 'A comprehensive component library and design system for consistent UI development.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    tech: ['Vue.js', 'Storybook', 'SCSS'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with cart management, payment integration, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
    tech: ['React', 'Redux', 'Stripe', 'Express'],
    liveUrl: '#',
    githubUrl: '#'
  }
]
</script>