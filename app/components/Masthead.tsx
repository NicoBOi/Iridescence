"use client";

import { motion } from "framer-motion";

export default function Masthead() {
  return (
    <header className="px-6 md:px-8 pt-28 md:pt-36 pb-10">
      {/* Ligne d'en-tête du document */}
      <div
        className="flex items-center justify-between uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.16em", color: "var(--text-muted)" }}
      >
        <span>Index des travaux</span>
        <span>Est. 2024</span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display uppercase mt-4"
        style={{
          fontWeight: 700,
          fontSize: "clamp(40px, 13vw, 200px)",
          lineHeight: 0.9,
          letterSpacing: "0.005em",
          color: "var(--ink)",
        }}
      >
        Iridescence
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "1px", backgroundColor: "var(--ink)", transformOrigin: "left", marginTop: "18px" }}
      />

      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-secondary)", marginTop: "14px" }}
      >
        <span>Maison de production indépendante. Bordeaux, France.</span>
        <span>Films · Documentaires · Clips</span>
      </div>
    </header>
  );
}
