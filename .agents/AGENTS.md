# AGENTS.md — Codex (index)

Instructions pour Codex sur **family-expenses**.

Le fichier principal du dépôt est [`../AGENTS.md`](../AGENTS.md).

## Applications

| Dossier | Stack | Agent file |
|---------|-------|------------|
| `client/` | Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI · Zustand · TanStack Query · Axios · Zod · NextAuth v5 · Vitest · Playwright | `client/AGENTS.md` |
| `server/` | NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer | `server/AGENTS.md` |

## Skills

- Client : `.agents/skills/client-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)
- Serveur : `.agents/skills/server-stack/SKILL.md` (+ `architecture.md`, `business-rules.md`, `reference.md`)

## Démarrage

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```
