'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadYouTubeAPI } from '@/utils/youtube'

gsap.registerPlugin(ScrollTrigger)

const SHOWREEL_ID = 'vNVuluWraDI'

export default function Showreel() {
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    const label = labelRef.current
    if (!frame || !label) return

    frame.style.willChange = 'transform, opacity'
    gsap.fromTo(frame, { scale: 0.92, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: frame, start: 'top 88%', toggleActions: 'play none none none' },
      onComplete: () => { frame.style.willChange = 'auto' },
    })
    gsap.fromTo(label, { opacity: 0, y: 8 }, {
      opacity: 1, y: 0, duration: 0.35, ease: 'power2.out',
      scrollTrigger: { trigger: label, start: 'top 92%', toggleActions: 'play none none none' },
    })

    loadYouTubeAPI().then(() => {
      if (!playerDivRef.current) return
      playerRef.current = new (window as any).YT.Player(playerDivRef.current, {
        videoId: SHOWREEL_ID,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: SHOWREEL_ID,
          controls: 0, modestbranding: 1, rel: 0,
          iv_load_policy: 3, disablekb: 1, playsinline: 1, showinfo: 0,
        },
        events: {
          onReady: (e: any) => { e.target.playVideo(); setPlaying(true) },
          onStateChange: (e: any) => { setPlaying(e.data === 1) },
        },
      })
    })

    return () => { playerRef.current?.destroy() }
  }, [])

  const toggleSound = () => {
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) { p.unMute(); setMuted(false) }
    else { p.mute(); setMuted(true) }
  }

  const togglePlay = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) { p.pauseVideo() } else { p.playVideo() }
    setShowIcon(true)
    setTimeout(() => setShowIcon(false), 600)
  }

  return (
    <section className="bg-black pt-10 pb-0 px-6 md:px-14">
      <p
        ref={labelRef}
        className="font-sans text-[9px] tracking-[0.55em] text-white/25 uppercase mb-6"
        style={{ opacity: 0 }}
      >
        Showreel 2024
      </p>

      <div
        ref={frameRef}
        className="relative w-full aspect-video overflow-hidden rounded-xl bg-black irid-border"
        style={{ opacity: 0 }}
      >
        {/* YT player — oversized to hide chrome */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '160%', height: '160%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <div ref={playerDivRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Click to play/pause */}
        <div
          className="absolute inset-0 z-[4] cursor-pointer"
          onClick={togglePlay}
        />

        {/* Play/pause flash icon */}
        {showIcon && (
          <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
              {playing
                ? <svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="4" y="3" width="3.5" height="12" rx="1" fill="rgba(255,255,255,0.8)"/><rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="rgba(255,255,255,0.8)"/></svg>
                : <svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="rgba(255,255,255,0.8)"/></svg>
              }
            </div>
          </div>
        )}

        {/* Sound toggle — visible on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex justify-end px-5 py-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 font-sans text-[8px] tracking-[0.35em] text-white/50 hover:text-white/90 uppercase transition-colors duration-300"
            style={{ pointerEvents: 'auto' }}
            aria-label={muted ? 'Activer le son' : 'Couper le son'}
          >
            {muted ? <><SoundOffIcon /><span>Son</span></> : <><SoundOnIcon /><span>Muet</span></>}
          </button>
        </div>
      </div>
    </section>
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
