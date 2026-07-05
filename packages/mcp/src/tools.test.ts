import test from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "./tools.js";

test("registerTools adds Ithos tools to the MCP server without error", () => {
  const server = new McpServer({
    name: "test-server",
    version: "1.0.0"
  });

  // Basic integration test to ensure the tool registration does not throw.
  registerTools(server);
  
  assert.ok(true, "Tools registered successfully");
});
