"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * Bande typographique dont la vitesse suit le scroll (scroll velocity marquee).
 * Pattern 21st.dev / motion scroll-linked.
 * Accélère en scrollant, revient à la vitesse de base avec spring.
 * Désactivé sous reduced-motion : défilement statique à vitesse constante.
 */
export default function VelocityMarquee({
  text = "IRIDESCENCE · FILMS · DOCUMENTAIRES · CLIPS · BORDEAUX · MAISON DE PRODUCTION ·",
  baseVelocity = 60,
}: {
  text?: string;
  baseVelocity?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const rawVelocity = useMotionValue(baseVelocity);
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 400 });
  const lastScroll = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentWidth = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const delta = window.scrollY - lastScroll.current;
      lastScroll.current = window.scrollY;
      rawVelocity.set(baseVelocity + delta * 3);
      setTimeout(() => rawVelocity.set(baseVelocity), 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce, baseVelocity, rawVelocity]);

  useEffect(() => {
    if (!wrapRef.current) return;
    // Mesure la largeur d'une répétition du texte.
    const el = wrapRef.current.firstElementChild as HTMLElement | null;
    if (el) contentWidth.current = el.offsetWidth;
  });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    if (!contentWidth.current) return;
    const v = smoothVelocity.get();
    x.set((x.get() - (v * delta) / 1000) % contentWidth.current);
  });

  // Deux répétitions suffisent pour un défilement sans fin.
  const reps = [0, 1, 2];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 0",
        whiteSpace: "nowrap",
        cursor: "default",
      }}
    >
      <motion.div style={{ x, display: "inline-flex" }}>
        {reps.map((i) => (
          <span
            key={i}
            ref={i === 0 ? wrapRef : undefined}
            className="font-display uppercase"
            style={{
              display: "inline-block",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "var(--text-muted)",
              paddingRight: "2em",
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
