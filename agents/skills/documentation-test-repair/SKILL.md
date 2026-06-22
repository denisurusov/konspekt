---
name: documentation-test-repair
description: >-
  Skill for narrow repair of pre-existing tests that intentionally inspect
  documentation, prompt markdown, headings, anchors, keywords, comments, or
  docstrings after an intentional documentation/comment change.
---

# documentation test repair

Use this skill only when intentional documentation or explanatory-comment work
causes an existing test to fail because that test directly inspects a
documentation/comment artifact. This is a repair boundary, not authority to
create tests or fix general implementation failures.

## Eligibility gate

Before editing a test, verify all facts below:

1. **Pre-existing test** — the test existed before the current documentation or
   comment change.
2. **Documentation/comment subject** — the assertion directly inspects markdown
   docs, prompt/agent markdown, headings, anchors, keywords, section structure,
   explanatory comments, or docstrings.
3. **Same-work causality** — the failure follows an intentional,
   evidence-backed documentation/comment change in the same work.
4. **Preserved proof purpose** — the repair keeps the original documentation or
   comment contract meaningful.

If any fact is missing or ambiguous, refuse the repair and escalate.

## Allowed repairs

- Update expected headings, anchors, keywords, prompt-section selectors, or
  comment/docstring expectations to match the intentional documentation/comment
  change.
- Adjust local parsing helpers only when the document structure intentionally
  changed and the helper still proves the same documentation/comment contract.
- Add requirement, ticket, or task traceability comments near changed assertion
  blocks when the repository convention or assigned plan requires them.

## Forbidden repairs

- Creating new tests or expanding coverage.
- Editing behavior, runtime, schema, persistence, route/calculus,
  validation-result, implementation, performance, or unrelated tests.
- Changing executable behavior to satisfy a documentation/comment test.
- Deleting meaningful assertions, replacing exact checks with vague substrings,
  adding blanket regexes, broadening fixtures into lies, adding skips, adding
  xfails, or adding conditional passes.
- Repairing failures caused by unrelated dirty state or infrastructure issues.

## Method

1. Run or inspect the targeted failing test before editing when feasible.
2. Name the intentional documentation/comment change that made the expectation
   stale.
3. Confirm the test's original purpose and identify the minimum expectation that
   must change to preserve it.
4. Edit only that pre-existing test file and only the stale documentation/comment
   expectation.
5. Rerun the targeted repaired test when feasible and record the exact command
   and output.
6. If the wider validation run has unrelated failures, report them instead of
   repairing outside this boundary.

## Validation and reporting

Report the repaired test file, the same-work documentation/comment change that
caused the repair, the traceability comment used when required, the targeted
rerun command/output, and any unrelated failures left untouched. Review the diff
to prove proof strength was preserved and no skips, xfails, assertion deletion,
fixture lies, or unrelated test edits were introduced.

Executable scripts bundled with documentation skills require their own tests;
that obligation is separate from this repair skill and does not authorize new
tests for markdown, prompt, index, comment, docstring, or agent-definition
changes.
