import path from "node:path";
import type { InitResult } from "../artifact/types.js";
import { ithosReadme, projectTemplate } from "../markdown/templates.js";
import { ensureDirectory, ensureFile } from "../markdown/writer.js";
import { DIRECTORY_LAYOUT } from "./layout.js";

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
