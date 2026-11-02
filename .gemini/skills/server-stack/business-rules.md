# Règles métier — server family-expenses

L'API est la **source de vérité**. Le client reflète ces règles ; il ne les remplace pas.

## Acteurs

| Acteur | Peut | Ne peut pas |
|--------|------|-------------|
| Anonyme | S'inscrire, se connecter | Lire ou muter un foyer |
| Utilisateur sans foyer | Créer un foyer, rejoindre avec un code | Créer une dépense ou une catégorie |
| Membre | Créer une dépense, annuler **les siennes**, lire le foyer | Modifier le foyer, gérer les catégories, retirer un membre |
| Propriétaire | Tout le membre, plus profil du foyer, catégories, retrait d'un autre membre | Lire ou modifier un autre foyer |

Un utilisateur a **au plus une** adhésion active.

## Authentification

- Email unique, format email. Mot de passe **≥ 8**, stocké hashé (bcrypt).
- `firstName`, `lastName`, `displayName` obligatoires. `displayName` unique. Téléphone optionnel.
- JWT signé (`JWT_SECRET`), payload `{ sub, email }`.
- Login invalide → `UnauthorizedException`, même message dans les deux cas.
- Email ou `displayName` déjà pris → `ConflictException`.
- Jamais renvoyer `password`.
- 401 si le token est absent, expiré ou invalide.

## Foyer et adhésion

1. **Nom** obligatoire après `trim()`, **≥ 5** caractères. **Pays** et **adresse** obligatoires.
2. **Code** : 5 chiffres, unique, généré par l'API (`crypto.randomInt`, bourré de zéros, nouvel essai si conflit). Jamais fourni par le client.
3. Le créateur devient propriétaire. L'adhésion est unique sur `userId` tant qu'elle est active (`leftAt` null).
4. Rejoindre exige un code exact et l'absence d'adhésion active. Sinon 409.
5. **Devise** ISO 4217, obligatoire à la création. `PATCH` refusé (409) dès qu'une dépense `posted` existe.
6. Le propriétaire ne peut pas quitter s'il est le seul propriétaire (409).
7. Retrait d'un membre : le propriétaire pose `leftAt`. Le membre perd l'accès immédiatement. Ses dépenses restent.
8. Après création, jointure ou départ, la réponse inclut un nouvel `accessToken`.

## Dépenses

```
posted → void
```

`void` est terminal. Pas de `DELETE`. Pas de `PATCH` du montant, de la date, de la catégorie ou du payeur.

| Statut | Dans les totaux | Qui peut le poser |
|--------|-----------------|-------------------|
| `posted` | oui | un membre actif, pour lui-même |
| `void` | non | l'auteur, ou le propriétaire du même foyer |

1. `amountMinor` entier **> 0**. Colonne entière. Pas de float.
2. `currency` copiée depuis le foyer au moment de l'insert.
3. `spentOn` est une date `YYYY-MM-DD`, obligatoire, **≤ aujourd'hui (UTC)**.
4. `categoryId` obligatoire et appartient au même foyer. Sinon 404.
5. `paidByMemberId` = l'utilisateur JWT. Ignorer toute autre valeur envoyée.
6. `note` optionnelle, ≤ 500 caractères.
7. `GET /expenses` ne renvoie que le foyer de l'adhésion active. Filtres optionnels : `from`, `to`, `categoryId`, `memberId`, `status`.
8. Les totaux, s'ils sont calculés par l'API, excluent `void`.
9. Pas de partage, pas de budget, pas de conversion de devise.

## Catégories

- Appartiennent au foyer. Unique `(familyId, name)`.
- `name` et `color` obligatoires.
- Création, modification, suppression : propriétaire seulement. Un membre reçoit 403.
- Suppression refusée (409) si une dépense référence encore la catégorie.
- Une liste suggérée peut être créée avec le foyer (Alimentation, Logement, Transport, Santé, Éducation, Autre). Ce n'est pas un enum fermé.

## Isolation

- Toute lecture ou écriture métier exige une adhésion active. Sinon 403, avec un code stable `NO_FAMILY` sur la création de dépense.
- Ressource d'un autre foyer → **404**, pas 403.
- Action réservée au propriétaire dans **son** foyer → 403.
- Interdit d'accepter `familyId`, `userId` ou `role` dans le DTO pour choisir le périmètre.

## Erreurs HTTP

| Cas | Code |
|-----|------|
| Token manquant ou invalide | 401 |
| DTO invalide, date future, montant non entier | 400 |
| Membre sur une action propriétaire | 403 |
| Autre foyer, ou id inconnu | 404 |
| Doublon, déjà dans un foyer, devise figée, seul propriétaire | 409 |
