import path from "node:path";
import type { TimelineOptions, TimelineResult } from "../artifact/types.js";
import { exists } from "../markdown/writer.js";
import { listMarkdownFiles, readMarkdownFile } from "../markdown/reader.js";
import { parseTimelineEntry } from "./parse.js";

/**
 * Read every artifact under .ithos, parse each into a TimelineEntry, sort
 * chronologically, and return a structured TimelineResult ready for rendering.
 *
 * Future filtering (--since, --type, --author, --search) will be applied here
 * inside Core before returning to the caller — zero changes needed in the CLI
 * or any other consumer.
 */
export async function generateTimeline(
  options: TimelineOptions = {}
): Promise<TimelineResult> {
  const cwd = options.cwd ?? process.cwd();
  const root = path.join(cwd, ".ithos");

  if (!(await exists(root))) {
    return { entries: [], groupedByDate: new Map(), totalCount: 0 };
  }

  const files = await listMarkdownFiles(root);
  const entries = [];

  for (const file of files) {
    const content = await readMarkdownFile(file);
    const entry = parseTimelineEntry(file, content, cwd);
    if (entry) entries.push(entry);
  }

  // Sort chronologically: oldest first. Entries on the same date are sorted
  // by file path for a stable, deterministic order.
  entries.sort((a, b) => {
    const dateCmp = a.date.localeCompare(b.date);
    return dateCmp !== 0 ? dateCmp : a.file.localeCompare(b.file);
  });

  // Group by date for rendering convenience
  const groupedByDate = new Map<string, typeof entries>();
  for (const entry of entries) {
    const group = groupedByDate.get(entry.date) ?? [];
    group.push(entry);
    groupedByDate.set(entry.date, group);
  }

  return {
    entries,
    groupedByDate,
    totalCount: entries.length
  };
}
