'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadYouTubeAPI } from '@/utils/youtube'
import VideoFullscreen from './VideoFullscreen'

gsap.registerPlugin(ScrollTrigger)

const SHOWREEL_ID = 'vNVuluWraDI'

export default function Showreel() {
  const frameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    const label = labelRef.current
    if (!frame || !label) return

    frame.style.willChange = 'transform, opacity'
    gsap.fromTo(frame, { scale: 0.92, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: frame, start: 'top 88%', toggleActions: 'play none none none' },
      onComplete: () => { frame.style.willChange = 'auto' },
    })
    gsap.fromTo(label, { opacity: 0, y: 8 }, {
      opacity: 1, y: 0, duration: 0.35, ease: 'power2.out',
      scrollTrigger: { trigger: label, start: 'top 92%', toggleActions: 'play none none none' },
    })

    loadYouTubeAPI().then(() => {
      if (!playerDivRef.current) return
      playerRef.current = new (window as any).YT.Player(playerDivRef.current, {
        videoId: SHOWREEL_ID,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: SHOWREEL_ID,
          controls: 0, modestbranding: 1, rel: 0,
          iv_load_policy: 3, disablekb: 1, playsinline: 1, showinfo: 0,
        },
        events: {
          onReady: (e: any) => { e.target.playVideo() },
        },
      })
    })

    return () => { playerRef.current?.destroy() }
  }, [])

  return (
    <>
      {/* pb-px ensures irid-border bottom shadow is not clipped */}
      <section className="bg-black/80 pt-10 pb-px px-6 md:px-14">
        <p
          ref={labelRef}
          className="font-sans text-[9px] tracking-[0.55em] text-white/25 uppercase mb-6"
          style={{ opacity: 0 }}
        >
          Showreel 2024
        </p>

        {/* Outer wrapper: irid-border + GSAP animation — no overflow:hidden here */}
        <div
          ref={frameRef}
          className="relative w-full aspect-video rounded-xl irid-border cursor-pointer"
          style={{ opacity: 0 }}
          onClick={() => setFullscreen(true)}
        >
          {/* Inner: overflow-hidden to clip the oversized iframe */}
          <div className="absolute inset-0 overflow-hidden rounded-xl bg-black">
            {/* YT player — oversized to hide chrome */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '200%', height: '200%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}>
              <div ref={playerDivRef} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Play hint on hover */}
            <div className="absolute inset-0 z-[4] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="rgba(255,255,255,0.8)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fullscreen && (
        <VideoFullscreen youtubeId={SHOWREEL_ID} onClose={() => setFullscreen(false)} />
      )}
    </>
  )
}
