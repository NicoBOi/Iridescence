"use client";

import { useEffect, useState } from "react";
import type { PanelId } from "../page";

const META: Record<PanelId, { num: string; right: string }> = {
  hero:      { num: "I",   right: "Bordeaux" },
  travaux:   { num: "II",  right: "Travaux" },
  note:      { num: "III", right: "Note d'intention" },
  generique: { num: "IV",  right: "Générique" },
  contact:   { num: "V",   right: "Contact" },
};

export default function EdgeMarkers() {
  const [active, setActive] = useState<PanelId>("hero");
  const isLight = active === "generique" || active === "contact";
  const ink = isLight ? "13,11,9" : "255,255,255";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<PanelId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    zIndex: 30,
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 12,
    letterSpacing: "0.22em",
    color: `rgba(${ink},0.45)`,
    transition: "color 0.5s ease",
    pointerEvents: "none",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <span style={{ ...base, left: 28, transform: "translateY(-50%)" }}>{META[active].num}</span>
      <span
        style={{
          ...base,
          right: 28,
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
        }}
      >
        {META[active].right}
      </span>
    </>
  );
}
