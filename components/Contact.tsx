'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ctaLines = ["LET'S MAKE", 'SOMETHING', 'REAL.']

export default function Contact() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    lineRefs.current.filter(Boolean).forEach((line) => {
      if (!line) return
      gsap.fromTo(
        line,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    })

    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    if (emailRef.current) {
      gsap.fromTo(emailRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: emailRef.current, start: 'top 92%', toggleActions: 'play none none none' },
      })
    }
  }, [])

  return (
    <section
      id="contact"
      className="min-h-[75vh] flex flex-col justify-center items-center text-center px-6 py-32 bg-black"
    >
      {/* Large CTA text */}
      <div className="mb-14">
        {ctaLines.map((line, i) => (
          <div key={i} className="line-reveal-wrap">
            <span
              ref={(el) => { lineRefs.current[i] = el }}
              className="block font-display font-light text-white"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 9rem)',
                lineHeight: 1.0,
                letterSpacing: '0.02em',
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
        <button className="font-sans text-[9px] tracking-[0.3em] uppercase px-9 py-4 border border-white/25 hover:border-white hover:bg-white hover:text-black transition-all duration-500">
          Work With Us
        </button>
        <button className="font-sans text-[9px] tracking-[0.3em] uppercase px-9 py-4 border border-white/25 hover:border-white hover:bg-white hover:text-black transition-all duration-500">
          Send a Message
        </button>
      </div>

      {/* Email */}
      <p ref={emailRef} className="font-sans text-white/25 text-[10px] tracking-[0.35em] mt-12">
        hello@iridecence.film
      </p>
    </section>
  )
}
