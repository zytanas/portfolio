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
    /* Critical CSS off.

       vite-ssg enables beasties automatically whenever the package resolves,
       and its default preload mode demotes the head <link rel=stylesheet> to a
       rel=preload hint, moving the real link to the end of <body>. That trade
       only pays off if the extracted critical CSS is inlined into <head>, and
       here it is not: beasties' mergeStylesheets folds every inlined style into
       the first <style> in the document, which is the noscript reveal fallback
       in index.html. CSS inside <noscript> is inert in any browser with JS on,
       so every prerendered page painted completely unstyled until the
       end-of-body stylesheet arrived — unstyled links, images at full
       intrinsic size, no layout. Invisible locally, obvious on the deploy.

       Not worth rescuing with mergeStylesheets: false + preload: 'swap': the
       whole app stylesheet is ~33 KB (~7 KB over the wire), so one blocking
       same-origin request is cheaper than the machinery. verify-prerender.mjs
       asserts the stylesheet stays in <head>. */
    beastiesOptions: false,
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
