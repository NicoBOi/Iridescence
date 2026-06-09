import { motion } from "framer-motion";
import { equipe } from "@/data/equipe";
import type { PanelId } from "../../page";

type Props = { onNav: (id: PanelId) => void };

function toRoman(n: number) {
  const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let r=""; for(let i=0;i<v.length;i++) while(n>=v[i]){r+=s[i];n-=v[i];} return r;
}

// Colonnes 0/1/2 et décalages verticaux staggered
const COL =   [0, 1, 2, 0, 1];
const PUSH =  [0, 80, 40, 0, 80]; // px vers le bas

export default function GeneriquePanel({ onNav: _ }: Props) {
  return (
    <section
      style={{
        minHeight: "100svh",
        /* Fond blanc opaque : rupture volontaire, comme une page imprimée dans le film */
        backgroundColor: "rgba(255,255,255,0.97)",
        color: "var(--ink)",
        padding: "clamp(100px,12vh,160px) clamp(28px,5vw,80px) 90px",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--serif)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "#9a9490",
          textTransform: "uppercase",
          marginBottom: 80,
        }}
      >
        Générique
      </span>

      {/* Grille 3 colonnes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0 40px" }}>
        {equipe.map((m, i) => (
          <motion.div
            key={m.roleCode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: COL[i] + 1,
              marginTop: PUSH[i],
              paddingBottom: 60,
            }}
          >
            {/* Placeholder portrait */}
            <div style={{ width: "100%", maxWidth: 180, aspectRatio: "3/4", backgroundColor: "#ece9e4", marginBottom: 14 }} />

            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 11, letterSpacing: "0.16em", color: "#9a9490", marginBottom: 8 }}>
              {toRoman(i + 1)}
            </span>

            <span style={{
              display: "block",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(22px,3vw,38px)",
              lineHeight: 1,
              color: "var(--ink)",
              marginBottom: m.nom ? 8 : 0,
            }}>
              {m.role}
            </span>

            {m.nom && (
              <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 13, letterSpacing: "0.05em", color: "#4a4540" }}>
                {m.nom}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
