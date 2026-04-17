'use client'

import { useEffect, useRef, useState } from 'react'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-10 flex justify-between items-center transition-all duration-300 fade-in ${
        scrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ animationDelay: '1.2s' }}
    >
      <a
        href="#"
        className="font-display text-[11px] tracking-[0.45em] uppercase text-white/80 hover:text-white transition-colors duration-400"
      >
        IRIDECENCE
      </a>

      <div className="hidden md:flex items-center gap-10">
        {(['Work', 'About', 'Contact'] as const).map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="nav-link font-sans text-[10px] tracking-[0.3em] text-white/45 hover:text-white/80 transition-colors duration-300 uppercase"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Mobile — three dots menu */}
      <div className="flex md:hidden items-center gap-5">
        {(['Work', 'About', 'Contact'] as const).map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="font-sans text-[8px] tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors duration-300 uppercase"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
