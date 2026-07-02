# SPEC.md

# Ithos Specification

This document defines the .ithos specification.

It is the contract between:

- Humans
- AI Agents
- CLI
- MCP Server
- Dashboard
- Future integrations

Every implementation of Ithos MUST follow this specification.

---

# Goals

The .ithos directory exists to preserve engineering memory.

It should explain:

- Why software evolved
- Which decisions were made
- Which alternatives were considered
- What worked
- What failed
- What future engineers should know

It is not intended to become another documentation folder.

---

# Source of Truth

The source of truth is the markdown inside .ithos.

Everything else is derived.

Examples of derived data:

- Search indexes
- SQLite databases
- Vector databases
- Dashboard views
- Graphs
- Analytics

If generated data is lost, it should always be reproducible from markdown.

---

# Repository Layout

text .ithos/ README.md project.md sessions/ decisions/ architecture/ features/
patterns/ defects/ regressions/ gaps/ lessons/ releases/ attachments/

The structure may evolve while maintaining backward compatibility.

---

# README.md

Required.

Purpose:

Introduce Ithos to both humans and AI agents.

Contains:

- What Ithos is
- Project conventions
- Folder structure
- How AI should contribute
- Links to other documentation

Every AI agent should read this file before writing into .ithos.

---

# project.md

Required.

Contains:

- Project summary
- Goals
- Technology stack
- High-level architecture
- Coding conventions
- Important links

This file provides project context.

---

# Sessions

Each development session may generate one session document.

Purpose:

Capture a high-level summary of the work completed.

Do NOT capture:

- every prompt
- every edit
- every command

Instead capture:

- objectives
- milestones
- outcomes
- lessons

---

# Decisions

One file per significant engineering decision.

Each decision should answer:

- What changed?
- Why?
- Alternatives considered?
- Trade-offs?
- Outcome?
- Related decisions?

Decisions are among the highest-value artifacts in Ithos.

---

# Architecture

Architecture documents explain structural changes.

Examples:

- service boundaries
- infrastructure
- database changes
- system design
- scalability decisions

---

# Features

Describe significant product features.

Focus on:

- intent
- user value
- implementation overview

Not implementation details.

---

# Patterns

Capture reusable engineering knowledge.

Examples:

- authentication pattern
- retry strategy
- caching strategy
- testing pattern

Patterns should help future projects.

---

# Defects

Capture meaningful defects.

Include:

- symptoms
- root cause
- resolution
- prevention

---

# Regressions

Capture regressions separately.

A regression should explain:

- what broke
- why it broke
- how it escaped
- how recurrence was prevented

---

# Gaps

Capture things discovered during development but intentionally left unresolved.

Examples:

- technical debt
- missing validations
- known limitations
- postponed improvements

---

# Lessons

Capture important lessons.

Examples:

- engineering lessons
- product lessons
- architectural lessons
- AI collaboration lessons

A lesson should help future engineers make better decisions.

---

# Releases

Each release should summarize:

- major features
- breaking changes
- migrations
- notable decisions

---

# Attachments

Optional.

Contains supporting assets.

Examples:

- diagrams
- screenshots
- exported reports

Large binaries should be avoided whenever possible.

---

# Markdown

Every artifact should be valid markdown.

Markdown should remain readable:

- on GitHub
- in VS Code
- in Cursor
- in Obsidian
- in terminal
- by AI agents

---

# Frontmatter

Structured metadata should use YAML frontmatter.

Example:

yaml --- id: DEC-0001 type: decision status: accepted created: 2026-07-03
updated: 2026-07-03 tags: - architecture - backend ---

The schema will evolve over time.

---

# Linking

Use standard markdown links whenever possible.

Future versions may support wiki-style links.

Cross-reference related artifacts frequently.

Engineering memory becomes more valuable when connected.

---

# Naming

Prefer descriptive names.

Good:

text Use Markdown as Source of Truth.md Introduce MCP Server.md Authentication
Retry Pattern.md

Avoid:

text decision1.md notes.md misc.md

---

# Writing Style

Every artifact should be:

- concise
- factual
- human-readable
- timeless

Avoid unnecessary AI-generated verbosity.

Write for Future Engineers.

---

# AI Responsibilities

AI should:

- summarize
- organize
- connect related artifacts
- identify patterns
- reduce noise

AI should NOT:

- log every action
- duplicate information
- invent facts
- overwhelm humans

---

# Human Responsibilities

Humans remain responsible for:

- engineering judgment
- approving important decisions
- correcting inaccuracies
- deciding what should be shared publicly

---

# Validation

A valid Ithos repository must contain:

- .ithos/
- README.md
- project.md

All other directories are optional and may be created on demand.

---

# Extensibility

Future versions may introduce:

- new artifact types
- plugins
- exporters
- dashboards
- cloud synchronization
- AI enrichment

The markdown specification should remain backward compatible.

---

# Compatibility

Ithos should integrate naturally with existing developer tools.

Examples include:

- Git
- Markdown
- Obsidian
- VS Code
- Cursor
- Local LLMs
- MCP-compatible AI agents

Ithos does not depend on any specific tool.

Markdown is the standard.

Everything else is a client.

---

# Philosophy

The purpose of .ithos is not to document software.

The purpose is to preserve engineering memory.

Software changes.

People change.

AI models change.

Engineering knowledge should remain.

Every artifact should answer one question:

> Will this help someone understand how this software became what it is today?

If the answer is yes, it belongs in Ithos.
