"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Visuel de projet révélé par un volet vertical (clip-path).
 * Justification : une coupe / un rideau de projection qui dévoile le plan.
 * Sous reduced-motion : pas de volet, le visuel est présent d'emblée.
 */
export default function ProjectVisual({ src, alt }: { src?: string; alt: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: "var(--surface)" }}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes="100vw" priority className="object-cover" />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-faint)" }}
          >
            Visuel à venir
          </div>
        )}
      </motion.div>
    </div>
  );
}
