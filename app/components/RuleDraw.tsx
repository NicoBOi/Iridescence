"use client";

import { motion } from "framer-motion";

type Props = {
  color?: string;
  delay?: number;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  /** true: se trace à l'entrée dans le viewport ; false: au montage */
  view?: boolean;
};

/**
 * Filet qui se trace de gauche à droite.
 * Justification : la règle d'un registre qu'on tire à l'encre.
 */
export default function RuleDraw({ color = "var(--border)", delay = 0, height = "1px", className, style, view = false }: Props) {
  const motionProps = view
    ? { whileInView: { scaleX: 1 }, viewport: { once: true, margin: "-10%" } }
    : { animate: { scaleX: 1 } };

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      {...motionProps}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ height, backgroundColor: color, transformOrigin: "left", ...style }}
    />
  );
}
