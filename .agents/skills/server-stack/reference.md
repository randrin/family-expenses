# Server Stack — Patterns

## Entité

```ts
@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer" })
  amountMinor: number;

  @Column({ type: "char", length: 3 })
  currency: string;

  @Column({ type: "date" })
  spentOn: string;

  @Column({ type: "enum", enum: ["posted", "void"], default: "posted" })
  status: "posted" | "void";

  @Column()
  familyId: string;

  @Column()
  paidByMemberId: string;

  @Column()
  categoryId: string;
}
```

## DTO

```ts
export class CreateExpenseDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  amountMinor: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  spentOn: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
```

Pas de `familyId`, `paidByMemberId` ni `status` dans ce DTO.

## Service

```ts
async findOne(id: string, familyId: string): Promise<Expense> {
  const expense = await this.expenses.findOne({ where: { id, familyId } });
  if (!expense) throw new NotFoundException();
  return expense;
}
```

Le `familyId` vient de l'adhésion active (`leftAt IS NULL`), pas du body.

## Code foyer

```ts
const code = crypto.randomInt(0, 100_000).toString().padStart(5, "0");
```

Contrainte unique. En cas de conflit, tirer un autre code. Ne pas utiliser `Math.random`.

## Guard

```ts
@UseGuards(JwtAuthGuard)
@Controller("expenses")
export class ExpensesController {
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateExpenseDto) {
    return this.expensesService.create(user.id, dto);
  }
}
```
