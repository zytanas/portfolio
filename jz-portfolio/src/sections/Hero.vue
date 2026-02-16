<template>
  <section id="hero" class="min-h-screen flex items-center py-20 px-6 relative">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/src/assets/images/line-vector.png"
        alt="Background"
        class="w-full h-full object-cover opacity-20"
      />
    </div>

    <!-- Content -->
    <div class="container mx-auto relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content - Image -->
        <div class="relative">
          <div class="relative w-full max-w-md mx-auto">
            <div class="relative z-10 ml-8">
              <img src="/src/assets/images/avatar.png" alt="Julia" class="object-cover" />
            </div>
          </div>
        </div>

        <!-- Right Content - Text -->
        <div class="space-y-6">
          <h1 class="text-5xl md:text-7xl font-extrabold font-heading">Hi!</h1>
          <h1 class="text-5xl md:text-7xl font-heading font-extrabold">
            I'm <span class="text-[#FF834D]">Julia</span>
          </h1>
          <p class="text-xl max-w-lg font-body leading-relaxed">
            From layout to code, every detail is crafted to deliver seamless, responsive, and user-focused digital experiences.
          </p>
          <button
            @click="scrollToContact"
            class="bg-[#FF834D] text-white px-8 py-3 rounded-full font-body animate-bounce"
          >
            Let's Talk <MoveRight class="inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {MoveRight } from 'lucide-vue-next'

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    const navHeight = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>
