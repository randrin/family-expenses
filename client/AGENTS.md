<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Cursor / Codex

Instructions pour les agents qui travaillent sur le **client** family-expenses.

## Projet

Frontend de suivi des dépenses d'un foyer. Dossier : `client/`.

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

Routing : **App Router** (`src/app/`). Pas de Pages Router.

## Architecture (résumé)

| Couche | Outil | Dossier |
|--------|-------|---------|
| UI | React + shadcn | `src/components/` |
| État UI | Zustand | `src/stores/` |
| État serveur | TanStack Query | `src/hooks/` |
| HTTP | Axios | `src/api/` |
| Validation | Zod | `src/schemas/` |
| Auth | NextAuth v5 | `src/auth/` + `app/api/auth/` |
| Tests | Vitest / Playwright | `*.test.ts`, `e2e/` |

Query = foyer, membres, catégories, dépenses. Zustand = période, filtres, sheets. Jamais les deux pour la même donnée.

Le starter est encore `client/app/` sans `src/`. Le premier écran déplace l'arbre vers `src/app/`.

## Règles métier (résumé)

- Session requise hors `/` et `/auth/*`. `userId`, `familyId`, `role` depuis la session.
- Un utilisateur, un foyer. Code foyer à 5 chiffres **généré par l'API**.
- Dépense : centimes entiers > 0, date calendaire non future, catégorie du foyer. `posted` → `void`. Pas de suppression.
- Totaux = dépenses `posted` seulement. Devise du foyer, figée après la première dépense.
- Catégories du foyer, gérées par le propriétaire.

## Règles de code

1. `"use client"` sur les composants interactifs.
2. Alias `@/`. `cn()` pour Tailwind.
3. Pas de `any`. Types via `z.infer`.
4. Pas de `new Date()` / `localStorage` au premier rendu.
5. Pas de `fetch` dans `useEffect`.
6. Toasts `sonner`. Diff minimal.

## Commandes

```bash
cd client
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Skills

| Outil | Skill |
|-------|--------|
| Cursor | `.cursor/skills/client-stack/SKILL.md` |
| Codex | `.agents/skills/client-stack/SKILL.md` |

Architecture : `architecture.md` · Métier : `business-rules.md` · Patterns : `reference.md`
