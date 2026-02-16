<template>
  <section id="hero" class="relative flex items-center min-h-screen px-6 py-20 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="floating-shape shape-5"></div>
      <div class="floating-shape shape-6"></div>
    </div>

    <!-- Content -->
    <div class="container relative z-10 mx-auto">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <!-- Left Content - Image -->
        <div class="relative">
          <div class="relative w-full max-w-md mx-auto">
            <div
              class="relative z-10 ml-8 transition-all duration-1000 ease-out"
              :class="isVisible ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'"
              style="transform-style: preserve-3d"
            >
              <img src="/src/assets/images/avatar.png" alt="Julia" class="object-cover" />
            </div>
          </div>
        </div>

        <!-- Right Content - Text -->
        <div
          class="space-y-6 transition-all duration-1000 ease-out"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'"
        >
          <h1 class="text-5xl font-extrabold md:text-7xl font-heading">Hi!</h1>
          <h1 class="text-5xl font-extrabold md:text-7xl font-heading">
            I'm <span class="text-orange-500">Julia</span>
          </h1>
          <p class="max-w-lg text-xl leading-relaxed font-body">
            From layout to code, every detail is crafted to deliver seamless, responsive, and
            user-focused digital experiences.
          </p>
          <button
            @click="scrollToContact"
            class="px-8 py-3 text-white bg-orange-500 rounded-full font-body animate-bounce"
          >
            Let's Talk <MoveRight class="inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MoveRight } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

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

<style scoped>
.rotate-y-0 {
  transform: rotateY(0deg);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.floating-shape {
  position: absolute;
  opacity: 0.15;
  border-radius: 50%;
  background: linear-gradient(135deg, #e71414 0%, #05ff76 100%);
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation: float 5s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation: float 4s ease-in-out infinite reverse;
}

.shape-3 {
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 15%;
  animation: float 4.5s ease-in-out infinite;
  animation-delay: -5s;
}

.shape-4 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 20%;
  animation: float 3s ease-in-out infinite;
  animation-delay: -3s;
}

.shape-5 {
  width: 180px;
  height: 180px;
  bottom: 40%;
  right: 5%;
  animation: float 4s ease-in-out infinite reverse;
  animation-delay: -7s;
}

.shape-6 {
  width: 220px;
  height: 220px;
  top: 50%;
  left: 30%;
  animation: float 3.5s ease-in-out infinite;
  animation-delay: -2s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -30px) rotate(90deg);
  }
  50% {
    transform: translate(-20px, -50px) rotate(180deg);
  }
  75% {
    transform: translate(-40px, -20px) rotate(270deg);
  }
}
</style>
