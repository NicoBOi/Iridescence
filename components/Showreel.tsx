'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Showreel() {
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    const label = labelRef.current
    const video = videoRef.current
    if (!frame || !label || !video) return

    gsap.fromTo(
      frame,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: frame, start: 'top 88%', toggleActions: 'play none none none' },
        onComplete: () => { frame.style.willChange = 'auto' },
      }
    )
    frame.style.willChange = 'transform, opacity'

    gsap.fromTo(
      label,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: { trigger: label, start: 'top 92%', toggleActions: 'play none none none' },
      }
    )

    ScrollTrigger.create({
      trigger: frame,
      start: 'top 75%',
      onEnter: () => { video.play().catch(() => {}) },
      onLeaveBack: () => { video.pause() },
    })
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
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
        className="relative w-full aspect-video overflow-hidden rounded-xl bg-black"
        style={{ opacity: 0 }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          src="/videos/showreel.mp4"
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
        />

        {/* Placeholder — hidden once video is ready */}
        {!videoReady && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(135deg, #0c0f18 0%, #080b10 50%, #0b0e18 100%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 55% 38% at 50% 44%, rgba(155,165,205,0.06) 0%, transparent 65%)',
              }}
            />
            <div className="relative z-10 text-center select-none">
              <p
                className="font-display font-light text-white/[0.08] tracking-[0.35em]"
                style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}
              >
                IRIDECENCE
              </p>
              <p className="font-sans text-[8px] tracking-[0.5em] text-white/[0.12] uppercase mt-2">
                Chargement…
              </p>
            </div>
          </div>
        )}

        {/* Sound toggle */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-end px-5 py-4 opacity-0 hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
        >
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 font-sans text-[8px] tracking-[0.35em] text-white/50 hover:text-white/90 uppercase transition-colors duration-300"
            aria-label={muted ? 'Activer le son' : 'Couper le son'}
          >
            {muted ? (
              <>
                <SoundOffIcon />
                <span>Son</span>
              </>
            ) : (
              <>
                <SoundOnIcon />
                <span>Muet</span>
              </>
            )}
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
