"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { projets } from "@/data/projets";

function EmptySlot({ index }: { index: number }) {
  return (
    <div
      className="relative aspect-[4/3] flex items-end p-6 overflow-hidden group"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ backgroundColor: "var(--surface)" }}
      />
      <div className="relative z-10 flex flex-col gap-2">
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div style={{ height: "1px", width: "40px", backgroundColor: "var(--border)" }} />
        <span
          className="text-xs"
          style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}
        >
          A venir
        </span>
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const hasProjects = projets.length > 0;
  const slots = hasProjects ? projets.slice(0, 3) : [1, 2, 3];

  return (
    <section
      ref={ref}
      className="px-8 py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-end justify-between mb-12">
        <div className="flex items-center gap-4">
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }}
          >
            Projets
          </span>
          <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
        </div>
        <Link
          href="/projets"
          className="text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:opacity-100"
          style={{ color: "var(--text-secondary)" }}
        >
          Tout voir &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
        {slots.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            style={{ backgroundColor: "var(--bg)" }}
          >
            <EmptySlot index={i + 1} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
