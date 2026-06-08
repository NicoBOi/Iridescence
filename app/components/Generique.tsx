"use client";

import { motion } from "framer-motion";
import { equipe } from "@/data/equipe";
import ScrambleText from "./ScrambleText";

export default function Generique() {
  return (
    <section
      id="generique"
      className="px-6 md:px-8 py-20 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <div className="mb-10">
        <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
          <ScrambleText text="GÉNÉRIQUE" trigger="view" />
        </h2>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {equipe.map((membre, i) => (
          <motion.div
            key={membre.roleCode}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-[40px_1fr] md:grid-cols-[44px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,120px)] gap-x-4 gap-y-1 items-baseline py-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{membre.roleCode}</span>
            <span
              className="font-display uppercase transition-transform duration-300 group-hover:translate-x-2"
              style={{ fontWeight: 600, fontSize: "clamp(20px, 2.6vw, 32px)", lineHeight: 1, letterSpacing: "0.01em" }}
            >
              {membre.role}
            </span>
            <span
              className="hidden md:block uppercase transition-colors duration-300"
              style={{ fontSize: "12px", letterSpacing: "0.08em", color: membre.nom ? "var(--text-secondary)" : "var(--text-faint)" }}
            >
              {membre.nom ?? "À confirmer"}
            </span>
            <span className="hidden md:flex items-baseline gap-4 uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>
              {membre.instagram && (
                <a
                  href={membre.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center min-h-[44px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Insta
                </a>
              )}
              {membre.vimeo && (
                <a
                  href={membre.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center min-h-[44px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Vimeo
                </a>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
