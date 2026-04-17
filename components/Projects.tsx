'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectOverlay, { Project } from './ProjectOverlay'

gsap.registerPlugin(ScrollTrigger)

const projects: Project[] = [
  {
    id: '01',
    title: 'MEMORIA',
    year: '2024',
    duration: '18 min',
    genre: 'EXPERIMENTAL',
    color: '#101828',
    colorB: '#060810',
    youtubeId: '_n-y644nd78',
    description:
      'A fragmented portrait of memory and its erosion. Images that return without context. Silence as evidence. Shot on expired 16mm in abandoned thermal baths.',
  },
  {
    id: '02',
    title: 'SALT & LIGHT',
    year: '2023',
    duration: '24 min',
    genre: 'DOCUMENTARY',
    color: '#281a08',
    colorB: '#140a04',
    youtubeId: 'E8WW4jJ59d4',
    description:
      'Two fishermen at the edge of a dying sea. The language of labor, of salt-cracked hands and dawn nets. A requiem before the silence arrives.',
  },
  {
    id: '03',
    title: 'ENTRE DEUX EAUX',
    year: '2024',
    duration: '12 min',
    genre: 'FICTION',
    color: '#082018',
    colorB: '#04100c',
    youtubeId: '8QIi8Ipc0wo',
    description:
      'Between departure and return, a woman stands at the threshold. The Loire at dusk holds both directions at once. Nothing is decided. Everything is felt.',
  },
  {
    id: '04',
    title: 'THE QUIET HOURS',
    year: '2023',
    duration: '31 min',
    genre: 'DRAMA',
    color: '#201810',
    colorB: '#100c08',
    youtubeId: '0_H8xcqy4Vc',
    description:
      'A retirement home in winter. Time moves differently here — slower, denser. We follow four residents through the hours no one films. Tenderness without sentimentality.',
  },
  {
    id: '05',
    title: 'PALIMPSEST',
    year: '2022',
    duration: '8 min',
    genre: 'EXPERIMENTAL',
    color: '#180e28',
    colorB: '#0c0818',
    youtubeId: 'w4ppl3xqMmU',
    description:
      'Layers of image over image, city over city. The ghosts of what a place was before, bleeding through its present skin. An essay in superimposition.',
  },
  {
    id: '06',
    title: 'UNDER THE SAME SUN',
    year: '2024',
    duration: '22 min',
    genre: 'DOCUMENTARY',
    color: '#281408',
    colorB: '#180c04',
    youtubeId: 'Qer6Ho3SSm4',
    description:
      'Three families, three continents, one long solar day. Light as the only shared grammar. A meditation on simultaneity and the myth of distance.',
  },
]

interface CardProps {
  project: Project
  onClick: (p: Project) => void
  colSpan: string
  aspect: string
  index: number
}

function ProjectCard({ project, onClick, colSpan, aspect, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.style.willChange = 'transform, opacity'
    gsap.fromTo(
      el,
      { opacity: 0, y: 32, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: index * 0.04,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onComplete: () => { el.style.willChange = 'auto' },
      }
    )
  }, [index])

  const thumb = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`

  return (
    <div
      ref={cardRef}
      className={`${colSpan} project-card group cursor-pointer relative overflow-hidden`}
      onClick={() => onClick(project)}
    >
      <div
        className={`w-full ${aspect} relative grain overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${project.color} 0%, ${project.colorB} 100%)`,
        }}
      >
        {/* YouTube thumbnail — fades in on hover */}
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-700 z-[0]"
          loading="lazy"
        />

        {/* Cinematic lens glow */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 65%)`,
          }}
        />

        {/* Hover darken */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-[3]" />

        {/* Genre label */}
        <div className="absolute top-5 left-5 z-[4]">
          <span className="font-sans text-[8px] text-white/20 tracking-[0.45em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.genre}
          </span>
        </div>

        {/* Bottom info */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 z-[4]"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
        >
          <div className="project-line h-px bg-white/40 mb-3 w-full" />
          <div className="flex items-end justify-between">
            <span className="font-sans text-[9px] text-white/25 tracking-widest">
              {project.id}
            </span>
            <div className="text-right">
              <span className="font-sans text-[9px] text-white/35 tracking-widest uppercase block mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {project.year}
              </span>
              <span className="font-display text-sm text-white/90 tracking-wider">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const headerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 90%' },
      }
    )
  }, [])

  const layout = [
    { colSpan: 'col-span-12 md:col-span-8', aspect: 'aspect-[16/10] md:aspect-[16/11]' },
    { colSpan: 'col-span-12 md:col-span-4', aspect: 'aspect-[16/10] md:aspect-[3/4]' },
    { colSpan: 'col-span-12 md:col-span-4', aspect: 'aspect-[16/10] md:aspect-[3/4]' },
    { colSpan: 'col-span-12 md:col-span-8', aspect: 'aspect-[16/10] md:aspect-[16/11]' },
    { colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[16/10]' },
    { colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[16/10]' },
  ]

  return (
    <>
      <section id="work" className="py-32 px-6 md:px-14 bg-black">
        <p
          ref={headerRef}
          className="font-sans text-[9px] tracking-[0.55em] text-white/25 uppercase mb-20"
        >
          Selected Work
        </p>

        <div className="grid grid-cols-12 gap-2 md:gap-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={setActiveProject}
              colSpan={layout[i].colSpan}
              aspect={layout[i].aspect}
              index={i}
            />
          ))}
        </div>
      </section>

      {activeProject && (
        <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  )
}
