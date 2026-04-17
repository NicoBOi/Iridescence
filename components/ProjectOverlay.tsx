'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { loadYouTubeAPI } from '@/utils/youtube'
import VideoFullscreen from './VideoFullscreen'

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
  const [videoFullscreen, setVideoFullscreen] = useState(false)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
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
          onReady: (e: any) => { e.target.playVideo() },
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

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black flex flex-col md:flex-row"
        style={{ opacity: 0 }}
      >
        <div ref={contentRef} className="flex flex-col md:flex-row w-full h-full" style={{ opacity: 0 }}>

          {/* Left — video panel */}
          <div className="w-full md:w-3/5 h-56 md:h-full flex items-center justify-center pt-16 px-5 pb-5 md:p-10 bg-black flex-shrink-0">
            <div
              className="w-full aspect-video relative overflow-hidden rounded-xl irid-border bg-black cursor-pointer group"
              onClick={() => setVideoFullscreen(true)}
            >
              {/* Oversized YT iframe — hides chrome */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '200%', height: '200%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}>
                <div ref={playerDivRef} style={{ width: '100%', height: '100%' }} />
              </div>

              {/* Fullscreen hint on hover */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="rgba(255,255,255,0.8)"/>
                  </svg>
                </div>
              </div>

              {/* Bottom label */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-5 py-3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
              >
                <span className="font-sans text-[7px] tracking-[0.4em] text-white/30 uppercase">
                  {project.genre} · {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* Right — details */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-12 md:py-16 overflow-y-auto border-l border-white/[0.05]">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-7 text-lg text-white/25 hover:text-white transition-colors duration-300"
              aria-label="Close"
            >
              ×
            </button>

            <span className="font-display text-5xl font-light text-white/[0.06] leading-none select-none mb-1">
              {project.id}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white mt-2 mb-7">
              {project.title}
            </h2>

            <div className="flex flex-col gap-3 mb-7">
              {[
                { label: 'Genre',    value: project.genre    },
                { label: 'Année',  value: project.year     },
                { label: 'Durée',  value: project.duration },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <p className="font-sans text-[8px] tracking-[0.4em] text-white/25 uppercase w-16 shrink-0">{label}</p>
                  <p className="font-sans text-[10px] tracking-widest text-white/60 uppercase">{value}</p>
                </div>
              ))}
            </div>

            <div className="w-8 h-px bg-white/12 mb-7" />

            <p className="font-sans text-xs text-white/40 leading-relaxed max-w-xs mb-10">
              {project.description}
            </p>

            <button
              onClick={onClose}
              className="self-start font-sans text-[8px] tracking-widest uppercase px-6 py-3 border border-white/10 text-white/30 hover:border-white/25 hover:text-white/55 transition-all duration-300"
            >
              Retour
            </button>
          </div>
        </div>
      </div>

      {videoFullscreen && (
        <VideoFullscreen youtubeId={project.youtubeId} onClose={() => setVideoFullscreen(false)} />
      )}
    </>
  )
}
