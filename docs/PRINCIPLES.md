# PRINCIPLES.md

# Ithos Principles

These principles guide every architectural and product decision in Ithos.

If a proposed feature violates these principles, reconsider the feature before
implementing it.

---

# 1. Memory First

Everything in Ithos exists to preserve engineering memory.

If a feature does not improve engineering memory, it is probably out of scope.

---

# 2. Local First

Everything should work without an internet connection.

Cloud services are optional enhancements, never requirements.

Developers should always own their data.

---

# 3. Markdown First

Markdown is the source of truth.

Engineering memory should remain readable without Ithos.

Future storage engines and indexes may exist, but markdown remains canonical.

---

# 4. Git Native

Engineering memory evolves together with source code.

The .ithos directory should naturally participate in:

- commits
- branches
- merges
- pull requests
- reviews
- history

Git remains the synchronization layer.

---

# 5. Open Source Using Open Source

Ithos embraces existing open standards instead of replacing them.

Examples include:

- Markdown
- Git
- MCP
- Obsidian compatibility
- Local LLMs
- Existing developer tooling

---

# 6. Adopt Before Invent

When an excellent open standard already exists, adopt it.

Do not invent proprietary alternatives without a compelling reason.

Markdown is the protocol.

Obsidian is a client.

Git is the synchronization layer.

MCP is the AI integration layer.

---

# 7. Tool Agnostic

Ithos should never depend on a specific AI model, IDE or editor.

It should work equally well with current and future tools.

---

# 8. AI Captures. Humans Understand.

AI should remove the burden of documentation.

Humans remain responsible for engineering judgment.

AI captures.

Humans review.

---

# 9. Capture Signal, Not Exhaust

Do not record everything.

Do not preserve noise.

Capture only information that future engineers will appreciate.

Quality always beats quantity.

---

# 10. Human Readable Always Wins

Every artifact should be valuable without Ithos.

Opening a markdown file directly should always make sense.

Humans come before machines.

---

# 11. Convention Before Product

The .ithos convention is more important than the Ithos application.

The ecosystem should be able to exist independently of any single
implementation.

---

# 12. Build Using Ithos

Ithos should be developed using Ithos.

Every important decision made while building Ithos should itself become part of
Ithos.

Dogfooding is not optional.

---

# 13. Community Through Engineering

The goal is not to create influencers.

The goal is to make high-quality engineering thinking discoverable.

Reputation should be earned through engineering insight, not engagement.

---

# Decision Filter

Before implementing any feature, ask:

- Does this improve engineering memory?
- Does it respect user ownership?
- Does it keep markdown as the source of truth?
- Does it compose with existing tools instead of replacing them?
- Will Future Me appreciate this?

If the answer is "no" to several of these questions, reconsider the feature.
