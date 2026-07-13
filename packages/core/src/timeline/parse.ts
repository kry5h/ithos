import path from "node:path";
import type { TimelineEntry } from "../artifact/types.js";
import { isArtifactType } from "../artifact/types.js";
import { parseFrontmatter } from "../markdown/frontmatter.js";

const MAX_SUMMARY_LINES = 4;
const MAX_LINE_LENGTH = 72;

/**
 * Parse a single markdown file into a TimelineEntry.
 * Returns null if the file lacks a valid frontmatter block or a recognised
 * artifact type — e.g. README.md, project.md, or any non-artifact file.
 */
export function parseTimelineEntry(
  absoluteFile: string,
  content: string,
  cwd: string
): TimelineEntry | null {
  const fm = parseFrontmatter(content);
  if (!fm) return null;
  if (!fm.type || !isArtifactType(fm.type)) return null;
  if (!fm.created) return null;

  const title = extractTitle(content);
  if (!title) return null;

  const summary = extractSummary(content);

  return {
    date: fm.created,
    type: fm.type,
    title,
    summary,
    file: path.relative(cwd, absoluteFile),
    id: fm.id,
    tags: fm.tags
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Extract the first H1 heading from the markdown body (after frontmatter). */
function extractTitle(content: string): string | null {
  const body = stripFrontmatter(content);

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      return trimmed.slice(2).trim();
    }
  }

  return null;
}

/**
 * Extract up to MAX_SUMMARY_LINES meaningful lines from the body.
 * Skips: blank lines, H1 heading lines, markdown heading lines (##, ###...),
 * HTML comments, and horizontal rules.
 */
function extractSummary(content: string): string[] {
  const body = stripFrontmatter(content);
  const lines = body.split("\n");
  const summary: string[] = [];
  let pastTitle = false;

  for (const raw of lines) {
    if (summary.length >= MAX_SUMMARY_LINES) break;

    const trimmed = raw.trim();

    // Skip the H1 title line once
    if (!pastTitle && trimmed.startsWith("# ")) {
      pastTitle = true;
      continue;
    }

    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;           // headings
    if (trimmed.startsWith("<!--")) continue;        // HTML comments
    if (/^[-*_]{3,}$/.test(trimmed)) continue;      // horizontal rules
    if (trimmed.startsWith("---")) continue;         // stray frontmatter fence

    const line =
      trimmed.length > MAX_LINE_LENGTH
        ? trimmed.slice(0, MAX_LINE_LENGTH) + "\u2026"
        : trimmed;

    summary.push(line);
  }

  return summary;
}

/** Return everything after the closing --- of the frontmatter block. */
function stripFrontmatter(content: string): string {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return content;
  return content.slice(end + "\n---\n".length);
}
