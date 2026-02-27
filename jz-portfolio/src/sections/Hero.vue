<template>
  <section id="hero" class="relative flex items-center justify-center min-h-screen overflow-hidden" @mousemove="onMouseMove" @mouseleave="onMouseLeave">

    <!-- ── INTERACTIVE CANVAS ── -->
    <canvas
      ref="bgCanvas"
      class="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />

    <!-- ── NOISE GRAIN OVERLAY ── -->
    <div class="absolute inset-0 pointer-events-none grain-overlay z-1" />

    <!-- ── RADIAL VIGNETTE ── -->
    <div class="absolute inset-0 pointer-events-none vignette z-2" />

    <!-- ── SCANLINES ── -->
    <div class="absolute inset-0 pointer-events-none scanlines z-2" />

    <!-- ── CONTENT ── -->
    <div class="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 py-24 mx-auto text-center">

      <!-- Eyebrow -->
      <div
        class="flex items-center gap-3 mb-8 fade-up"
        style="animation-delay:0.1s"
      >
        <span class="eyebrow-pip" />
        <p class="section-eyebrow">// Hello World</p>
        <span class="eyebrow-pip" />
      </div>

      <!-- Name block -->
      <div class="fade-up" style="animation-delay:0.25s">
        <p class="hi-im font-heading">Hi, I'm</p>
        <h1 class="hero-name font-heading">
          <span
            v-for="(char, i) in 'Julia'"
            :key="i"
            class="name-char"
            :style="{ '--i': i }"
          >{{ char }}</span>
        </h1>
      </div>

      <!-- Typing role -->
      <div
        class="flex items-center justify-center gap-3 mt-4 fade-up"
        style="animation-delay:0.42s"
      >
        <div class="role-icon-wrap">
          <component :is="currentIcon" class="w-4 h-4 text-[#FF6668]" />
        </div>
        <span class="text-[#FF6668] font-heading font-bold text-xl md:text-2xl">{{ typedText }}</span>
        <span class="typing-cursor text-[#FF6668]">|</span>
      </div>

      <!-- Description -->
      <p
        class="max-w-md text-base leading-relaxed mt-7 font-body desc-text fade-up"
        style="animation-delay:0.58s"
      >
        From layout to code, every detail is crafted to deliver seamless,
        responsive, and user-focused digital experiences.
      </p>

      <!-- Divider -->
      <div class="mt-8 divider-line fade-up" style="animation-delay:0.68s" />

      <!-- CTA Buttons -->
      <div class="flex flex-wrap justify-center gap-3 mt-8 fade-up" style="animation-delay:0.78s">
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

      <!-- Socials -->
      <div class="flex items-center justify-center gap-3 mt-6 fade-up" style="animation-delay:0.92s">
        <span class="font-mono text-xs tracking-widest uppercase social-label">Find me on</span>
        <a href="https://www.linkedin.com/in/almoitejuliazyrene/" target="_blank" class="hero-social-btn group" title="LinkedIn">
          <Linkedin class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors" />
        </a>
        <a href="https://github.com/zytanas" target="_blank" class="hero-social-btn group" title="GitHub">
          <Github class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>

    <!-- ── CORNER BADGES ── -->
    <div class="role-badge fade-up" style="animation-delay:1.05s">
      <span class="role-badge-dot" />
      <span class="font-mono text-xs text-white">Available for work</span>
    </div>

    <div class="stat-card fade-up" style="animation-delay:1.1s">
      <p class="text-[#FF6668] font-bold text-xl leading-none font-heading">2+</p>
      <p class="font-mono text-xs mt-0.5 stat-lbl">yrs exp.</p>
    </div>

    <!-- Mouse hint fades once user interacts -->
    <p class="font-mono mouse-hint" :class="{ gone: hasInteracted }">
      move cursor to interact
    </p>

    <!-- CV Modal -->
    <CVModal :isOpen="showCVModal" @close="showCVModal = false" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { MoveRight, FileText, Code2, Palette, Linkedin, Github } from 'lucide-vue-next'
import CVModal from '../components/CVModal.vue'

// ── TYPING ──
const typedText = ref('')
const showCVModal = ref(false)
const titles = [
  { text: 'Frontend Developer', icon: Code2 },
  { text: 'Web Designer',       icon: Palette },
]
const currentTitleIndex = ref(0)
let currentCharIndex = 0
let isDeleting = false
let typingTimeout = null
const currentIcon = computed(() => titles[currentTitleIndex.value].icon)

