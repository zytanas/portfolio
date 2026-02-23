<template>
  <section id="contact" class="relative px-6 py-20 overflow-hidden bg-dark-card/30">
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
      <h1 class="mb-12 text-4xl font-bold md:text-5xl font-heading">Get In Touch</h1>
      <div class="grid items-start gap-8 md:grid-cols-2">
        <!-- Left Card - Contact Info -->
        <div class="p-8 border border-white/20 bg-white/10 rounded-2xl">
          <h2 class="mb-4 text-2xl font-bold text-red-500 font-heading">Let's Work Together</h2>
          <p class="mb-8 font-body">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part
            of your vision.
          </p>

          <!-- Contact Info -->
          <div class="mb-8 space-y-6">
            <div class="flex items-start gap-4">
              <div
                class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10"
              >
                <Mail class="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p class="mb-1 text-sm text-red-500 font-body">Email</p>
                <a
                  href="mailto:juliazyrene23@gmail.com"
                  class="text-white transition-colors hover:text-red-400 font-body"
                >
                  juliazyrene23@gmail.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10"
              >
                <Phone class="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p class="mb-1 text-sm text-red-500 font-body">Phone</p>
                <a
                  href="tel:09565595721"
                  class="text-white transition-colors hover:text-red-400 font-body"
                >
                  09565595721
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10"
              >
                <MapPin class="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p class="mb-1 text-sm text-red-500 font-body">Location</p>
                <p class="text-white font-body">Baguio City, Philippines</p>
              </div>
            </div>
          </div>

          <hr class="mb-8 border-white/30" />
          <!-- Social Links -->
          <div>
            <p class="mb-4 text-sm font-body">Follow me on</p>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-lg bg-red-500/10 hover:bg-red-500 hover:border-red-500 group"
                :title="social.name"
              >
                <component
                  :is="social.icon"
                  class="w-5 h-5 group-hover:text-white"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Right Card - Contact Form -->
        <div class="p-8 border border-white/20 bg-white/10 rounded-2xl">
          <h2 class="mb-6 text-2xl font-bold text-red-500 font-heading">Send a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="name" class="block mb-2 text-sm text-white font-body">Your Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-4 py-2 text-white transition-colors border rounded-lg border-white/20 bg-white/10 focus:border-red-400 focus:outline-none font-body placeholder:text-gray-500"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm text-white font-body">Your Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-4 py-3 text-white transition-colors border rounded-lg border-white/20 bg-white/10 focus:border-red-400 focus:outline-none font-body placeholder:text-gray-500"
                placeholder="juandelacruz@example.com"
              />
            </div>

            <div>
              <label for="message" class="block mb-2 text-sm text-white font-body">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="4"
                class="w-full px-4 py-3 text-white transition-colors border rounded-lg border-white/20 bg-white/10 focus:border-red-400 focus:outline-none font-body placeholder:text-gray-500"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="flex items-center justify-center w-full gap-2 px-8 py-3 text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-700 font-body "
            >
              Send Message
              <Send class="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-vue-next'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/almoitejuliazyrene/' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/zytanas' },
]

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form)
  alert('Thank you for your message! I will get back to you soon.')

  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.08;
  pointer-events: none;
}

.symbol-1 {
  font-size: 3rem;
  top: 15%;
  left: 10%;
  animation: floatCode 8s ease-in-out infinite;
}

.symbol-2 {
  font-size: 2.5rem;
  top: 25%;
  right: 15%;
  animation: floatCode 7s ease-in-out infinite;
  animation-delay: -2s;
}

.symbol-3 {
  font-size: 2rem;
  top: 45%;
  left: 20%;
  animation: floatCode 9s ease-in-out infinite;
  animation-delay: -4s;
}

.symbol-4 {
  font-size: 2.8rem;
  bottom: 30%;
  right: 25%;
  animation: floatCode 6.5s ease-in-out infinite;
  animation-delay: -1s;
}

.symbol-5 {
  font-size: 2.2rem;
  top: 60%;
  left: 8%;
  animation: floatCode 7.5s ease-in-out infinite;
  animation-delay: -5s;
}

.symbol-6 {
  font-size: 2rem;
  bottom: 20%;
  left: 30%;
  animation: floatCode 8.5s ease-in-out infinite;
  animation-delay: -3s;
}

.symbol-7 {
  font-size: 2.5rem;
  top: 35%;
  right: 8%;
  animation: floatCode 7s ease-in-out infinite;
  animation-delay: -6s;
}

.symbol-8 {
  font-size: 2rem;
  bottom: 15%;
  right: 12%;
  animation: floatCode 9s ease-in-out infinite;
  animation-delay: -7s;
}

@keyframes floatCode {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.08;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(5deg);
    opacity: 0.12;
  }
  50% {
    transform: translateY(-40px) translateX(-10px) rotate(-5deg);
    opacity: 0.06;
  }
  75% {
    transform: translateY(-20px) translateX(15px) rotate(3deg);
    opacity: 0.1;
  }
}
</style>
