---
name: proof-ledger-maintenance
description: >-
  Skill for applying proof/evidence ledger perspective discipline in a generic
  project. Use when a change touches proof-map rows, evidence rows, reference
  models, specifications, contracts, or implementation seams named by those
  rows. Cites AGENTS.md C1-C8 by row ID.
---

# proof ledger maintenance

Use this skill when authoring, reviewing, decomposing, or documenting a change
that touches a proof/evidence row, proof home, reference model, specification,
contract, or implementation seam.

This skill is perspective discipline. It does not replace:

- `AUTHORITY.md`;
- `AGENTS.md` and its six-tier checklist;
- governing specs or contracts;
- proof/evidence maps;
- binding checks;
- reviewer judgment.

## Authorities to Read First

Read these paths directly. Do not rely on memory or restated summaries.

1. `AUTHORITY.md`.
2. `AGENTS.md` and the six-tier change checklist.
3. The proof/evidence map whose row may be touched.
4. The specification, contract, ADR, or design surface named by the affected
   authority row.
5. External authorities only when the local row depends on them.

Do not edit external dependency files unless the user or ticket explicitly
scopes that update.

## Proof / Evidence Map Classes

Customize this table for the seeded project.

| Class | Typical map | Typical domain |
|-------|-------------|----------------|
| Reference model proof | `proof/PROOF_MAP_TEMPLATE.md` copied to a concrete map | Model, spec, or contract conformance |
| Implementation conformance | project-specific map | Production behavior against a spec |
| Integration compatibility | project-specific map | External service, API, schema, or dependency seam |
| Documentation/routing | project-specific map | Authority, README, ticket, ADR, or doc consistency |

## Route by Task

### Authoring a Binding-Relevant Change

If a change touches a proof/evidence row's seam:

1. name the affected claim ID before editing;
2. name affected requirement IDs from the active ticket matrix, if any;
3. apply `AGENTS.md` C4 when a row has production conformance in scope;
4. update the row in the same change as the proof/evidence or implementation
   change;
5. cite the claim ID in the implementation artifact, test, or evidence record.

### Reviewing a Binding-Relevant Change

Reviewers must detect semantic decay. A binding check catches structural drift,
not proof adequacy.

Reject or require revision when:

- a `strong` row's cited evidence would still pass if the row's statement were
  false;
- evidence was weakened without row downgrade;
- a negative or boundary check was removed or generalized away;
- a mock replaces a real seam for a row that claims production conformance;
- a spec statement shifts while the proof/evidence row remains `strong` without
  renewed positive, negative, and boundary coverage.

### Adding Proof or Evidence

When adding evidence for a row:

1. add or modify the proof/evidence home;
2. update the row's home, kind, status, coverage detail, and update trigger in
   the same change;
3. add requirement-ID comments in tests when the evidence implements a ticket
   requirement;
4. run or add the applicable binding check;
5. do not mark `strong` unless positive, negative, and boundary coverage match
   the row statement.

### Decomposing a Binding-Relevant Change

Do not split a proof/evidence row update from the proof, evidence, or
implementation change that justifies it.

A work unit that changes a proof/evidence seam must include:

- affected claim IDs;
- affected requirement IDs;
- exact proof/evidence maps to update;
- binding checks expected to catch structural drift;
- reviewer obligations for semantic adequacy.

## Contrastive Examples

### Structural Drift

Bad: A row points to an old test name, the test was renamed, and the author adds
prose saying the row is still valid.

Good: The author updates the proof/evidence row in the same change as the rename
and keeps the binding check passing.

### Stale Row

Bad: A new governed predicate or behavior is added, but the proof/evidence map is
left for later.

Good: The behavior, evidence, and ledger row land together. The row remains
`missing` or `partial` until real coverage exists.

### Semantic Decay

Bad: A property test named by a `strong` row still exists, but its assertion was
weakened to check only that some output is produced.

Good: The reviewer asks whether the test would fail if the proof/evidence
statement were false. If not, the author restores evidence strength or
downgrades the row.

## Anti-Patterns

- Treating a binding-check pass as semantic proof.
- Updating evidence without updating the ledger row in the same change.
- Updating a ledger row without the proof/evidence that justifies it.
- Marking `strong` without positive, negative, and boundary coverage.
- Citing `AGENTS.md` checklist rows without naming the touched claim ID.
