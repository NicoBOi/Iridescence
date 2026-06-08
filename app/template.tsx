"use client";

import { motion } from "framer-motion";

/**
 * Transition de page : fondu à l'arrivée sur chaque route.
 * Justification : un fondu d'entrée entre deux entrées du registre.
 * Opacité seule (aucune transform) pour ne pas créer de bloc de confinement
 * qui casserait la nav en position fixed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
