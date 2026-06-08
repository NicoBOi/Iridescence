# Iridescence

Site portfolio de la maison de production indépendante **Iridescence** (Bordeaux).
Films, documentaires, clips.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # sert le build
```

## Structure

```
app/
  page.tsx               Accueil (hero, manifeste, aperçu projets)
  projets/page.tsx       Grille des projets
  projets/[id]/page.tsx  Page projet (visuel + infos + nav précédent/suivant)
  equipe/page.tsx        Les cinq postes
  contact/page.tsx       Contact
  components/            Nav, Footer, Cursor, sections, MotionProvider
data/
  projets.ts             Liste des projets (vide tant qu'il n'y a pas d'archives)
  equipe.ts              Les cinq rôles
```

## Contenu

Ajouter un projet : pousser un objet dans `data/projets.ts`.
Renseigner l'équipe : compléter nom, bio et liens dans `data/equipe.ts`.

## Design

Direction sombre, cinéma de nuit, accent acide unique. Contraste conforme WCAG AA,
cibles tactiles 44px, `prefers-reduced-motion` respecté.
