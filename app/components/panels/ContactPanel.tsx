"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SectionId } from "../../page";

type Props = { onNav: (id: SectionId) => void };
const EMAIL = "contact@iridescence.fr";

export default function ContactPanel({ onNav: _ }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    catch { /* clipboard indisponible */ }
  };

  return (
    <section
      style={{
        minHeight: "100svh",
        backgroundColor: "rgba(255,255,255,0.97)",
        color: "var(--ink)",
        padding: "clamp(100px,12vh,160px) clamp(28px,5vw,80px) 80px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span style={{ fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.22em", color: "#9a9490", textTransform: "uppercase", marginBottom: 80 }}>
        Contact
      </span>

      {/* Grand nom en fond */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "clamp(48px,13vw,180px)",
          lineHeight: 1,
          color: "#ece9e4",
          userSelect: "none",
          letterSpacing: "-0.02em",
        }}>
          Iridescence
        </span>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <button
            onClick={copy}
            className="u"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px,2.4vw,32px)",
              color: "var(--ink)",
              display: "block",
              minHeight: 44,
              lineHeight: "44px",
            }}
          >
            {copied ? "Copié ✓" : EMAIL}
          </button>
          {!copied && (
            <span style={{ fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.16em", color: "#9a9490", textTransform: "uppercase" }}>
              Cliquer pour copier
            </span>
          )}
        </div>

        {/* Réseaux bas droite */}
        <div style={{ textAlign: "right" }}>
          <a href="https://instagram.com/iridescence" target="_blank" rel="noopener noreferrer"
            className="u" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(16px,2vw,26px)", color: "var(--ink)", display: "block", marginBottom: 6, minHeight: 44, lineHeight: "44px" }}>
            Instagram
          </a>
          <a href="https://vimeo.com/iridescence" target="_blank" rel="noopener noreferrer"
            className="u" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(16px,2vw,26px)", color: "var(--ink)", display: "block", marginBottom: 20, minHeight: 44, lineHeight: "44px" }}>
            Vimeo
          </a>
          <span style={{ fontFamily: "var(--serif)", fontSize: 12, letterSpacing: "0.1em", color: "#9a9490" }}>Bordeaux, France</span>
        </div>
      </motion.div>
    </section>
  );
}
