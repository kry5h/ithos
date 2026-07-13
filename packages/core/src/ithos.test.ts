import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import {
  exportMemory,
  initRepository,
  recordArtifact,
  searchMemory,
  validateRepository,
  readProjectContext
} from "./index.js";

test("initRepository creates the required Ithos files", async () => {
  const cwd = await temporaryDirectory();

  try {
    const result = await initRepository(cwd);

    assert.ok(result.created.includes(".ithos/README.md"));
    assert.ok(result.created.includes(".ithos/project.md"));

    const validation = await validateRepository(cwd);
    assert.equal(validation.valid, true);
    assert.deepEqual(validation.errors, []);
  } finally {
    await removeDirectory(cwd);
  }
});

test("validateRepository reports missing required files", async () => {
  const cwd = await temporaryDirectory();

  try {
    const validation = await validateRepository(cwd);

    assert.equal(validation.valid, false);
    assert.deepEqual(validation.errors, [
      "Missing required file: .ithos/README.md",
      "Missing required file: .ithos/project.md"
    ]);
  } finally {
    await removeDirectory(cwd);
  }
});

test("recordArtifact creates a markdown artifact without overwriting", async () => {
  const cwd = await temporaryDirectory();

  try {
    await initRepository(cwd);

    const file = await recordArtifact({
      cwd,
      type: "decisions",
      title: "Use Markdown",
      body: "Markdown stays readable in Git.",
      date: new Date("2026-07-02T12:00:00.000Z"),
      tags: ["git", "markdown"],
      related: ["DEC-20260701-something"]
    });

    assert.equal(file, ".ithos/decisions/use-markdown.md");

    const content = await readFile(path.join(cwd, file), "utf8");
    assert.match(content, /type: decisions/);
    assert.match(content, /tags: \["git","markdown"\]/);
    assert.match(content, /related: \["DEC-20260701-something"\]/);
    assert.match(content, /# Use Markdown/);
    assert.match(content, /Markdown stays readable in Git\./);

    await assert.rejects(
      () =>
        recordArtifact({
          cwd,
          type: "decisions",
          title: "Use Markdown",
          body: "This should not overwrite the original.",
          date: new Date("2026-07-02T12:01:00.000Z")
        }),
      { code: "EEXIST" }
    );
  } finally {
    await removeDirectory(cwd);
  }
});

test("recordArtifact uses local dates in frontmatter and ids", async () => {
  const cwd = await temporaryDirectory();

  try {
    await initRepository(cwd);

    const file = await recordArtifact({
      cwd,
      type: "sessions",
      title: "Local Date",
      body: "Dates should reflect the local developer calendar.",
      date: new Date(2026, 6, 3, 0, 5, 0)
    });

    const content = await readFile(path.join(cwd, file), "utf8");

    assert.match(content, /id: SES-20260703000500-local-date/);
    assert.match(content, /created: 2026-07-03/);
    assert.match(content, /updated: 2026-07-03/);
  } finally {
    await removeDirectory(cwd);
  }
});

test("searchMemory returns matching markdown lines", async () => {
  const cwd = await temporaryDirectory();

  try {
    await initRepository(cwd);
    await recordArtifact({
      cwd,
      type: "lessons",
      title: "Capture Signal",
      body: "Capture signal, not exhaust.",
      date: new Date("2026-07-02T12:00:00.000Z")
    });

    const results = await searchMemory("not exhaust", cwd);

    assert.deepEqual(results, [
      {
        file: ".ithos/README.md",
        line: 8,
        text: "Capture signal, not exhaust. Markdown is the source of truth."
      },
      {
        file: ".ithos/lessons/capture-signal.md",
        line: 13,
        text: "Capture signal, not exhaust."
      }
    ]);
  } finally {
    await removeDirectory(cwd);
  }
});

test("exportMemory concatenates markdown files", async () => {
  const cwd = await temporaryDirectory();

  try {
    await initRepository(cwd);
    const result = await exportMemory(cwd);

    assert.ok(result.files.includes(".ithos/README.md"));
    assert.ok(result.files.includes(".ithos/project.md"));
    assert.match(result.markdown, /<!-- \.ithos\/README\.md -->/);
    assert.match(result.markdown, /<!-- \.ithos\/project\.md -->/);
  } finally {
    await removeDirectory(cwd);
  }
});

test("readProjectContext returns existing readme and project content", async () => {
  const cwd = await temporaryDirectory();

  try {
    const resultNone = await readProjectContext(cwd);
    assert.deepEqual(resultNone, { readme: null, project: null });

    await initRepository(cwd);
    const resultInit = await readProjectContext(cwd);

    assert.ok(
      resultInit.readme !== null && resultInit.readme.includes("Ithos")
    );
    assert.ok(
      resultInit.project !== null && resultInit.project.includes('ithos: "1"')
    );
  } finally {
    await removeDirectory(cwd);
  }
});

async function temporaryDirectory(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "ithos-test-"));
}

async function removeDirectory(directory: string): Promise<void> {
  await rm(directory, { recursive: true, force: true });
}
