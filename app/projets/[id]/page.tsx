import { notFound } from "next/navigation";
import Link from "next/link";
import { projets } from "@/data/projets";
import LetterReveal from "@/app/components/LetterReveal";
import ProjectVisual from "@/app/components/ProjectVisual";
import FadeIn from "@/app/components/FadeIn";

export function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

// Dans cette version de Next, `params` est une Promise et doit être attendu.
export default async function ProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projets.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const projet = projets[index];
  const prev = index > 0 ? projets[index - 1] : null;
  const next = index < projets.length - 1 ? projets[index + 1] : null;

  const meta = [
    { label: "Nº", value: String(index + 1).padStart(2, "0") },
    { label: "Type", value: projet.type },
    { label: "Année", value: String(projet.annee) },
    { label: "Rôle", value: projet.role },
  ];

  return (
    <main className="pt-24 md:pt-28">
      {/* Fil d'ariane */}
      <div
        className="px-6 md:px-8 flex items-center justify-between uppercase py-4"
        style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
      >
        <Link href="/#travaux" className="group inline-flex items-center min-h-[44px]">
          <span className="link-underline">&larr; Index</span>
        </Link>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(projets.length).padStart(2, "0")}
        </span>
      </div>

      {/* Titre */}
      <div className="px-6 md:px-8 pt-12 pb-10">
        <h1
          className="font-display uppercase"
          style={{ fontWeight: 700, fontSize: "clamp(40px, 9vw, 140px)", lineHeight: 0.92, letterSpacing: "0.005em" }}
        >
          <LetterReveal text={projet.titre} stagger={0.04} />
        </h1>
      </div>

      {/* Visuel (volet de coupe) */}
      <ProjectVisual src={projet.image} alt={projet.titre} />

      {/* Métadonnées + description */}
      <div className="px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <FadeIn className="md:col-span-2 order-2 md:order-1" delay={0.1}>
          <p style={{ maxWidth: "60ch", fontSize: "15px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            {projet.description}
          </p>
        </FadeIn>
        <FadeIn className="order-1 md:order-2" y={10}>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            {meta.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-[80px_1fr] gap-4 py-3 items-baseline"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
                  {label}
                </span>
                <span className="uppercase" style={{ fontSize: "12px", letterSpacing: "0.06em" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Navigation projet */}
      <div className="grid grid-cols-2" style={{ borderTop: "1px solid var(--ink)" }}>
        <div style={{ borderRight: "1px solid var(--border)" }}>
          {prev && (
            <Link href={`/projets/${prev.id}`} className="group block px-6 md:px-8 py-8 transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]">
              <span className="uppercase block" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
                &larr; Précédent
              </span>
              <span className="font-display uppercase block mt-2 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--bg)]" style={{ fontWeight: 600, fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1 }}>
                {prev.titre}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link href={`/projets/${next.id}`} className="group block px-6 md:px-8 py-8 transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]">
              <span className="uppercase block" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
                Suivant &rarr;
              </span>
              <span className="font-display uppercase block mt-2 transition-transform duration-300 group-hover:-translate-x-2 group-hover:text-[var(--bg)]" style={{ fontWeight: 600, fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1 }}>
                {next.titre}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
