'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { loadYouTubeAPI } from '@/utils/youtube'

interface Props {
  youtubeId: string
  onClose: () => void
}

export default function VideoFullscreen({ youtubeId, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    const overlay = overlayRef.current
    if (overlay) gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })

    loadYouTubeAPI().then(() => {
      if (!playerDivRef.current) return
      playerRef.current = new (window as any).YT.Player(playerDivRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1, mute: 1,
          controls: 0, modestbranding: 1, rel: 0,
          iv_load_policy: 3, disablekb: 1, playsinline: 1, showinfo: 0,
        },
        events: {
          onReady: (e: any) => { e.target.playVideo(); setPlaying(true) },
          onStateChange: (e: any) => { setPlaying(e.data === 1) },
        },
      })
    })

    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      playerRef.current?.destroy()
    }
  }, [youtubeId, onClose])

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) {
      p.unMute()
      // iOS sometimes pauses on unmute — force resume
      setTimeout(() => { if (playerRef.current) playerRef.current.playVideo() }, 80)
      setMuted(false)
    } else {
      p.mute()
      setMuted(true)
    }
  }

  const togglePlay = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) { p.pauseVideo() } else { p.playVideo() }
    setShowIcon(true)
    setTimeout(() => setShowIcon(false), 600)
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
      onClick={onClose}
      style={{ opacity: 0 }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-7 z-20 text-xl text-white/30 hover:text-white transition-colors duration-300"
        aria-label="Close"
      >
        ×
      </button>

      {/* 16:9 container — click outside closes */}
      <div className="w-full px-5 md:px-14 max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-full aspect-video relative overflow-hidden rounded-xl irid-border bg-black">

          {/* Oversized YT iframe — hides chrome */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '200%', height: '200%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}>
            <div ref={playerDivRef} style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Click to play/pause */}
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

          {/* Flash icon */}
          {showIcon && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                {playing
                  ? <svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="4" y="3" width="3.5" height="12" rx="1" fill="rgba(255,255,255,0.8)"/><rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="rgba(255,255,255,0.8)"/></svg>
                  : <svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="rgba(255,255,255,0.8)"/></svg>
                }
              </div>
            </div>
          )}

          {/* Bottom controls */}
          <div
            className="absolute bottom-0 left-0 right-0 z-30 flex justify-end px-5 py-4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
          >
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 font-sans text-[8px] tracking-[0.35em] text-white/50 hover:text-white/90 uppercase transition-colors duration-300"
              aria-label={muted ? 'Activer le son' : 'Couper le son'}
            >
              {muted
                ? <><SoundOffIcon /><span>Son</span></>
                : <><SoundOnIcon /><span>Muet</span></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SoundOffIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
      <path d="M1 4H3L7 1V11L3 8H1V4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
      <line x1="10" y1="4" x2="13" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="13" y1="4" x2="10" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}
function SoundOnIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
      <path d="M1 4H3L7 1V11L3 8H1V4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
      <path d="M9.5 3.5C10.5 4.5 10.5 7.5 9.5 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M11.5 2C13.2 3.7 13.2 8.3 11.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
