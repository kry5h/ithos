import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type ArtifactType =
  | "architecture"
  | "decisions"
  | "defects"
  | "features"
  | "gaps"
  | "lessons"
  | "patterns"
  | "regressions"
  | "releases"
  | "sessions";

export type InitResult = {
  created: string[];
  existing: string[];
};

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export type DoctorResult = {
  ok: boolean;
  messages: string[];
};

export type RecordInput = {
  type: ArtifactType;
  title: string;
  body: string;
  cwd?: string;
  date?: Date;
};

export type SearchResult = {
  file: string;
  line: number;
  text: string;
};

export type ExportResult = {
  files: string[];
  markdown: string;
};

const REQUIRED_FILES = [".ithos/README.md", ".ithos/project.md"] as const;

const ARTIFACT_TYPES: ArtifactType[] = [
  "architecture",
  "decisions",
  "defects",
  "features",
  "gaps",
  "lessons",
  "patterns",
  "regressions",
  "releases",
  "sessions"
];

const DIRECTORY_LAYOUT = [
  ".ithos",
  ".ithos/sessions",
  ".ithos/decisions",
  ".ithos/architecture",
  ".ithos/features",
  ".ithos/patterns",
  ".ithos/defects",
  ".ithos/regressions",
  ".ithos/gaps",
  ".ithos/lessons",
  ".ithos/releases",
  ".ithos/attachments"
] as const;

export function isArtifactType(value: string): value is ArtifactType {
  return ARTIFACT_TYPES.includes(value as ArtifactType);
}

export async function initRepository(cwd = process.cwd()): Promise<InitResult> {
  const created: string[] = [];
  const existing: string[] = [];

  for (const directory of DIRECTORY_LAYOUT) {
    const result = await ensureDirectory(path.join(cwd, directory));
    pushResult(result, directory, created, existing);
  }

  const files = new Map<string, string>([
    [".ithos/README.md", ithosReadme()],
    [".ithos/project.md", projectTemplate()]
  ]);

  for (const [file, content] of files) {
    const result = await ensureFile(path.join(cwd, file), content);
    pushResult(result, file, created, existing);
  }

  return { created, existing };
}

export async function validateRepository(
  cwd = process.cwd()
): Promise<ValidationResult> {
  const errors: string[] = [];

  for (const file of REQUIRED_FILES) {
    if (!(await exists(path.join(cwd, file)))) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function doctorRepository(
  cwd = process.cwd()
): Promise<DoctorResult> {
  const messages: string[] = [];
  const validation = await validateRepository(cwd);

  if (validation.valid) {
    messages.push("Ithos repository structure is valid.");
  } else {
    messages.push("Ithos repository structure needs attention.");
    messages.push(...validation.errors);
    messages.push("Run `ithos init` to create the required files.");
  }

  if (await exists(path.join(cwd, ".git"))) {
    messages.push("Git repository detected.");
  } else {
    messages.push("No .git directory detected. Ithos works best inside Git.");
  }

  return {
    ok: validation.valid,
    messages
  };
}

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

  await writeFile(absoluteFile, markdown, { flag: "wx" });

  return relativeFile;
}

export async function searchMemory(
  query: string,
  cwd = process.cwd()
): Promise<SearchResult[]> {
  const root = path.join(cwd, ".ithos");
  if (!(await exists(root))) {
    return [];
  }

  const files = await listMarkdownFiles(root);
  const normalizedQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = searchableLines(content);

    lines.forEach((line) => {
      if (line.text.toLowerCase().includes(normalizedQuery)) {
        results.push({
          file: path.relative(cwd, file),
          line: line.number,
          text: line.text.trim()
        });
      }
    });
  }

  return results;
}

export async function exportMemory(cwd = process.cwd()): Promise<ExportResult> {
  const root = path.join(cwd, ".ithos");
  if (!(await exists(root))) {
    return { files: [], markdown: "" };
  }

  const files = await listMarkdownFiles(root);
  const sections: string[] = [];

  for (const file of files) {
    const relativeFile = path.relative(cwd, file);
    const content = await readFile(file, "utf8");
    sections.push([`<!-- ${relativeFile} -->`, content.trim(), ""].join("\n"));
  }

  return {
    files: files.map((file) => path.relative(cwd, file)),
    markdown: sections.join("\n")
  };
}

async function ensureDirectory(
  directory: string
): Promise<"created" | "existing"> {
  if (await exists(directory)) {
    return "existing";
  }

  await mkdir(directory, { recursive: true });
  return "created";
}

async function ensureFile(
  file: string,
  content: string
): Promise<"created" | "existing"> {
  if (await exists(file)) {
    return "existing";
  }

  await writeFile(file, content, { flag: "wx" });
  return "created";
}

function pushResult(
  result: "created" | "existing",
  file: string,
  created: string[],
  existing: string[]
): void {
  if (result === "created") {
    created.push(file);
  } else {
    existing.push(file);
  }
}

async function exists(file: string): Promise<boolean> {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function listMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listMarkdownFiles(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [absolutePath];
      }

      return [];
    })
  );

  return files.flat().sort();
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createArtifactId(
  type: ArtifactType,
  title: string,
  date: Date
): string {
  const prefix = type.slice(0, 3).toUpperCase();
  const timestamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0")
  ].join("");

  return `${prefix}-${timestamp}-${slugify(title)}`;
}

function searchableLines(
  content: string
): Array<{ number: number; text: string }> {
  const lines = content.split("\n");

  if (!content.startsWith("---\n")) {
    return lines.map((text, index) => ({ number: index + 1, text }));
  }

  const end = content.indexOf("\n---\n", 4);
  if (end === -1) {
    return lines.map((text, index) => ({ number: index + 1, text }));
  }

  const frontmatterLineCount = content
    .slice(0, end + "\n---\n".length)
    .split("\n").length;

  return lines
    .map((text, index) => ({ number: index + 1, text }))
    .filter((line) => line.number > frontmatterLineCount);
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "untitled";
}

function ithosReadme(): string {
  return `# Ithos

This directory preserves the engineering memory for this repository.

Ithos records why the software changed: decisions, patterns, lessons, defects,
regressions, gaps, sessions and releases.

Capture signal, not exhaust. Markdown is the source of truth.
`;
}

function projectTemplate(): string {
  return `# Project

## Summary

Describe what this project is and why it exists.

## Goals

- Preserve engineering memory locally.

## Technology Stack

- TypeScript

## Architecture

Describe the high-level architecture as it evolves.

## Conventions

- Keep markdown human-readable.
- Prefer concise, factual engineering memory.
`;
}
