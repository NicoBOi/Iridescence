"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORD = "IRIDESCENCE".split("");

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "var(--paper)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", overflow: "hidden" }}>
            {WORD.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 4vw, 44px)",
                  letterSpacing: "0.08em",
                  color: "var(--ink)",
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "1px solid rgba(13,11,9,0.2)",
              borderTopColor: "rgba(13,11,9,0.7)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
