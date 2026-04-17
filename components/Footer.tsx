'use client'

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] bg-black/80">
      {/* Left */}
      <p className="font-sans text-[10px] text-white/20 tracking-widest uppercase">
        © 2024 IRIDESCENCE
      </p>

      {/* Center */}
      <p className="font-sans text-[10px] text-white/20 tracking-widest">
        Bordeaux, France
      </p>

      {/* Right: Social links */}
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="font-sans text-[10px] text-white/20 tracking-widest hover:text-white/60 transition-colors duration-300 uppercase"
          aria-label="Instagram"
        >
          IG
        </a>
        <a
          href="#"
          className="font-sans text-[10px] text-white/20 tracking-widest hover:text-white/60 transition-colors duration-300 uppercase"
          aria-label="Vimeo"
        >
          VIM
        </a>
        <a
          href="#"
          className="font-sans text-[10px] text-white/20 tracking-widest hover:text-white/60 transition-colors duration-300 uppercase"
          aria-label="Letterboxd"
        >
          LTR
        </a>
      </div>
    </footer>
  )
}
