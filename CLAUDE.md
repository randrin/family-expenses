# CLAUDE.md — family-expenses

> Client : `client/CLAUDE.md` · Serveur : `server/CLAUDE.md`
> Skills : `.claude/skills/client-stack/` · `.claude/skills/server-stack/`

## Projet

Suivi des dépenses d'un foyer.

## Stack client

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

App Router. Pas de Pages Router.

## Stack serveur

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

L'API est la source de vérité. Port 3001.

## Démarrage

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```
