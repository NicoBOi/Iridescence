import type { PanelId } from "../../page";
import { motion } from "framer-motion";

type Props = { onNav: (id: PanelId) => void };

export default function HeroPanel({ onNav }: Props) {
  return (
    <section
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(52px, 11vw, 180px)",
          lineHeight: 1,
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
        }}
      >
        Iridescence
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "clamp(13px, 1.4vw, 17px)",
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.04em",
          marginTop: 20,
        }}
      >
        Maison de production indépendante · Bordeaux
      </motion.p>

      {/* Entrée dans les travaux */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        onClick={() => onNav("travaux")}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--serif)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.35)",
          minHeight: 44,
          display: "flex",
          alignItems: "center",
        }}
      >
        ↓
      </motion.button>
    </section>
  );
}
