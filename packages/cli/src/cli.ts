import { Command } from "commander";
import {
  doctorRepository,
  exportMemory,
  generateTimeline,
  initRepository,
  isArtifactType,
  recordArtifact,
  searchMemory,
  validateRepository,
  type ArtifactType,
  type TimelineEntry,
  type TimelineResult
} from "ithos-core";

export function createCli(): Command {
  const program = new Command();

  program
    .name("ithos")
    .description("Local-first engineering memory")
    .version("0.1.4");

  program
    .command("init")
    .description("Initialize Ithos memory in the current repository")
    .action(async () => {
      const result = await initRepository();
      printList("Created", result.created);
      printList("Already existed", result.existing);
    });

  program
    .command("validate")
    .description("Validate the Ithos repository structure")
    .action(async () => {
      const result = await validateRepository();

      if (result.valid) {
        console.log("Ithos repository is valid.");
        return;
      }

      result.errors.forEach((error: string) => console.error(error));
      process.exitCode = 1;
    });

  program
    .command("doctor")
    .description("Check local Ithos setup and print guidance")
    .action(async () => {
      const result = await doctorRepository();
      result.messages.forEach((message: string) => console.log(message));

      if (!result.ok) {
        process.exitCode = 1;
      }
    });

  program
    .command("record")
    .description("Record one engineering memory artifact")
    .requiredOption("-t, --type <type>", "artifact type")
    .requiredOption("--title <title>", "artifact title")
    .option("-b, --body <body>", "artifact body")
    .option("--tags <tags>", "comma-separated tags")
    .option(
      "--related <related>",
      "comma-separated related artifact IDs or file paths"
    )
    .action(
      async (options: {
        type: string;
        title: string;
        body?: string;
        tags?: string;
        related?: string;
      }) => {
        if (!isArtifactType(options.type)) {
          console.error(`Unsupported artifact type: ${options.type}`);
          process.exitCode = 1;
          return;
        }

        const body = options.body ?? (await readStdin());
        if (body.trim().length === 0) {
          console.error("Artifact body is required through --body or stdin.");
          process.exitCode = 1;
          return;
        }

        const tags = options.tags
          ? options.tags.split(",").map((t) => t.trim())
          : undefined;
        const related = options.related
          ? options.related.split(",").map((r) => r.trim())
          : undefined;

        const file = await recordArtifact({
          type: options.type as ArtifactType,
          title: options.title,
          body,
          tags,
          related
        });
        console.log(`Recorded ${file}`);
      }
    );

  program
    .command("search")
    .description("Search Ithos markdown memory")
    .argument("<query>", "keyword to search for")
    .action(async (query: string) => {
      const results = await searchMemory(query);

      if (results.length === 0) {
        console.log("No matches found.");
        return;
      }

      results.forEach(
        (result: { file: string; line: number; text: string }) => {
          console.log(`${result.file}:${result.line}: ${result.text}`);
        }
      );
    });

  program
    .command("export")
    .description("Export Ithos markdown memory to stdout")
    .action(async () => {
      const result = await exportMemory();
      process.stdout.write(result.markdown);
    });

  program
    .command("timeline")
    .description("Show a chronological timeline of engineering memory")
    .action(async () => {
      const result = await generateTimeline();
      renderTimeline(result);
    });

  return program;
}

function printList(label: string, values: string[]): void {
  if (values.length === 0) {
    return;
  }

  console.log(`${label}:`);
  values.forEach((value) => console.log(`- ${value}`));
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];

  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

// ---------------------------------------------------------------------------
// Timeline renderer
// ---------------------------------------------------------------------------

// Raw ANSI codes — no runtime dependency needed.
const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  white: "\x1b[37m"
} as const;

type AnsiColor = keyof typeof ANSI;

const TYPE_META: Record<string, { icon: string; color: AnsiColor; label: string }> = {
  decisions:    { icon: "\uD83D\uDCCC", color: "cyan",    label: "Decision"     },
  sessions:     { icon: "\uD83E\uDDE0", color: "blue",    label: "Session"      },
  lessons:      { icon: "\uD83D\uDCA1", color: "yellow",  label: "Lesson"       },
  regressions:  { icon: "\u26A0\uFE0F", color: "red",     label: "Regression"   },
  defects:      { icon: "\uD83D\uDC1B", color: "red",     label: "Defect"       },
  architecture: { icon: "\uD83C\uDFDB\uFE0F", color: "magenta", label: "Architecture" },
  features:     { icon: "\u2728",       color: "green",   label: "Feature"      },
  patterns:     { icon: "\uD83D\uDD01", color: "white",   label: "Pattern"      },
  releases:     { icon: "\uD83D\uDE80", color: "green",   label: "Release"      },
  gaps:         { icon: "\uD83D\uDD73\uFE0F", color: "yellow", label: "Gap"    }
};

const SEPARATOR = ANSI.dim + "\u2500".repeat(52) + ANSI.reset;

function c(color: AnsiColor, text: string): string {
  return `${ANSI[color]}${text}${ANSI.reset}`;
}

function renderEntry(entry: TimelineEntry): void {
  const meta = TYPE_META[entry.type] ?? {
    icon: "\uD83D\uDCCB",
    color: "white" as AnsiColor,
    label: entry.type
  };

  const label = meta.label.padEnd(13);
  const header = `  ${meta.icon}  ${c(meta.color as AnsiColor, ANSI.bold + label + ANSI.reset + ANSI[meta.color as AnsiColor])}${entry.title}${ANSI.reset}`;
  console.log(header);

  for (const line of entry.summary) {
    console.log(`  ${ANSI.dim}\u2192 ${line}${ANSI.reset}`);
  }

  console.log(`  ${ANSI.dim}\u21B3 ${entry.file}${ANSI.reset}`);
}

function renderTimeline(result: TimelineResult): void {
  if (result.totalCount === 0) {
    console.log(c("dim", "No engineering memory found. Run \`ithos record\` to capture your first artifact."));
    return;
  }

  const dates = [...result.groupedByDate.keys()];
  console.log("");

  dates.forEach((date, dateIndex) => {
    const entries = result.groupedByDate.get(date)!;

    // Date header
    console.log(ANSI.bold + date + ANSI.reset);
    console.log("");

    entries.forEach((entry, entryIndex) => {
      renderEntry(entry);
      // Blank line between entries on the same date
      if (entryIndex < entries.length - 1) console.log("");
    });

    console.log("");

    // Separator between date groups (not after the last one)
    if (dateIndex < dates.length - 1) {
      console.log(SEPARATOR);
      console.log("");
    }
  });

  // Footer
  const dayCount = dates.length;
  const entryWord = result.totalCount === 1 ? "entry" : "entries";
  const dayWord = dayCount === 1 ? "day" : "days";
  console.log(
    ANSI.dim +
    `  ${result.totalCount} ${entryWord} across ${dayCount} ${dayWord}` +
    ANSI.reset
  );
  console.log("");
}
