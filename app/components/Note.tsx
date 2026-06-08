"use client";

import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";

const manifesto =
  "Iridescence est une maison de production indépendante basée à Bordeaux. " +
  "On est cinq, chacun à son poste, avec l’envie de faire des films, des documentaires " +
  "et des clips qui ont une vraie forme. Pas du contenu, pas du corporate sans idée. " +
  "On cherche des images fortes, nocturnes, élégantes, parfois sales, toujours pensées. " +
  "Un endroit pour produire sérieusement, sans lisser ce qui fait la force d’un projet.";

export default function Note() {
  return (
    <section
      id="note"
      className="px-6 md:px-8 py-20 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <h2 className="mb-10" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
        <ScrambleText text="NOTE / MANIFESTE" trigger="view" />
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: "60ch",
          fontSize: "clamp(16px, 1.8vw, 24px)",
          lineHeight: 1.75,
          color: "var(--text-primary)",
        }}
      >
        {manifesto}
      </motion.p>
    </section>
  );
}
