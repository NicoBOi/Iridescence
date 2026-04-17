'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface Project {
  id: string
  title: string
  year: string
  duration: string
  genre: string
  color: string
  colorB: string
  description: string
}

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectOverlay({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    gsap.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })

    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black flex"
      style={{ opacity: 0 }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div ref={contentRef} className="flex flex-col md:flex-row w-full h-full" style={{ opacity: 0 }}>

        {/* Left — cinematic still */}
        <div
          className="w-full md:w-1/2 h-48 md:h-full relative grain flex-shrink-0"
          style={{ background: `linear-gradient(140deg, ${project.color} 0%, ${project.colorB} 100%)` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 35% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
          />
          <div className="absolute bottom-8 left-8">
            <span className="font-display text-[8rem] md:text-[10rem] font-light text-white/04 leading-none select-none">
              {project.id}
            </span>
          </div>
        </div>

        {/* Right — details */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-12 relative overflow-y-auto">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-7 right-8 text-xl text-white/30 hover:text-white transition-colors duration-300"
            aria-label="Close"
          >
            ×
          </button>

          {/* Ghost number */}
          <span className="font-display text-6xl font-light text-white/07 leading-none select-none mb-2">
            {project.id}
          </span>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-wide text-white mt-3 mb-6">
            {project.title}
          </h2>

          {/* Meta */}
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

          {/* Rule */}
          <div className="w-12 h-px bg-white/15 mb-7" />

          {/* Description */}
          <p className="font-sans text-sm text-white/45 leading-relaxed max-w-sm mb-10">
            {project.description}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <button className="font-sans text-[9px] tracking-widest uppercase px-7 py-3.5 border border-white/25 hover:border-white hover:bg-white hover:text-black transition-all duration-500">
              View Trailer
            </button>
            <button
              onClick={onClose}
              className="font-sans text-[9px] tracking-widest uppercase px-7 py-3.5 border border-white/10 text-white/35 hover:border-white/25 hover:text-white/60 transition-all duration-500"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
