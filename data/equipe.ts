export interface Membre {
  role: string;
  roleCode: string;
  nom?: string;
  bio?: string;
  instagram?: string;
  vimeo?: string;
  portfolio?: string;
}

export const equipe: Membre[] = [
  {
    role: "Réalisation",
    roleCode: "01",
  },
  {
    role: "Image",
    roleCode: "02",
  },
  {
    role: "HMC",
    roleCode: "03",
  },
  {
    role: "Électricité",
    roleCode: "04",
  },
  {
    role: "Production",
    roleCode: "05",
  },
];
