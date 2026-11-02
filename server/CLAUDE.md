# CLAUDE.md — serveur (Claude)

API NestJS de family-expenses. Dossier : `server/`.

## Stack

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

Compléments : bcrypt, Swagger (`http://localhost:3001/docs`), Vitest.

## Architecture

```
server/src/
├── config/
├── database/            # TypeOrmModule + data-source
├── common/              # JwtAuthGuard, @CurrentUser()
├── entities/            # User, Family, Membership, Category, Expense
└── modules/
    ├── auth/
    ├── families/
    ├── members/
    ├── categories/
    └── expenses/
```

`userId` depuis le JWT. `familyId` depuis l'adhésion active (`leftAt` null).

Le starter actuel n'a que `AppModule` et Observe. Ne pas y mettre le métier, et ne pas retirer Observe.

## Règles métier

1. Anonyme : register et login seulement.
2. Une adhésion active par utilisateur. Code foyer généré par l'API.
3. Dépense : centimes entiers > 0 ; `posted` → `void` ; pas de delete.
4. Catégorie unique `(familyId, name)` ; propriétaire seulement.
5. Autre foyer → 404. Password bcrypt, jamais renvoyé.
6. `synchronize: false`. Migrations pour le schéma.

## Principes

1. Module / controller / service par domaine.
2. DTOs class-validator + class-transformer.
3. Repository TypeORM dans le service.
4. Exceptions NestJS (`NotFoundException`, `UnauthorizedException`, `ConflictException`, `ForbiddenException`).

## Skill

`.claude/skills/server-stack/SKILL.md`
Compléments : `architecture.md`, `business-rules.md`, `reference.md`

## Setup

```bash
cd server && npm install
npm run migration:run
npm run start:dev
```
