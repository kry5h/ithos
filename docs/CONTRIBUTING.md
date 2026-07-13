# CONTRIBUTING.md

# Contributing to Ithos

Welcome!

Ithos is built differently from most software projects. Before making changes,
please understand the project's philosophy.

## Read First

Read these documents in order:

1. `docs/VISION.md`
2. `docs/PRINCIPLES.md`
3. `docs/SPEC.md`
4. `docs/PLAN.md`
5. `docs/DECISIONS.md`

Understand why Ithos exists before deciding how to implement it.

---

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/kry5h/ithos.git
cd ithos
npm install
npm run build
npm run test
```

### Packages

| Package         | npm          | Description                                       |
| --------------- | ------------ | ------------------------------------------------- |
| `packages/core` | `ithos-core` | Domain logic, file operations, search             |
| `packages/cli`  | `ithos`      | Terminal CLI (`ithos init`, `ithos search`, etc.) |
| `packages/mcp`  | `ithos-mcp`  | MCP stdio server for AI assistants                |

### Testing the CLI locally

```bash
# Build all packages
npm run build

# Run the CLI directly
node packages/cli/dist/bin/ithos.js init
```

### Testing the MCP server locally

Point your MCP client config to the local build:

```json
{
  "mcpServers": {
    "ithos": {
      "command": "node",
      "args": ["/absolute/path/to/ithos/packages/mcp/dist/bin/ithos-mcp.js"]
    }
  }
}
```

---

## Development Principles

- Keep implementations simple.
- Prefer composition over cleverness.
- Do not over-engineer.
- Build only what the current roadmap requires.
- Respect the principles defined in `PRINCIPLES.md`.

---

## AI Contributors

If you are an AI agent:

- Read the documentation before making changes.
- Work in small, reviewable steps.
- Explain important architectural decisions.
- Do not implement future roadmap items unless explicitly requested.
- Avoid introducing unnecessary dependencies.
- Keep generated markdown concise and human-readable.
- Never invent project facts or history.
- If an architectural decision changes, propose an update to
  `docs/DECISIONS.md`.

---

## Coding Standards

- TypeScript first.
- Favor readability over cleverness.
- Keep modules focused and small.
- Write code that future engineers can easily understand.

---

## Our Goal

Every contribution should strengthen Ithos's mission:

> Preserve engineering memory in the age of AI-assisted software development.
