import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { projets } from "@/data/projets";

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
    <>
      <Nav />
      <main className="pt-24 md:pt-28">
        {/* Fil d'ariane */}
        <div
          className="px-6 md:px-8 flex items-center justify-between uppercase py-4"
          style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
        >
          <Link href="/#travaux" className="inline-flex items-center min-h-[44px]">
            &larr; Index
          </Link>
          <span>{String(index + 1).padStart(2, "0")} / {String(projets.length).padStart(2, "0")}</span>
        </div>

        {/* Titre */}
        <div className="px-6 md:px-8 pt-12 pb-10">
          <h1
            className="font-display uppercase"
            style={{ fontWeight: 700, fontSize: "clamp(40px, 9vw, 140px)", lineHeight: 0.92, letterSpacing: "0.005em" }}
          >
            {projet.titre}
          </h1>
        </div>

        {/* Visuel */}
        <div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {projet.image ? (
            <Image src={projet.image} alt={projet.titre} fill sizes="100vw" priority className="object-cover" />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-faint)" }}
            >
              Visuel à venir
            </div>
          )}
        </div>

        {/* Métadonnées + description */}
        <div className="px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 order-2 md:order-1">
            <p style={{ maxWidth: "60ch", fontSize: "15px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              {projet.description}
            </p>
          </div>
          <div className="order-1 md:order-2" style={{ borderTop: "1px solid var(--ink)" }}>
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
        </div>

        {/* Navigation projet */}
        <div className="grid grid-cols-2" style={{ borderTop: "1px solid var(--ink)" }}>
          <div style={{ borderRight: "1px solid var(--border)" }}>
            {prev && (
              <Link href={`/projets/${prev.id}`} className="group block px-6 md:px-8 py-8 transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--bg)]">
                <span className="uppercase block" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
                  &larr; Précédent
                </span>
                <span className="font-display uppercase block mt-2 group-hover:text-[var(--bg)]" style={{ fontWeight: 600, fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1 }}>
                  {prev.titre}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/projets/${next.id}`} className="group block px-6 md:px-8 py-8 transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--bg)]">
                <span className="uppercase block" style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
                  Suivant &rarr;
                </span>
                <span className="font-display uppercase block mt-2 group-hover:text-[var(--bg)]" style={{ fontWeight: 600, fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1 }}>
                  {next.titre}
                </span>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
