# Règles métier — client family-expenses

Le client applique ces règles **avant** l'appel API. L'API reste la source de vérité (isolation par famille, validation serveur).

## Acteurs

| Acteur | Peut | Ne peut pas |
|--------|------|-------------|
| Visiteur | Voir `/`, s'inscrire, se connecter | Voir un foyer ou des dépenses |
| Utilisateur sans foyer | Créer un foyer ou le rejoindre avec un code | Saisir une dépense |
| Membre | Créer et annuler **ses** dépenses, lire celles du foyer, lire les membres | Modifier le foyer, gérer les catégories, retirer un membre |
| Propriétaire | Tout le membre, plus profil du foyer, catégories, retrait d'un membre | Voir ou modifier un autre foyer |
| Client | Valider, afficher, muter via API | Calculer un code foyer, convertir une devise, effacer une dépense |

Un utilisateur appartient à **un seul** foyer.

## Authentification

- Email valide et unique. Mot de passe **≥ 8** caractères.
- `firstName`, `lastName` obligatoires. `displayName` unique, obligatoire.
- Téléphone optionnel.
- Session NextAuth v5 obligatoire hors `/` et `/auth/*`.
- `userId`, `familyId` et `role` viennent de la session. Jamais d'un champ libre.
- Déconnexion : `signOut` + `queryClient.clear()`.

## Foyer

1. **Nom** obligatoire après `trim()`, **≥ 5** caractères. Le client envoie le nom tel que saisi ; la casse d'affichage suit la réponse API.
2. **Pays** et **adresse** obligatoires à la création.
3. **Code** : 5 chiffres, **créé par l'API**. Le client l'affiche et le saisit pour rejoindre un foyer. Il ne le génère pas.
4. **Devise** : code ISO 4217 choisi à la création. Plus modifiable dès qu'une dépense `posted` existe.
5. Rejoindre = code exact à 5 chiffres + session. Un utilisateur qui a déjà un `familyId` ne peut pas rejoindre un second foyer.
6. Le propriétaire ne peut pas quitter le foyer s'il est le seul propriétaire.
7. Un membre retiré perd l'accès tout de suite. Ses dépenses restent dans le foyer.

## Dépenses

### Cycle de vie

```
posted → void
```

`void` est terminal. Pas de suppression physique. Pas de réouverture.

| Statut | Dans les totaux | Qui peut le poser |
|--------|-----------------|-------------------|
| `posted` | oui | le membre, sur une dépense à son nom |
| `void` | non | l'auteur, ou le propriétaire pour n'importe quelle dépense du foyer |

### Invariants

1. **Montant** = entier de centimes `amountMinor` **> 0**. L'UI formate avec `Intl.NumberFormat` et la devise du foyer. Jamais de `number` en euros additionné dans un composant.
2. **Date** `spentOn` = jour calendaire `YYYY-MM-DD`, obligatoire, **pas dans le futur**. Ce n'est pas un instant UTC.
3. **Catégorie** obligatoire, et elle appartient au foyer courant.
4. **Payeur** = membre courant du foyer. Défaut : le membre de la session. Pas un id saisi libre.
5. **Note** optionnelle, ≤ 500 caractères.
6. Une dépense `void` reste visible dans une vue « annulées », hors KPI et hors graphiques.
7. Le client n'affiche que les dépenses renvoyées par l'API. Pas de filtre `familyId` local pour « sécuriser » l'écran.
8. Pas de partage au centime près, pas de budget, pas de conversion de devise dans cette version.

### Forme cible

```ts
type ExpenseStatus = "posted" | "void";

interface Expense {
  id: string;
  amountMinor: number;
  currency: string;
  spentOn: string;
  categoryId: string;
  paidByMemberId: string;
  note?: string;
  status: ExpenseStatus;
  voidedAt?: string;
}
```

## Catégories

- Appartiennent au **foyer**. Nom unique dans le foyer.
- `name` et `color` obligatoires. Gestion réservée au propriétaire.
- Un membre choisit une catégorie existante ; il n'en crée pas.
- Suggestions possibles à la création du foyer, envoyées à l'API (Alimentation, Logement, Transport, Santé, Éducation, Autre). Ce n'est pas une union TypeScript fermée.
- Supprimer une catégorie qui a des dépenses est refusé par l'API. L'UI affiche l'erreur, elle ne réassigne pas en silence.

## Dashboard

- Période par défaut : mois calendaire en cours. Le changement de période change le `queryKey`.
- Filtres Zustand : période, catégorie, membre, recherche dans la note.
- KPI et graphiques = dépenses `posted` de la période uniquement.
- Création / annulation : Sheet shadcn, Zod, puis mutation Query.
- Feedback : toast sonner. Pas d'`alert()`.

## Formulaires

| Formulaire | Règles Zod |
|------------|------------|
| Sign in | email + password non vides |
| Sign up | prénom, nom, displayName, email, password ≥ 8, confirmation identique |
| Créer un foyer | nom ≥ 5, pays, adresse, devise ISO 4217 |
| Rejoindre | code `/^\d{5}$/` |
| Dépense | centimes > 0, date ≤ aujourd'hui, catégorie, note ≤ 500 |
| Catégorie | nom non vide, couleur — propriétaire seulement |

## Erreurs UX

- 401 → `signOut` + redirect `/auth/signin`.
- 403 / 404 → toast, la page reste debout.
- Erreur réseau Query → état `isError` visible, pas un spinner infini.
- Erreurs Zod à côté du champ. Toasts réservés à l'API.
