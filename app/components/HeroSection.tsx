"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-8 pt-28 pb-12 overflow-hidden">
      {/* Main title */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-editorial leading-none select-none"
            style={{
              fontSize: "clamp(44px, 11vw, 170px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
            }}
          >
            Iridescence
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-8"
          style={{
            height: "1px",
            backgroundColor: "var(--border)",
            transformOrigin: "left",
            maxWidth: "60%",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col gap-1"
          style={{ paddingLeft: "2px" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)", letterSpacing: "0.12em" }}>
            Maison de production indépendante. Bordeaux.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
            Films&nbsp;&nbsp;&middot;&nbsp;&nbsp;Documentaires&nbsp;&nbsp;&middot;&nbsp;&nbsp;Clips
          </p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex items-end justify-between"
      >
        <span
          className="text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--text-muted)" }}
        >
          2024
        </span>
        <div className="flex items-center gap-2">
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--text-secondary)" }}
          >
            Actif
          </span>
        </div>
      </motion.div>
    </section>
  );
}
