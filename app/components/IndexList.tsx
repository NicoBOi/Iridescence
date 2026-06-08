"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projets, Projet, ProjetType } from "@/data/projets";

const filters: { label: string; match: (t: ProjetType) => boolean }[] = [
  { label: "Tous", match: () => true },
  { label: "Films", match: (t) => t === "film" },
  { label: "Documentaires", match: (t) => t === "documentaire" },
  { label: "Clips", match: (t) => t === "clip" },
];

const COLS = "grid-cols-[40px_1fr] md:grid-cols-[44px_minmax(0,2.2fr)_minmax(0,1fr)_72px_minmax(0,1.3fr)]";

function Row({ projet, index }: { projet: Projet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        href={`/projets/${projet.id}`}
        className={`group grid ${COLS} gap-x-4 gap-y-1 items-baseline py-5 transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--bg)]`}
        style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
      >
        <span style={{ fontSize: "12px", color: "inherit" }}>{String(index + 1).padStart(2, "0")}</span>
        <span>
          <span
            className="font-display uppercase block"
            style={{ fontWeight: 600, fontSize: "clamp(22px, 3vw, 38px)", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {projet.titre}
          </span>
          <span className="md:hidden block uppercase mt-1" style={{ fontSize: "11px", letterSpacing: "0.1em", opacity: 0.7 }}>
            {projet.type} · {projet.annee} · {projet.role}
          </span>
        </span>
        <span className="hidden md:block uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
          {projet.type}
        </span>
        <span className="hidden md:block" style={{ fontSize: "12px" }}>
          {projet.annee}
        </span>
        <span className="hidden md:block uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
          {projet.role}
        </span>
      </Link>
    </motion.div>
  );
}

function PlaceholderRow({ index }: { index: number }) {
  return (
    <div
      className={`grid ${COLS} gap-x-4 items-baseline py-5`}
      style={{ color: "var(--text-faint)" }}
    >
      <span style={{ fontSize: "12px" }}>{String(index + 1).padStart(2, "0")}</span>
      <span className="flex items-baseline gap-3">
        <span className="font-display uppercase" style={{ fontWeight: 600, fontSize: "clamp(22px, 3vw, 38px)", lineHeight: 1 }}>
          À venir
        </span>
        <span className="leader hidden md:block" />
      </span>
      <span className="hidden md:block" />
      <span className="hidden md:block" />
      <span className="hidden md:block" />
    </div>
  );
}

export default function IndexList() {
  const [active, setActive] = useState(0);
  const filtered = projets.filter((p) => filters[active].match(p.type));
  const hasProjects = projets.length > 0;

  const count = (i: number) => projets.filter((p) => filters[i].match(p.type)).length;

  return (
    <section id="travaux" className="px-6 md:px-8 pt-16 pb-24 scroll-mt-20">
      {/* En-tête de section + filtres */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2 className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
          Travaux
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActive(i)}
              className="uppercase inline-flex items-center min-h-[44px] px-3 transition-colors duration-200"
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                backgroundColor: active === i ? "var(--ink)" : "transparent",
                color: active === i ? "var(--bg)" : "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {f.label} <span style={{ opacity: 0.6, marginLeft: "6px" }}>{String(count(i)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bandeau de colonnes */}
      <div
        className={`hidden md:grid ${COLS} gap-x-4 uppercase pb-3`}
        style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-faint)", borderBottom: "1px solid var(--ink)" }}
      >
        <span>Nº</span>
        <span>Titre</span>
        <span>Type</span>
        <span>Année</span>
        <span>Rôle</span>
      </div>
      <div className="md:hidden" style={{ borderTop: "1px solid var(--ink)" }} />

      {/* Lignes */}
      <div style={{ borderTop: "none" }}>
        {hasProjects
          ? filtered.map((p, i) => (
              <div key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <Row projet={p} index={i} />
              </div>
            ))
          : [0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <PlaceholderRow index={i} />
              </div>
            ))}
      </div>

      {!hasProjects && (
        <p className="mt-8 uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
          Index en cours de constitution.
        </p>
      )}
    </section>
  );
}
