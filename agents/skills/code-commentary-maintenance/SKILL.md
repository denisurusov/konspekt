---
name: code-commentary-maintenance
description: >-
  Skill for adding or correcting local source comments and docstrings that
  explain non-obvious, evidence-backed invariants, gotchas, motivation,
  protocol assumptions, data-shape constraints, or related code.
---

# code commentary maintenance

Use this skill when pointed at source code and asked to improve explanatory
comments or docstrings. Comments are local aids for code readers; they are not a
substitute for tests, specs, ADRs, or non-inline documentation.

## Evidence to read

1. Read the target function/class/module and the nearby code the comment will sit
   beside.
2. Read related callers, callees, data models, configuration contracts, and tests
   when needed to verify the behavior being explained.
3. Route semantic-authority questions through `AUTHORITY.md`, specs, ADRs, or
   accepted plans. Comments are subordinate to those surfaces.

## Add or correct comments only for

- non-obvious invariants or pre/postconditions a future editor could violate;
- gotchas, footguns, concurrency/path pitfalls, lifecycle ordering, or recovery
  constraints verified against code;
- motivation for a surprising shape that is not clear from syntax alone;
- protocol boundaries, data-shape assumptions, or authority seams local to the
  code being edited;
- pointers to related code when local behavior is split across files;
- stale comments whose claims contradict the current code or authority surface.

## Reject comment changes that

- restate obvious control flow or names;
- assert semantics not verified against code or authority surfaces;
- add speculative TODOs or untracked future work;
- hide broad architecture specs inside local comments;
- imply behavior that the code does not implement;
- change executable behavior under the guise of commentary.

## Method

1. Decide whether a comment is needed at all. Prefer no comment when code and
   names already make the behavior obvious.
2. Place the comment/docstring adjacent to the code it explains.
3. Keep the wording local, factual, and evidence-backed. Name related paths or
   authority surfaces when that prevents future drift.
4. Correct stale comments rather than layering new commentary on top of stale
   claims.
5. Do not update `docs/INDEX.md` for comment-only or docstring-only source edits.
   Update the index only if the same work also creates or materially changes a
   non-inline documentation artifact.

## Validation

Review the diff to confirm the edit is non-behavioral. Read back the comment
against nearby code and any related authority surface. Run targeted existing
validation only when the repository's existing tests intentionally inspect the
comment/docstring or when requested by the workflow.

Do not create new tests for comments or docstrings. If an existing
comment/docstring test fails because an intentional comment change updated the
documented local contract, use the documentation-test-repair skill and preserve
the test's proof strength.

## Escalation

Escalate when the desired explanation would require changing executable
behavior, when the code and authority surface conflict, when the behavior cannot
be verified, or when the appropriate home is a spec/ADR/non-inline doc rather
than a local comment.
