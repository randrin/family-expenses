# CLAUDE.md — Claude Code (index)

Instructions pour Claude sur **family-expenses**.

Le fichier principal du dépôt est [`../CLAUDE.md`](../CLAUDE.md).

## Applications

| Dossier | Stack | Agent file |
|---------|-------|------------|
| `client/` | Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI · Zustand · TanStack Query · Axios · Zod · NextAuth v5 · Vitest · Playwright | `client/CLAUDE.md` |
| `server/` | NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer | `server/CLAUDE.md` |

## Skills

- Client : `.claude/skills/client-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)
- Serveur : `.claude/skills/server-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)

## Démarrage

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```
