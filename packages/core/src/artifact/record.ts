import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { RecordInput } from "./types.js";
import { createArtifactId } from "../markdown/ids.js";
import { slugify } from "../markdown/slugify.js";
import { formatDate } from "../markdown/frontmatter.js";
import { writeArtifact } from "../markdown/writer.js";

export async function recordArtifact(input: RecordInput): Promise<string> {
  const cwd = input.cwd ?? process.cwd();
  const now = input.date ?? new Date();
  const created = formatDate(now);
  const id = createArtifactId(input.type, input.title, now);
  const relativeFile = path.join(
    ".ithos",
    input.type,
    `${slugify(input.title)}.md`
  );
  const absoluteFile = path.join(cwd, relativeFile);

  await mkdir(path.dirname(absoluteFile), { recursive: true });

  const markdown = [
    "---",
    `id: ${id}`,
    `type: ${input.type}`,
    "status: draft",
    `created: ${created}`,
    `updated: ${created}`,
    "tags: []",
    "---",
    "",
    `# ${input.title}`,
    "",
    input.body.trim(),
    ""
  ].join("\n");

  await writeArtifact(absoluteFile, markdown);

  return relativeFile;
}
