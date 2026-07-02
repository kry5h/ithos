import path from "node:path";
import type { ValidationResult } from "../artifact/types.js";
import { exists } from "../markdown/writer.js";
import { REQUIRED_FILES } from "./layout.js";

export async function validateRepository(
  cwd = process.cwd()
): Promise<ValidationResult> {
  const errors: string[] = [];

  for (const file of REQUIRED_FILES) {
    if (!(await exists(path.join(cwd, file)))) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
