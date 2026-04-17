'use client'

import dynamic from 'next/dynamic'

const WebGLBackground = dynamic(() => import('./WebGLBackground'), { ssr: false })

const TITLE = 'IRIDECENCE'

export default function Hero() {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* WebGL iridescent shader background */}
      <div className="absolute inset-0 z-0">
        <WebGLBackground />
      </div>

      {/* Radial center glow — very subtle */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(160,175,210,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center select-none">
        {/* Subtitle */}
        <p
          className="font-sans text-[9px] tracking-[0.55em] text-white/30 uppercase mb-10 fade-in"
          style={{ animationDelay: '0s', animationDuration: '0.8s' }}
        >
          Independent Filmmakers Collective
        </p>

        {/* Title */}
        <h1
          className="font-display font-light leading-none tracking-[0.02em] md:tracking-[0.18em] text-white"
          style={{ fontSize: 'clamp(2.2rem, 9vw, 13rem)' }}
          aria-label={TITLE}
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="char-animate inline-block"
              style={{ animationDelay: `${i * 0.05}s`, animationDuration: '1s' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Thin vertical rule */}
        <div
          className="w-px bg-white/15 mt-14 fade-in"
          style={{ height: '52px', animationDelay: '0.6s', animationDuration: '0.8s' }}
        />

        {/* Scroll */}
        <p
          className="font-sans text-[8px] tracking-[0.55em] text-white/22 mt-5 uppercase fade-in"
          style={{ animationDelay: '0.8s', animationDuration: '0.8s' }}
        >
          Scroll
        </p>
      </div>

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />
    </section>
  )
}
