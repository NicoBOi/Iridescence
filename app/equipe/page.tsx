"use client";

import { motion } from "framer-motion";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { equipe } from "@/data/equipe";

export default function EquipePage() {
  return (
    <>
      <Nav />
      <main className="px-8 pt-32 pb-0 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--accent)" }}
            >
              Équipe
            </span>
            <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Cinq personnes. Cinq postes. Un seul objectif.
          </p>
        </motion.div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {equipe.map((membre, i) => (
            <motion.div
              key={membre.roleCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 group"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Numero */}
              <div className="flex items-start gap-6">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)", marginTop: "4px" }}
                >
                  {membre.roleCode}
                </span>
                <div>
                  <h2
                    className="font-editorial"
                    style={{
                      fontSize: "clamp(22px, 3vw, 36px)",
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                      lineHeight: 1.1,
                    }}
                  >
                    {membre.role}
                  </h2>
                  {membre.nom && (
                    <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {membre.nom}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 flex items-start pt-1">
                {membre.bio ? (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {membre.bio}
                  </p>
                ) : (
                  <div style={{ height: "1px", width: "32px", backgroundColor: "var(--border)", marginTop: "12px" }} />
                )}
              </div>

              {/* Liens */}
              <div className="flex items-start gap-6 pt-1">
                {membre.instagram && (
                  <a
                    href={membre.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.15em] transition-colors duration-200 inline-flex items-center min-h-[44px] hover:text-[var(--accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Insta
                  </a>
                )}
                {membre.vimeo && (
                  <a
                    href={membre.vimeo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.15em] transition-colors duration-200 inline-flex items-center min-h-[44px] hover:text-[var(--accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Vimeo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
