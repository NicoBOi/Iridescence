"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projets, type Projet } from "@/data/projets";
import { playFilm } from "../FilmPlayer";
import type { SectionId } from "../../page";

type Props = { onNav: (id: SectionId) => void };

function toRoman(n: number) {
  const v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const s = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let r = ""; for (let i = 0; i < v.length; i++) while (n >= v[i]) { r += s[i]; n -= v[i]; } return r;
}

const PLACEHOLDERS = 5;
const X_OFFSET = ["4vw", "14vw", "24vw", "34vw", "42vw"];

type Mode = "cascade" | "cercle";

export default function TravauxPanel({ onNav }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("cascade");
  const items: Projet[] = projets;
  const showPlaceholders = Math.max(0, PLACEHOLDERS - items.length);

  const open = (p: Projet) => {
    if (p.youtubeId) playFilm(p);
    else onNav("approche");
  };

  return (
    <section
      style={{
        minHeight: "100svh",
        backgroundColor: "rgba(0,0,0,0.72)",
        overflowY: "auto",
        padding: "clamp(100px,12vh,160px) 0 80px",
        position: "relative",
      }}
    >
      {/* Label + bascule de mode */}
      <div
        style={{
          paddingLeft: "clamp(28px,5vw,80px)",
          paddingRight: "clamp(28px,5vw,80px)",
          marginBottom: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          Archive        </span>
        <div style={{ display: "flex", gap: 18 }}>
          {(["cascade", "cercle"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="u"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 13,
                letterSpacing: "0.06em",
                color: mode === m ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                transition: "color 0.4s",
                minHeight: 44,
              }}
            >
              {m === "cascade" ? "Cascade" : "Cercle"}
            </button>
          ))}
        </div>
      </div>

      {mode === "cascade" ? (
        <div>
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginLeft: X_OFFSET[Math.min(i, X_OFFSET.length - 1)], marginBottom: 48 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <button type="button" onClick={() => open(p)} style={{ display: "inline-block", textAlign: "left" }}>
                <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                  {toRoman(i + 1)}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(28px,5vw,72px)",
                    lineHeight: 1,
                    color: hovered === i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.92)",
                    transition: "color 0.5s",
                    letterSpacing: "0.01em",
                  }}
                >
                  {p.titre}
                </span>
                <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
                  {p.type} · {p.annee}{p.client ? ` · ${p.client}` : ""}
                </span>
              </button>
            </motion.div>
          ))}

          {Array.from({ length: showPlaceholders }).map((_, i) => {
            const idx = items.length + i;
            return (
              <motion.div
                key={`ph-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: idx * 0.06 }}
                style={{ marginLeft: X_OFFSET[Math.min(idx, X_OFFSET.length - 1)], marginBottom: 48 }}
              >
                <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.14)", marginBottom: 8 }}>
                  {toRoman(idx + 1)}
                </span>
                <span style={{ display: "block", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(28px,5vw,72px)", lineHeight: 1, color: "rgba(255,255,255,0.14)", letterSpacing: "0.01em" }}>
                  À venir
                </span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <CircleArchive items={items} onOpen={open} />
      )}
    </section>
  );
}

/* Archive radiale : la liste s'enroule en arc autour d'un titre central. */
function CircleArchive({ items, onOpen }: { items: Projet[]; onOpen: (p: Projet) => void }) {
  const [focus, setFocus] = useState(0);
  const center = items[focus];
  const R = 38; // rayon en % de la plus petite dimension

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "min(70vh, 620px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Cercle guide */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "min(70vh,620px)",
          height: "min(70vh,620px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />

      {/* Titre central */}
      {center && (
        <motion.button
          key={center.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => onOpen(center)}
          style={{ textAlign: "center", maxWidth: "50%" }}
        >
          {center.client && (
            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 13, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
              {center.client}
            </span>
          )}
          <span style={{ display: "block", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(28px,4vw,56px)", lineHeight: 1.05, color: "rgba(255,255,255,0.95)", margin: "8px 0" }}>
            {center.titre}
          </span>
          <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
            {center.type} · {center.annee}
          </span>
        </motion.button>
      )}

      {/* Entrées réparties sur le cercle */}
      {items.map((p, i) => {
        const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + R * Math.cos(angle);
        const y = 50 + R * Math.sin(angle);
        const isFocus = i === focus;
        return (
          <button
            key={p.id}
            onMouseEnter={() => setFocus(i)}
            onClick={() => (isFocus ? onOpen(p) : setFocus(i))}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%,-50%)",
              fontFamily: "var(--serif)",
              fontSize: 13,
              letterSpacing: "0.08em",
              color: isFocus ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
              transition: "color 0.4s",
              whiteSpace: "nowrap",
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontStyle: "italic", opacity: 0.6 }}>{toRoman(i + 1)}</span>
            {p.titre}
          </button>
        );
      })}
    </div>
  );
}
