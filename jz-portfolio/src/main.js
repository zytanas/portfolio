import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { reveal } from './directives/reveal'

/* ViteSSG rather than createApp + mount.
 *
 * The served HTML used to be nothing but <head> — every word of the page was
 * painted by JavaScript. Search crawlers, ATS parsers and link-preview bots
 * read the response body and stop, so they were all getting an empty
 * document. This renders every route to real HTML at build time and hydrates
 * it in the browser.
 *
 * The named export is the contract: vite-ssg imports `createApp` from the
 * entry, calls it once per route on the server, and once on the client.
 */
export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.directive('reveal', reveal)
})
