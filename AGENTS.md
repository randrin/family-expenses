# AGENTS.md — family-expenses

> Contexte principal pour **Cursor** et **Codex**.
> Client : `client/AGENTS.md` · Serveur : `server/AGENTS.md`
> Skills Cursor : `.cursor/skills/client-stack/` · `.cursor/skills/server-stack/`
> Skills Codex : `.agents/skills/client-stack/` · `.agents/skills/server-stack/`

## Projet

Application pour suivre les dépenses d'un foyer.

- **client/** — Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Shadcn/UI · Zustand · TanStack React Query · Axios · Zod · NextAuth v5 · Vitest · Playwright
- **server/** — NestJS, TypeScript, PostgreSQL, TypeORM, JWT, class-validator + class-transformer

## Client

- App Router (`src/app/`), `"use client"` si état ou événements
- Query pour les données serveur, Zustand pour l'UI seulement
- Montants en centimes. Code foyer généré par l'API.
- NextAuth v5 sur les pages protégées
- Skill : `.cursor/skills/client-stack/SKILL.md`

## Serveur

- Module / controller / service, DTO class-validator
- JWT (`sub`). `familyId` relu depuis l'adhésion active
- PostgreSQL, TypeORM, migrations, `synchronize: false`
- Port 3001
- Skill : `.cursor/skills/server-stack/SKILL.md`

## Commandes

```bash
cd server && npm install && npm run start:dev
cd client && npm install && npm run dev
```

## Agents

| Outil | Client | Serveur | Skills |
|-------|--------|---------|--------|
| Cursor | `client/AGENTS.md` | `server/AGENTS.md` | `.cursor/skills/` |
| Codex | `client/AGENTS.md` | `server/AGENTS.md` | `.agents/skills/` |
| Claude | `client/CLAUDE.md` | `server/CLAUDE.md` | `.claude/skills/` |
| Gemini | `client/GEMINI.md` | `server/GEMINI.md` | `.gemini/skills/` |
