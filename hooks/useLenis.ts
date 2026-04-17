'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    lenisRef.current = lenis

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerHandler)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
