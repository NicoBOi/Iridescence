import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--film)",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(72px,16vw,220px)", lineHeight: 1, color: "rgba(255,255,255,0.9)" }}>
        404
      </span>
      <span style={{ fontFamily: "var(--serif)", fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginTop: 20 }}>
        Cette page n&rsquo;existe pas.
      </span>
      <Link
        href="/"
        className="u"
        style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, color: "rgba(255,255,255,0.85)", marginTop: 32, minHeight: 44, display: "inline-flex", alignItems: "center" }}
      >
        Retour
      </Link>
    </div>
  );
}
