'use client'

import { useLenis } from '@/hooks/useLenis'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Showreel from '@/components/Showreel'
import Projects from '@/components/Projects'
import Manifesto from '@/components/Manifesto'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  useLenis()

  return (
    <main className="bg-black">
      <Navigation />
      <Hero />
      <Showreel />
      <Projects />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  )
}
