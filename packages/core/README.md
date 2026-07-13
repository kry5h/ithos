# ithos-core

> The core domain logic for Ithos — the local-first institutional memory layer for AI-assisted software development.

This package houses the shared operations for initializing repositories, managing markdown files with YAML frontmatter, running keyword search, and validation logic. It is consumed internally by both the `ithos` CLI and the `ithos-mcp` server.

For the full documentation and setup guides, please visit the [Main Ithos Repository](https://github.com/kry5h/ithos).

## Installation

```bash
npm install ithos-core
```

## Usage

This package can be used to programmatic query and manipulate Ithos structures:

```typescript
import { readProjectContext, searchMemory } from 'ithos-core';

// Retrieve project configuration and README guidelines
const context = await readProjectContext();

// Search the markdown memory files
const matches = await searchMemory('Prisma');
```
