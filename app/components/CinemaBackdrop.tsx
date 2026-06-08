"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Grain from "./Grain";

/**
 * Fond cinéma du masthead : vidéo muette en boucle si disponible, sinon
 * cadre sombre dégradé. Grain pellicule + vignette par-dessus.
 * Sous reduced-motion : la vidéo ne démarre pas (image figée sur la 1re frame).
 */
export default function CinemaBackdrop({ src = "/reel.mp4" }: { src?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) {
      v.pause();
    } else {
      v.play().catch(() => {
        /* autoplay refusé : le cadre dégradé reste visible */
      });
    }
  }, [reduce]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Cadre sombre de repli (toujours présent sous la vidéo) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 120% at 70% 20%, #2a2520 0%, #16130f 45%, #0c0a08 100%)",
        }}
      />
      {ok && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setOk(false)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.05)",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <Grain opacity={0.16} />
      {/* Vignette : assombrit les bords, lisibilité du titre */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,10,8,0.85) 0%, rgba(12,10,8,0.1) 45%, rgba(12,10,8,0.35) 100%)",
        }}
      />
    </div>
  );
}
