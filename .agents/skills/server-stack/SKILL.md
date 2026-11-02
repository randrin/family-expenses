---
name: server-stack
description: >-
  Guide le développement backend family-expenses dans server/ : NestJS,
  TypeScript, PostgreSQL, TypeORM, JWT, class-validator et class-transformer.
  Utiliser pour toute tâche serveur — modules, controllers, services, DTOs,
  entités, migrations, auth JWT, foyers, membres, catégories ou dépenses.
---

# Server Stack — family-expenses

## Stack

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

Compléments : `@nestjs/config`, `@nestjs/swagger` (`/docs`), bcrypt, Vitest + supertest. Le starter a déjà Vitest et oxlint.

## Pattern obligatoire

Chaque feature = **1 module + 1 controller + 1 service + dto/** :

```
feature/
├── feature.module.ts
├── feature.controller.ts    # HTTP, guards, mapping — pas de TypeORM
├── feature.service.ts       # métier + Repository TypeORM
└── dto/                     # class-validator + class-transformer
```

- **Controller** : routes, `@UseGuards(JwtAuthGuard)`, DTOs, délègue au service.
- **Service** : règles métier, `@InjectRepository`, exceptions NestJS.
- **Module** : `TypeOrmModule.forFeature([...])`, export du service si réutilisé.

## Séparation des responsabilités

| Couche | Outil | Rôle |
|--------|-------|------|
| HTTP | NestJS controllers | Routes, status codes, Swagger |
| Auth | JWT (`@nestjs/jwt` + Passport) | Login, guards, `req.user` |
| Validation | class-validator + class-transformer | DTOs + `ValidationPipe` |
| Métier | Services | Invariants, isolation par foyer |
| Persistance | TypeORM + PostgreSQL | Entités, repos, migrations |

`userId` = `payload.sub` du JWT. `familyId` et `role` viennent de l'adhésion en base, relue à l'écriture. Jamais un `familyId` ou un `role` dans le body.

## Conventions

1. `ValidationPipe` global : `whitelist`, `forbidNonWhitelisted`, `transform: true`.
2. Mot de passe hashé (bcrypt), jamais renvoyé.
3. Exceptions : `NotFoundException`, `BadRequestException`, `UnauthorizedException`, `ConflictException`, `ForbiddenException`.
4. Montants : entier `amountMinor` (centimes). Devise ISO 4217 du foyer, copiée sur la dépense.
5. Schéma via **migrations**. `synchronize: false`.
6. TypeScript strict. Pas de `any`. Diff minimal.
7. Port **3001** (`PORT`), pour laisser 3000 au client Next.js.

## Interdit

- TypeORM ou métier dans les controllers
- `userId`, `familyId` ou `role` acceptés depuis le client pour choisir le propriétaire
- Générer le code foyer côté client, ou avec `Math.random`
- Supprimer physiquement une dépense
- Mot de passe en clair en base ou dans le JSON
- `synchronize: true` comme stratégie de schéma

## Commandes

```bash
cd server
npm run start:dev
npm run migration:run
npm run test
npm run test:e2e
npm run lint
```

`migration:run` s'ajoute avec TypeORM. Il n'existe pas encore sur le starter.

## Checklist

- [ ] DTO class-validator sur toutes les entrées
- [ ] Route protégée par JWT (sauf register / login)
- [ ] Isolation par `familyId` de l'adhésion active
- [ ] Repository TypeORM, pas de SQL dans le controller
- [ ] Migration pour tout changement de schéma
- [ ] Test Vitest du service ou e2e du parcours

## Ressources

- Architecture cible : [architecture.md](architecture.md)
- Règles métier : [business-rules.md](business-rules.md)
- Patterns code : [reference.md](reference.md)
