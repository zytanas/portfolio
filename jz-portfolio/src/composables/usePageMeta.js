import { useHead } from '@unhead/vue'
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
  absolute,
} from '../data/site'

/**
 * Per-route title, description, canonical and social cards.
 *
 * Every view calls this once. The tags are emitted into the prerendered HTML
 * by vite-ssg, which is the whole point — a crawler or an unfurler reads the
 * response body and never runs the app, so metadata applied only at runtime
 * may as well not exist.
 *
 * @param {object}  page
 * @param {string} [page.title]       Page title. Suffixed with the site name;
 *                                    omit on the homepage, which uses the full
 *                                    site title on its own.
 * @param {string} [page.description] Falls back to the site description.
 * @param {string}  page.path         Route path, for canonical and og:url.
 */
export function usePageMeta({ title, description, path }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_TITLE
  const desc = description || SITE_DESCRIPTION
  const url = absolute(path)
  const image = absolute(OG_IMAGE)

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: desc },

      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: image },
      // Slack and LinkedIn lay out the card before the image downloads; without
      // the dimensions they guess small and render a thumbnail strip instead.
      { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
      { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
    ],
  })
}
