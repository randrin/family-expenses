# Architecture cible — client/

Frontend family-expenses : App Router Next.js 16, couches séparées. Le serveur NestJS est hors de ce skill.

## Couches

```
app/  →  components/  →  hooks (Query) + stores (Zustand)
                │                    │
                │                    ├── schemas/ (Zod)
                │                    └── auth/ (NextAuth session)
                ▼
              api/ (Axios)  →  NestJS
```

| Couche | Dossier | Interdit d'y mettre |
|--------|---------|---------------------|
| Routing | `src/app/` | Logique métier, appels HTTP |
| UI | `src/components/` | Axios, QueryClient, Zod parse |
| État UI | `src/stores/` | Dépenses, famille, membres |
| État serveur | `src/hooks/` | Filtres, open/close de sheets |
| HTTP | `src/api/` | JSX, stores |
| Validation | `src/schemas/` | Appels réseau |
| Auth | `src/auth/` | Composants visuels (sauf SessionProvider) |
| Types | `src/types/` | Logique — préférer `z.infer` |

## Arborescence cible

```
client/
├── e2e/                              # Playwright
│   ├── auth.spec.ts
│   ├── family.spec.ts
│   └── expenses.spec.ts
├── playwright.config.ts
├── vitest.config.ts
├── components.json                   # shadcn (new-york, neutral)
└── src/
    ├── app/
    │   ├── layout.tsx                # SessionProvider + Providers
    │   ├── page.tsx                  # accueil public
    │   ├── api/auth/[...nextauth]/route.ts
    │   ├── auth/                     # signin, signup
    │   ├── family/                   # new, join, settings
    │   ├── dashboard/
    │   └── expenses/
    ├── auth/
    │   ├── auth.ts                   # NextAuth v5
    │   └── guards.ts
    ├── api/
    │   ├── client.ts                 # Axios + Bearer
    │   ├── families.ts
    │   ├── expenses.ts
    │   ├── categories.ts
    │   └── members.ts
    ├── schemas/
    │   ├── auth.schema.ts
    │   ├── family.schema.ts
    │   ├── expense.schema.ts
    │   └── category.schema.ts
    ├── stores/
    │   ├── ui.store.ts
    │   └── expenses.store.ts         # période, filtres, sheet
    ├── hooks/
    │   ├── use-family.ts
    │   ├── use-expenses.ts
    │   ├── use-categories.ts
    │   └── use-members.ts
    ├── components/
    │   ├── ui/                       # shadcn — ne pas forker
    │   ├── layout/
    │   ├── providers/
    │   ├── expenses/
    │   ├── family/
    │   └── forms/
    ├── lib/                          # cn(), query-client, money
    ├── utils/
    └── styles/globals.css
```

## État actuel

Le dépôt n'a que le starter Next.js : `client/app/`, Tailwind v4, TypeScript `strict`, alias `@/*` → `./*`. Pas encore de `src/`, shadcn, Zustand, Query, Axios, Zod, NextAuth, Vitest ni Playwright.

Ne pas ajouter de feature dans `client/app/` sans le déplacement vers `src/app/`.

## Flux de données

1. **Lecture** — la page appelle `useExpenses()` → Query → `expensesApi` → Axios. Afficher `isPending` / `isError` / `data`.
2. **Écriture** — formulaire → Zod `safeParse` → `useCreateExpense().mutate` → invalidation `expenseKeys`. Toast succès ou erreur.
3. **UI** — période, filtres, sheet, dépense sélectionnée → `expenses.store`.
4. **Auth** — session NextAuth → interceptor Axios (`Authorization: Bearer`). Sans session : redirection `/auth/signin`. Sans `familyId` : `/family/new` ou `/family/join`.
5. **Filtres** — la période et les filtres font partie du `queryKey` quand le serveur filtre. Zustand ne recopie pas la liste.

## Auth (NextAuth v5)

- Config : `src/auth/auth.ts` (Credentials).
- Route : `src/app/api/auth/[...nextauth]/route.ts` exporte `GET` et `POST`.
- `src/app/layout.tsx` enveloppe l'arbre avec `SessionProvider` via un composant client.
- Session JWT. Champs de session : `user.id`, `familyId | null`, `role: "owner" | "member" | null`.
- Pages publiques : `/`, `/auth/*`. Pages famille sans foyer : `/family/new`, `/family/join`. Le reste exige session **et** `familyId`.

## Providers (`layout.tsx`)

Ordre : `SessionProvider` → `QueryClientProvider` → `ThemeProvider` → `TooltipProvider` → `Toaster`.

## Alias

`@/components`, `@/stores`, `@/hooks`, `@/api`, `@/schemas`, `@/auth`, `@/lib`, `@/utils`, `@/types`
