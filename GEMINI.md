# GEMINI.md — family-expenses

> Client : `client/GEMINI.md` · Serveur : `server/GEMINI.md`
> Skills : `.gemini/skills/client-stack/` · `.gemini/skills/server-stack/`

## Projet

Suivi des dépenses d'un foyer.

## Stack client

Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI
Zustand · TanStack React Query · Axios · Zod
NextAuth v5
Vitest · Playwright

App Router (`src/app/`). Query = données serveur. Zustand = filtres et sheets.

## Stack serveur

NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

Controller = HTTP. Service = métier + TypeORM. `familyId` vient de l'adhésion, pas du body.

## Démarrage

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```
