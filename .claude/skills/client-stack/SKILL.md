---
name: client-stack
description: >-
  Guide le développement du client family-expenses : Next.js 16, React 19,
  TypeScript strict, Tailwind v4, Shadcn/UI, Zustand, TanStack React Query,
  Axios, Zod, NextAuth v5, Vitest et Playwright. Utiliser pour toute tâche
  dans client/ — pages, composants, stores, hooks, auth, schémas Zod, familles,
  dépenses, ou tests.
---

# Client Stack — family-expenses

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

Compléments UI : lucide-react, sonner, next-themes. Les ajouter avec le premier écran, pas avant.

## Routing

Next.js 16 **App Router** — `src/app/`. Pas de Pages Router.

Le starter actuel est encore `client/app/` sans `src/`. Au premier vrai écran, déplacer vers `client/src/app/` et pointer `@/*` vers `./src/*`. Ne pas créer un second routeur à côté.

## Séparation des responsabilités

| Couche | Outil | Rôle |
|--------|-------|------|
| UI | React 19 + shadcn/ui | Rendu, événements |
| État client | Zustand | Période, filtres, sheet, sélection |
| État serveur | TanStack React Query | Famille, membres, dépenses, catégories |
| HTTP | Axios | REST vers le serveur NestJS |
| Validation | Zod | Formulaires + parsing des réponses |
| Auth | NextAuth v5 | Session, guards, JWT |
| Tests unitaires | Vitest | Schémas, stores, utils, hooks |
| Tests e2e | Playwright | Auth, famille, dépenses |

**Ne jamais** mettre les dépenses, la famille ou les membres dans Zustand. Query = source de vérité serveur. Zustand = UI.

## Conventions

1. `"use client"` sur tout composant avec état, effets ou événements.
2. Imports via alias `@/` (`@/components`, `@/stores`, `@/schemas`, `@/auth`…).
3. `strict: true` — pas de `any` ; types inférés depuis Zod (`z.infer<typeof schema>`).
4. Réutiliser shadcn avant de créer un composant UI. `npx shadcn@latest add <name>`. `cn()` pour les classes.
5. Hydratation : pas de `new Date()`, `Math.random()`, `localStorage` au premier rendu.
6. Formulaire : schema Zod → `safeParse` → mutation Query. Toast `sonner`.
7. `userId`, `familyId` et `role` viennent de la session NextAuth, jamais d'un champ formulaire.
8. Montants en **centimes entiers**. Pas d'addition de floats dans l'UI.
9. Diff minimal, style du fichier respecté.
10. Pages session ou dépenses : dynamiques. Ne pas mettre ces données dans un cache statique.

## Interdit

- Pages Router (`src/pages/` comme arbre de routes)
- `fetch` / axios dans `useEffect` (passer par un hook Query)
- Dépenses, famille ou membres dans Zustand ou `localStorage`
- Générer le code famille côté client
- Suppression physique d'une dépense (utiliser `void`)
- Afficher ou muter les données d'une autre famille
- Enum TypeScript figé comme seule liste de catégories

## Commandes

```bash
cd client
npm run dev
npm run build
npm run lint
npm run test          # Vitest
npm run test:e2e      # Playwright
```

## Checklist

- [ ] Types stricts, schémas Zod sur les entrées
- [ ] Query pour l'API, Zustand pour l'UI
- [ ] Session NextAuth sur les pages protégées
- [ ] Montant en centimes, devise de la famille
- [ ] Pas d'erreur d'hydratation
- [ ] shadcn réutilisé, tokens Tailwind (`bg-background`, `text-foreground`…)
- [ ] Test Vitest (règle / schema / store) ou e2e si parcours utilisateur

## Ressources

- Architecture cible : [architecture.md](architecture.md)
- Règles métier : [business-rules.md](business-rules.md)
- Patterns code : [reference.md](reference.md)
