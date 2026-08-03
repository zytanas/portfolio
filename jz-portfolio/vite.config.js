import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  plugins: [
    vue(),
    // Only use devtools in development
    mode === 'development' && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Optimize chunks.
    //
    // Client only. vite-ssg also runs a server build, where vue and vue-router
    // are externals resolved from node_modules rather than bundled — naming an
    // external in manualChunks is a hard rollup error, so the whole static
    // build fails on it.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              'vue-vendor': ['vue', 'vue-router'],
            }
          }
        },
    // Increase chunk size warning limit for large assets
    chunkSizeWarningLimit: 1000,
    // Minify and optimize
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },

  /* Static generation. vite-ssg reads this block.

     includedRoutes is given explicitly rather than left to the crawler: the
     default discovers routes from the router, which works today but would
     quietly skip a route that is added without a matching entry here. Failing
     loudly in review beats shipping an unindexed page. */
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    /* /selected-work/index.html rather than /selected-work.html. The flat form
       only resolves on hosts that map extensionless paths to .html files, and
       leans on that mapping winning over the SPA catch-all in netlify.toml. A
       real directory index is served correctly by every static host and cannot
       be shadowed by the fallback. */
    dirStyle: 'nested',
    /* The three real routes. /about is deliberately absent — it is still the
       "This is an about page" stub from the project scaffold, and prerendering
       it would publish a placeholder that crawlers can index. It carries a
       noindex tag of its own for the same reason. Delete the route and this
       comment once it is either written or dropped. */
    includedRoutes: () => ['/', '/selected-work', '/recommendation'],
  },
}))
