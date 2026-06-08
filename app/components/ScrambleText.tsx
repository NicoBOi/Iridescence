"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·#*".split("");

type Props = {
  text: string;
  /** mount: au montage · hover: au survol · view: à l'entrée dans le viewport */
  trigger?: "mount" | "hover" | "view";
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Effet de décodage : le texte se résout depuis des glyphes aléatoires.
 * Justification : geste de catalogage/déchiffrage propre à un registre.
 * Réservé au monospace (largeur stable, pas de saut de mise en page).
 */
export default function ScrambleText({ text, trigger = "hover", speed = 480, className, style }: Props) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const play = () => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const len = text.length;
    const tick = (now: number) => {
      const p = Math.min((now - start) / speed, 1);
      const revealed = p * len;
      let out = "";
      for (let i = 0; i < len; i++) {
        const c = text[i];
        if (c === " ") out += " ";
        else if (i < revealed) out += c;
        else out += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else {
        setDisplay(text);
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") play();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (trigger === "view" && inView) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={trigger === "hover" ? play : undefined}
    >
      {display}
    </span>
  );
}
