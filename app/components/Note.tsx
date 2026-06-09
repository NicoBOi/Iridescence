"use client";

import { motion } from "framer-motion";

export default function Note() {
  return (
    <section
      id="note"
      className="scroll-mt-20"
      style={{ backgroundColor: "var(--film)" }}
    >
      {/* Section noire : phrase manifeste centrée */}
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px clamp(40px, 8vw, 160px)",
          position: "relative",
        }}
      >
        {/* Roman numeral bord gauche */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--serif)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          II
        </span>
        {/* Catégorie bord droit */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Note
        </span>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.8vw, 42px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
            maxWidth: "28ch",
            textAlign: "center",
          }}
        >
          On est cinq, chacun à son poste. On fait des films qui ont une vraie forme.
          Images fortes, nocturnes, toujours pensées.
        </motion.p>
      </div>
    </section>
  );
}
