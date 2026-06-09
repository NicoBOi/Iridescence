"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projets } from "@/data/projets";

function toRoman(n: number): string {
  const v = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r = "";
  for (let i = 0; i < v.length; i++) while (n >= v[i]) { r += s[i]; n -= v[i]; }
  return r;
}

// Décalages horizontaux en cascade diagonale, comme depoluxe archive.
const OFFSETS = ["0%", "8%", "16%", "24%", "32%", "38%"];

function ProjectEntry({ projet, index }: { projet: (typeof projets)[0]; index: number }) {
  const offset = OFFSETS[Math.min(index, OFFSETS.length - 1)];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 1, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginLeft: offset }}
      className="hidden-mobile-offset"
    >
      <Link
        href={`/projets/${projet.id}`}
        className="group inline-flex flex-col"
        style={{ paddingBottom: "52px" }}
      >
        {/* Vignette */}
        <div
          style={{
            width: "clamp(140px, 18vw, 260px)",
            aspectRatio: "16/9",
            backgroundColor: "#111",
            marginBottom: "14px",
            overflow: "hidden",
          }}
        >
          <div
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundColor: "#1a1814" }}
          />
        </div>
        {/* Numéro romain */}
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
            marginBottom: "6px",
          }}
        >
          {toRoman(index + 1)}
        </span>
        {/* Titre */}
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 3.5vw, 52px)",
            lineHeight: 1,
            color: "var(--ink)",
            transition: "opacity 0.4s",
          }}
          className="group-hover:opacity-60"
        >
          {projet.titre}
        </span>
        {/* Métadonnée */}
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "normal",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginTop: "8px",
          }}
        >
          {projet.type} · {projet.annee}
        </span>
      </Link>
    </motion.div>
  );
}

function PlaceholderEntry({ index }: { index: number }) {
  const offset = OFFSETS[Math.min(index, OFFSETS.length - 1)];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 1.2, delay: index * 0.05 }}
      style={{ marginLeft: offset, paddingBottom: "52px" }}
    >
      {/* Vignette placeholder */}
      <div
        style={{
          width: "clamp(140px, 18vw, 260px)",
          aspectRatio: "16/9",
          backgroundColor: "#f0eeea",
          marginBottom: "14px",
        }}
      />
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "normal",
          fontSize: "12px",
          letterSpacing: "0.14em",
          color: "var(--text-faint)",
          display: "block",
          marginBottom: "6px",
        }}
      >
        {toRoman(index + 1)}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(24px, 3.5vw, 52px)",
          lineHeight: 1,
          color: "var(--text-faint)",
        }}
      >
        À venir
      </span>
    </motion.div>
  );
}

export default function IndexList() {
  const placeholders = Math.max(0, 5 - projets.length);

  return (
    <section
      id="travaux"
      className="scroll-mt-20"
      style={{ backgroundColor: "var(--bg)", paddingTop: "120px", paddingBottom: "80px" }}
    >
      {/* Label section */}
      <div
        style={{
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
          marginBottom: "80px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "normal",
            fontSize: "11px",
            letterSpacing: "0.22em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Travaux
        </span>
      </div>

      {/* Cascade */}
      <div style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
        {projets.map((p, i) => (
          <ProjectEntry key={p.id} projet={p} index={i} />
        ))}
        {Array.from({ length: placeholders }).map((_, i) => (
          <PlaceholderEntry key={i} index={projets.length + i} />
        ))}
      </div>
    </section>
  );
}
