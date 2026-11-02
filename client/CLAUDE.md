# CLAUDE.md — Claude Code

Instructions pour Claude sur le **client** family-expenses. Racine : `client/`.

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

App Router (`src/app/`). Pas de dossier `pages/` comme routeur.

## Architecture

- **Routing** : `app/dashboard/`, `app/expenses/`, `app/family/`, `app/auth/*`, `app/api/auth/[...nextauth]/route.ts`.
- **Layouts** : layout public, layout foyer authentifié.
- **Providers** : `SessionProvider` → Query → Theme → Tooltip → Toaster.
- **Stores** Zustand : UI seulement (`src/stores/`).
- **Hooks** Query : `useExpenses`, `useFamily`, `useCategories`, `useMembers`.
- **Schémas** Zod : `src/schemas/`.
- **Auth** : `src/auth/auth.ts` (NextAuth v5, JWT).

Le starter actuel est `client/app/` sans `src/`. Déplacer vers `src/app/` avant d'ajouter des features. Ne pas poser les dépenses dans un store ou dans `localStorage`.

## Règles métier

1. Pages protégées = session NextAuth. `userId` = `session.user.id`.
2. Un utilisateur appartient à un seul foyer. Le code à 5 chiffres vient de l'API.
3. Dépense en centimes > 0. Statut `posted` ou `void`. Pas de delete.
4. Catégories du foyer (`name`, `color`), créées par le propriétaire.
5. Isolation : uniquement les ressources du foyer de la session.

## Principes

1. Changement le plus petit qui résout le problème.
2. Lire le code voisin avant d'écrire.
3. shadcn d'abord — `npx shadcn@latest add <name>` si manquant.
4. Hydratation : dates et storage dans `useEffect`.
5. Query + Zod + toasts sonner.
6. `strict` — pas de `any`.
7. Formater l'argent avec `Intl.NumberFormat`. Ne pas additionner des euros flottants.

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/app/layout.tsx` | Session + Providers |
| `src/auth/auth.ts` | NextAuth v5 |
| `src/components/providers/providers.tsx` | Query, thème, toaster |
| `src/schemas/` | Zod |
| `src/stores/` | Zustand |
| `src/hooks/use-expenses.ts` | Query dépenses |
| `src/styles/globals.css` | Tailwind v4 + tokens |
| `components.json` | shadcn |

## Skill

`.claude/skills/client-stack/SKILL.md`
Compléments : `architecture.md`, `business-rules.md`, `reference.md`

## Commandes

```bash
cd client && npm run dev
cd client && npm run test
cd client && npm run test:e2e
cd client && npm run lint
```
