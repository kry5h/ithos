import path from "node:path";
import type { DoctorResult } from "../artifact/types.js";
import { exists } from "../markdown/writer.js";
import { validateRepository } from "./validate.js";

export async function doctorRepository(
  cwd = process.cwd()
): Promise<DoctorResult> {
  const messages: string[] = [];
  const validation = await validateRepository(cwd);

  if (validation.valid) {
    messages.push("Ithos repository structure is valid.");
  } else {
    messages.push("Ithos repository structure needs attention.");
    messages.push(...validation.errors);
    messages.push("Run `ithos init` to create the required files.");
  }

  if (await exists(path.join(cwd, ".git"))) {
    messages.push("Git repository detected.");
  } else {
    messages.push("No .git directory detected. Ithos works best inside Git.");
  }

  return {
    ok: validation.valid,
    messages
  };
}
