"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!lineRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      lineRef.current.style.transform = `translateX(${x}px)`;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-8 pt-28 pb-12 overflow-hidden">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

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
              fontSize: "clamp(72px, 13vw, 200px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
            }}
          >
            Iridi<br />
            <span style={{ color: "var(--accent)" }}>es</span>cence
          </h1>
        </motion.div>

        <motion.div
          ref={lineRef}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-8"
          style={{
            height: "1px",
            backgroundColor: "var(--border)",
            transformOrigin: "left",
            transition: "transform 0.4s ease",
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
            Maison de production ind&eacute;pendante. Bordeaux.
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
            className="w-[6px] h-[6px] rounded-full animate-pulse"
            style={{ backgroundColor: "var(--accent)" }}
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
