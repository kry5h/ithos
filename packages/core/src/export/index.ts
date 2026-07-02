import path from "node:path";
import type { ExportResult } from "../artifact/types.js";
import { exists } from "../markdown/writer.js";
import { listMarkdownFiles, readMarkdownFile } from "../markdown/reader.js";

export async function exportMemory(cwd = process.cwd()): Promise<ExportResult> {
  const root = path.join(cwd, ".ithos");
  if (!(await exists(root))) {
    return { files: [], markdown: "" };
  }

  const files = await listMarkdownFiles(root);
  const sections: string[] = [];

  for (const file of files) {
    const relativeFile = path.relative(cwd, file);
    const content = await readMarkdownFile(file);
    sections.push([`<!-- ${relativeFile} -->`, content.trim(), ""].join("\n"));
  }

  return {
    files: files.map((file) => path.relative(cwd, file)),
    markdown: sections.join("\n")
  };
}
