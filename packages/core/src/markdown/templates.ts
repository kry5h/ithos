export function ithosReadme(): string {
  return `# Ithos

This directory preserves the engineering memory for this repository.

Ithos records why the software changed: decisions, patterns, lessons, defects,
regressions, gaps, sessions and releases.

Capture signal, not exhaust. Markdown is the source of truth.
`;
}

export function projectTemplate(): string {
  return `---
ithos: "1"
---

# Project

## Summary

Describe what this project is and why it exists.

## Goals

- Preserve engineering memory locally.

## Technology Stack

- TypeScript

## Architecture

Describe the high-level architecture as it evolves.

## Conventions

- Keep markdown human-readable.
- Prefer concise, factual engineering memory.
`;
}
