# PLAN.md

# Ithos Roadmap

This document tracks the implementation roadmap for Ithos.

Unlike VISION.md and PRINCIPLES.md, this document is expected to change frequently.

---

# Current Status

**Phases 1–4 are complete and shipped.**

Ithos is live on npm:

```bash
npm install -g ithos        # CLI
npm install -g ithos-mcp    # MCP server
```

The core loop works end-to-end: AI agents automatically record decisions, lessons, and session summaries into `.ithos/` as you code.

---

# Phase 1 — Foundation ✅

- Monorepo setup with npm workspaces
- TypeScript configuration
- Linting and formatting
- CI pipeline
- Core documentation

---

# Phase 2 — CLI ✅

Commands shipped:

```bash
ithos init
ithos validate
ithos doctor
ithos record
ithos search
ithos export
```

---

# Phase 3 — Markdown Engine ✅

- File creation, reading, and validation
- Frontmatter parsing and management
- Artifact linking
- Keyword search
- Export to concatenated markdown

---

# Phase 4 — MCP Server ✅

Tools shipped:

- `get_project_context` — reads `.ithos/README.md` and `project.md`
- `record_decision` — saves architectural decisions
- `record_lesson` — captures development lessons
- `record_session` — logs session summaries

Published as `ithos-mcp` on npm. Works with Cursor, Claude Desktop, and any MCP-compatible client.

---

# Phase 5 — Dashboard

Build a local dashboard to browse engineering memory visually.

Views:

- Timeline
- Decisions
- Sessions
- Architecture
- Patterns
- Search

Deliverable:

Developers can browse engineering memory without opening individual markdown files.

---

# Phase 6 — Search

Extend search beyond keyword matching.

- Tag-based search
- Semantic search
- AI-assisted search

Deliverable:

Developers can quickly surface relevant engineering knowledge across large repositories.

---

# Phase 7 — Publishing

Allow developers to selectively publish engineering memory.

Options:

- Markdown export
- HTML
- GitHub Pages
- Future Ithos Community

Publishing should always require explicit user approval.

---

# MVP Definition

The MVP is complete when:

- [x] A repository can be initialized.
- [x] AI can record engineering memory via MCP.
- [x] Memory is stored as git-native markdown.
- [x] Developers can search previous decisions.
- [x] Packages are published to npm (`ithos`, `ithos-core`, `ithos-mcp`).
- [ ] Developers can browse memory through a visual dashboard.

---

# Out of Scope (for now)

Do NOT build yet:

- Cloud sync
- Authentication
- Teams
- Billing
- Notifications
- Mobile apps
- Enterprise features
- Social features (likes, comments, followers)
- AI-generated engagement

These are future concerns.

---

# Development Workflow

Every feature should follow this flow:

1. Design
2. Implement
3. Review
4. Capture engineering memory
5. Commit

Ithos should always be used while building Ithos.

---

# Guiding Principle

When uncertain what to build next, ask:

> Does this improve engineering memory?

If not, it probably belongs in a future release.
