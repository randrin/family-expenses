# Client Stack — Patterns

## NextAuth v5 (App Router)

```ts
// src/auth/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schemas/auth.schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
});
```

```ts
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth/auth";

export const { GET, POST } = handlers;
```

Interceptor Axios : poser `Authorization` depuis la session. Ne pas stocker le JWT dans Zustand.

## Argent

```ts
export function formatMinor(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(
    amountMinor / 100,
  );
}
```

Le schéma Zod refuse un montant nul, négatif ou avec plus de deux décimales **avant** la conversion en centimes.

## Zustand — UI uniquement

```ts
type ExpenseFilters = {
  from: string;
  to: string;
  categoryId?: string;
  memberId?: string;
  note: string;
};

type ExpensesUiState = {
  filters: ExpenseFilters;
  isFormOpen: boolean;
  selectedExpenseId: string | null;
  openCreate: () => void;
  closeForm: () => void;
};
```

La liste des dépenses n'est pas dans ce store.

## Zod

```ts
export const expenseStatusSchema = z.enum(["posted", "void"]);

export const createExpenseSchema = z.object({
  amountMinor: z.number().int().positive(),
  spentOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  categoryId: z.string().uuid(),
  note: z.string().trim().max(500).optional(),
});
```

`familyId` et `paidByMemberId` ne sont pas des champs du formulaire.

## Query

```ts
export const expenseKeys = {
  all: ["expenses"] as const,
  list: (filters: ExpenseFilters) => [...expenseKeys.all, filters] as const,
};
```

Une mutation réussie invalide `expenseKeys.all`. Le skeleton suit `isPending`, pas un état vide.
