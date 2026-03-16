import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable to optimize animations by only running them when visible
 * @param {Ref} elementRef - Vue ref to the element to observe
 * @param {Object} options - Intersection observer options
 * @returns {Ref} isVisible - Reactive boolean indicating visibility
 */
export function useIntersectionObserver(elementRef, options = {}) {
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible.value = entry.isIntersecting
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return isVisible
}
