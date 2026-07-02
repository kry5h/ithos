import type { ArtifactType } from "../artifact/types.js";
import { slugify } from "./slugify.js";

export function createArtifactId(
  type: ArtifactType,
  title: string,
  date: Date
): string {
  const prefix = type.slice(0, 3).toUpperCase();
  const timestamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0")
  ].join("");

  return `${prefix}-${timestamp}-${slugify(title)}`;
}
