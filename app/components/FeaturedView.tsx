"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projets, type Projet } from "@/data/projets";
import { playFilm } from "./FilmPlayer";

const AUTO_MS = 10000; // rotation auto toutes les ~10 s
const LOCK_MS = 850;   // anti double-déclenchement au scroll

function toRoman(n: number) {
  const v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const s = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let r = ""; for (let i = 0; i < v.length; i++) while (n >= v[i]) { r += s[i]; n -= v[i]; } return r;
}

function ytSrc(id?: string) {
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`
    : "";
}

export default function FeaturedView({ active }: { active: boolean }) {
  const items: Projet[] = projets;
  const n = items.length;

  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false); // carrousel déployé (souris au bord gauche)
  const iRef = useRef(0);
  const locked = useRef(false);
  const interacted = useRef(false); // l'auto-rotation s'arrête dès la 1re interaction

  useEffect(() => { iRef.current = i; }, [i]);

  const goTo = (idx: number) => { if (n) setI(((idx % n) + n) % n); };
  const step = (d: number) => {
    if (locked.current) return;
    locked.current = true;
    goTo(iRef.current + d);
    setTimeout(() => { locked.current = false; }, LOCK_MS);
  };
  const stopAuto = () => { interacted.current = true; };

  // Auto-rotation (s'arrête après interaction).
  useEffect(() => {
    if (!active || n === 0) return;
    const t = setInterval(() => { if (!interacted.current) goTo(iRef.current + 1); }, AUTO_MS);
    return () => clearInterval(t);
  }, [active, n]);

  // Molette : navigue ENTRE projets. Ne change jamais de section.
  useEffect(() => {
    if (!active) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopAuto();
      step(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, n]);

  // Clavier (flèches).
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); stopAuto(); step(1); }
      else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); stopAuto(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, n]);

  if (n === 0) return null;
  const p = items[i];

  return (
    <section
      aria-hidden={!active}
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      {/* Vidéo du projet courant, plein écran, crossfade au changement */}
      <AnimatePresence>
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <div className="yt-wrap">
            <iframe
              src={ytSrc(p.youtubeId)}
              title={p.titre}
              allow="autoplay; encrypted-media"
              aria-hidden
              tabIndex={-1}
              style={{ filter: "grayscale(0.2) brightness(0.66)" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vignette lisibilité */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Haut : numéro à gauche / nom à droite, se rejoignant vers le centre */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "min(46vw, 560px)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, letterSpacing: "0.18em", color: "rgba(255,255,255,0.8)" }}>
          {toRoman(i + 1)}
        </span>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, letterSpacing: "0.06em", color: "rgba(255,255,255,0.8)" }}>
          {p.client ?? p.titre}
        </span>
      </div>

      {/* Centre : client / titre / type — clic = lecture plein écran */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {p.client && (
              <span style={{ fontFamily: "var(--serif)", fontSize: 15, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
                {p.client}
              </span>
            )}
            <button
              onClick={() => { stopAuto(); playFilm(p); }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 8vw, 120px)",
                lineHeight: 1,
                color: "#fff",
                margin: "8px 0",
              }}
            >
              {p.titre}
            </button>
            <span style={{ fontFamily: "var(--serif)", fontSize: 13, letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
              {p.type} · {p.annee}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bord gauche : fil des chiffres romains + carrousel au survol */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
          padding: "0 22px",
        }}
      >
        {items.map((it, idx) => {
          const on = idx === i;
          return (
            <button
              key={it.id}
              onClick={() => { stopAuto(); goTo(idx); }}
              style={{ display: "flex", alignItems: "center", gap: 16, minHeight: 34, textAlign: "left" }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: on ? 17 : 12,
                  letterSpacing: "0.12em",
                  color: `rgba(255,255,255,${on ? 0.95 : 0.4})`,
                  transition: "all 0.4s ease",
                  width: 36,
                  flexShrink: 0,
                }}
              >
                {toRoman(idx + 1)}
              </span>

              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", alignItems: "center", gap: 14, overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    {it.youtubeId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://img.youtube.com/vi/${it.youtubeId}/hqdefault.jpg`}
                        alt=""
                        style={{
                          width: 104,
                          height: 58,
                          objectFit: "cover",
                          opacity: on ? 1 : 0.45,
                          filter: on ? "none" : "grayscale(1)",
                          transition: "all 0.4s ease",
                        }}
                      />
                    )}
                    <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, color: `rgba(255,255,255,${on ? 0.95 : 0.5})`, transition: "color 0.4s ease" }}>
                      {it.titre}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </section>
  );
}
