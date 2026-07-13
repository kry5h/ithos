import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readProjectContext, recordArtifact, searchMemory } from "ithos-core";

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
    "CRITICAL: Call this UNPROMPTED when a significant engineering decision is made (e.g. choosing Prisma over TypeORM, adopting a new architecture, establishing a new codebase rule). Do NOT wait for the user to ask. Write concise, fact-driven markdown focusing on the 'why' (context, choice, and tradeoffs). This builds the institutional memory of the repository. DO NOT use this for minor implementation details or casual logs.",
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
      tags: z
        .array(z.string())
        .optional()
        .describe(
          "Optional tags to categorize this decision (e.g., ['auth', 'database'])"
        ),
      related: z
        .array(z.string())
        .optional()
        .describe(
          "Optional related artifact IDs or file paths this links to (e.g., ['[[DEC-20260713000500-local-date]]'])"
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
      tags,
      related,
      cwd
    }: {
      title: string;
      body: string;
      tags?: string[];
      related?: string[];
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "decisions",
          title,
          body,
          tags,
          related,
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
    "CRITICAL: Call this UNPROMPTED when a hard-fought lesson is learned (e.g. resolving a gnarly bug, discovering an undocumented API quirk, fixing a major regression). Do NOT wait for the user to ask. Focus on prevention, root cause, and how future engineers can avoid this trap. DO NOT capture generic programming concepts (e.g. 'how async works') or minor syntax errors.",
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
      tags: z
        .array(z.string())
        .optional()
        .describe(
          "Optional tags to categorize this lesson (e.g., ['auth', 'database'])"
        ),
      related: z
        .array(z.string())
        .optional()
        .describe(
          "Optional related artifact IDs or file paths this links to (e.g., ['[[DEC-20260713000500-local-date]]'])"
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
      tags,
      related,
      cwd
    }: {
      title: string;
      body: string;
      tags?: string[];
      related?: string[];
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "lessons",
          title,
          body,
          tags,
          related,
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
    "CRITICAL: Call this UNPROMPTED at the end of a significant coding session, such as when committing a feature, merging a PR, or wrapping up work. Focus on high-level outcomes and business value delivered. DO NOT list every command run, prompt written, file path touched, or line of code edited. Keep it concise and focused on institutional progress.",
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
      tags: z
        .array(z.string())
        .optional()
        .describe(
          "Optional tags to categorize this session (e.g., ['auth', 'database'])"
        ),
      related: z
        .array(z.string())
        .optional()
        .describe(
          "Optional related artifact IDs or file paths this links to (e.g., ['[[DEC-20260713000500-local-date]]'])"
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
      tags,
      related,
      cwd
    }: {
      title: string;
      body: string;
      tags?: string[];
      related?: string[];
      cwd?: string;
    }) => {
      try {
        const file = await recordArtifact({
          type: "sessions",
          title,
          body,
          tags,
          related,
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
  server.tool(
    "search_memory",
    "CRITICAL: Call this UNPROMPTED whenever the developer (or you) asks a question about past decisions, lessons, or sessions — e.g. 'When did we choose Prisma?', 'Why did we pick Tailwind?', 'What did we learn about that auth bug?', 'What was decided last week?'. Searches all .ithos markdown files by keyword and returns matching lines with file paths. Use this before answering any question about engineering history so you give a grounded, accurate answer instead of guessing.",
    {
      query: z
        .string()
        .describe(
          "Keyword or phrase to search for across all .ithos memory files (e.g. 'Prisma', 'auth', 'TypeORM', 'performance')"
        ),
      cwd: z
        .string()
        .optional()
        .describe(
          "The working directory of the repository (defaults to process.cwd())"
        )
    },
    async ({ query, cwd }: { query: string; cwd?: string }) => {
      try {
        const results = await searchMemory(query, cwd);

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No results found for "${query}" in .ithos memory.`
              }
            ]
          };
        }

        const formatted = results
          .map((r) => `${r.file}:${r.line}: ${r.text}`)
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `Found ${results.length} match${results.length === 1 ? "" : "es"} for "${query}":\n\n${formatted}`
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
              text: `Error searching memory: ${message}`
            }
          ]
        };
      }
    }
  );
}
