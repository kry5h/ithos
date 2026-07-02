import path from "node:path";
import type { SearchResult } from "../artifact/types.js";
import { exists } from "../markdown/writer.js";
import { listMarkdownFiles, readMarkdownFile } from "../markdown/reader.js";

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
    const content = await readMarkdownFile(file);
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
