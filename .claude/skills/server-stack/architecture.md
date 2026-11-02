# Architecture cible — server/

API family-expenses : NestJS, TypeORM sur PostgreSQL, auth JWT. Le client Next.js consomme cette API ; il ne remplace pas ces règles.

## Couches

```
HTTP (controller + JWT guard)
        → service (règles métier)
            → TypeORM Repository
                → PostgreSQL
```

| Couche | Dossier | Interdit d'y mettre |
|--------|---------|---------------------|
| Bootstrap | `main.ts`, `app.module.ts` | Métier |
| HTTP | `modules/*/*.controller.ts` | `Repository`, SQL |
| Auth | `modules/auth/` | Dépenses, catégories |
| Métier | `modules/*/*.service.ts` | Réponses HTTP brutes |
| Persistance | `entities/` + `database/` | JWT sign, DTO HTTP |
| Validation | `modules/*/dto/` | Accès DB |

## Arborescence cible

```
server/
├── src/
│   ├── main.ts                      # CORS, ValidationPipe, Swagger /docs, port 3001
│   ├── app.module.ts
│   ├── config/configuration.ts
│   ├── database/
│   │   ├── data-source.ts           # CLI migrations
│   │   └── database.module.ts       # TypeOrmModule.forRootAsync
│   ├── common/
│   │   ├── decorators/current-user.decorator.ts
│   │   └── guards/jwt-auth.guard.ts
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── family.entity.ts
│   │   ├── membership.entity.ts
│   │   ├── category.entity.ts
│   │   └── expense.entity.ts
│   └── modules/
│       ├── auth/
│       ├── families/
│       ├── members/
│       ├── categories/
│       └── expenses/
├── test/
└── .env.example
```

## État actuel

Le dossier `server/` est le starter NestJS 12 : `AppModule`, contrôleur de santé, Vitest, oxlint, `ObserveModule`. Pas de TypeORM, JWT, PostgreSQL ni module métier.

Ne pas poser le métier dans `app.controller.ts`. Ajouter un module par feature. Laisser `ObserveModule` tel quel : ce n'est pas le domaine.

## Auth JWT

1. `POST /auth/register` — crée l'utilisateur (password hashé), sans foyer. Retourne `{ accessToken, user }`.
2. `POST /auth/login` — email + password. Même message si l'email est inconnu ou le mot de passe faux.
3. `GET /auth/me` — profil sans password, avec `familyId` et `role` de l'adhésion active.
4. `POST /auth/refresh` — relit l'adhésion et resign un JWT. À appeler après création, jointure ou départ.
5. Stratégie `passport-jwt`, header `Authorization: Bearer`.
6. Payload : `{ sub, email }`. `familyId` et `role` ne sont pas la source de vérité : le service relit l'adhésion active avant d'écrire.
7. NextAuth côté client appelle ces routes. Cette API ne pose pas le cookie NextAuth.

Routes publiques : `POST /auth/register`, `POST /auth/login`. Tout le reste : `@UseGuards(JwtAuthGuard)`.

## TypeORM

- Driver `postgres`. UUID en clé primaire.
- `synchronize: false`. Chaque changement de schéma = une migration.
- `TypeOrmModule.forFeature([...])` dans le module de la feature.
- Injection : `@InjectRepository(Expense) private readonly expenses: Repository<Expense>`.

## Validation

`ValidationPipe` global. DTOs :

- `class-validator` : `@IsEmail`, `@MinLength`, `@IsISO4217CurrencyCode`, `@IsUUID`, `@IsInt`, `@Min`, `@Matches`
- `class-transformer` : `@Type(() => Number)`, `@Exclude()` sur le password
- Mise à jour : `PartialType(CreateXDto)` depuis `@nestjs/swagger`

## Swagger

UI : `GET /docs`. Bearer JWT. Le métier reste dans les services, pas dans les décorateurs.

## Endpoints cibles

| Module | Routes |
|--------|--------|
| auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh` |
| families | `POST /families`, `POST /families/join`, `GET /families/current`, `PATCH /families/current`, `POST /families/current/leave` |
| members | `GET /families/current/members`, `DELETE /families/current/members/:userId` |
| categories | `GET /categories`, `POST /categories`, `PATCH /categories/:id`, `DELETE /categories/:id` |
| expenses | `GET /expenses`, `POST /expenses`, `POST /expenses/:id/void` |
