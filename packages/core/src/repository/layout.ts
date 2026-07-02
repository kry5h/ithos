export const ARTIFACT_DIRS = [
  ".ithos/sessions",
  ".ithos/decisions",
  ".ithos/architecture",
  ".ithos/features",
  ".ithos/patterns",
  ".ithos/defects",
  ".ithos/regressions",
  ".ithos/gaps",
  ".ithos/lessons",
  ".ithos/releases",
  ".ithos/attachments"
] as const;

export const DIRECTORY_LAYOUT = [".ithos", ...ARTIFACT_DIRS] as const;

export const REQUIRED_FILES = [
  ".ithos/README.md",
  ".ithos/project.md"
] as const;
