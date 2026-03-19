<template>
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
</template>

<style scoped>
/* ── FLOATING CODE SYMBOLS ── */
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
  0%,
  100% {
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
