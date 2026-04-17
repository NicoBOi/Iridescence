'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { loadYouTubeAPI } from '@/utils/youtube'

export interface Project {
  id: string
  title: string
  year: string
  duration: string
  genre: string
  color: string
  colorB: string
  youtubeId: string
  description: string
}

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectOverlay({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const overlay = overlayRef.current
    const card = cardRef.current
    if (!overlay || !card) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(card, { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 })

    loadYouTubeAPI().then(() => {
      if (!playerDivRef.current) return
      playerRef.current = new (window as any).YT.Player(playerDivRef.current, {
        videoId: project.youtubeId,
        playerVars: {
          autoplay: 1, mute: 1,
          controls: 0, modestbranding: 1, rel: 0,
          iv_load_policy: 3, disablekb: 1, playsinline: 1, showinfo: 0,
        },
        events: {
          onReady: (e: any) => e.target.playVideo(),
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
  }, [onClose, project.youtubeId])

  const toggleSound = () => {
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) { p.unMute(); setMuted(false) }
    else { p.mute(); setMuted(true) }
  }

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      style={{ opacity: 0 }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Floating card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-6xl h-[80vh] flex flex-col md:flex-row rounded-2xl overflow-hidden bg-[#080808]"
        style={{ opacity: 0 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-lg text-white/30 hover:text-white transition-colors duration-300 leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Left — video (2/3) */}
        <div className="w-full md:w-2/3 h-56 md:h-full relative overflow-hidden flex-shrink-0 bg-black">
          <div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '125%', height: '125%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <div ref={playerDivRef} style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Sound toggle */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 flex justify-end px-5 py-4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
          >
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 font-sans text-[8px] tracking-[0.35em] text-white/50 hover:text-white/90 uppercase transition-colors duration-300"
              aria-label={muted ? 'Activer le son' : 'Couper le son'}
            >
              {muted ? <><SoundOffIcon /><span>Son</span></> : <><SoundOnIcon /><span>Muet</span></>}
            </button>
          </div>
        </div>

        {/* Right — details (1/3) */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-10 py-10 overflow-y-auto border-l border-white/[0.06]">
          <span className="font-display text-5xl font-light text-white/[0.06] leading-none select-none mb-2">
            {project.id}
          </span>

          <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white mt-2 mb-5">
            {project.title}
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            {[
              { label: 'Genre',    value: project.genre    },
              { label: 'Year',     value: project.year     },
              { label: 'Duration', value: project.duration },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <p className="font-sans text-[8px] tracking-[0.4em] text-white/25 uppercase w-16 flex-shrink-0">{label}</p>
                <p className="font-sans text-[10px] tracking-widest text-white/65 uppercase">{value}</p>
              </div>
            ))}
          </div>

          <div className="w-8 h-px bg-white/15 mb-6" />

          <p className="font-sans text-xs text-white/40 leading-relaxed mb-8">
            {project.description}
          </p>

          <button
            onClick={onClose}
            className="self-start font-sans text-[8px] tracking-widest uppercase px-6 py-3 border border-white/10 text-white/30 hover:border-white/25 hover:text-white/55 transition-all duration-300"
          >
            Back
          </button>
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
