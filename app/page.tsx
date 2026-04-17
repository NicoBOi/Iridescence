'use client'

import dynamic from 'next/dynamic'
import { useLenis } from '@/hooks/useLenis'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Showreel from '@/components/Showreel'
import Projects from '@/components/Projects'
import Manifesto from '@/components/Manifesto'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), { ssr: false })

export default function Home() {
  useLenis()

  return (
    <>
      {/* Fixed WebGL iridescent background — always visible, scroll-driven colour shift */}
      <div className="fixed inset-0 z-[-1]" aria-hidden="true">
        <WebGLBackground />
      </div>

      <main>
        <Navigation />
        <Hero />
        <Showreel />
        <Projects />
        <Manifesto />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
