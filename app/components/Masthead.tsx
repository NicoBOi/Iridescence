import LetterReveal from "./LetterReveal";
import Timecode from "./Timecode";
import CinemaBackdrop from "./CinemaBackdrop";

export default function Masthead() {
  return (
    <header>
      {/* Cadre cinéma plein-écran : la première impression est une image de film. */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ height: "92svh", minHeight: "520px", backgroundColor: "#0c0a08" }}
      >
        <CinemaBackdrop />

        {/* Timecode seul, en haut à droite */}
        <div
          className="absolute top-0 right-0 px-6 md:px-8 pt-24 md:pt-28"
          style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(246,244,239,0.7)", zIndex: 2 }}
        >
          <Timecode />
        </div>

        {/* Titre en bas du cadre, comme un carton de générique */}
        <div className="relative px-6 md:px-8 pb-10 md:pb-12" style={{ zIndex: 2 }}>
          <h1
            className="font-display uppercase"
            style={{
              fontWeight: 700,
              fontSize: "clamp(44px, 13vw, 200px)",
              lineHeight: 0.9,
              letterSpacing: "0.005em",
              color: "var(--bg)",
            }}
          >
            <LetterReveal text="Iridescence" delay={0.1} stagger={0.05} />
          </h1>
        </div>
      </section>
    </header>
  );
}
