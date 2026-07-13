# DECISIONS.md

# Engineering Decisions

This document records the major product and architectural decisions made while
building Ithos.

The purpose is not to record every discussion.

The purpose is to preserve decisions that future contributors will need to
understand.

As Ithos evolves, these decisions may be moved into dedicated files inside
.ithos/decisions.

---

# DEC-0001

## Title

Engineering memory is the core product.

## Status

Accepted

## Context

The initial idea explored several directions:

- Developer social network
- AI activity logger
- AI build history
- Portfolio generator

Through iteration, it became clear that all of these were secondary.

## Decision

Ithos will focus on preserving engineering memory.

Everything else should build on top of this foundation.

## Why

Engineering memory solves a real problem introduced by AI-assisted development.

Social features can naturally emerge later.

---

# DEC-0002

## Title

Markdown is the source of truth.

## Status

Accepted

## Alternatives Considered

- SQLite
- JSON
- YAML
- Proprietary database

## Decision

All engineering memory will be stored as markdown.

Indexes and databases may exist in the future but are always derived.

## Why

Markdown is:

- Open
- Portable
- Human-readable
- Git-friendly
- AI-friendly
- Future-proof

---

# DEC-0003

## Title

Git is the synchronization layer.

## Status

Accepted

## Decision

Ithos will not invent its own synchronization mechanism.

Git already solves versioning, history, branching and collaboration.

## Why

Adopt before invent.

---

# DEC-0004

## Title

Local-first architecture.

## Status

Accepted

## Decision

Everything should work locally without cloud services.

Cloud is an optional enhancement.

## Why

Developers should always own their engineering memory.

---

# DEC-0005

## Title

AI captures. Humans review.

## Status

Accepted

## Decision

AI should automatically capture engineering memory.

Humans remain responsible for reviewing and approving important artifacts.

## Why

Reduce documentation burden without removing engineering judgment.

---

# DEC-0006

## Title

Convention before application.

## Status

Accepted

## Decision

The .ithos directory is more important than any single application.

The CLI, MCP server and dashboard are reference implementations of the
convention.

## Why

The long-term vision is an open ecosystem, not a closed platform.

---

# DEC-0007

## Title

Open source using open source.

## Status

Accepted

## Decision

Ithos should embrace existing developer standards whenever possible.

Examples include:

- Markdown
- Git
- MCP
- Obsidian compatibility

## Why

Developers should be able to continue using the tools they already trust.

---

# DEC-0008

## Title

Community is built on engineering memory.

## Status

Accepted

## Context

A developer community was considered as the primary product.

## Decision

Community features are intentionally postponed.

The first priority is building valuable engineering memory.

Community should emerge naturally from high-quality engineering knowledge.

## Why

Great engineering should become discoverable.

Popularity should never be the primary goal.

---

# DEC-0009

## Title

Dogfood from Day One.

## Status

Accepted

## Decision

Ithos will be used to build Ithos.

Major product and architectural decisions should be captured using Ithos itself.

## Why

The product should continuously improve through real-world usage.

The best test environment is the project itself.

---

# DEC-0010

## Title

Use a minimal npm workspaces TypeScript monorepo.

## Status

Accepted

## Context

Phase 1 of the roadmap requires repository setup, TypeScript, linting,
formatting, CI and documentation.

Future phases will introduce a CLI, markdown engine, MCP server, dashboard and
search. Creating all package boundaries now would make the repository look more
mature than the implementation actually is.

## Alternatives Considered

- Single-package repository
- pnpm workspace
- Yarn workspace
- Creating placeholder packages for future phases

## Decision

Ithos will start as an npm workspaces monorepo with a single `ithos-core`
package.

Future packages should be added only when their roadmap phase begins.

The initial ESLint setup will use the recommended TypeScript rules without
type-aware linting. TypeScript itself remains strict through `tsc`.

## Why

npm workspaces keep the foundation simple, local, open and familiar while still
leaving room for separate CLI, MCP and dashboard packages later.

Starting with only `ithos-core` avoids placeholder architecture and keeps Phase
1 focused on developer experience.

Skipping type-aware linting in Phase 1 avoids extra configuration complexity
while the repository has only one small package. If Ithos gains more complex
cross-package TypeScript behavior, this decision should be revisited.

---

# DEC-0011

## Title

Use Commander for the Phase 2 CLI.

## Status

Accepted

## Context

Phase 2 introduces the first usable Ithos product surface: a local CLI with
commands for initialization, validation, recording, search and export.

The CLI should be easy to understand, local-first and small enough for future
contributors to maintain.

## Alternatives Considered

- Hand-rolled argument parsing
- yargs
- cac
- oclif

## Decision

Ithos will use Commander for the Phase 2 CLI.

The CLI package will live in `packages/cli` and expose an `ithos` binary.

## Why

Commander is mature, widely used, small enough for this phase and readable in
source. It avoids custom parser code while staying lighter than a full CLI
application framework.

This keeps Phase 2 focused on local engineering memory workflows rather than CLI
infrastructure.
