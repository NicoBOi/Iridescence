"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only run the custom cursor on precise pointers; touch/coarse devices keep native input.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        ringRef.current?.classList.add("cursor-hover");
      } else {
        ringRef.current?.classList.remove("cursor-hover");
      }
    };

    let raf: number;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[9999]"
        style={{ backgroundColor: "var(--accent)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[32px] h-[32px] rounded-full pointer-events-none z-[9998] transition-all duration-150"
        style={{
          border: "1px solid rgba(232, 228, 220, 0.3)",
          willChange: "transform",
        }}
      />
      <style>{`
        .cursor-hover {
          width: 48px !important;
          height: 48px !important;
          margin-left: -8px;
          margin-top: -8px;
          border-color: var(--accent) !important;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}
