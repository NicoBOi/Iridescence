import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Cursor from "@/app/components/Cursor";
import { projets } from "@/data/projets";

export function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

// In this version of Next, `params` is a Promise and must be awaited.
export default async function ProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projets.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const projet = projets[index];
  const prev = index > 0 ? projets[index - 1] : null;
  const next = index < projets.length - 1 ? projets[index + 1] : null;

  return (
    <>
      <Cursor />
      <Nav />
      <main className="pt-24">
        {/* Hero visuel */}
        <div
          className="w-full aspect-[21/9] relative overflow-hidden"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {projet.image && (
            <Image
              src={projet.image}
              alt={projet.titre}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Infos */}
        <div className="px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h1
              className="font-editorial mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              {projet.titre}
            </h1>
            <p
              className="mt-8 leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)", fontSize: "15px" }}
            >
              {projet.description}
            </p>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            {[
              { label: "Type", value: projet.type },
              { label: "Année", value: String(projet.annee) },
              { label: "Rôle", value: projet.role },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <p className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation projets */}
        <div
          className="px-8 py-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {prev ? (
            <Link
              href={`/projets/${prev.id}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                &larr; Précédent
              </span>
              <span
                className="font-editorial group-hover:text-[var(--accent)] transition-colors duration-200"
                style={{ fontSize: "18px" }}
              >
                {prev.titre}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/projets/${next.id}`}
              className="flex flex-col gap-1 items-end group"
            >
              <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Suivant &rarr;
              </span>
              <span
                className="font-editorial group-hover:text-[var(--accent)] transition-colors duration-200"
                style={{ fontSize: "18px" }}
              >
                {next.titre}
              </span>
            </Link>
          ) : <div />}
        </div>
      </main>
    </>
  );
}
