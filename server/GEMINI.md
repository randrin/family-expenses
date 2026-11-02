# GEMINI.md — serveur (Gemini)

Instructions pour Gemini sur le **serveur** family-expenses.

> Contexte global : `../GEMINI.md` et `../.gemini/GEMINI.md`
> Skill : `../.gemini/skills/server-stack/SKILL.md`
> Architecture : `../.gemini/skills/server-stack/architecture.md`
> Métier : `../.gemini/skills/server-stack/business-rules.md`

## Stack

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

Port 3001. Vitest pour les tests. Swagger sur `/docs`.

## Architecture

```
server/src/
├── database/              # TypeORM, migrations
├── entities/
├── common/                # guard JWT
└── modules/auth|families|members|categories|expenses
```

- Controller = HTTP. Service = métier + Repository.
- `familyId` relu depuis l'adhésion, pas depuis le body.

## Règles

### HTTP
- `ValidationPipe` : whitelist, forbidNonWhitelisted, transform.
- Routes publiques : register, login. Le reste est sous JWT.

### Métier
- Un utilisateur, une adhésion active.
- Code foyer : 5 chiffres, `crypto.randomInt`, unique.
- Dépense immuable hors passage à `void`.
- Devise ISO 4217 figée après la première dépense `posted`.
- Catégories : propriétaire. Suppression refusée si une dépense les utilise.

### Persistance
- PostgreSQL, UUID, `synchronize: false`.
- Mot de passe bcrypt, exclu des réponses.

### Tests
- Vitest sur les services.
- e2e : register, foyer, dépense, void.

## Commandes

```bash
cd server
npm run start:dev
npm run test
npm run test:e2e
npm run lint
```