const typeText = () => {
  const cur = titles[currentTitleIndex.value].text
  if (isDeleting) {
    typedText.value = cur.substring(0, currentCharIndex - 1)
    currentCharIndex--
    if (currentCharIndex === 0) {
      isDeleting = false
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
      typingTimeout = setTimeout(typeText, 500)
      return
    }
    typingTimeout = setTimeout(typeText, 50)
  } else {
    typedText.value = cur.substring(0, currentCharIndex + 1)
    currentCharIndex++
    if (currentCharIndex === cur.length) {
      isDeleting = true
      typingTimeout = setTimeout(typeText, 1000)
      return
    }
    typingTimeout = setTimeout(typeText, 100)
  }
}

// ── CANVAS ──
const bgCanvas = ref(null)
const hasInteracted = ref(false)

let ctx, W, H, rafId
let targetMouse  = { x: -9999, y: -9999 }
let smoothMouse  = { x: -9999, y: -9999 }
let isMouseInside = false

const REPEL_RADIUS   = 100
const REPEL_STRENGTH = 3.0
const ATTRACT_RADIUS = 260
const ATTRACT_STR    = 0.10
const CONN_DIST      = 125

class Particle {
  constructor() { this.init() }
  init() {
    this.x  = Math.random() * W
    this.y  = Math.random() * H
    this.vx = (Math.random() - 0.5) * 0.28
    this.vy = (Math.random() - 0.5) * 0.28
    this.r  = Math.random() * 1.5 + 0.35
    this.base = Math.random() * 0.38 + 0.07
    this.opacity = this.base
    this.warm = Math.random() > 0.65
  }
}

let particles = []

function initParticles() {
  const count = Math.floor((W * H) / 8500)
  particles = Array.from({ length: count }, () => new Particle())
}

