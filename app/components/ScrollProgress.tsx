"use client";

import { useEffect, useState } from "react";

/**
 * Filet d'encre en haut de page, rempli selon la progression du scroll.
 * Justification : position dans la bobine / avancement dans le document.
 * Piloté par le scroll utilisateur (pas d'animation autonome), donc conservé
 * sous reduced-motion.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 z-[60] pointer-events-none"
      style={{ top: 0, height: "2px" }}
    >
      <div style={{ height: "100%", width: `${progress * 100}%`, backgroundColor: "var(--ink)" }} />
    </div>
  );
}
