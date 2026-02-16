<template>
  <section id="contact" class="py-20 px-6 bg-dark-card/30">
    <div class="container mx-auto max-w-6xl">
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Left Content -->
        <div>
          <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6">
            Get In <span class="gradient-text">Touch</span>
          </h2>
          <p class="text-gray-400 font-body mb-8 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision. Feel free to reach out!
          </p>

          <!-- Contact Info -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span class="text-orange-400 text-xl">📧</span>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-body">Email</p>
                <a href="mailto:julia@example.com" class="text-white hover:text-orange-400 transition-colors">
                  julia@example.com
                </a>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span class="text-orange-400 text-xl">📱</span>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-body">Phone</p>
                <a href="tel:+1234567890" class="text-white hover:text-orange-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span class="text-orange-400 text-xl">📍</span>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-body">Location</p>
                <p class="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex gap-4">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="w-12 h-12 bg-dark-card border border-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
              :title="social.name"
            >
              <span class="text-xl">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Right - Contact Form -->
        <div class="bg-dark-card p-8 rounded-2xl border border-gray-800">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-body text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                v-model="form.name"
                required
                class="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-body text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                v-model="form.email"
                required
                class="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-body text-gray-400 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject"
                v-model="form.subject"
                required
                class="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-body text-gray-400 mb-2">Message</label>
              <textarea 
                id="message"
                v-model="form.message"
                required
                rows="4"
                class="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-body font-semibold transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const socials = [
  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'Dribbble', icon: '🎨', url: 'https://dribbble.com' }
]

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form)
  alert('Thank you for your message! I will get back to you soon.')
  
  // Reset form
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>