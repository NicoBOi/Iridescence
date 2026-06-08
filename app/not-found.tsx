import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-start justify-end px-6 md:px-8 py-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <span
        className="font-display"
        style={{ fontSize: "clamp(80px, 18vw, 260px)", color: "var(--text-faint)", letterSpacing: "0.01em", lineHeight: 1 }}
      >
        404
      </span>
      <div style={{ height: "1px", width: "100%", backgroundColor: "var(--ink)", margin: "24px 0" }} />
      <div className="flex items-center justify-between w-full uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        <span style={{ color: "var(--text-secondary)" }}>Entrée introuvable dans l&rsquo;index.</span>
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] transition-opacity duration-200 hover:opacity-60"
        >
          Retour &rarr;
        </Link>
      </div>
    </div>
  );
}
