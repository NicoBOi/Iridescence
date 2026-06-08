"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

function format(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  const frames = Math.floor((d.getMilliseconds() / 1000) * 24); // 24 i/s
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}:${p(frames)}`;
}

/**
 * Timecode courant HH:MM:SS:FF (24 i/s).
 * Justification : compteur de bobine, signale une maison de production en activité.
 * Sous reduced-motion : figé sur l'heure courante (pas de défilement).
 */
export default function Timecode({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    if (reduce) {
      setTc(format(new Date()));
      return;
    }
    let raf: number;
    const loop = () => {
      setTc(format(new Date()));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <span className={className} style={style} suppressHydrationWarning>
      {tc}
    </span>
  );
}
