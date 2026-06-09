"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FeaturedView from "./components/FeaturedView";
import ArchivePanel from "./components/panels/TravauxPanel";
import TalentPanel from "./components/panels/GeneriquePanel";
import ApprochePanel from "./components/panels/NotePanel";
import ContactPanel from "./components/panels/ContactPanel";

// Une "section" n'est PAS atteinte au scroll : uniquement au clic dans la nav.
// Featured (les projets) est l'état permanent ; le scroll y navigue ENTRE projets.
export type SectionId = "featured" | "archive" | "talent" | "approche" | "contact";

const OVERLAYS: Record<
  Exclude<SectionId, "featured">,
  React.ComponentType<{ onNav: (id: SectionId) => void }>
> = {
  archive: ArchivePanel,
  talent: TalentPanel,
  approche: ApprochePanel,
  contact: ContactPanel,
};

export default function Home() {
  const [section, setSection] = useState<SectionId>("featured");

  useEffect(() => {
    const handler = (e: Event) => setSection((e as CustomEvent<SectionId>).detail);
    window.addEventListener("iridescence:nav", handler);
    return () => window.removeEventListener("iridescence:nav", handler);
  }, []);

  const onNav = (id: SectionId) => {
    setSection(id);
    window.dispatchEvent(new CustomEvent("iridescence:nav", { detail: id }));
  };

  const Overlay = section !== "featured" ? OVERLAYS[section] : null;

  return (
    <>
      {/* Vue permanente : le projet en plein écran. Reste vivante derrière les sections. */}
      <FeaturedView active={section === "featured"} />

      {/* Sections : apparaissent UNIQUEMENT au clic, en overlay par-dessus Featured. */}
      <AnimatePresence mode="wait">
        {Overlay && (
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "relative", zIndex: 2 }}
          >
            <Overlay onNav={onNav} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
