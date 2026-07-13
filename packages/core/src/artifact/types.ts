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
