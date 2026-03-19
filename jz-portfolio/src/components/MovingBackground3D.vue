<template>
  <div class="moving-bg-3d">
    <canvas
      ref="bgCanvas"
      class="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
    
    <!-- Gradient orbs that float -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bgCanvas = ref(null)

let ctx, W, H, rafId
let time = 0
let isVisible = true

// Detect mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const ACCENT_R = 123, ACCENT_G = 92, ACCENT_B = 250  // #7B5CFA violet

class Particle {
  constructor() { this.init() }
  
  init() {
    this.x = Math.random() * W
    this.y = Math.random() * H
    this.z = Math.random() * 1000 + 500 // depth
    this.baseVx = (Math.random() - 0.5) * 0.2
    this.baseVy = (Math.random() - 0.5) * 0.2
    this.orbitRadius = Math.random() * 30 + 20
    this.orbitSpeed = (Math.random() - 0.5) * 0.02
    this.angle = Math.random() * Math.PI * 2
    this.r = Math.random() * 1.5 + 0.5
    this.opacity = Math.random() * 0.4 + 0.15
    this.warm = Math.random() > 0.5
  }
  
  update(t) {
    // Gentle orbital motion
    this.angle += this.orbitSpeed
    this.x += this.baseVx + Math.sin(this.angle) * 0.1
    this.y += this.baseVy + Math.cos(this.angle) * 0.1
    
    // Depth-based floating
    this.z += Math.sin(t * 0.001 + this.x * 0.01) * 0.3
    
    // Wrap around edges
    if (this.x < -50) this.x = W + 50
    if (this.x > W + 50) this.x = -50
    if (this.y < -50) this.y = H + 50
    if (this.y > H + 50) this.y = -50
    
    // Keep z in reasonable bounds
    if (this.z < 300) this.z = 1500
    if (this.z > 1500) this.z = 300
  }
  
  get scale() {
    // Perspective scaling based on depth
    return 1000 / this.z
  }
}

let particles = []

function initParticles() {
  const divisor = isMobile ? 12000 : 6000
  const count = Math.floor((W * H) / divisor)
  particles = Array.from({ length: count }, () => new Particle())
}

function draw(t) {
  ctx.clearRect(0, 0, W, H)
  
  // Dark background
  ctx.fillStyle = '#0A0A0F'
  ctx.fillRect(0, 0, W, H)
  
  // Ambient glows that slowly move
  const glow1X = W * (0.3 + Math.sin(t * 0.0003) * 0.2)
  const glow1Y = H * (0.3 + Math.cos(t * 0.0004) * 0.2)
  const g1 = ctx.createRadialGradient(glow1X, glow1Y, 0, glow1X, glow1Y, W * 0.4)
  g1.addColorStop(0, `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.12)`)
  g1.addColorStop(1, 'transparent')
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, W, H)
  
  const glow2X = W * (0.7 + Math.sin(t * 0.0005) * 0.15)
  const glow2Y = H * (0.7 + Math.cos(t * 0.0003) * 0.15)
  const g2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, W * 0.35)
  g2.addColorStop(0, 'rgba(45,212,191,0.08)')
  g2.addColorStop(1, 'transparent')
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, W, H)
  
  // Sort particles by depth (furthest first)
  particles.sort((a, b) => b.z - a.z)
  
  // Draw particles with 3D effect
  particles.forEach(p => {
    p.update(t)
    
    const scale = p.scale
    const screenX = p.x * scale + W * 0.5 * (1 - scale)
    const screenY = p.y * scale + H * 0.5 * (1 - scale)
    const size = p.r * scale
    const alpha = p.opacity * Math.min(1, scale * 1.5)
    
    ctx.beginPath()
    ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
    ctx.fillStyle = p.warm
      ? `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${alpha})`
      : `rgba(45,212,191,${alpha * 0.65})`
    ctx.fill()
    
    // Add subtle glow to closer particles
    if (scale > 0.8) {
      ctx.shadowBlur = 4
      ctx.shadowColor = p.warm
        ? `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${alpha * 0.5})`
        : `rgba(45,212,191,${alpha * 0.3})`
      ctx.fill()
      ctx.shadowBlur = 0
    }
  })
  
  // Draw connections between nearby particles
  for (let i = 0; i < Math.min(particles.length, 100); i++) {
    const p1 = particles[i]
    const scale1 = p1.scale
    if (scale1 < 0.5) continue
    
    for (let j = i + 1; j < Math.min(particles.length, 100); j++) {
      const p2 = particles[j]
      const scale2 = p2.scale
      if (scale2 < 0.5) continue
      
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 120) {
        const avgScale = (scale1 + scale2) / 2
        const alpha = (1 - dist / 120) * 0.08 * avgScale
        
        ctx.beginPath()
        ctx.moveTo(
          p1.x * scale1 + W * 0.5 * (1 - scale1),
          p1.y * scale1 + H * 0.5 * (1 - scale1)
        )
        ctx.lineTo(
          p2.x * scale2 + W * 0.5 * (1 - scale2),
          p2.y * scale2 + H * 0.5 * (1 - scale2)
        )
        ctx.strokeStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}

function loop() {
  if (!isVisible) {
    rafId = requestAnimationFrame(loop)
    return
  }
  
  time += 16 // ~60fps
  draw(time)
  rafId = requestAnimationFrame(loop)
}

function resize() {
  if (!bgCanvas.value) return
  W = bgCanvas.value.width = bgCanvas.value.offsetWidth
  H = bgCanvas.value.height = bgCanvas.value.offsetHeight
  initParticles()
}

onMounted(() => {
  ctx = bgCanvas.value.getContext('2d')
  resize()
  loop()
  window.addEventListener('resize', resize, { passive: true })
  
  // Intersection Observer to pause when not visible
  const container = bgCanvas.value.closest('.moving-bg-3d')
  if (container) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)
    bgCanvas.value._observer = observer
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
  if (bgCanvas.value?._observer) {
    bgCanvas.value._observer.disconnect()
  }
})
</script>

<style scoped>
.moving-bg-3d {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

/* Floating gradient orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #7B5CFA 0%, transparent 70%);
  top: 10%;
  left: 15%;
  animation: float-1 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #2DD4BF 0%, transparent 70%);
  bottom: 15%;
  right: 20%;
  animation: float-2 25s ease-in-out infinite;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #A78BFA 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-3 18s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -40px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 60px) scale(0.9);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-60px, 30px) scale(0.85);
  }
  66% {
    transform: translate(40px, -50px) scale(1.15);
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(-50%, -45%) scale(1.2);
  }
  66% {
    transform: translate(-55%, -50%) scale(0.8);
  }
}

@media (max-width: 768px) {
  .orb {
    filter: blur(60px);
    opacity: 0.1;
  }
  
  .orb-1, .orb-2, .orb-3 {
    width: 300px;
    height: 300px;
  }
}
</style>
