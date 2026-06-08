"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Grain argentique animé en superposition.
 * Justification : texture pellicule, signe le « cinéma de nuit ».
 * Sous reduced-motion : grain figé (aucune animation de position).
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
    </svg>`
  );

export default function Grain({ opacity = 0.14 }: { opacity?: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={reduce ? "" : "grain-shift"}
      style={{
        position: "absolute",
        inset: "-50%",
        width: "200%",
        height: "200%",
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: "160px 160px",
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
}
