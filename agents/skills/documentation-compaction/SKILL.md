---
name: documentation-compaction
description: >-
  Preservation-first skill for compacting, tightening, deduplicating, or
  agent-optimizing existing documentation without erasing useful claims,
  authority distinctions, edge cases, or proof obligations.
---

# documentation compaction

Use this skill when a user asks to compact, tighten, deduplicate, shorten, or
agent-optimize an existing documentation segment. The goal is not fewer words at
any cost; the goal is less noise while preserving valid signal.

## Preservation pass

Before rewriting, identify every operationally meaningful item in the original:

1. decisions, invariants, invalid interactions, and scope boundaries;
2. paths, commands, configuration keys, data shapes, and protocol surfaces;
3. authority references, proof obligations, validation seams, and update triggers;
4. warnings, gotchas, edge cases, failure modes, unresolved questions, and
   historical context that still affects current work;
5. distinctions between normative rules, empirical observations, examples,
   drafts, historical notes, and speculation.

## Compaction method

1. Remove throat-clearing, repeated framing, stale narrative, and prose that does
   not help future agents decide what to read, preserve, validate, or update.
2. Merge duplicate claims only when the merged wording keeps the strongest
   constraints, caveats, and evidence.
3. Keep unresolved uncertainty visible. Do not turn an open question into a
   decision, and do not silently drop caveats that explain authority limits.
4. Preserve proof obligations, invalid interactions, edge cases, and escalation
   triggers even when they are verbose.
5. If compaction changes a document's purpose, authority status, read trigger, or
   update trigger, update `docs/INDEX.md` accordingly.

## Validation

Read back the compacted result against the preservation pass. Check that paths
and links still resolve, authority labels still route through `AUTHORITY.md`
where applicable, and no useful claim disappeared without evidence. Review the
diff to confirm the change is documentation-only.

Do not create tests for markdown, prompt, index, comment, docstring, or
agent-definition compaction. If an existing documentation/comment-related test
fails because intentional compaction moved headings, anchors, keywords, or prompt
sections, use the dedicated documentation-test-repair skill instead of broadening
this skill.

## Escalation

Escalate when the source document conflicts with authority surfaces, when
staleness cannot be established for information the user wants removed, when a
claim appears to require behavior change, or when compaction would erase a proof
obligation, invalid interaction, edge case, or unresolved open question.

## Boundaries

Do not change behavior, flatten normative and historical material into one
status, promote companion docs to authority, add speculative TODOs, edit
unrelated tests, create new tests, skip validation readback, or shorten by
deleting the information future agents need to act safely.
