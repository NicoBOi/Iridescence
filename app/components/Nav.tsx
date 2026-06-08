"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/projets", label: "Projets" },
  { href: "/equipe", label: "Équipe" },
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 transition-all duration-500"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <Link
        href="/"
        className="font-editorial uppercase inline-flex items-center min-h-[44px]"
        style={{ color: "var(--text-primary)", fontSize: "15px", letterSpacing: "0.2em" }}
      >
        Iridescence
      </Link>

      <ul className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-xs uppercase transition-colors duration-200 inline-flex items-center min-h-[44px] px-1"
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
