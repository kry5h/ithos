# PLAN.md

# Ithos Roadmap

This document tracks the implementation roadmap for Ithos.

Unlike VISION.md and PRINCIPLES.md, this document is expected to change
frequently.

---

# Current Goal

Build the smallest possible version of Ithos that proves the core idea:

> Engineering memory should be automatically captured, stored as markdown, and
> easily searchable.

Nothing else matters until this works.

---

# Phase 1 — Foundation

## Repository

- Setup monorepo
- Configure TypeScript
- Configure linting
- Configure formatting
- Setup CI
- Create documentation

Deliverable:

A clean developer experience.

---

# Phase 2 — CLI

Build the Ithos CLI.

Initial commands:

bash ithos init ithos doctor ithos validate ithos record ithos search ithos
export

Deliverable:

A developer can initialize an Ithos repository and manage engineering memory
locally.

---

# Phase 3 — Markdown Engine

Implement the markdown engine.

Responsibilities:

- Create files
- Read files
- Update files
- Validate structure
- Parse metadata
- Link artifacts

Deliverable:

Reliable markdown operations.

---

# Phase 4 — MCP Server

Build the MCP server.

Responsibilities:

- Expose tools to AI agents
- Convert tool requests into markdown artifacts
- Read project context
- Search engineering memory

The MCP server should contain descriptions that help AI agents decide when to
use each tool.

Business logic should remain inside the CLI.

Deliverable:

AI agents can naturally contribute to Ithos.

---

# Phase 5 — Dashboard

Build a local dashboard.

The dashboard should only read markdown.

Views:

- Timeline
- Decisions
- Sessions
- Architecture
- Patterns
- Search

Deliverable:

Developers can browse engineering memory visually.

---

# Phase 6 — Search

Implement search.

Initial search:

- keyword search
- tag search

Future:

- semantic search
- AI-assisted search

Deliverable:

Developers can quickly find engineering knowledge.

---

# Phase 7 — Publishing

Allow developers to publish selected engineering memory.

Examples:

- Markdown
- HTML
- GitHub Pages
- Blog
- Future Ithos Community

Publishing should always require explicit user approval.

---

# MVP Definition

The MVP is complete when:

- A repository can be initialized.
- AI can record engineering memory.
- Memory is stored as markdown.
- Developers can search previous decisions.
- Developers would choose to use Ithos on their next project.

---

# Out of Scope

Do NOT build yet:

- Cloud
- Authentication
- Teams
- Billing
- Notifications
- Mobile apps
- Enterprise features
- Social network
- Likes
- Comments
- Followers
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
