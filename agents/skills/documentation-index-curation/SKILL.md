---
name: documentation-index-curation
description: >-
  Skill for creating, updating, or auditing docs/INDEX.md as a concise,
  path-first, authority-aware routing surface for non-inline documentation
  consumers.
---

# documentation index curation

Use this skill when creating, updating, or auditing `docs/INDEX.md`. The index
answers: **Should an agent read this file, when, and what authority should it
assign to it?** It is curated navigation, not an exhaustive file dump.

## Index contract

`docs/INDEX.md` is the canonical curated index for non-inline documentation. It
must stay path-first and authority-aware. README may point to the index, but
README is not the canonical routing surface.

Each high-signal entry should include equivalent fields for:

1. repo-relative path;
2. purpose or question answered;
3. authority status, such as normative, operational, reference, retrospective,
   draft, historical, or non-authoritative companion;
4. read trigger;
5. update trigger.

## What to include

- Current normative or operational docs future agents must know how to route to.
- Authority routers and companion docs, with `AUTHORITY.md` named as the routing
  source for governed semantic domains instead of duplicating those semantics.
- Stable topic guides, ADR indexes, prompt/agent/skill contracts, templates,
  retrospectives, and draft directories when they have ongoing agentic value.
- New or materially updated non-inline docs from the same work, represented at
  the right granularity.

## What to exclude

- Inline source comments and docstrings.
- Generated files, build outputs, caches, local run artifacts, secrets, and
  arbitrary ticket/review artifacts without ongoing documentation value.
- Exhaustive recursive listings of every retrospective, draft, ticket, ADR, or
  prompt when a directory or index entry is the right curated granularity.
- Duplicated semantic specs already owned by `AUTHORITY.md`, specs, ADRs, or
  accepted plans.

## Method

1. Read the current docs tree, root documentation surfaces, relevant agent/skill
   files, and `AUTHORITY.md` before editing.
2. Group entries by stable categories such as authority and standards, runtime
   guides, agent/skill contracts, retrospectives, drafts, and ticket/work
   ledgers.
3. Keep purpose and triggers concise. Prefer fewer high-signal entries over a
   broad file inventory.
4. Confirm every indexed path resolves from the repository root.
5. Check that every new or materially changed non-inline documentation artifact
   in the same change is indexed or explicitly outside scope.

## Validation

Validate by readback, repo-relative path checks, link checks when links are
present, and diff review. Confirm the index excludes inline comments/docstrings,
does not duplicate `AUTHORITY.md`, and does not make README a competing curated
index. Do not create tests for the index itself.

## Escalation

Escalate when an entry's authority status cannot be determined, when a document
appears to contradict an authority surface, when a requested entry would turn the
index into an exhaustive dump, or when maintaining the index would require
behavior changes or unrelated cleanup.
