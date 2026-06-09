"use client";

import { useState } from "react";
import LetterReveal from "./LetterReveal";
import ScrambleText from "./ScrambleText";

const EMAIL = "contact@iridescence.fr";

const links = [
  { label: "Instagram", value: "@iridescence", href: "https://instagram.com/iridescence" },
  { label: "Vimeo", value: "iridescence", href: "https://vimeo.com/iridescence" },
];

const rowClass =
  "group grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] items-center gap-4 min-h-[56px] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]";
const rowStyle: React.CSSProperties = {
  borderBottom: "1px solid var(--border)",
  paddingLeft: "8px",
  paddingRight: "8px",
  marginLeft: "-8px",
  marginRight: "-8px",
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* presse-papiers indisponible : on ne casse rien */
    }
  };

  return (
    <section
      id="contact"
      className="px-6 md:px-8 py-20 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <h2 className="mb-10" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
        <ScrambleText text="CONTACT" trigger="view" />
      </h2>

      <p
        className="font-display uppercase mb-14"
        style={{ fontWeight: 600, fontSize: "clamp(28px, 5vw, 64px)", lineHeight: 1.02, letterSpacing: "0.01em", maxWidth: "18ch" }}
      >
        <LetterReveal text="Films, clips, documentaires, projets visuels." view stagger={0.018} />
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {/* Email : clic pour copier (justif : contact sans friction, retour tactile) */}
        <button data-magnetic onClick={copy} className={`${rowClass} w-full text-left`} style={rowStyle}>
          <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
            Email
          </span>
          <span className="flex items-center justify-between gap-4">
            <span style={{ fontSize: "14px" }}>
              {copied ? "Copié ✓" : <ScrambleText text={EMAIL} trigger="hover" />}
            </span>
            <span className="uppercase opacity-50" style={{ fontSize: "10px", letterSpacing: "0.16em" }}>
              {copied ? "" : "Copier"}
            </span>
          </span>
        </button>

        {links.map(({ label, value, href }) => (
          <a
            data-magnetic
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
            style={rowStyle}
          >
            <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
              {label}
            </span>
            <span style={{ fontSize: "14px" }}>
              <ScrambleText text={value} trigger="hover" />
            </span>
          </a>
        ))}

        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] items-center gap-4 py-4">
          <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
            Atelier
          </span>
          <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Bordeaux, France</span>
        </div>
      </div>
    </section>
  );
}
