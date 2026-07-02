#!/usr/bin/env node

import { runServer } from "../index.js";

runServer().catch((error) => {
  console.error("Fatal error running Ithos MCP server:", error);
  process.exit(1);
});
