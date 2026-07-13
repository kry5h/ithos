import type { ArtifactType } from "../artifact/types.js";

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export type ParsedFrontmatter = {
  id: string;
  type: ArtifactType | null;
  created: string;
  tags: string[];
};

/**
 * Extract structured fields from a raw markdown frontmatter block.
 * Returns null if no frontmatter is present (i.e. file does not start with ---).
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter | null {
  if (!raw.startsWith("---\n")) return null;

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return null;

  const block = raw.slice(4, end);
  const fields: Record<string, string> = {};

  for (const line of block.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    fields[key] = value;
  }

  // Parse tags: may be JSON array like `["a","b"]` or a bare scalar
  let tags: string[] = [];
  if (fields["tags"]) {
    try {
      const parsed = JSON.parse(fields["tags"]);
      if (Array.isArray(parsed)) {
        tags = parsed.filter((t): t is string => typeof t === "string");
      }
    } catch {
      // bare scalar tag — treat as single-element array
      tags = [fields["tags"]];
    }
  }

  return {
    id: fields["id"] ?? "",
    type: (fields["type"] as ArtifactType) ?? null,
    created: fields["created"] ?? "",
    tags
  };
}
