"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** true: révèle à l'entrée dans le viewport ; false: au montage */
  view?: boolean;
};

/**
 * Révèle un titre lettre par lettre.
 * Justification : un carton-titre qui s'assemble, comme un générique de film.
 * (Le décalage vertical est une transform, donc neutralisé sous reduced-motion
 * par MotionConfig ; seule l'opacité subsiste.)
 */
export default function LetterReveal({ text, className, style, delay = 0, stagger = 0.045, view = false }: Props) {
  const reveal = { opacity: 1, y: 0 };
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: "38%" }}
          {...(view
            ? { whileInView: reveal, viewport: { once: true, margin: "-10%" } }
            : { animate: reveal })}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}
