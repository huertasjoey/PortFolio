import { useSyncExternalStore } from 'react'

/** Minimal client-side routing: the app only has two pages (home and /work), so no router library. */
const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

/** Current pathname without a trailing slash ('/' stays '/'). */
export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname.replace(/(.)\/+$/, '$1'))
}

export function navigate(to: string) {
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
