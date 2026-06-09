"use client";

import { motion } from "framer-motion";
import { equipe } from "@/data/equipe";

function toRoman(n: number): string {
  const v = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r = "";
  for (let i = 0; i < v.length; i++) while (n >= v[i]) { r += s[i]; n -= v[i]; }
  return r;
}

// Grille 3 colonnes avec décalage vertical comme la page Talent de depoluxe.
const COL = [0, 1, 2, 0, 1]; // index de colonne pour chaque membre

export default function Generique() {
  return (
    <section
      id="generique"
      className="scroll-mt-20"
      style={{
        backgroundColor: "var(--bg)",
        padding: "120px clamp(24px, 5vw, 80px) 100px",
      }}
    >
      {/* Label */}
      <span
        style={{
          display: "block",
          marginBottom: "80px",
          fontFamily: "var(--serif)",
          fontStyle: "normal",
          fontSize: "11px",
          letterSpacing: "0.22em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
        }}
      >
        Générique
      </span>

      {/* Grille 3 colonnes staggered verticalement */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0 40px",
        }}
      >
        {equipe.map((membre, i) => {
          // Décalage vertical : colonne 2 (centre) descend de 80px, colonne 3 de 40px
          const pushDown = COL[i] === 1 ? 100 : COL[i] === 2 ? 50 : 0;
          return (
            <motion.div
              key={membre.roleCode}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                gridColumn: COL[i] + 1,
                marginTop: pushDown,
                paddingBottom: "60px",
              }}
            >
              {/* Numéro romain */}
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--serif)",
                  fontStyle: "normal",
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  color: "var(--text-muted)",
                  marginBottom: "12px",
                }}
              >
                {toRoman(i + 1)}
              </span>

              {/* Placeholder portrait */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  aspectRatio: "3/4",
                  backgroundColor: "#ece9e4",
                  marginBottom: "16px",
                }}
              />

              {/* Rôle */}
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 3vw, 40px)",
                  lineHeight: 1,
                  color: "var(--ink)",
                  marginBottom: "8px",
                }}
              >
                {membre.role}
              </span>

              {/* Nom si disponible */}
              {membre.nom && (
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--serif)",
                    fontStyle: "normal",
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    color: "var(--text-secondary)",
                  }}
                >
                  {membre.nom}
                </span>
              )}

              {/* Liens */}
              <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                {membre.instagram && (
                  <a
                    href={membre.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      minHeight: "44px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Instagram
                  </a>
                )}
                {membre.vimeo && (
                  <a
                    href={membre.vimeo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      minHeight: "44px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Vimeo
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
