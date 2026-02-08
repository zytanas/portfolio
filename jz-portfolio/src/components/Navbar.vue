<template>
  <nav class="py-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-[#A6A6A6]/20 rounded-full px-12 py-3 shadow-lg">
        <div class="flex items-center justify-center gap-24">
          <!-- Left Navigation -->
          <div class="flex items-center gap-12">
            <a href="#home" class="text-white hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" class="text-white hover:text-purple-400 transition-colors">About</a>
          </div>

          <!-- Center Logo -->
          <div class="flex-shrink-0">
            <a href="#" class="block">
              <img src="/src/assets/images/j-logo.png" alt="Logo" class="h-12 w-auto" />
            </a>
          </div>

          <!-- Right Navigation -->
          <div class="flex items-center gap-12">
            <a href="#projects" class="text-white hover:text-purple-400 transition-colors"
              >Projects</a
            >
            <a href="#contact" class="text-white hover:text-purple-400 transition-colors"
              >Contact</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