function draw() {
  ctx.clearRect(0, 0, W, H)

  // base bg
  ctx.fillStyle = '#080808'
  ctx.fillRect(0, 0, W, H)

  // mouse glow pool
  if (isMouseInside && smoothMouse.x > 0) {
    const gm = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, ATTRACT_RADIUS * 1.5)
    gm.addColorStop(0,   'rgba(255,102,104,0.11)')
    gm.addColorStop(0.5, 'rgba(255,102,104,0.04)')
    gm.addColorStop(1,   'transparent')
    ctx.fillStyle = gm
    ctx.fillRect(0, 0, W, H)
  }

  // ambient glows
  ;[
    [W * 0.08, H * 0.12, W * 0.44, 'rgba(255,102,104,0.07)'],
    [W * 0.92, H * 0.88, W * 0.38, 'rgba(200,60,60,0.05)'],
  ].forEach(([cx, cy, r, color]) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'transparent')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  })

  // particles
  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > W) p.vx *= -1
    if (p.y < 0 || p.y > H) p.vy *= -1

    if (isMouseInside && smoothMouse.x > 0) {
      const dx = p.x - smoothMouse.x
      const dy = p.y - smoothMouse.y
      const d  = Math.sqrt(dx * dx + dy * dy)
      if (d < REPEL_RADIUS && d > 0) {
        const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH
        p.vx += (dx / d) * f
        p.vy += (dy / d) * f
        p.opacity = Math.min(1, p.base + (1 - d / REPEL_RADIUS) * 0.7)
      } else if (d < ATTRACT_RADIUS) {
        const f = (1 - d / ATTRACT_RADIUS) * ATTRACT_STR
        p.vx -= (dx / d) * f
        p.vy -= (dy / d) * f
        p.opacity += ((p.base + 0.15) - p.opacity) * 0.06
      } else {
        p.opacity += (p.base - p.opacity) * 0.04
      }
    } else {
      p.opacity += (p.base - p.opacity) * 0.03
    }

    p.vx *= 0.97
    p.vy *= 0.97

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.warm
      ? `rgba(255,102,104,${p.opacity})`
      : `rgba(255,170,150,${p.opacity * 0.65})`
    ctx.fill()
  })

  // connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const d2 = dx * dx + dy * dy
      if (d2 < CONN_DIST * CONN_DIST) {
        const d = Math.sqrt(d2)
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(255,102,104,${0.05 * (1 - d / CONN_DIST)})`
        ctx.lineWidth = 0.55
        ctx.stroke()
      }
    }
  }

  // cursor rings
  if (isMouseInside && smoothMouse.x > 0) {
    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,102,104,0.08)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS * 0.38, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,102,104,0.20)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,102,104,0.75)'
    ctx.fill()
  }
}

function loop() {
  smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.18
  smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.18
  draw()
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  const rect = bgCanvas.value.getBoundingClientRect()
  targetMouse.x = e.clientX - rect.left
  targetMouse.y = e.clientY - rect.top
  
  // Initialize smoothMouse to target on first entry to avoid lag
  if (!isMouseInside) {
    smoothMouse.x = targetMouse.x
    smoothMouse.y = targetMouse.y
  }
  
  isMouseInside = true
  if (!hasInteracted.value) hasInteracted.value = true
}

function onMouseLeave() {
  isMouseInside = false
  // Keep positions instead of resetting to -9999
  // This prevents the cursor from jumping when re-entering
}

function resize() {
  if (!bgCanvas.value) return
  W = bgCanvas.value.width  = bgCanvas.value.offsetWidth
  H = bgCanvas.value.height = bgCanvas.value.offsetHeight
  initParticles()
}

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' })
}

onMounted(() => {
  ctx = bgCanvas.value.getContext('2d')
  resize()
  loop()
  setTimeout(typeText, 800)
  window.addEventListener('resize', resize, { passive: true })
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
/* ── GRAIN ── */
.grain-overlay {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.55;
  mix-blend-mode: overlay;
}

/* ── VIGNETTE ── */
.vignette {
  background: radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(4,4,4,0.78) 100%);
}

/* ── SCANLINES ── */
.scanlines {
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.035) 2px, rgba(0,0,0,0.035) 4px
  );
}

/* ── EYEBROW ── */
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 18px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #FF6668;
}
.eyebrow-pip {
  display: block;
  width: 36px; height: 1px;
  background: rgba(255,102,104,0.45);
}

/* ── HI I'M ── */
.hi-im {
  font-size: clamp(48px, 3.5vw, 56px);
  font-weight: 800;
  color: rgba(255,255,255,0.72);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 4px;
}

/* ── HERO NAME ── */
.hero-name {
  font-size: clamp(128px, 16vw, 200px);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
}
.name-char {
  display: inline-block;
  color: #FF6668;
  text-shadow:
    0 0 40px rgba(255,102,104,0.55),
    0 0 80px rgba(255,102,104,0.22),
    0 0 160px rgba(255,102,104,0.08);
  animation: charFloat 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.12s);
}
@keyframes charFloat {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-8px); }
}

/* ── ROLE ICON ── */
.role-icon-wrap {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(255,102,104,0.1);
  border: 1px solid rgba(255,102,104,0.22);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* ── CURSOR ── */
.typing-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,50%  { opacity: 1; }
  51%,100%{ opacity: 0; }
}

/* ── DESC ── */
.desc-text { color: rgb(255, 255, 255); }

/* ── DIVIDER ── */
.divider-line {
  width: 100%; max-width: 360px;
  height: 1px;
  background: rgba(255,102,104,0.12);
}

/* ── CTA ── */
.cta-primary {
  background: #FF6668; color: #fff;
  border: 1px solid #FF6668;
}
.cta-primary:hover { background: transparent; color: #FF6668; }
.cta-secondary {
  background: rgba(255,102,104,0.08); color: #fff;
  border: 1px solid rgba(255,102,104,0.28);
}
.cta-secondary:hover {
  background: rgba(255,102,104,0.16);
  border-color: rgba(255,102,104,0.6);
}

/* ── SOCIALS ── */
.social-label { color: rgb(255, 255, 255); }
.hero-social-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(255,102,104,0.08);
  border: 1px solid rgba(255,102,104,0.18);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.hero-social-btn:hover {
  background: #FF6668; border-color: #FF6668;
  transform: translateY(-2px);
}

/* ── BADGES ── */
.role-badge {
  position: absolute;
  bottom: 44px; left: clamp(20px, 5vw, 80px);
  display: flex; align-items: center; gap: 8px;
  background: rgba(10,4,4,0.84);
  border: 1px solid rgba(255,102,104,0.28);
  border-radius: 999px; padding: 6px 14px;
  backdrop-filter: blur(12px); z-index: 20;
}
.role-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e; box-shadow: 0 0 6px #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:0.5; transform:scale(1.3); }
}

.stat-card {
  position: absolute;
  top: clamp(88px, 11vh, 130px); right: clamp(20px, 5vw, 80px);
  background: rgba(10,4,4,0.84);
  border: 1px solid rgba(255,102,104,0.28);
  border-radius: 14px; padding: 12px 18px;
  backdrop-filter: blur(12px); text-align: center; z-index: 20;
}
.stat-lbl { color: rgb(255, 255, 255); }

/* ── MOUSE HINT ── */
.mouse-hint {
  position: absolute;
  bottom: 44px; right: clamp(20px, 5vw, 80px);
  font-size: 11px; letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 102, 105, 0.74);
  z-index: 20; pointer-events: none;
  transition: opacity 0.8s ease;
  animation: hintPulse 2.5s ease-in-out infinite;
}
.mouse-hint.gone { opacity: 0; }
@keyframes hintPulse {
  0%,100% { opacity: 0.35; }
  50%     { opacity: 0.65; }
}

/* ── FADE UP ── */
.fade-up {
  opacity: 0;
  animation: fadeUpIn 0.75s ease forwards;
}
@keyframes fadeUpIn {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
</style>