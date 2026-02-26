<template>
  <section id="hero" class="relative flex items-center min-h-screen px-6 py-20 overflow-hidden">

    <!-- Floating Shapes (kept, recolored to red tones) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>

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

    <div class="container relative z-10 mx-auto">
      <div class="grid items-center gap-12 md:grid-cols-2">

        <!-- LEFT — Avatar -->
        <div
          class="relative flex justify-center transition-all duration-1000 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <!-- Avatar -->
          <img
            src="/src/assets/images/avatar.png"
            alt="Julia"
            class="avatar-img"
          />

          <!-- Floating badge — role pill -->
          <div class="role-badge">
            <span class="role-badge-dot"></span>
            <span class="font-mono text-xs text-white">Available for work</span>
          </div>

          <!-- Decorative stat card -->
          <div class="stat-card">
            <p class="text-[#FF6668] font-bold text-lg leading-none">2+</p>
            <p class="text-white text-xs font-mono mt-0.5">yrs exp.</p>
          </div>
        </div>

        <!-- RIGHT — Text -->
        <div
          class="flex flex-col gap-5 transition-all duration-1000 ease-out"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
          style="transition-delay: 150ms"
        >
          <!-- Eyebrow -->
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-1.5 rounded-full bg-[#FF6668]"></div>
            <p class="section-eyebrow">// hello world</p>
          </div>

          <!-- Name -->
          <div>
            <h1 class="hero-title font-heading">
              Hi, I'm<br />
              <span class="text-[#FF6668]">Julia</span>
            </h1>
          </div>

          <!-- Typing role -->
          <div class="flex items-center gap-3 hero-role-row">
            <div class="role-icon-wrap">
              <component :is="currentIcon" class="w-4 h-4 text-[#FF6668]" />
            </div>
            <span class="text-[#FF6668] font-heading font-bold text-xl md:text-2xl">{{ typedText }}</span>
            <span class="typing-cursor text-[#FF6668]">|</span>
          </div>

          <!-- Description -->
          <p class="max-w-md text-base leading-relaxed text-white font-body">
            From layout to code, every detail is crafted to deliver seamless, responsive, and
            user-focused digital experiences.
          </p>

          <!-- Divider -->
          <div class="h-px bg-[#FF6668]/15 max-w-md"></div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="scrollToContact"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-primary rounded-xl font-body"
            >
              Let's Talk
              <MoveRight class="w-4 h-4" />
            </button>
            <button
              @click="showCVModal = true"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-secondary rounded-xl font-body"
            >
              View Resume
              <FileText class="w-4 h-4" />
            </button>
          </div>

          <!-- Social links -->
          <div class="flex items-center gap-3 pt-1">
            <span class="font-mono text-xs tracking-widest text-white uppercase">Find me on</span>
            <a
              href="https://www.linkedin.com/in/almoitejuliazyrene/"
              target="_blank"
              class="hero-social-btn group"
              title="LinkedIn"
            >
              <Linkedin class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors duration-200" />
            </a>
            <a
              href="https://github.com/zytanas"
              target="_blank"
              class="hero-social-btn group"
              title="GitHub"
            >
              <Github class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors duration-200" />
            </a>
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
import { MoveRight, FileText, Code2, Palette, Linkedin, Github } from 'lucide-vue-next'
import CVModal from '../components/CVModal.vue'

const isVisible = ref(false)
const typedText = ref('')
const showCVModal = ref(false)

const titles = [
  { text: 'Frontend Developer', icon: Code2 },
  { text: 'Web Designer', icon: Palette },
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
  setTimeout(() => { isVisible.value = true }, 100)
  setTimeout(() => { typeText() }, 800)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    const navHeight = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ── EYEBROW ── */
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF6668;
}

/* ── HERO TITLE ── */
.hero-title {
  font-size: clamp(52px, 7vw, 96px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: #fff;
}

/* ── ROLE ROW ── */
.hero-role-row {
  min-height: 36px;
}

.role-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 102, 104, 0.12);
  border: 1px solid rgba(255, 102, 104, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── AVATAR ── */
.avatar-img {
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
  object-fit: contain;
}

/* ── FLOATING BADGES ── */
.role-badge {
  position: absolute;
  bottom: 12px;
  left: -16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 6, 6, 0.85);
  border: 1px solid rgba(255, 102, 104, 0.3);
  border-radius: 999px;
  padding: 6px 14px;
  backdrop-filter: blur(8px);
}

.role-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.3); }
}

