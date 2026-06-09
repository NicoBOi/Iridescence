"use client";

import { useEffect, useState } from "react";
import type { PanelId } from "../page";

const ORDER: { id: PanelId; roman: string }[] = [
  { id: "hero",      roman: "I"   },
  { id: "travaux",   roman: "II"  },
  { id: "note",      roman: "III" },
  { id: "generique", roman: "IV"  },
  { id: "contact",   roman: "V"   },
];

export default function PanelRail() {
  const [active, setActive] = useState<PanelId>("hero");
  const light = active === "generique" || active === "contact";
  const ink = light ? "13, 11, 9" : "255, 255, 255";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<PanelId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 45,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "flex-end",
      }}
    >
      {ORDER.map(({ id, roman }) => {
        const on = active === id;
        return (
          <button
            key={id}
            aria-label={`Aller au panneau ${roman}`}
            onClick={() => window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              minHeight: 24,
              padding: "2px 0",
            }}
          >
            <span style={{
              fontFamily: "var(--serif)",
              fontSize: 10,
              letterSpacing: "0.12em",
              color: `rgba(${ink}, ${on ? 0.9 : 0})`,
              transition: "color 0.5s ease, opacity 0.5s ease",
              opacity: on ? 1 : 0,
            }}>
              {roman}
            </span>
            <span style={{
              display: "block",
              width: on ? 22 : 10,
              height: 1,
              backgroundColor: `rgba(${ink}, ${on ? 0.9 : 0.35})`,
              transition: "width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.5s ease",
            }} />
          </button>
        );
      })}
    </div>
  );
}
