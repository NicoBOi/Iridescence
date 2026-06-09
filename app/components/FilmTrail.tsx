"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Traînée de cadres pellicule qui suit le curseur (inspiré « image cursor trail »).
 * Justification : fait surgir des images de film là où l'index est purement
 * typographique — le regard balaie, des cadres s'allument et s'effacent.
 * Désactivé sous reduced-motion et sur pointeur grossier (tactile).
 */
type Frame = { id: number; x: number; y: number; v: number };

const VARIANTS = [
  "linear-gradient(135deg,#3a352f,#0f0d0b)",
  "linear-gradient(135deg,#2a2520,#0c0a08)",
  "radial-gradient(120% 120% at 30% 20%,#46403a,#100e0b)",
  "linear-gradient(200deg,#211d18,#080706)",
];

export default function FilmTrail({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const seq = useRef(0);
  const [frames, setFrames] = useState<Frame[]>([]);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const box = wrap.current?.getBoundingClientRect();
      if (!box) return;
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      // Espacement minimal entre deux cadres (évite la surcharge).
      if (Math.hypot(dx, dy) < 90) return;
      last.current = { x, y, t: Date.now() };
      const id = seq.current++;
      setFrames((f) => [...f.slice(-7), { id, x, y, v: id % VARIANTS.length }]);
    },
    [reduce]
  );

  const remove = (id: number) => setFrames((f) => f.filter((fr) => fr.id !== id));

  return (
    <div ref={wrap} onMouseMove={onMove} style={{ position: "relative" }}>
      {/* Cadres : sous le contenu, au-dessus du fond. pointer-events none. */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {frames.map((fr) => (
          <span
            key={fr.id}
            className="film-frame"
            onAnimationEnd={() => remove(fr.id)}
            style={{ left: fr.x, top: fr.y, backgroundImage: VARIANTS[fr.v] }}
          />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
