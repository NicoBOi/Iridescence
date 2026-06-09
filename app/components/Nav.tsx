"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "../page";

const links: { label: string; id: SectionId }[] = [
  { label: "Archive",  id: "archive"  },
  { label: "Talent",   id: "talent"   },
  { label: "Approche", id: "approche" },
  { label: "Contact",  id: "contact"  },
];

export default function Nav() {
  const [active, setActive] = useState<SectionId>("featured");
  // Sections à fond blanc → encre sombre
  const isLight = active === "talent" || active === "contact";
  const ink = isLight ? "13, 11, 9" : "255, 255, 255";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<SectionId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  const go = (id: SectionId) =>
    window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }));

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 24,
        transition: "color 0.5s ease",
        pointerEvents: "none",
      }}
    >
      {/* Wordmark → retour à Featured */}
      <button
        onClick={() => go("featured")}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 15,
          letterSpacing: "0.06em",
          color: `rgba(${ink}, 0.95)`,
          transition: "color 0.5s ease",
          pointerEvents: "auto",
          minHeight: 40,
        }}
      >
        Iridescence
      </button>

      <ul style={{ display: "flex", gap: 26, marginTop: 6, listStyle: "none", padding: 0, margin: "6px 0 0", pointerEvents: "auto" }}>
        {links.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => go(id)}
              className="u"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: `rgba(${ink}, ${active === id ? 0.95 : 0.5})`,
                transition: "color 0.5s ease",
                minHeight: 40,
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
