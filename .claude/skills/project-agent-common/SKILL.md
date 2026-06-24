---
name: project-agent-common
description: >-
  Shared role contract for generic project agent definitions. Use to apply
  authority routing, ticket-bundle conventions, empirical epistemology,
  test-first verification, proof/evidence ledger maintenance, and perspective
  discipline without duplicating those rules across role definitions.
---

# project agent common protocol

Use this skill at the start of every project-agent task unless the user supplies
a narrower role-local procedure.

This skill is not product authority. It routes agents to the repository
surfaces that own product semantics, implementation practice, planning, proof,
evidence, and decisions.

## 1. Mandatory Authority Load Order

Before authoring, planning, implementing, or reviewing a consequential change,
read:

1. `AUTHORITY.md` for authority routing.
2. `AGENTS.md` for standing instructions and the six-tier checklist.
3. The target ticket or artifact, if one exists.
4. The governing standard for the role:
   - `CODING_STANDARDS.md` for implementation or implementation review;
   - `PLANNING.md` for planning or plan review;
   - `BOOTSTRAP.md` and relevant ADR/design surfaces for design work.
5. Relevant specs and proof/evidence maps when the change touches governed
   behavior, conformance, compatibility, or proof status.

Do not rely on memory when a current authority surface can be read directly.

## 2. Perspective Discipline

Classify the target surface before editing. Keep each surface in one stable
perspective:

| Surface | Valid perspective |
|---------|-------------------|
| Agent definition | Direct instruction to one role. |
| Skill | Reusable procedure loaded on demand. |
| Spec | Normative behavior and terms. |
| Design / ADR | Decision, tradeoffs, consequences. |
| Plan / ticket | Scoped work intent, requirement matrix, evidence obligations. |
| Review | Evidence-backed findings against the artifact under review. |
| README | Orientation and routing only. |
| AUTHORITY | Authority routing only. |

Do not import adjacent-surface responsibilities into the target artifact.

## 3. Ticket-Bundle Convention

Tickets live under `tickets/`.

Each ticket is a bundle directory:

```text
tickets/<NNN-short-title>/
  ticket.md
  design.md
  review_<n>_design.md
  plan.md
  review_<n>_plan.md
  decomposition.md
  evidence.md
  artifacts/
  retrospective.md
```

`tickets/INDEX.md` is the ticket ledger. Keep ticket status in the canonical
ticket artifact and `tickets/INDEX.md` synchronized when the role owns ticket
status hygiene.

## 4. Design Artifact Contract

A design artifact is a Tier 3 decision/design surface. It must be
self-contained and transcript-independent.

Recommended top-level sections:

1. Task statement
2. Current-state evidence
3. Desired outcome
4. Constraints / invariants / non-goals
5. Proposed design
6. Alternatives considered
7. Affected surfaces / interfaces
8. Risks / failure modes
9. Validation strategy
10. Planner handoff / open questions

## 5. Plan Artifact Contract

A plan is a Tier 3 execution contract. It must constrain implementation through
verifiable behavior and evidence obligations, not line-by-line prescriptions.

Recommended top-level sections:

1. Task statement
2. Test-first mandate
3. Desired outcome
4. Constraints / non-goals
5. Authoritative protocol surfaces
6. Requirement matrix
7. Positive, negative, and boundary cases
8. Proof / evidence obligations
9. Milestones / execution sequence
10. Dependencies / risks / open questions
11. Traceability expectations for tests
12. Ledger obligations when proof/evidence maps are touched

The requirement matrix is normative. Tests and evidence should cite requirement
IDs.

## 6. Proof / Evidence Ledger Discipline

When a task touches a proof/evidence ledger row:

1. name the affected claim IDs before editing;
2. name affected ticket requirement IDs, if any;
3. update the row in the same change as the proof/evidence or seam change;
4. preserve strong evidence or downgrade status honestly;
5. cite claim IDs in tests, implementation artifacts, or ticket evidence.

Use `proof-ledger-maintenance` for detailed procedure.

## 7. Validation Reporting

Every implementation or review result should report:

- files changed or reviewed;
- commands run with observed output;
- requirement IDs addressed;
- proof/evidence claim IDs addressed;
- tests added or changed and what they prove;
- known gaps or unexecuted validation.
