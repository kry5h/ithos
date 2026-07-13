# ithos

> The terminal CLI for Ithos — the local-first institutional memory layer for
> AI-assisted software development.

This is the command-line client used to initialize and manage an Ithos
repository.

For the full documentation, architecture details, and MCP setup guides, please
visit the [Main Ithos Repository](https://github.com/kry5h/ithos).

## Installation

Install globally via npm:

```bash
npm install -g ithos
```

## Quick Start

Initialize Ithos in your current software repository:

```bash
ithos init
```

This creates the `.ithos/` folder structure, setting up the repository context.

## Available Commands

- `ithos init`: Initialize a new Ithos directory structure.
- `ithos validate`: Verify your `.ithos/` directory matches the specification.
- `ithos doctor`: Inspect your local setup and diagnose issues.
- `ithos record`: Manually record an engineering decision, lesson, or session.
- `ithos search <query>`: Search matching lines across your engineering memory.
- `ithos export`: Concatenate and export the entire memory directory to stdout.
