export type ProjetType = "film" | "documentaire" | "clip" | "fashion film" | "objet visuel";

export interface Projet {
  id: string;
  titre: string;
  type: ProjetType;
  annee: number;
  role: string;
  description: string;
  image?: string;
  video?: string;
  youtubeId?: string;
  client?: string;
  lien?: string;
}

// Projets de démonstration — à remplacer par les vrais films.
// `youtubeId` alimente le lecteur plein écran ; `client` s'affiche sur le bord droit.
export const projets: Projet[] = [
  {
    id: "premiere-lumiere",
    titre: "Première Lumière",
    type: "film",
    annee: 2025,
    role: "Réalisation · Image",
    description: "Court-métrage. Bordeaux.",
    youtubeId: "dZF6ozql5gg",
    client: "Autoproduction",
  },
  {
    id: "marees",
    titre: "Marées",
    type: "documentaire",
    annee: 2025,
    role: "Réalisation",
    description: "Documentaire. Bassin d'Arcachon.",
    youtubeId: "dZF6ozql5gg",
    client: "Arte",
  },
  {
    id: "nuit-blanche",
    titre: "Nuit Blanche",
    type: "clip",
    annee: 2024,
    role: "Image · Étalonnage",
    description: "Clip musical.",
    youtubeId: "dZF6ozql5gg",
    client: "Verso",
  },
];
