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

export type RecordInput = {
  type: ArtifactType;
  title: string;
  body: string;
  cwd?: string;
  date?: Date;
  tags?: string[];
  related?: string[];
};

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

export type SearchResult = {
  file: string;
  line: number;
  text: string;
};

export type ExportResult = {
  files: string[];
  markdown: string;
};

export type TimelineEntry = {
  /** ISO date string from frontmatter `created`, e.g. "2026-07-13" */
  date: string;
  type: ArtifactType;
  title: string;
  /** 2–4 key content lines extracted from the body for quick scanning */
  summary: string[];
  /** Relative path from cwd, e.g. ".ithos/decisions/use-prisma.md" */
  file: string;
  /** Frontmatter `id` field */
  id: string;
  tags: string[];
};

/**
 * Options for generateTimeline. Designed as an open struct so that future
 * filtering flags (--since, --until, --type, --author, --search) can be added
 * as optional fields with no breaking changes to callers.
 */
export type TimelineOptions = {
  cwd?: string;
  // Future (not yet implemented):
  // since?: string;        // "30d" | ISO date
  // until?: string;        // ISO date
  // types?: ArtifactType[];
  // author?: string;
  // search?: string;
};

export type TimelineResult = {
  /** All entries sorted chronologically, oldest first */
  entries: TimelineEntry[];
  /** Entries grouped by date string for rendering convenience */
  groupedByDate: Map<string, TimelineEntry[]>;
  totalCount: number;
};

export const ARTIFACT_TYPES: ArtifactType[] = [
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

export function isArtifactType(value: string): value is ArtifactType {
  return ARTIFACT_TYPES.includes(value as ArtifactType);
}
