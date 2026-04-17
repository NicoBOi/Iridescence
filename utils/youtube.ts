let ytReady: Promise<void> | null = null

export function loadYouTubeAPI(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (ytReady) return ytReady

  ytReady = new Promise<void>((resolve) => {
    const w = window as any
    if (w.YT?.Player) { resolve(); return }

    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => { prev?.(); resolve() }

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  })

  return ytReady
}
