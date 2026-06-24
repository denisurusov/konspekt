---
name: documentation-maintenance
description: >-
  Evidence-first skill for drafting new documentation or updating existing
  non-inline documentation from git history, diffs, source, authority surfaces,
  and user-provided intent.
---

# documentation maintenance

Use this skill when asked to draft a new documentation artifact or update an
existing non-inline document from an observed change surface. The consumer can be
any agent performing documentation maintenance; this method is not private to one
role.

## Evidence to gather

1. Inspect the change surface: `git status`, `git diff`, relevant commits with
   `git log` or `git show`, and the affected files named by the request.
2. Read the relevant source, tests, configuration, existing docs, tickets,
   designs, plans, specs, and ADRs deeply enough to know what the documentation
   may claim.
3. For governed semantic domains, start at `AUTHORITY.md` and follow the named
   current authority, implementation seam, and proof seam instead of treating
   README or companion prose as normative.
4. Treat user-provided intent as evidence of the desired outcome, then verify
   factual claims against repository artifacts.

## Method

1. Identify the documentation delta: what changed, who needs to know, which path
   owns the durable explanation, and which claims are already covered elsewhere.
2. Preserve valid and useful existing information unless evidence shows it is
   stale, redundant, superseded by an authority, or irrelevant to future agents.
3. Write path-first, authority-aware documentation that distinguishes normative
   rules, observations, examples, drafts, historical notes, and open questions.
4. Prefer concise bullets, tables, and checklists when they encode decision
   procedures, invalid interactions, update triggers, gotchas, or proof seams.
5. Update `docs/INDEX.md` for every new or materially changed non-inline doc, or
   record why the artifact is outside the curated index scope.

## Validation

Validate markdown-only documentation changes by readback, frontmatter parsing
when present, path/link checks, authority routing checks, and diff review. Run
targeted existing validation only when relevant to the changed documentation
surface. Do not create new tests for markdown documents, prompt markdown,
`docs/INDEX.md`, comments, docstrings, or agent definitions.

If the work introduces an executable script bundled with a documentation skill,
the script is executable behavior and requires test-first positive, negative,
and boundary proof. Do not treat it as markdown-only documentation.

## Escalate instead of inventing

Escalate when git history, code, docs, authority surfaces, or user intent
conflict materially; when a requested documentation update requires behavior
change; when the current authority cannot be identified; or when useful
information would be removed without evidence that it is stale, redundant,
superseded, or irrelevant.

## Boundaries

Do not change executable behavior, create new documentation tests, edit unrelated
tests, override `AUTHORITY.md`, promote README to the curated index, stage
unrelated files, or remove operationally meaningful caveats merely to make prose
shorter.
