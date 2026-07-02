import { writeFile, mkdir } from "node:fs/promises";
import { stat } from "node:fs/promises";

export async function ensureDirectory(
  directory: string
): Promise<"created" | "existing"> {
  if (await exists(directory)) {
    return "existing";
  }

  await mkdir(directory, { recursive: true });
  return "created";
}

export async function ensureFile(
  file: string,
  content: string
): Promise<"created" | "existing"> {
  if (await exists(file)) {
    return "existing";
  }

  await writeFile(file, content, { flag: "wx" });
  return "created";
}

export async function writeArtifact(
  file: string,
  content: string
): Promise<void> {
  await writeFile(file, content, { flag: "wx" });
}

export async function exists(file: string): Promise<boolean> {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
