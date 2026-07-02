import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export async function listMarkdownFiles(directory: string): Promise<string[]> {
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

export async function readMarkdownFile(file: string): Promise<string> {
  return readFile(file, "utf8");
}
