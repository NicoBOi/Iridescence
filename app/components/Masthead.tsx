import YoutubeBackdrop from "./YoutubeBackdrop";
import Timecode from "./Timecode";

export default function Masthead() {
  return (
    <section
      className="relative flex flex-col"
      style={{ height: "100svh", minHeight: "560px", backgroundColor: "#000" }}
    >
      <YoutubeBackdrop />

      {/* Bord gauche : repère bobine */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.35)",
          zIndex: 2,
        }}
      >
        I
      </div>

      {/* Timecode — bord droit */}
      <Timecode
        style={{
          position: "absolute",
          right: "28px",
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.3)",
          zIndex: 2,
        }}
      />

      {/* Centre : wordmark + tagline */}
      <div
        className="relative flex flex-col items-center justify-center flex-1 text-center"
        style={{ zIndex: 2, padding: "0 60px" }}
      >
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 10vw, 160px)",
            lineHeight: 1,
            letterSpacing: "0.01em",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Iridescence
        </h1>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.4vw, 18px)",
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.45)",
            marginTop: "20px",
          }}
        >
          Maison de production indépendante · Bordeaux
        </p>
      </div>

      {/* Flèche bas */}
      <div
        className="relative flex justify-center pb-10"
        style={{ zIndex: 2 }}
      >
        <span
          aria-hidden
          style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}
        >
          ↓
        </span>
      </div>
    </section>
  );
}
