---
id: DEC-20260713213433-use-prisma-over-typeorm
type: decisions
status: draft
created: 2026-07-13
updated: 2026-07-13
tags: ["database"]
related: ["DEC-20260713232944-adopt-customized-jwt-authentication-flow"]
---

# Use Prisma over TypeORM

## Context

Ithos will eventually need a derived database layer for indexing and search over
engineering memory. Markdown remains the source of truth (DEC-0002), but a
database can accelerate queries, filtering, and future dashboard features.

The team evaluated TypeScript ORMs for schema definition, migrations, and query
ergonomics in a Node.js monorepo.

## Alternatives Considered

- **TypeORM** — decorator-based entities, mature ecosystem, supports many
  databases
- **Drizzle** — lightweight, SQL-first, minimal runtime
- **Kysely** — type-safe query builder without a full ORM
- **Raw SQL** — maximum control, no abstraction layer

## Decision

Use **Prisma** as the ORM for derived database storage and indexing.

## Why

Prisma offers:

- A declarative schema file that is easy to read, diff in Git, and share across
  packages
- Strong TypeScript inference with generated client types tied to the schema
- A straightforward migration workflow (`prisma migrate`) suitable for a small
  team
- Good developer experience in editors and CI without decorator-heavy entity
  classes

TypeORM was rejected because its decorator-based model adds ceremony in a plain
TypeScript codebase, migration behavior can be inconsistent across environments,
and the generated types are weaker than Prisma's schema-driven client.

## Trade-offs

**Pros:**

- Excellent DX and type safety for common CRUD and relational queries
- Schema is the single source of truth for the database shape
- Large community and documentation

**Cons:**

- Less flexibility than raw SQL or Kysely for complex queries
- Generated client adds a build step and dependency footprint
- Prisma's query engine is an extra runtime layer compared to lighter
  alternatives like Drizzle

If Ithos later needs heavy custom SQL or multi-database portability beyond
Prisma's sweet spot, this decision should be revisited.
