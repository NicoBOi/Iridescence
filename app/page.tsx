"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroPanel from "./components/panels/HeroPanel";
import TravauxPanel from "./components/panels/TravauxPanel";
import NotePanel from "./components/panels/NotePanel";
import GeneriquePanel from "./components/panels/GeneriquePanel";
import ContactPanel from "./components/panels/ContactPanel";

export type PanelId = "hero" | "travaux" | "note" | "generique" | "contact";

const ORDER: PanelId[] = ["hero", "travaux", "note", "generique", "contact"];

const PANELS: Record<PanelId, React.ComponentType<{ onNav: (id: PanelId) => void }>> = {
  hero: HeroPanel,
  travaux: TravauxPanel,
  note: NotePanel,
  generique: GeneriquePanel,
  contact: ContactPanel,
};

const LOCK_MS = 820;
const ease = [0.76, 0, 0.24, 1] as const;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();

  const locked = useRef(false);
  const idxRef = useRef(0);
  const scroller = useRef<HTMLDivElement | null>(null);
  const touchY = useRef(0);

  useEffect(() => { idxRef.current = index; }, [index]);

  // Va vers un index donné, verrouille pendant la transition, notifie la nav.
  const goIndex = useCallback((next: number) => {
    if (locked.current) return;
    const clamped = Math.max(0, Math.min(ORDER.length - 1, next));
    if (clamped === idxRef.current) return;
    locked.current = true;
    setDir(clamped > idxRef.current ? 1 : -1);
    idxRef.current = clamped;
    setIndex(clamped);
    window.dispatchEvent(new CustomEvent("irid:active", { detail: ORDER[clamped] }));
    setTimeout(() => { locked.current = false; }, LOCK_MS);
  }, []);

  const goId = useCallback((id: PanelId) => goIndex(ORDER.indexOf(id)), [goIndex]);

  // Intentions de navigation venant de la nav et des panneaux.
  useEffect(() => {
    const onGoto = (e: Event) => goId((e as CustomEvent<PanelId>).detail);
    window.addEventListener("irid:goto", onGoto);
    return () => window.removeEventListener("irid:goto", onGoto);
  }, [goId]);

  // Molette : avance/recule seulement aux limites de défilement du panneau.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (locked.current) { e.preventDefault(); return; }
      const el = scroller.current;
      if (!el) return;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (e.deltaY > 6 && atBottom) { e.preventDefault(); goIndex(idxRef.current + 1); }
      else if (e.deltaY < -6 && atTop) { e.preventDefault(); goIndex(idxRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goIndex]);

  // Clavier.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goIndex(idxRef.current + 1); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goIndex(idxRef.current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goIndex]);

  // Tactile : swipe vertical aux limites.
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = touchY.current - e.changedTouches[0].clientY;
      const el = scroller.current;
      if (!el || Math.abs(dy) < 60) return;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (dy > 0 && atBottom) goIndex(idxRef.current + 1);
      else if (dy < 0 && atTop) goIndex(idxRef.current - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goIndex]);

  const Panel = PANELS[ORDER[index]];

  const variants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({ opacity: 0, y: d > 0 ? 48 : -48, filter: "blur(10px)" }),
        center: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: (d: number) => ({ opacity: 0, y: d > 0 ? -48 : 48, filter: "blur(10px)" }),
      };

  return (
    <AnimatePresence mode="wait" custom={dir}>
      <motion.div
        key={ORDER[index]}
        ref={scroller}
        custom={dir}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.7, ease }}
        style={{ height: "100svh", overflowY: "auto", overflowX: "hidden" }}
      >
        <Panel onNav={goId} />
      </motion.div>
    </AnimatePresence>
  );
}
