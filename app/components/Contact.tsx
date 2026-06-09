"use client";

import { useState } from "react";

const EMAIL = "contact@iridescence.fr";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard indisponible */ }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20"
      style={{
        backgroundColor: "var(--bg)",
        minHeight: "80vh",
        padding: "100px clamp(24px, 5vw, 80px) 80px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: "11px",
          letterSpacing: "0.22em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: "80px",
        }}
      >
        Contact
      </span>

      {/* Corps : nom en grand + infos scattées */}
      <div style={{ position: "relative", flex: 1 }}>

        {/* Lettres IRIDESCENCE en grand au centre */}
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
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(60px, 14vw, 200px)",
              lineHeight: 1,
              color: "var(--border)",
              userSelect: "none",
              letterSpacing: "-0.02em",
            }}
          >
            Iridescence
          </span>
        </div>

        {/* Email — gauche */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "48px" }}>
          <button
            onClick={copy}
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 28px)",
              color: "var(--ink)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "block",
              minHeight: "44px",
            }}
          >
            {copied ? "Copié ✓" : EMAIL}
          </button>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "11px",
              letterSpacing: "0.16em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginTop: "6px",
              display: "block",
            }}
          >
            {copied ? "" : "Cliquer pour copier"}
          </span>
        </div>

        {/* Liens réseaux + localisation — bas droite */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            textAlign: "right",
            zIndex: 1,
          }}
        >
          <a
            href="https://instagram.com/iridescence"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.8vw, 24px)",
              color: "var(--ink)",
              display: "block",
              marginBottom: "8px",
              minHeight: "44px",
              lineHeight: "44px",
            }}
          >
            Instagram
          </a>
          <a
            href="https://vimeo.com/iridescence"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.8vw, 24px)",
              color: "var(--ink)",
              display: "block",
              marginBottom: "20px",
              minHeight: "44px",
              lineHeight: "44px",
            }}
          >
            Vimeo
          </a>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            Bordeaux, France
          </span>
        </div>
      </div>
    </section>
  );
}
