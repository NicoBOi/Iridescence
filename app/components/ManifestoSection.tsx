"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.08 }}
              animate={isInView ? { opacity: i < 3 ? 1 : 0.75 } : { opacity: 0.08 }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
              className="inline-block mr-[0.28em]"
              style={{
                fontWeight: 300,
                color: i < 3 ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
