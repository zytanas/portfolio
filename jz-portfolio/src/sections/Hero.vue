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
      
      <!-- Floating Code Symbols -->
      <div class="code-symbol symbol-1">&lt;/&gt;</div>
      <div class="code-symbol symbol-2">{ }</div>
      <div class="code-symbol symbol-3">[ ]</div>
      <div class="code-symbol symbol-4">&lt;div&gt;</div>
      <div class="code-symbol symbol-5">( )</div>
      <div class="code-symbol symbol-6">===</div>
      <div class="code-symbol symbol-7">=&gt;</div>
      <div class="code-symbol symbol-8">&lt;/&gt;</div>
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
            I'm <span class="text-red-500">Julia</span>
          </h1>
          <h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl font-heading">
            <component :is="currentIcon" class="flex-shrink-0 w-8 h-8 text-red-500 md:w-10 md:h-10" />
            <span class="text-red-500">{{ typedText }}</span>
            <span class="typing-cursor">|</span>
          </h1>
          <p class="max-w-lg text-xl leading-relaxed font-body">
            From layout to code, every detail is crafted to deliver seamless, responsive, and
            user-focused digital experiences.
          </p>
          <div class="flex gap-4">
            <button
              @click="scrollToContact"
              class="px-5 py-3 text-base text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-700 font-body md:px-6 lg:px-8 whitespace-nowrap"
            >
              Let's Talk <MoveRight class="inline-block w-4 h-4 ml-2 md:w-5 md:h-5" />
            </button>
            <button
              @click="showCVModal = true"
              class="px-5 py-3 text-base text-red-500 transition-all duration-300 border-2 border-red-500 rounded-full font-body hover:bg-red-700/50 hover:text-white bg-red-500/10 md:px-6 lg:px-8 whitespace-nowrap"
            >
              View Resume <FileText class="inline-block w-4 h-4 ml-2 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CV Modal -->
    <CVModal :isOpen="showCVModal" @close="showCVModal = false" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { MoveRight, FileText, Code2, Palette } from 'lucide-vue-next'
import CVModal from '../components/CVModal.vue'

const isVisible = ref(false)
const typedText = ref('')
const showCVModal = ref(false)
const titles = [
  { text: 'Frontend Developer', icon: Code2 },
  { text: 'Web Designer', icon: Palette }
]
const currentTitleIndex = ref(0)
let currentCharIndex = 0
let isDeleting = false
let typingTimeout = null

const currentIcon = computed(() => titles[currentTitleIndex.value].icon)

const typeText = () => {
  const currentTitle = titles[currentTitleIndex.value].text
  
  if (isDeleting) {
    typedText.value = currentTitle.substring(0, currentCharIndex - 1)
    currentCharIndex--
    
    if (currentCharIndex === 0) {
      isDeleting = false
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
      typingTimeout = setTimeout(typeText, 500)
      return
    }
    typingTimeout = setTimeout(typeText, 50)
  } else {
    typedText.value = currentTitle.substring(0, currentCharIndex + 1)
    currentCharIndex++
    
    if (currentCharIndex === currentTitle.length) {
      isDeleting = true
      typingTimeout = setTimeout(typeText, 1000)
      return
    }
    typingTimeout = setTimeout(typeText, 100)
  }
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  
  setTimeout(() => {
    typeText()
  }, 1000)
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
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
  background: linear-gradient(135deg, #e9dddd 0%, #0516ff 100%);
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

.typing-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.1;
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
    opacity: 0.1;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(5deg);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-40px) translateX(-10px) rotate(-5deg);
    opacity: 0.08;
  }
  75% {
    transform: translateY(-20px) translateX(15px) rotate(3deg);
    opacity: 0.12;
  }
}
</style>
