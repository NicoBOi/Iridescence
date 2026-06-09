import { motion } from "framer-motion";
import type { PanelId } from "../../page";

type Props = { onNav: (id: PanelId) => void };

export default function NotePanel({ onNav: _ }: Props) {
  return (
    <section
      style={{
        height: "100svh",
        backgroundColor: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0 clamp(40px,10vw,180px)",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 28,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--serif)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.18)",
        }}
      >
        II
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.18)",
        }}
      >
        Note
      </span>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(22px,3.2vw,48px)",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.82)",
          maxWidth: "26ch",
          textAlign: "center",
        }}
      >
        On est cinq, chacun à son poste. On fait des films qui ont une vraie forme.
        Images fortes, nocturnes, toujours pensées.
      </motion.p>
    </section>
  );
}
