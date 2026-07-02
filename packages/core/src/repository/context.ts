import path from "node:path";
import { readMarkdownFile } from "../markdown/reader.js";
import { exists } from "../markdown/writer.js";

export type ProjectContext = {
  readme: string | null;
  project: string | null;
};

export async function readProjectContext(
  cwd = process.cwd()
): Promise<ProjectContext> {
  const readmeFile = path.join(cwd, ".ithos", "README.md");
  const projectFile = path.join(cwd, ".ithos", "project.md");

  const [readme, project] = await Promise.all([
    (await exists(readmeFile)) ? readMarkdownFile(readmeFile) : null,
    (await exists(projectFile)) ? readMarkdownFile(projectFile) : null
  ]);

  return { readme, project };
}
