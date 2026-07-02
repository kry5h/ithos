import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";

// Prevent standard log statements from going to stdout (which corrupts JSON-RPC channel)
console.log = (...args) => console.error(...args);
console.warn = (...args) => console.error(...args);

export async function runServer(): Promise<void> {
  const server = new McpServer({
    name: "ithos-mcp",
    version: "0.1.0"
  });

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ithos MCP server running on stdio transport");
}
