'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SHOWREEL_ID = 'uUdBBQAvYnU'

export default function Showreel() {
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const label = labelRef.current
    if (!frame || !label) return

    frame.style.willChange = 'transform, opacity'
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
  }, [])

  const src =
    `https://www.youtube.com/embed/${SHOWREEL_ID}` +
    `?autoplay=1&mute=1&loop=1&playlist=${SHOWREEL_ID}` +
    `&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&showinfo=0`

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
        {/* Oversized iframe — hides YouTube chrome outside the visible area */}
        <iframe
          src={src}
          allow="autoplay; encrypted-media"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}
