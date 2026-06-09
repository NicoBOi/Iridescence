"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * Curseur personnalisé : blob blanc mix-blend exclusion.
 * Résultat : il inverse les couleurs sous lui (texte encre → papier, fond papier → encre).
 * Effet "luxe brutal" issu de 21st.dev / motion cursor pattern.
 * Grossit sur les éléments [data-magnetic] (liens, boutons).
 * Masqué sur tactile et sous reduced-motion.
 */
export default function MagneticCursor() {
  const reduce = useReducedMotion();
  const blobRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 });
  const scale = useMotionValue(1);
  const ss = useSpring(scale, { stiffness: 200, damping: 24 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Masque le curseur natif sur tout le document.
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const enter = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("[data-magnetic]")) scale.set(2.8);
    };
    const leave = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("[data-magnetic]")) scale.set(1);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [reduce, mx, my, scale]);

  if (reduce) return null;

  return (
    <motion.div
      ref={blobRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        scale: ss,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "var(--bg)",
        mixBlendMode: "exclusion",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
