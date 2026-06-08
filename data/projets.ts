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
  lien?: string;
}

export const projets: Projet[] = [];
