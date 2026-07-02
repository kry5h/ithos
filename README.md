# Ithos

> The open, local-first engineering memory layer for AI-assisted software
> development.

Ithos preserves **engineering memory**—the reasoning, trade-offs, lessons, and
decisions—that explain _why_ source code became what it is. While Git records
_what_ was built, Ithos records _why_ it was built, making engineering knowledge
durable for both developers and AI assistants.

---

## Why Ithos?

AI assistants can generate code faster than humans can review it. As code bases
evolve rapidly:

- Reasoning gets lost inside ephemeral AI chat interfaces.
- Future maintainers struggle to understand why an architecture was chosen, why
  an approach was rejected, or what lesson was learned from a major regression.
- Project understanding decays over time.

Ithos solves this by establishing a standardized, git-native, markdown-based
memory layout at the root of your project: `.ithos/`.

---

## Repository Structure

```
.ithos/
├── README.md           # Introduction to Ithos for new AI agents & developers
├── project.md          # Project context summary, technology stack, conventions
├── decisions/          # Significant engineering decisions (one file per decision)
├── lessons/            # Post-mortems, bug resolutions, and workflow lessons
└── sessions/           # Developer session outcomes and accomplishments
```

All data is stored in **frontmatter-enhanced Markdown**, making it:

- 🌲 **Git-Native:** Participates in branches, commits, merges, and reviews.
- 📖 **Human-Readable:** Remains fully readable inside VS Code, Cursor,
  Obsidian, GitHub, or terminal without any proprietary tooling.
- 🤖 **AI-Friendly:** Structured schemas facilitate automated contextual reads
  and writes.

---

## Architecture & Monorepo Packages

Ithos is structured as a layered monorepo using npm workspaces:

```
                  ┌──────────────┐
                  │  Future App  │
                  └──────┬───────┘
                         │
        ┌─────────────┐  │  ┌──────────────┐
        │  Ithos CLI  │  │  │  MCP Server  │
        └──────┬──────┘  │  └──────┬───────┘
               │         ▼         │
               │   ┌───────────┐   │
               └──►│   Core    │◄──┘
                   └─────┬─────┘
                         │
                         ▼
                  ┌─────────────┐
                  │ Filesystem  │
                  └─────────────┘
```

1. **`@ithos/core` (Package: `packages/core`)**  
   The domain heart of Ithos. Performs repository initialization, structure
   validation, file reading/writing operations, keyword search, compilation
   exports, and frontmatter management.

2. **`@ithos/cli` (Package: `packages/cli`)**  
   A thin terminal command interface wrapping the core operations. Exposes
   commands like `ithos init`, `ithos validate`, `ithos doctor`, `ithos record`,
   `ithos search`, and `ithos export`.

3. **`@ithos/mcp` (Package: `packages/mcp`)**  
   A Model Context Protocol stdio server that permits AI coding assistants (like
   Cursor, Claude Desktop, Copilot) to automatically query project context and
   record decisions, lessons, or session logs in real-time.

---

## Quick Start

### 1. Build and Initialize

```bash
# Install dependencies & link workspaces
npm install

# Compile the packages
npm run build

# Initialize Ithos in the current repository
npx packages/cli/dist/bin/ithos.js init
```

### 2. Connect Your AI Assistant (MCP)

To connect Ithos to an MCP client (such as Cursor or Claude Desktop), declare a
new stdio handler in your client configuration points.

Example definition:

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

#### Exposed MCP Tools

- **`get_project_context`**: Reads repo README and project metadata.
- **`record_decision`**: Saves a chosen path, trade-offs, and alternatives.
- **`record_lesson`**: Captures a development lesson and bug regression
  preventions.
- **`record_session`**: Logs high-level goals met from the coding session.

---

## Principles

1. **Memory First:** Everything exists to preserve engineering memory.
2. **Local First:** No internet connection or cloud service required. User owns
   their data.
3. **Markdown Source of Truth:** Indexes and databases are secondary and always
   derived.
4. **Git Native:** Merges and PR reviews act as the synchronization mechanism.
5. **AI Captures, Humans Understand:** AI handles the documentation work; the
   developer remains responsible for reviewing and approving actions.
