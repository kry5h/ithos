---
id: DEC-20260713213917-use-angular-over-vue-for-the-dashboard
type: decisions
status: draft
created: 2026-07-13
updated: 2026-07-13
tags: []
---

# Use Angular over Vue for the dashboard

## Context

Ithos Phase 5 calls for a local dashboard that reads markdown and surfaces
engineering memory (timeline, decisions, sessions, architecture, patterns,
search). The dashboard needs a frontend framework for components, routing, and
long-term maintainability in a TypeScript monorepo.

Vue was the initial candidate for its approachable learning curve and flexible
composition model.

## Alternatives Considered

- **Vue 3** — lightweight, flexible composition API, gentle learning curve
- **React** — largest ecosystem, but adds a second UI paradigm alongside
  Angular-style structure
- **Svelte / SvelteKit** — minimal runtime, smaller ecosystem for
  enterprise-style apps
- **Plain TypeScript + web components** — no framework lock-in, but slower to
  build rich UI

## Decision

Use **Angular** as the frontend framework for the Ithos dashboard.

Vue is no longer the default choice for this project.

## Why

Angular aligns better with Ithos's goals:

- **TypeScript-first** — first-class TypeScript support matches the monorepo's
  existing stack and conventions
- **Opinionated structure** — modules, dependency injection, and CLI scaffolding
  reduce ambiguity as the dashboard grows
- **Built-in tooling** — routing, forms, HTTP client, and testing utilities ship
  in the framework, limiting ad-hoc library choices
- **Long-term maintainability** — predictable patterns suit a reference
  implementation that other teams may fork or extend

Vue was rejected because its flexibility and lighter conventions make
consistency harder to enforce across contributors and AI agents, and it offers
less built-in structure for a dashboard that will accumulate many views over
time.

## Trade-offs

**Pros:**

- Strong TypeScript integration and compile-time safety
- Cohesive, batteries-included framework reduces decision fatigue
- Angular CLI supports consistent project scaffolding in CI and local dev
- Mature patterns for larger, multi-view applications

**Cons:**

- Steeper initial learning curve than Vue
- Larger bundle size and more boilerplate for simple screens
- Heavier framework than Vue or Svelte for a small local dashboard

If the dashboard scope stays very small (a handful of read-only views), this
decision can be revisited—but for a growing reference UI, Angular is the better
default.
