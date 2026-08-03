# Project imagery

Drop a file here named after a project's `slug` in `src/data/projects.js`:

```
src/assets/images/work/<slug>.webp
```

`ProjectThumb.vue` picks it up by convention — there is nothing to import or
register. A project with no file here renders a typographic fallback tile, so
the work grid stays composed while artwork is outstanding.

Current slugs:

| Slug | Project |
| --- | --- |
| `coreproc-website` | CoreProc, Inc. Website |
| `vibeteams` | VibeTeams |
| `clowder` | Clowder |
| `my-shopping-box` | My Shopping Box |
| `prestige-paper-products` | Prestige Paper Products |
| `synerpark` | SynerPark |
| `adrians-portfolio` | Adrian's Portfolio |

## Sizing

Export at **1440×900** (16:10). Everything on the page crops to that ratio, and
the largest painted size is the `/selected-work` card on a wide screen at
roughly 350 CSS px — so 1440 covers retina with room to spare.

`.webp` is preferred; `.png`, `.jpg` and `.avif` also resolve. Run
`npm run optimize-images` after adding files.

Images are cropped from the top (`object-position: top center`), which suits a
full-page screenshot — the masthead and hero stay in frame.

## Alt text

Alt text does **not** live here. It is the `imageAlt` field on the project in
`src/data/projects.js`, so it can be written and reviewed before the file
exists. Describe what the shot actually shows, not "screenshot of X".
