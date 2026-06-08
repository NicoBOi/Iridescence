import { equipe } from "@/data/equipe";

export default function Generique() {
  return (
    <section
      id="generique"
      className="px-6 md:px-8 py-20 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
          Générique
        </h2>
        <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-faint)" }}>
          Cinq postes
        </span>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {equipe.map((membre) => (
          <div
            key={membre.roleCode}
            className="grid grid-cols-[40px_1fr] md:grid-cols-[44px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,120px)] gap-x-4 gap-y-1 items-baseline py-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{membre.roleCode}</span>
            <span
              className="font-display uppercase"
              style={{ fontWeight: 600, fontSize: "clamp(20px, 2.6vw, 32px)", lineHeight: 1, letterSpacing: "0.01em" }}
            >
              {membre.role}
            </span>
            <span className="hidden md:block uppercase" style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-secondary)" }}>
              {membre.nom ?? "À confirmer"}
            </span>
            <span className="hidden md:flex items-baseline gap-4 uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>
              {membre.instagram && (
                <a
                  href={membre.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Insta
                </a>
              )}
              {membre.vimeo && (
                <a
                  href={membre.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Vimeo
                </a>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
