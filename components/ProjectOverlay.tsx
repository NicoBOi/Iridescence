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
  const contentRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 })

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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black flex"
      style={{ opacity: 0 }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div ref={contentRef} className="flex flex-col md:flex-row w-full h-full" style={{ opacity: 0 }}>

        {/* Left — YouTube player, no chrome */}
        <div className="w-full md:w-1/2 h-48 md:h-full relative flex-shrink-0 overflow-hidden bg-black">
          {/* Oversized player to hide YouTube UI */}
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

        {/* Right — details */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-12 relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-7 right-8 text-xl text-white/30 hover:text-white transition-colors duration-300"
            aria-label="Close"
          >
            ×
          </button>

          <span className="font-display text-6xl font-light text-white/[0.07] leading-none select-none mb-2">
            {project.id}
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-light tracking-wide text-white mt-3 mb-6">
            {project.title}
          </h2>

          <div className="flex gap-8 mb-7">
            {[
              { label: 'Genre',    value: project.genre    },
              { label: 'Year',     value: project.year     },
              { label: 'Duration', value: project.duration },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-sans text-[8px] tracking-[0.4em] text-white/25 uppercase mb-1">{label}</p>
                <p className="font-sans text-[10px] tracking-widest text-white/65 uppercase">{value}</p>
              </div>
            ))}
          </div>

          <div className="w-12 h-px bg-white/15 mb-7" />

          <p className="font-sans text-sm text-white/45 leading-relaxed max-w-sm mb-10">
            {project.description}
          </p>

          <button
            onClick={onClose}
            className="self-start font-sans text-[9px] tracking-widest uppercase px-7 py-3.5 border border-white/10 text-white/35 hover:border-white/25 hover:text-white/60 transition-all duration-300"
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
