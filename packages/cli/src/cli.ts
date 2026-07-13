import { Command } from "commander";
import {
  doctorRepository,
  exportMemory,
  initRepository,
  isArtifactType,
  recordArtifact,
  searchMemory,
  validateRepository,
  type ArtifactType
} from "ithos-core";

export function createCli(): Command {
  const program = new Command();

  program
    .name("ithos")
    .description("Local-first engineering memory")
    .version("0.1.0");

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
    .action(async (options: { type: string; title: string; body?: string }) => {
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

      const file = await recordArtifact({
        type: options.type as ArtifactType,
        title: options.title,
        body
      });
      console.log(`Recorded ${file}`);
    });

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
