# ithos-mcp

> Model Context Protocol (MCP) server for Ithos — the local-first institutional memory layer for AI-assisted software development.

This server enables AI coding assistants (like Cursor, Claude Desktop, Copilot, etc.) to automatically read and write engineering context (decisions, lessons, sessions) directly to your project's local `.ithos/` folder.

For the full documentation and architecture details, please visit the [Main Ithos Repository](https://github.com/kry5h/ithos).

## Installation

Install the server globally:

```bash
npm install -g ithos-mcp
```

## Configuration

Add the server to your preferred MCP client configuration:

### Cursor (`~/.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "ithos": {
      "command": "ithos-mcp"
    }
  }
}
```

*Note for nvm/asdf users: If Cursor fails to locate the command, run `which ithos-mcp` in your terminal and use the full path to the binary for the `"command"` field.*

### Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "ithos": {
      "command": "ithos-mcp"
    }
  }
}
```

## Available Tools

- `get_project_context`: Reads project summary and technology stack.
- `record_decision`: Saves a chosen architecture, tradeoffs, and alternatives.
- `record_lesson`: Captures development lessons, debugging post-mortems, and root causes.
- `record_session`: Logs high-level accomplishments at the end of a coding session.
- `search_memory`: Searches engineering memory by keyword to retrieve past decisions.
