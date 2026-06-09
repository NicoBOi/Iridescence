"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projets } from "@/data/projets";
import Grain from "./Grain";

function ProjectFrame({ projet, index }: { projet: (typeof projets)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projets/${projet.id}`}
        className="group block relative overflow-hidden"
        style={{ backgroundColor: "#0c0a08", height: "70vh", minHeight: "400px" }}
      >
        <Grain opacity={0.12} />
        {/* Vignette basse pour lisibilité du titre */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(12,10,8,0.9) 0%, transparent 55%)",
            zIndex: 1,
          }}
        />
        {/* Numéro */}
        <span
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "rgba(246,244,239,0.4)",
            zIndex: 2,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Métadonnée type + année */}
        <span
          style={{
            position: "absolute",
            bottom: "32px",
            right: "28px",
            fontSize: "11px",
            letterSpacing: "0.16em",
            color: "rgba(246,244,239,0.5)",
            textTransform: "uppercase",
            zIndex: 2,
          }}
        >
          {projet.type} · {projet.annee}
        </span>
        {/* Titre */}
        <span
          className="font-display uppercase block transition-transform duration-700 ease-out group-hover:translate-x-1"
          style={{
            position: "absolute",
            bottom: "24px",
            left: "28px",
            fontWeight: 700,
            fontSize: "clamp(32px, 6vw, 96px)",
            lineHeight: 0.9,
            letterSpacing: "0.01em",
            color: "var(--bg)",
            zIndex: 2,
          }}
        >
          {projet.titre}
        </span>
        {/* Lift au hover */}
        <div
          aria-hidden
          className="transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(246,244,239,0.03)",
            zIndex: 1,
          }}
        />
      </Link>
    </motion.div>
  );
}

function PlaceholderFrame({ index }: { index: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080706", height: "28vh", minHeight: "160px" }}
    >
      <Grain opacity={0.07} />
      <span
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          fontSize: "11px",
          letterSpacing: "0.18em",
          color: "rgba(246,244,239,0.18)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="font-display uppercase"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "24px",
          fontWeight: 700,
          fontSize: "clamp(20px, 3vw, 48px)",
          lineHeight: 0.9,
          letterSpacing: "0.01em",
          color: "rgba(246,244,239,0.12)",
        }}
      >
        À venir
      </span>
    </div>
  );
}

export default function IndexList() {
  const hasProjects = projets.length > 0;
  const placeholders = Math.max(0, 5 - projets.length);

  return (
    <section id="travaux" className="scroll-mt-20">
      <div
        className="px-6 md:px-8 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}>
          Travaux
        </h2>
      </div>

      <div style={{ borderBottom: "1px solid var(--ink)" }}>
        {hasProjects &&
          projets.map((p, i) => (
            <div key={p.id} style={{ borderBottom: "1px solid rgba(246,244,239,0.06)" }}>
              <ProjectFrame projet={p} index={i} />
            </div>
          ))}
        {Array.from({ length: placeholders }).map((_, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(246,244,239,0.04)" }}>
            <PlaceholderFrame index={projets.length + i} />
          </div>
        ))}
      </div>
    </section>
  );
}
