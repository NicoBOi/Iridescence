"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "../page";

export default function Footer() {
  const [active, setActive] = useState<SectionId>("featured");
  const light = active === "talent" || active === "contact";
  const ink = light ? "13, 11, 9" : "255, 255, 255";

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<SectionId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  return (
    <footer style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 40,
      display: "flex",
      justifyContent: "space-between",
      padding: "0 28px 18px",
      pointerEvents: "none",
    }}>
      <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 11, color: `rgba(${ink}, 0.32)`, letterSpacing: "0.06em", transition: "color 0.6s ease" }}>
        Bordeaux
      </span>
      <span style={{ fontFamily: "var(--serif)", fontSize: 11, color: `rgba(${ink}, 0.32)`, letterSpacing: "0.14em", transition: "color 0.6s ease" }}>
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}
