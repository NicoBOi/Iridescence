import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-start justify-end px-8 py-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <span
        className="font-editorial"
        style={{ fontSize: "clamp(80px, 15vw, 220px)", color: "var(--text-faint)", letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        404
      </span>
      <div style={{ height: "1px", width: "100%", backgroundColor: "var(--border)", margin: "24px 0" }} />
      <div className="flex items-center justify-between w-full">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Page introuvable.
        </p>
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] transition-colors duration-200 inline-flex items-center min-h-[44px] hover:text-[var(--accent)]"
          style={{ color: "var(--text-secondary)" }}
        >
          Retour &rarr;
        </Link>
      </div>
    </div>
  );
}
