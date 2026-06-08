"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Cursor from "@/app/components/Cursor";
import { projets, Projet } from "@/data/projets";

function ProjetCard({ projet, index }: { projet: Projet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projets/${projet.id}`} className="group block">
        <div
          className="aspect-[16/9] relative overflow-hidden"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {projet.image && (
            <img
              src={projet.image}
              alt={projet.titre}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: "rgba(200, 245, 66, 0.04)" }}
          />
        </div>
        <div className="pt-4 pb-8 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2
              className="font-editorial"
              style={{ fontSize: "20px", letterSpacing: "-0.01em", color: "var(--text-primary)" }}
            >
              {projet.titre}
            </h2>
            <span className="text-xs" style={{ color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
              {projet.type}
            </span>
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)", marginTop: "4px" }}>
            {projet.annee}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  const slots = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {slots.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: (i - 1) * 0.08 }}
        >
          <div
            className="aspect-[16/9] flex items-center justify-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              {String(i).padStart(2, "0")}
            </span>
          </div>
          <div className="pt-4 pb-8">
            <div
              style={{ height: "1px", width: "32px", backgroundColor: "var(--border)" }}
              className="mb-3"
            />
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{ color: "var(--text-muted)" }}
            >
              A venir
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjetsPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="px-8 pt-32 pb-0 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--accent)" }}
            >
              Projets
            </span>
            <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {projets.length > 0 ? projets.length : "0"}
            </span>
          </div>
        </motion.div>

        {projets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projets.map((projet, i) => (
              <ProjetCard key={projet.id} projet={projet} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
      <Footer />
    </>
  );
}
