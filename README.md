# Ithos

> The open, local-first institutional memory layer for AI-assisted software
> development. **Your data is yours. Saved in your own project's `.ithos`
> folder.**

**Code is generated at 10x velocity. Human comprehension remains 1x.**

As code bases evolve rapidly with AI assistance, critical context gets lost. Git
records _what_ was built, but the reasoning, rejected alternatives, and lessons
learned disappear into ephemeral chat interfaces and scattered threads.

Ithos solves this by preserving **institutional memory**. It establishes a
standardized, git-native, markdown-based memory layout at the root of your
project: `.ithos/`. Through MCP, AI assistants can preserve institutional memory
directly into your project's `.ithos` directory—capturing engineering reasoning
without breaking your flow.

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
- 🤖 **AI-Assisted, Human-Approved:** Your AI coding assistant can draft memory
  files via MCP as you code, but developers remain responsible for reviewing and
  approving actions.

---

## Why not Git?

Git records **what** changed.

Commit messages explain **what** was intended.

Ithos preserves **why** decisions were made.

Git and Ithos complement each other. Source code explains the implementation;
institutional memory explains the reasoning.

---

## Use Cases

- **Onboard new engineers faster:** Let new developers explore past context and
  context dependencies independently.
- **Give AI agents accurate context:** Feed your assistant structured project
  rules, stack definitions, and history.
- **Preserve architectural decisions:** Capture the pros, cons, and tradeoffs of
  design choices.
- **Remember why alternatives were rejected:** Keep a record of what didn't work
  so you don't repeat past experiments.
- **Build a searchable memory:** Keep decisions, lessons, and sessions indexable
  and searchable.
- **Understand a project in seconds:** Run `ithos timeline` to see the full
  engineering history unfold chronologically — without opening a single file.

---

## How It Works

### 1. Preserving Memory (AI-Preserved Capture)

When configured with your assistant (like Cursor, Claude Desktop, or Copilot),
the AI agent can call MCP tools to write structured files in the background:

- **Decisions:** Record chosen paths, tradeoffs, and rejected alternatives.
- **Lessons:** Capture post-mortems, bug resolutions, and workflow guidelines.
- **Sessions:** Log high-level accomplishments at the end of a coding session.

### 2. Recalling Memory (Context Retrieval)

Any developer—or the assistant itself—can query past institutional knowledge
when solving a bug or refactoring code:

> _"Why did we choose Prisma and why?"_ _"What did we learn about the auth bug
> last month?"_

The AI assistant can automatically use `search_memory` to locate and read
relevant files.

### 3. Reading the Timeline

```bash
ithos timeline
```

Renders every artifact across all categories, sorted chronologically. Each entry
shows the type, title, a short summary extracted from the body, and a direct
path to the source file. The output reads like the history of the project — not
a list of files.

---

## Repository Structure

```
.ithos/
├── README.md           # Memory overview for new AI agents & developers
├── project.md          # Project context, technology stack, conventions
├── decisions/          # Significant engineering decisions (one file per decision)
├── architecture/       # Architecture records and structural changes
├── features/           # Feature records and capability additions
├── patterns/           # Reusable patterns and conventions
├── lessons/            # Post-mortems, bug resolutions, and workflow lessons
├── regressions/        # Regressions and the context around them
├── defects/            # Defect records
├── gaps/               # Known gaps and deferred work
├── releases/           # Release notes and milestone records
└── sessions/           # Developer session outcomes and accomplishments
```

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

### 3. Read the timeline

Once memory has accumulated, run:

```bash
ithos timeline
```

The output groups every artifact by date, shows a short preview, and links
directly to the source file. It is designed to answer: _"What has happened in
this project?"_

---

## CLI Commands

| Command | Description |
|---|---|
| `ithos init` | Initialize the `.ithos/` directory structure |
| `ithos validate` | Verify the repository structure matches the spec |
| `ithos doctor` | Inspect your local setup and diagnose issues |
| `ithos record` | Manually record a decision, lesson, session, or other artifact |
| `ithos search <query>` | Search matching lines across all engineering memory |
| `ithos export` | Concatenate and export the full memory directory to stdout |
| `ithos timeline` | Render a chronological timeline of all engineering memory |

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
    repository initialization, structure validation, file reading/writing,
    frontmatter management, keyword search, memory export, and timeline
    generation. All business logic lives here so that any future consumer — CLI,
    MCP, dashboard, VS Code extension, or Obsidian plugin — can reuse it without
    duplication.
2.  **`ithos` (`packages/cli`)**: A thin terminal command interface wrapping the
    core operations. Responsible only for rendering; contains no domain logic of
    its own.
3.  **`ithos-mcp` (`packages/mcp`)**: A Model Context Protocol stdio server that
    permits AI coding assistants to automatically query and record decisions,
    lessons, or session logs in real-time.
ation, structure validation, file reading/writing, and
    frontmatter management.
2.  **`ithos` (`packages/cli`)**: A thin terminal command interface wrapping the
    core operations (e.g., `ithos init`).
3.  **`ithos-mcp` (`packages/mcp`)**: A Model Context Protocol stdio server that
    permits AI coding assistants to automatically query and record decisions,
    lessons, or session logs in real-time.
