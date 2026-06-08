"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/projets", label: "Projets" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backgroundColor: scrolled ? "rgba(8, 8, 8, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <Link
        href="/"
        className="font-editorial text-lg tracking-[0.15em] uppercase"
        style={{ color: "var(--text-primary)", fontSize: "15px", letterSpacing: "0.2em" }}
      >
        Iridescence
      </Link>

      <ul className="flex items-center gap-8">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{
                color: pathname === href ? "var(--text-primary)" : "var(--text-secondary)",
                letterSpacing: "0.18em",
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
