"use client";

import { motion } from "framer-motion";

export default function Note() {
  return (
    <section
      id="note"
      className="px-6 md:px-8 py-24 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: "52ch",
          fontSize: "clamp(16px, 1.8vw, 22px)",
          lineHeight: 1.75,
          color: "var(--text-primary)",
        }}
      >
        On est cinq, chacun à son poste. On fait des films, des documentaires et des clips
        qui ont une vraie forme. Images fortes, nocturnes, toujours pensées.
      </motion.p>
    </section>
  );
}
