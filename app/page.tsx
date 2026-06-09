"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroPanel from "./components/panels/HeroPanel";
import TravauxPanel from "./components/panels/TravauxPanel";
import NotePanel from "./components/panels/NotePanel";
import GeneriquePanel from "./components/panels/GeneriquePanel";
import ContactPanel from "./components/panels/ContactPanel";

export type PanelId = "hero" | "travaux" | "note" | "generique" | "contact";

const panels: Record<PanelId, React.ComponentType<{ onNav: (id: PanelId) => void }>> = {
  hero:      HeroPanel,
  travaux:   TravauxPanel,
  note:      NotePanel,
  generique: GeneriquePanel,
  contact:   ContactPanel,
};

export default function Home() {
  const [active, setActive] = useState<PanelId>("hero");

  // Écoute les événements de navigation (depuis Nav et depuis les panels eux-mêmes).
  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<PanelId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  const onNav = (id: PanelId) => {
    setActive(id);
    window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }));
  };

  const Panel = panels[active];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ minHeight: "100svh" }}
      >
        <Panel onNav={onNav} />
      </motion.div>
    </AnimatePresence>
  );
}
