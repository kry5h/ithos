import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readProjectContext, recordArtifact } from "@ithos/core";

export function registerTools(server: McpServer): void {
  server.tool(
    "get_project_context",
    "Reads .ithos/README.md and .ithos/project.md to retrieve project summary, technology stack, conventions, and guidelines. AI agents should run this tool BEFORE any other tools to understand project-specific rules, standard stack definitions, and memory formats.",
    {
      cwd: z
        .string()
        .optional()
        .describe(
          "The working directory of the repository (defaults to process.cwd())"
        )
    },
    async ({ cwd }: { cwd?: string }) => {
      try {
        const context = await readProjectContext(cwd);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(context, null, 2)
            }
          ]
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error reading project context: ${message}`
            }
          ]
        };
      }
    }
  );

  server.tool(
    "record_decision",
    "Records a significant engineering decision. Call this when you and the developer finish discussing trade-offs, choose an architecture, select a package, or adopt a rule. Write concise, fact-driven markdown. Focus on context, choice, and tradeoffs. DO NOT use this for code snippets or casual logs.",
    {
      title: z
        .string()
        .describe(
          "Short, descriptive title (e.g. 'Use Markdown as Source of Truth')"
        ),
      body: z
        .string()
        .describe(
          "Complete body detailing: 1. Context (why this became a decision), 2. Alternatives Considered, 3. The Decision, 4. Trade-offs/Consequences (pros and cons)"
        ),
      cwd: z
        .string()
        .optional()
        .describe(
          "The working directory of the repository (defaults to process.cwd())"
        )
    },
    async ({
      title,
      body,
      cwd
    }: {
      title: string;
      body: string;
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "decisions",
          title,
          body,
          cwd
        });
        return {
          content: [
            {
              type: "text",
              text: `Recorded decision to ${file}`
            }
          ]
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error recording decision: ${message}`
            }
          ]
        };
      }
    }
  );

  server.tool(
    "record_lesson",
    "Records a valuable development lesson. Call this when a bug takes hours to debug, a performance optimization is found, an API quirk is discovered, or you learn a critical collaboration/workflow lesson. Focus on prevention and root cause. DO NOT capture generic programming concepts (e.g. 'how async works').",
    {
      title: z
        .string()
        .describe(
          "Descriptive title of what was learned (e.g. 'React 19 Server Actions Context Gotcha')"
        ),
      body: z
        .string()
        .describe(
          "Complete body detailing: 1. Context (what went wrong/what was done), 2. The lesson learned, 3. Prevention (how future engineers can avoid this or use it to compile code faster)"
        ),
      cwd: z
        .string()
        .optional()
        .describe(
          "The working directory of the repository (defaults to process.cwd())"
        )
    },
    async ({
      title,
      body,
      cwd
    }: {
      title: string;
      body: string;
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "lessons",
          title,
          body,
          cwd
        });
        return {
          content: [
            {
              type: "text",
              text: `Recorded lesson to ${file}`
            }
          ]
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error recording lesson: ${message}`
            }
          ]
        };
      }
    }
  );

  server.tool(
    "record_session",
    "Records a high-level summary of the programming session. Call this when the developer wraps up, commits code, or asks to end the session. Focus on outcomes and accomplishments. DO NOT list every command run, prompt written, file path touched, or line of code edited. Keep it concise.",
    {
      title: z
        .string()
        .describe(
          "Title summarizing the session (e.g. 'Add User Authentication Flow')"
        ),
      body: z
        .string()
        .describe(
          "Complete body detailing: 1. Objectives (what was planned), 2. Accomplishments (what was done), 3. Next steps / Open items (what is left for tomorrow)"
        ),
      cwd: z
        .string()
        .optional()
        .describe(
          "The working directory of the repository (defaults to process.cwd())"
        )
    },
    async ({
      title,
      body,
      cwd
    }: {
      title: string;
      body: string;
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "sessions",
          title,
          body,
          cwd
        });
        return {
          content: [
            {
              type: "text",
              text: `Recorded session summary to ${file}`
            }
          ]
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error recording session summary: ${message}`
            }
          ]
        };
      }
    }
  );
}