.stat-card {
  position: absolute;
  top: 16px;
  right: -16px;
  background: rgba(14, 6, 6, 0.85);
  border: 1px solid rgba(255, 102, 104, 0.3);
  border-radius: 14px;
  padding: 10px 16px;
  backdrop-filter: blur(8px);
  text-align: center;
}

/* ── CTA BUTTONS ── */
.cta-primary {
  background: #FF6668;
  color: #fff;
  border: 1px solid #FF6668;
}

.cta-primary:hover {
  background: transparent;
  color: #FF6668;
}

.cta-secondary {
  background: rgba(255, 102, 104, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 102, 104, 0.3);
}

.cta-secondary:hover {
  background: rgba(255, 102, 104, 0.18);
  border-color: rgba(255, 102, 104, 0.6);
}

/* ── SOCIAL BUTTONS ── */
.hero-social-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.hero-social-btn:hover {
  background: #FF6668;
  border-color: #FF6668;
  transform: translateY(-2px);
}

/* ── TYPING CURSOR ── */
.typing-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  margin-left: 1px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── FLOATING BG SHAPES (red-toned) ── */
.floating-shape {
  position: absolute;
  opacity: 0.07;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}

.shape-1 {
  width: 400px; height: 400px;
  top: 5%; left: 0%;
  background: radial-gradient(circle, #FF6668, transparent);
  animation: float 7s ease-in-out infinite;
}

.shape-2 {
  width: 280px; height: 280px;
  top: 55%; right: 5%;
  background: radial-gradient(circle, #FF6668, transparent);
  animation: float 5s ease-in-out infinite reverse;
}

.shape-3 {
  width: 220px; height: 220px;
  bottom: 15%; left: 20%;
  background: radial-gradient(circle, #c0392b, transparent);
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.shape-4 {
  width: 160px; height: 160px;
  top: 35%; right: 28%;
  background: radial-gradient(circle, #FF6668, transparent);
  animation: float 4s ease-in-out infinite;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(20px, -30px); }
  66%       { transform: translate(-15px, -50px); }
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

.symbol-1 { font-size: 3rem;   top: 15%;    left: 10%;   animation: floatCode 8s   ease-in-out infinite; }
.symbol-2 { font-size: 2.5rem; top: 25%;    right: 15%;  animation: floatCode 7s   ease-in-out infinite; animation-delay: -2s; }
.symbol-3 { font-size: 2rem;   top: 45%;    left: 20%;   animation: floatCode 9s   ease-in-out infinite; animation-delay: -4s; }
.symbol-4 { font-size: 2.8rem; bottom: 30%; right: 25%;  animation: floatCode 6.5s ease-in-out infinite; animation-delay: -1s; }
.symbol-5 { font-size: 2.2rem; top: 60%;    left: 8%;    animation: floatCode 7.5s ease-in-out infinite; animation-delay: -5s; }
.symbol-6 { font-size: 2rem;   bottom: 20%; left: 30%;   animation: floatCode 8.5s ease-in-out infinite; animation-delay: -3s; }
.symbol-7 { font-size: 2.5rem; top: 35%;    right: 8%;   animation: floatCode 7s   ease-in-out infinite; animation-delay: -6s; }
.symbol-8 { font-size: 2rem;   bottom: 15%; right: 12%;  animation: floatCode 9s   ease-in-out infinite; animation-delay: -7s; }

@keyframes floatCode {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg);     opacity: 0.08; }
  25%       { transform: translateY(-20px) translateX(10px) rotate(5deg);  opacity: 0.12; }
  50%       { transform: translateY(-40px) translateX(-10px) rotate(-5deg); opacity: 0.06; }
  75%       { transform: translateY(-20px) translateX(15px) rotate(3deg);  opacity: 0.10; }
}
</style>