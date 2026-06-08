import LetterReveal from "./LetterReveal";
import Timecode from "./Timecode";
import RuleDraw from "./RuleDraw";
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

        {/* Barre haute : bobine en lecture (gauche) / timecode (droite) */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-8 pt-24 md:pt-28 uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(246,244,239,0.7)", zIndex: 2 }}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden style={{ fontSize: "9px" }}>&#9654;</span>
            Boucle muette
          </span>
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
          <RuleDraw color="rgba(246,244,239,0.35)" delay={0.6} style={{ marginTop: "16px" }} />
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(246,244,239,0.6)", marginTop: "14px" }}
          >
            <span>Maison de production indépendante. Bordeaux, France.</span>
            <span>Films &middot; Documentaires &middot; Clips</span>
          </div>
        </div>
      </section>

      {/* Bandeau papier de transition vers l'index */}
      <div
        className="px-6 md:px-8 flex items-center justify-between uppercase"
        style={{
          fontSize: "11px",
          letterSpacing: "0.16em",
          color: "var(--text-muted)",
          paddingTop: "16px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span>Index des travaux</span>
        <span aria-hidden style={{ color: "var(--text-faint)" }}>&darr;</span>
      </div>
    </header>
  );
}
