"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#travaux", label: "Travaux" },
  { href: "/#note", label: "Note" },
  { href: "/#generique", label: "Générique" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [onFilm, setOnFilm] = useState(true);

  useEffect(() => {
    const check = () => {
      // Le masthead fait 100svh. Après on est sur fond blanc.
      setOnFilm(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const fg = onFilm ? "rgba(255,255,255,0.82)" : "var(--ink)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center text-center"
      style={{
        paddingTop: "28px",
        paddingBottom: "16px",
        transition: "color 0.5s ease",
        color: fg,
        pointerEvents: "none",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        aria-label="Iridescence, accueil"
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "15px",
          letterSpacing: "0.06em",
          color: fg,
          transition: "color 0.5s ease",
          pointerEvents: "auto",
        }}
      >
        Iridescence
      </Link>

      {/* Liens */}
      <ul className="flex items-center gap-6 mt-3" style={{ pointerEvents: "auto" }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="link-line"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.04em",
                color: fg,
                transition: "color 0.5s ease",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
