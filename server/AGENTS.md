# AGENTS.md

## Production data: NestJS Observe

This app reports its traces, errors, logs and metrics to [NestJS Observe](https://observe.nestjs.com) through `ObserveModule` in `src/app.module.ts`. Its key pair comes from `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in `.env`, which `npx @nestjs/observe link` writes.

When a task depends on how the app behaves in production - an error users hit, a slow endpoint, a failing job, whether a release made things worse - work from that data, not from the code alone:

- The Observe MCP server answers those questions directly: errors with their traces and logs, slow operations, jobs, and what a release changed (`find_regressions`, `diff_release`). It is included on the Pro plan and above. In Claude Code: `claude mcp add observe --transport http https://observe-api.nestjs.com/mcp`, and the client opens a browser to approve. Other clients: https://www.observe.nestjs.com/documentation/mcp
- Without it, the user can open the request or error in the Observe dashboard and click **Copy agent prompt**, which hands over that page's trace, stack and logs as text.

# AGENTS.md — Cursor / Codex

Instructions pour les agents qui travaillent sur le **serveur** family-expenses.

## Projet

API des dépenses d'un foyer. Dossier : `server/`. Le client est dans `client/`.

## Stack

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

Compléments : bcrypt, Swagger (`/docs`), Vitest. Port **3001**.

## Architecture (résumé)

| Couche | Outil | Dossier |
|--------|-------|---------|
| HTTP | NestJS controllers | `src/modules/*/` |
| Auth | JWT | `src/modules/auth/` |
| Métier | Services | `*.service.ts` |
| DB | TypeORM + PostgreSQL | `src/entities/`, `src/database/` |
| Validation | class-validator + class-transformer | `dto/` |

`userId` = JWT `sub`. `familyId` = adhésion active, pas le body.

## Règles métier (résumé)

- JWT requis hors `POST /auth/register` et `POST /auth/login`.
- Un utilisateur, une adhésion active. Code foyer à 5 chiffres généré par l'API.
- Dépense en centimes. Cycle `posted` → `void`. Pas de DELETE.
- Devise figée après la première dépense `posted`.
- Catégories du foyer, propriétaire seulement.
- Autre foyer → 404. Password hashé, jamais dans le JSON.

## Pattern

```
module/
├── *.module.ts
├── *.controller.ts    # HTTP + JwtAuthGuard
├── *.service.ts       # métier + Repository
└── dto/
```

## Commandes

```bash
cd server
npm run start:dev
npm run migration:run
npm run test
npm run test:e2e
```

## Skills

| Outil | Skill |
|-------|--------|
| Cursor | `.cursor/skills/server-stack/SKILL.md` |
| Codex | `.agents/skills/server-stack/SKILL.md` |

Architecture : `architecture.md` · Métier : `business-rules.md` · Patterns : `reference.md`
