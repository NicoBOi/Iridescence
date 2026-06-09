"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Projet } from "@/data/projets";

// Ouvre le lecteur : window.dispatchEvent(new CustomEvent("iridescence:play", { detail: projet }))
export function playFilm(projet: Projet) {
  window.dispatchEvent(new CustomEvent("iridescence:play", { detail: projet }));
}

export default function FilmPlayer() {
  const [film, setFilm] = useState<Projet | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const open = (e: Event) => {
      setFilm((e as CustomEvent<Projet>).detail);
      setMuted(true);
    };
    window.addEventListener("iridescence:play", open);
    return () => window.removeEventListener("iridescence:play", open);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilm(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const id = film?.youtubeId;
  const src = id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`
    : "";

  const corner: React.CSSProperties = {
    position: "absolute",
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 13,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.7)",
    zIndex: 2,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
  };

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "#000" }}
        >
          {/* Vidéo plein écran */}
          {id && (
            <div className="yt-wrap">
              <iframe
                src={src}
                title={film.titre}
                allow="autoplay; encrypted-media"
                style={{ pointerEvents: "none" }}
              />
            </div>
          )}
          {/* Vignette */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(120% 120% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Barre de progression décorative à gauche */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 30, ease: "linear" }}
            style={{
              position: "absolute",
              left: 28,
              top: 70,
              bottom: 70,
              width: 1,
              background: "rgba(255,255,255,0.4)",
              transformOrigin: "top",
            }}
          />

          {/* Bloc central : client / titre / réalisation */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {film.client && (
              <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>
                {film.client}
              </span>
            )}
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 7vw, 96px)",
                lineHeight: 1,
                margin: "10px 0",
                color: "#fff",
              }}
            >
              {film.titre}
            </h2>
            <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>
              {film.role}
            </span>
          </div>

          {/* Contrôles dans les coins */}
          <button style={{ ...corner, top: 22, left: 28 }} onClick={() => setMuted((m) => !m)}>
            {muted ? "Son" : "Muet"}
          </button>
          <button style={{ ...corner, top: 22, right: 28 }} onClick={() => setFilm(null)}>
            Fermer
          </button>
          <span style={{ ...corner, bottom: 22, left: 28, color: "rgba(255,255,255,0.4)" }}>
            {film.type} · {film.annee}
          </span>
          <button style={{ ...corner, bottom: 22, right: 28 }} onClick={() => setFilm(null)}>
            Échap ↩
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
