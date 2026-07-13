# Ithos

> The open, local-first institutional memory layer for AI-assisted software
> development. **Your data is yours. Saved in your own project's `.ithos`
> folder.**

**Code is generated at 10x velocity. Human comprehension remains 1x.**

As code bases evolve rapidly with AI assistance, critical context gets lost. Git
records _what_ was built, but the reasoning, rejected alternatives, and lessons
learned disappear into ephemeral AI chat interfaces and scattered Slack threads.

Ithos solves this by preserving **institutional memory**. It establishes a
standardized, git-native, markdown-based memory layout at the root of your
project: `.ithos/`. Through a Model Context Protocol (MCP) server, it shifts the
burden of capturing decisions, lessons, and session contexts to your AI
assistant—preserving engineering reasoning without breaking your flow.

---

## Why Ithos? (Core Pillars)

- 🔒 **Zero-Cloud Dependency:** Your memory lives locally inside a standard
  `.ithos/` directory. No external databases, SaaS subscriptions, or internet
  requirements.
- 🌲 **Git-Native:** Preservation files participate in branches, commits,
  merges, and pull reviews.
- 📖 **Markdown Source of Truth:** Everything is stored in frontmatter-enhanced
  Markdown. It remains fully readable in VS Code, Cursor, Obsidian, GitHub, or a
  terminal.
- 🤖 **AI-Assisted, Human-Approved:** Your AI assistant can draft memory files
  via MCP as you code, but developers remain responsible for reviewing and
  approving actions.

---

## How It Works

### 1. Preserving Memory (AI-Assisted Capture)

When configured with your AI assistant (like Cursor, Claude Desktop, or
Copilot), the assistant can call MCP tools to write structured files in the
background:

- **Decisions:** Record chosen paths, tradeoffs, and rejected alternatives.
- **Lessons:** Capture post-mortems, bug resolutions, and workflow guidelines.
- **Sessions:** Log high-level accomplishments at the end of a coding session.

### 2. Recalling Memory (Context Retrieval)

Any developer—or the AI itself—can query past institutional knowledge when
solving a bug or refactoring code:

> _"Why did we choose Prisma and why?"_ _"What did we learn about the auth bug
> last month?"_

The AI assistant can automatically use `search_memory` to locate and read
relevant files.

---

## Quick Start

### 1. Initialize your repository

Install the CLI globally and initialize Ithos in your project:

```bash
npm install -g ithos
ithos init
```

This creates the `.ithos/` folder structure in your current repository.

### 2. Connect your AI assistant via MCP

Install the MCP server globally:

```bash
npm install -g ithos-mcp
```

Then add it to your MCP client config (e.g. Cursor `~/.cursor/mcp.json` or
Claude Desktop
`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ithos": {
      "command": "ithos-mcp"
    }
  }
}
```

Restart your editor after saving the config.

---

## Repository Structure

```
.ithos/
├── README.md           # Preserved memory overview for new AI agents & developers
├── project.md          # Project context summary, technology stack, conventions
├── decisions/          # Significant engineering decisions (one file per decision)
├── lessons/            # Post-mortems, bug resolutions, and workflow lessons
└── sessions/           # Developer session outcomes and accomplishments
```

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
                  │  Local FS   │
                  └─────────────┘
```

1.  **`ithos-core` (`packages/core`)**: The domain heart of Ithos. Performs
    repository initialization, structure validation, file reading/writing, and
    frontmatter management.
2.  **`ithos` (`packages/cli`)**: A thin terminal command interface wrapping the
    core operations (e.g., `ithos init`).
3.  **`ithos-mcp` (`packages/mcp`)**: A Model Context Protocol stdio server that
    permits AI coding assistants to automatically query and record decisions,
    lessons, or session logs in real-time.

---

## Principles

1.  **Memory First:** Everything exists to preserve engineering memory.
2.  **Local First:** No internet connection or cloud service required. Your data
    is yours. Saved in your own project's `.ithos` folder.
3.  **Markdown Source of Truth:** Indexes and databases are secondary and always
    derived.
4.  **Git Native:** Merges and PR reviews act as the synchronization mechanism.
5.  **AI Captures, Humans Understand:** AI handles the preservation work; the
    developer remains responsible for reviewing and approving actions.
