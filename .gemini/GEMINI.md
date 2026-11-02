# GEMINI.md — Google Gemini CLI

Instructions pour Gemini sur **family-expenses**.

## Applications

| Dossier | Stack | Agent file |
|---------|-------|------------|
| `client/` | Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI · Zustand · TanStack Query · Axios · Zod · NextAuth v5 · Vitest · Playwright | `client/GEMINI.md` |
| `server/` | NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer | `server/GEMINI.md` |

## Skills

- Client : `.gemini/skills/client-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)
- Serveur : `.gemini/skills/server-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)

## Démarrage

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```
