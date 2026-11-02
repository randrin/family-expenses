# GEMINI.md — Google Gemini (client)

Instructions pour Gemini sur le **client** family-expenses.

> Contexte global : `../GEMINI.md` et `../.gemini/GEMINI.md`
> Skill : `../.gemini/skills/client-stack/SKILL.md`
> Architecture : `../.gemini/skills/client-stack/architecture.md`
> Métier : `../.gemini/skills/client-stack/business-rules.md`

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

App Router — `src/app/` (pas de `pages/` comme routeur).

## Architecture

```
client/src/
├── app/                   # routes + app/api/auth/[...nextauth]/route.ts
├── auth/                  # NextAuth v5
├── api/                   # Axios
├── schemas/               # Zod
├── stores/                # Zustand (UI)
├── hooks/                 # TanStack Query
├── components/ui|layout|expenses|family|forms|providers
├── lib/ utils/ styles/
```

- Query = données serveur. Zustand = période, filtres, sheets.
- Layout : SessionProvider → Query → Theme.

## Règles

### React et Next.js
- Composants fonctionnels, `"use client"` si état ou effets.
- Hydratation : pas de `new Date()` au rendu initial.

### Données
- Hooks Query (`expenseKeys.all`). Mutations → `invalidateQueries`.
- Zod `safeParse` avant submit. Types via `z.infer`.
- Montants : entiers en centimes. Affichage via `Intl.NumberFormat`.

### Auth
- NextAuth v5, session JWT. Dashboard protégé.
- `userId` et `familyId` depuis la session, jamais le formulaire.

### Métier
- Un utilisateur, un foyer. Code à 5 chiffres généré par l'API.
- Dépense : `posted` → `void`. Pas de suppression.
- Catégories du foyer, pas un enum figé.
- Totaux sans les dépenses `void`.

### Tests
- Vitest : schemas, stores, utils, conversion centimes
- Playwright : auth, création de foyer, saisie d'une dépense

## Commandes

```bash
cd client
npm run dev
npm run test
npm run test:e2e
npm run lint
```
