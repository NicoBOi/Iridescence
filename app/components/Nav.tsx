"use client";

import { useEffect, useState } from "react";
import type { PanelId } from "../page";

const links: { label: string; id: PanelId }[] = [
  { label: "Travaux",   id: "travaux"   },
  { label: "Note",      id: "note"      },
  { label: "Générique", id: "generique" },
  { label: "Contact",   id: "contact"   },
];

export default function Nav() {
  const [active, setActive] = useState<PanelId>("hero");
  // Panneaux sur fond blanc → UI sombre.
  const light = active === "generique" || active === "contact";
  const ink = light ? "13, 11, 9" : "255, 255, 255";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<PanelId>).detail);
    window.addEventListener("irid:active", handler);
    return () => window.removeEventListener("irid:active", handler);
  }, []);

  const go = (id: PanelId) =>
    window.dispatchEvent(new CustomEvent("irid:goto", { detail: id }));

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
        pointerEvents: "none",
      }}
    >
      <button
        onClick={() => go("hero")}
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 15,
          letterSpacing: "0.06em",
          color: `rgba(${ink}, ${active === "hero" ? 0.92 : 0.82})`,
          transition: "color 0.6s ease",
          pointerEvents: "auto",
          minHeight: 44,
        }}
      >
        Iridescence
      </button>

      <ul style={{ display: "flex", gap: 28, listStyle: "none", padding: 0, margin: "4px 0 0", pointerEvents: "auto" }}>
        {links.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => go(id)}
              className="u"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: `rgba(${ink}, ${active === id ? 0.95 : 0.45})`,
                transition: "color 0.6s ease",
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
