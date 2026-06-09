"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projets } from "@/data/projets";
import type { PanelId } from "../../page";

type Props = { onNav: (id: PanelId) => void };

function toRoman(n: number) {
  const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r=""; for(let i=0;i<v.length;i++) while(n>=v[i]){r+=s[i];n-=v[i];} return r;
}

const PLACEHOLDERS = 5;
const X_OFFSET = ["4vw", "14vw", "24vw", "34vw", "42vw"];

export default function TravauxPanel(_: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = projets;
  const showPlaceholders = Math.max(0, PLACEHOLDERS - items.length);

  return (
    <section
      style={{
        minHeight: "100svh",
        backgroundColor: "rgba(0,0,0,0.70)",
        padding: "clamp(110px,14vh,180px) 0 90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ paddingLeft: "clamp(28px,5vw,80px)", marginBottom: 56 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          Travaux
        </span>
      </div>

      <div>
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginLeft: X_OFFSET[Math.min(i, X_OFFSET.length - 1)], marginBottom: 44 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
              {toRoman(i + 1)}
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(28px,5vw,72px)", lineHeight: 1,
              color: hovered === i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.92)",
              transition: "color 0.5s", letterSpacing: "0.01em",
            }}>
              {p.titre}
            </span>
            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
              {p.type} · {p.annee}
            </span>
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
              style={{ marginLeft: X_OFFSET[Math.min(idx, X_OFFSET.length - 1)], marginBottom: 44 }}
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
    </section>
  );
}
