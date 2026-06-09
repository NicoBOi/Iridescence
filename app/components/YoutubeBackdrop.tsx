"use client";

import Grain from "./Grain";

const VIDEO_ID = "dZF6ozql5gg";

const src =
  `https://www.youtube.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}` +
  `&controls=0&rel=0&modestbranding=1&playsinline=1` +
  `&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`;

export default function YoutubeBackdrop() {
  return (
    <>
      <div className="yt-cover-wrap">
        <iframe
          src={src}
          allow="autoplay; fullscreen"
          aria-hidden
          tabIndex={-1}
          style={{ filter: "grayscale(0.2) brightness(0.72)" }}
        />
      </div>
      <Grain opacity={0.18} />
      {/* Vignette : lisibilité du texte en bas */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
