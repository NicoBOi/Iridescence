"use client";

import { motion } from "framer-motion";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-8 pt-32 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-between py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-20">
              <span
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "var(--accent)" }}
              >
                Contact
              </span>
              <div style={{ height: "1px", width: "48px", backgroundColor: "var(--border)" }} />
            </div>

            <p
              className="font-editorial mb-20"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                maxWidth: "600px",
                color: "var(--text-primary)",
              }}
            >
              Films, clips,
              <br />
              documentaires,
              <br />
              projets visuels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "40px" }}
          >
            <div className="flex flex-col gap-2">
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </span>
              <a
                href="mailto:contact@iridescence.fr"
                className="text-sm transition-colors duration-200 inline-flex items-center min-h-[44px] w-fit hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)", letterSpacing: "0.04em" }}
              >
                contact@iridescence.fr
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                Instagram
              </span>
              <a
                href="https://instagram.com/iridescence"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 inline-flex items-center min-h-[44px] w-fit hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)", letterSpacing: "0.04em" }}
              >
                @iridescence
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                Bordeaux
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--text-muted)", letterSpacing: "0.04em" }}
              >
                France
              </span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
