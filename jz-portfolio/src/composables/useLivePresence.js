import { ref } from 'vue'

/* Who else is on the site right now, via Supabase Realtime Presence.
 *
 * Presence rather than a counter row: the count has to go *down* when someone
 * closes the tab, and a tab close fires nothing reliable. Presence is keyed to
 * the WebSocket itself, so a dropped socket removes the visitor server-side
 * with no beacon, no polling and no TTL sweep to get wrong.
 *
 * Netlify serves this site as static files and cannot hold a socket open, which
 * is why the realtime half lives outside the deploy entirely.
 *
 * Nothing here runs during `vite-ssg build` — the module only ever reaches the
 * network from `connect()`, which is called from onMounted. */

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// The room. Every visitor on every page joins the same one, so the count is
// "people on the portfolio", not "people on this route".
const CHANNEL = 'portfolio-live'

/* Module-level, not per-caller: the header and anything else that wants the
 * count share one socket and one subscriber list. A second component calling
 * this composable must not open a second connection — that would have the
 * visitor counting themselves twice. */
const viewers = ref([])
const connected = ref(false)
let channel = null
let clients = 0

/* Per-tab and deliberately not persisted. sessionStorage dies with the tab, so
 * this is an ephemeral handle for drawing a sprite and de-duplicating a socket
 * — not an identifier that follows anyone between visits. Two tabs therefore
 * count as two viewers, which is what "viewing now" honestly describes. */
function visitorId() {
  const KEY_ID = 'jz:visitor'
  try {
    const found = sessionStorage.getItem(KEY_ID)
    if (found) return found
    const made = Math.random().toString(36).slice(2, 10)
    sessionStorage.setItem(KEY_ID, made)
    return made
  } catch {
    // Private mode or storage blocked — a per-load id still works, it just
    // resets on refresh. Better than failing to join at all.
    return Math.random().toString(36).slice(2, 10)
  }
}

async function connect() {
  // Unconfigured is a supported state, not an error: without keys the indicator
  // simply never appears and the rest of the site is untouched.
  if (!URL || !KEY) return

  const me = visitorId()

  /* Imported here rather than at the top of the file so the client is fetched
   * only once a real browser has mounted the header — it stays out of the
   * initial bundle and off the prerender's critical path. */
  const { createClient } = await import('@supabase/supabase-js')

  // Another caller won the race while this await was in flight.
  if (channel) return

  const supabase = createClient(URL, KEY, {
    auth: { persistSession: false },
    // The default (10/s) is sized for chat. Presence sends a join and a leave
    // and nothing else, so this only exists to keep a reconnect loop cheap.
    realtime: { params: { eventsPerSecond: 2 } },
  })

  channel = supabase.channel(CHANNEL, { config: { presence: { key: me } } })

  channel.on('presence', { event: 'sync' }, () => {
    /* presenceState() is keyed by presence key, so its keys are exactly the
     * distinct visitors. `me` is kept in the list — the count reads "6 people
     * viewing", and the visitor is one of the six. */
    viewers.value = Object.keys(channel.presenceState())
  })

  channel.subscribe((status) => {
    connected.value = status === 'SUBSCRIBED'
    // track() is what publishes this visitor to everyone else, and it must be
    // re-sent after a reconnect — subscribe() fires again on each one.
    if (status === 'SUBSCRIBED') channel.track({ at: Date.now() })
  })
}

function disconnect() {
  channel?.unsubscribe()
  channel = null
  connected.value = false
  viewers.value = []
}

export function useLivePresence() {
  /* Ref-counted so the last component to unmount is the one that closes the
   * socket. Vue tears the whole app down on navigation away anyway, but an
   * HMR reload mounts the new header before unmounting the old one, and
   * without this that sequence would leave the connection dangling. */
  const join = () => {
    clients += 1
    if (clients === 1) connect()
  }
  const leave = () => {
    clients -= 1
    if (clients <= 0) {
      clients = 0
      disconnect()
    }
  }

  return { viewers, connected, join, leave }
}
