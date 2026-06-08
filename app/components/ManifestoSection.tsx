"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const words = [
  "Iridescence", "est", "une", "maison", "de", "production", "indépendante",
  "basée", "à", "Bordeaux.", "On", "est", "cinq,", "chacun", "à",
  "son", "poste,", "avec", "l’envie", "de", "faire", "des", "films,", "des",
  "documentaires", "et", "des", "clips", "qui", "ont", "une", "vraie", "forme.",
  "Pas", "du", "contenu,", "pas", "du", "corporate", "sans", "idée.", "On",
  "cherche", "des", "images", "fortes,", "nocturnes,", "élégantes,",
  "parfois", "sales,", "toujours", "pensées.", "Un", "endroit", "pour",
  "produire", "sérieusement,", "sans", "lisser", "ce", "qui", "fait", "la",
  "force", "d’un", "projet."
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="px-8 py-24 relative"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }}
          >
            Manifeste
          </span>
          <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
        </div>

        <p className="leading-relaxed" style={{ fontSize: "clamp(18px, 2.4vw, 32px)", lineHeight: 1.5 }}>
          {words.map((word, i) => {
            const finalOpacity = i < 3 ? 1 : 0.85;
            return (
              <motion.span
                key={i}
                initial={reduceMotion ? false : { opacity: 0.1 }}
                animate={
                  reduceMotion
                    ? { opacity: finalOpacity }
                    : isInView
                    ? { opacity: finalOpacity }
                    : { opacity: 0.1 }
                }
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.015, ease: "easeOut" }}
                className="inline-block mr-[0.28em]"
                style={{
                  fontWeight: 300,
                  color: i < 3 ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
