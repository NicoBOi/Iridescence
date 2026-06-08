"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";

const links = [
  { href: "/#travaux", label: "Travaux" },
  { href: "/#note", label: "Note" },
  { href: "/#generique", label: "Générique" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-2 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backgroundColor: scrolled ? "rgba(246, 244, 239, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <Link
        href="/"
        aria-label="Iridescence, accueil"
        className="font-display uppercase inline-flex items-center min-h-[44px]"
        style={{
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.12em",
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        Iridescence
      </Link>

      <ul className="flex items-center gap-4 md:gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center min-h-[44px]"
              style={{ color: "var(--text-secondary)" }}
            >
              <ScrambleText
                text={label}
                trigger="hover"
                className="link-underline uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.14em" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
