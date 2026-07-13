import test from "node:test";
import assert from "node:assert/strict";
import { createCli } from "./cli.js";

test("createCli returns a configured commander program", () => {
  const program = createCli();

  assert.equal(program.name(), "ithos");

  const commands = program.commands.map((cmd) => cmd.name());
  assert.ok(commands.includes("init"));
  assert.ok(commands.includes("validate"));
  assert.ok(commands.includes("doctor"));
  assert.ok(commands.includes("record"));
  assert.ok(commands.includes("search"));
  assert.ok(commands.includes("export"));
});
