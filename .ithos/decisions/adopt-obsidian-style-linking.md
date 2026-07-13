---
id: DEC-20260713225200-adopt-obsidian-style-linking
type: decisions
status: accepted
created: 2026-07-13
updated: 2026-07-13
tags: ["architecture", "mcp"]
related: []
---

# Adopt Obsidian-Style Linking and Metadata

## Context

As the number of architectural decisions, lessons, and session logs in Ithos
grows, a flat file structure runs the risk of cluttering the `.ithos` directory
and exceeding AI context window limits during searches. To avoid cognitive and
computational overload, Ithos needs an elegant way to organize, filter, and
traverse engineering memories.

## Alternatives Considered

- **Nested Directories** — Organize by domain or date (e.g.
  `.ithos/auth/decisions/`). While clean in the file explorer, this adds
  complexity to the CLI file routing, and limits items that cross boundaries to
  a single folder location.
- **Local SQLite/Vector Database** — Ingest and retrieve files semantically.
  This is planned for Phase 6, but introduces external runtimes and does not
  provide immediate visual representation to humans reading the markdown raw.
- **Flat list with no relationships** — Keep the current simple listing. This
  does not scale.

## Decision

Adopt **Obsidian-Style linking and metadata tagging** inside the YAML
frontmatter and file content of all Ithos artifacts.

## Why

This approach offers several key advantages:

1. **Non-Hierarchical Organization**: Items can have multiple tags (e.g. `auth`
   and `database`), avoiding rigid directory placement.
2. **Graph Traversal for AI**: AI models can traverse linked artifacts
   iteratively (e.g. following links from a `session` to a `decision`) instead
   of performing brute-force keyword searches across all files, keeping the
   context window small.
3. **Visual Dashboard Readiness**: Prepares Ithos for a beautiful visual graph
   view in Phase 5, showing structural connections between decisions, lessons,
   and issues.
4. **Git-Native and Markdown-Friendly**: Remains fully readable, editable, and
   trackable in pure text.

## Trade-offs

**Pros:**

- Light weight, no extra database or dependencies.
- Naturally supports bidirectional connections (`[[DEC-XXXX]]`).
- Simple to implement at the CLI and MCP layer.

**Cons:**

- Relies on AI assistants (and developers) to consistently populate `tags` and
  `related` fields during recording.
