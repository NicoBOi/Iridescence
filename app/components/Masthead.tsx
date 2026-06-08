import LetterReveal from "./LetterReveal";
import Timecode from "./Timecode";
import RuleDraw from "./RuleDraw";

export default function Masthead() {
  return (
    <header className="px-6 md:px-8 pt-28 md:pt-36 pb-10">
      {/* Ligne d'en-tête du document */}
      <div
        className="flex items-center justify-between uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.16em", color: "var(--text-muted)" }}
      >
        <span>Index des travaux</span>
        <Timecode />
      </div>

      <h1
        className="font-display uppercase mt-4"
        style={{
          fontWeight: 700,
          fontSize: "clamp(40px, 13vw, 200px)",
          lineHeight: 0.9,
          letterSpacing: "0.005em",
          color: "var(--ink)",
        }}
      >
        <LetterReveal text="Iridescence" delay={0.1} stagger={0.05} />
      </h1>

      <RuleDraw color="var(--ink)" delay={0.5} style={{ marginTop: "18px" }} />

      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-secondary)", marginTop: "14px" }}
      >
        <span>Maison de production indépendante. Bordeaux, France.</span>
        <span>Films · Documentaires · Clips</span>
      </div>
    </header>
  );
}
