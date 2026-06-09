"use client";

import { useEffect, useState } from "react";
import type { PanelId } from "../page";

const links: { label: string; id: PanelId }[] = [
  { label: "Travaux",   id: "travaux"   },
  { label: "Note",      id: "note"      },
  { label: "Générique", id: "generique" },
  { label: "Contact",   id: "contact"   },
];

// Canal d'événements entre la page et la nav (évite prop drilling cross-layout).
export function navigateTo(id: PanelId) {
  window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }));
}

export default function Nav() {
  const [active, setActive] = useState<PanelId>("hero");
  // Les panneaux blancs (Generique, Contact) → texte sombre
  const isLight = active === "generique" || active === "contact";
  const fg = isLight ? "var(--ink)" : "rgba(255,255,255,0.82)";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<PanelId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  const go = (id: PanelId) => {
    window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }));
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 28,
        color: fg,
        transition: "color 0.5s ease",
        pointerEvents: "none",
      }}
    >
      {/* Wordmark */}
      <button
        onClick={() => go("hero")}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 15,
          letterSpacing: "0.06em",
          color: fg,
          transition: "color 0.5s ease",
          pointerEvents: "auto",
          minHeight: 44,
        }}
      >
        Iridescence
      </button>

      {/* Liens */}
      <ul style={{ display: "flex", gap: 28, marginTop: 8, listStyle: "none", padding: 0, margin: "8px 0 0", pointerEvents: "auto" }}>
        {links.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => go(id)}
              className="u"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 13,
                letterSpacing: "0.04em",
                color: active === id ? fg : `${fg.replace("0.82","0.45")}`,
                transition: "color 0.5s ease",
                minHeight: 44,
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
