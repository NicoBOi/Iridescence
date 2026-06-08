"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const manifesto =
  "Iridescence est une maison de production indépendante basée à Bordeaux. " +
  "On est cinq, chacun à son poste, avec l’envie de faire des films, des documentaires " +
  "et des clips qui ont une vraie forme. Pas du contenu, pas du corporate sans idée. " +
  "On cherche des images fortes, nocturnes, élégantes, parfois sales, toujours pensées. " +
  "Un endroit pour produire sérieusement, sans lisser ce qui fait la force d’un projet.";

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
            style={{ color: "var(--text-primary)" }}
          >
            Manifeste
          </span>
          <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(18px, 2.4vw, 32px)",
            lineHeight: 1.5,
            fontWeight: 300,
            color: "var(--text-primary)",
          }}
        >
          {manifesto}
        </motion.p>
      </div>
    </section>
  );
}
