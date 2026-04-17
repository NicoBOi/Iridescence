'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  'Nous faisons des films',
  'qui refusent de',
  "s'expliquer.",
]

export default function Manifesto() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lineRefs.current.filter(Boolean).forEach((line) => {
      if (!line) return
      gsap.fromTo(
        line,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: 'power4.out',
          scrollTrigger: { trigger: line, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    })

    if (bodyRef.current) {
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: bodyRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    }
  }, [])

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 bg-black/80"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start max-w-7xl mx-auto w-full">

        {/* Left label */}
        <div className="md:col-span-2 md:pt-2">
          <p className="font-sans text-[9px] tracking-[0.55em] text-white/25 uppercase">À propos</p>
        </div>

        {/* Right content */}
        <div className="md:col-span-10">
          {/* Large manifesto */}
          <div className="mb-20">
            {lines.map((line, i) => (
              <div key={i} className="line-reveal-wrap">
                <span
                  ref={(el) => { lineRefs.current[i] = el }}
                  className="block font-display font-light text-white"
                  style={{
                    fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Body text */}
          <div
            ref={bodyRef}
            className="max-w-sm border-l border-white/10 pl-7"
          >
            <p className="font-sans text-white/40 text-sm leading-relaxed mb-5">
              IRIDESCENCE est un collectif de cinéastes indépendants travaillant entre le documentaire,
              la fiction et la forme expérimentale. Basé à Bordeaux, France.
            </p>
            <p className="font-sans text-white/40 text-sm leading-relaxed">
              Nous croyons aux images qui durent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
