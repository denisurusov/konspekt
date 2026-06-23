---
title: Konspekt Agent Instructions
status: Seed
scope: Agent behavior inside this repository
updated: 2026-06-22
---

# Konspekt Agent Instructions

## 1. Mandatory Skills

All agents MUST load the `empirical-epistemology` skill immediately.

All agents MUST load `ontology-perspective-discipline` before editing
documentation or skills.

All agents maintaining the konspekt instance MUST load `konspekt-atom-readiness`
— it forces the propose half of the operating loop: detect crystallized atoms,
venture specific sync proposals, never self-accept.

The canonical skill directory is:

```text
agents/skills/
```

Provider-specific skill paths are compatibility links:

```text
.claude/skills -> ../agents/skills
.opencode/skills -> ../agents/skills
.codex/skills -> ../agents/skills
```

`CLAUDE.md` is a compatibility link to this file.

## 2. First Read Set

Before changing repository content, read:

1. `README.md`
2. the relevant file under `spec/`
3. the relevant file under `.konspekt/instance/`, when changing live project-state records

Do not rely on memory when the current repository can be inspected directly.

## 3. Repository Perspective

This repository owns the konspekt standard and its dogfooded project-state
instance.

Keep these surfaces distinct:

| Surface | Perspective |
|---------|-------------|
| `spec/` | Normative standard and architecture. |
| `setup/` | Adopter kit: scaffolder and seed templates for new adopter repos. |
| `distribution/` | Generated release projection of the outward-facing subset. Do not hand-edit; regenerate from root via `distribution/build/distribute.mjs`. |
| `.konspekt/` | konspekt umbrella: the portable instance plus this repo's operating envelope. |
| `.konspekt/instance/` | Live konspekt-format project state (the portable unit; `sources/` included). |
| `agents/skills/` | Shared skills consumed by provider-specific integrations. |
| `.claude/`, `.opencode/`, `.codex/` | Provider compatibility surfaces. |

Do not let instance notes become the standard, and do not let provider-specific
paths become the canonical skill source. Do not let the operating envelope
(`.konspekt/OPERATING.md`, `.konspekt/NOTES.md`) leak into the portable instance.
Do not hand-edit `distribution/`; it is derived from root.

## 4. Editing Discipline

- Preserve existing user changes.
- Keep edits scoped to the requested surface.
- Prefer observed evidence from files and command output over plausible prose.
- Record uncertainty instead of filling gaps with invented authority.
- Do not stage, commit, or push unless explicitly requested.
