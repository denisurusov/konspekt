# Schema reconciliation (R1–R8) — open, non-normative

> **Status: OPEN. Do not implement.** The proposal below rests on a premise that
> a later census contradicted. It is recorded here because `task-instance-layout-regularity`
> and other entities refer to "the pending schema reconciliation (R1–R8)" by name,
> and a reader needs to be able to find it. Nothing in this file is normative.
> `spec/data-model/schema.ts` and `spec/architecture/SERIALIZATION.md` remain the
> spec.

**Not to be confused with `RECONCILIATION.md`**, which is normative and covers a
different subject: how an incoming *atom* is classified against the existing
graph (new | duplicate | update | conflict). This file is about reconciling the
*schema* with what instances actually contain. The names are close enough to
mislead; renaming one of them is an open question.

---

## Where this came from

On 2026-07-19 a diff was run between `spec/data-model/schema.ts` and the entity
files in two instances — `denisurusov/konspekt` (this repo) and `code_tracer`,
the first external adopter. The diff reported that both instances had converged
on a uniform front-matter envelope the schema does not define, and eight
remediation items were drafted from that reading.

Source excerpt: `.konspekt/instance/sources/05f79ce4a294a4a0251a6feef26b5a1d287ea16e.md`.

That excerpt is the only record of the original draft, and it quotes the items in
elided form. **The one-line summaries below are reconstructed from it; the full
argument for R1 and R3–R7 was never persisted and is not recoverable.**

## The eight items, as drafted

| | item | as argued |
|---|---|---|
| R1 | Adopt the uniform envelope into `Base` | Keep `type` in front-matter despite the directory encoding it — a file pasted into a web/mobile chat arrives with no directory context, and the manual re-upload probe requires it to be interpretable standalone |
| R2 | `status` becomes optional, defined only where a vocabulary exists | The one item argued *against* practice: the envelope demanded a `status` and types with no vocabulary got `active` as filler |
| R3 | Restore `kind` via directory, mirroring nodes | `kind` is the one field genuinely not derivable from the directory, since all NoteworthyKinds share `noteworthy/` |
| R4 | Adopt the edge generalization; rewrite the domain/range table | Domain/range described as "not widened — reassigned." `notes` specced node→noteworthy, observed noteworthy→artifact |
| R5 | Artifact is content-bearing | Adopt the observed inline-document shape over the specced pointer shape |
| R6 | Drop `Waypoint.timestamp` | — |
| R7 | Concept: no change, revisit | — |
| R8 | Ship a validator | "One author, one maintainer LLM, one month, and the instance diverged on four entity types and four edge kinds. Nothing checks." |

## The inversion

Later the same night, a per-file census began — reading actual front-matter
rather than reasoning from the summary diff. It reached four files of roughly
sixty before stopping, and two findings were already fatal to the framing:

**konspekt's artifacts conform to `schema.ts` exactly.** `name`, `kind`,
`location` — the pointer shape, precisely as specced. No `title`, no `status`,
no `summary`, no inline document.

**Therefore the uniform envelope is not something "practice converged on."** It
is code_tracer's local choice. konspekt's own instance never adopted it.

R1–R8 was framed as *the spec is behind practice*. The evidence supports *one
instance diverges from the spec, and the other largely doesn't*. Those imply
opposite defaults: the first says move the spec, the second says bring the
instance back. Every item except R4 was argued from the first, and R4 would
break konspekt's conforming rows to match code_tracer's non-conforming ones.

Captured as `nw-konspekt-conforms-code-tracer-drifts`, which supersedes
`nw-schema-behind-practice` (edge `e-sup-census-schemapractice`).

## Per-item status

| | status | why |
|---|---|---|
| R1 | **premise refuted** | The envelope is one instance's local choice, not convergence. The standalone-interpretability argument for keeping `type` may survive independently and is worth re-arguing on its own merits |
| R2 | **survives, strengthened** | The only item argued against practice rather than from it, so the inversion does not touch it |
| R3 | **probably survives** | Independent of the envelope question; not re-examined |
| R4 | **direction refuted** | Would break konspekt's conforming edge rows. Whether the domain/range table needs *some* revision is still open — the observed `notes` usage has to be explained either way |
| R5 | **refuted** | Would break twelve conforming artifacts to match one instance |
| R6 | **unknown** | Not addressed by the census |
| R7 | **unaffected** | No-change item |
| R8 | **survives, strengthened** | A validator is what would have caught the divergence, and equally what would have caught this draft's bad premise. It is the only item that improves under the inversion |

## A separate correction to the census

The 2026-07-19 diff asserted that no `resolved`, `refuted`, `lifted`, or
`abandoned` status appears anywhere, and drew from that the conclusion that the
authority-verb transitions "appear never to have occurred in practice."

This is false for nodes. A read of `.konspekt/instance/nodes/task/` on
2026-07-20 found seven tasks carrying `status: resolved` —
`task-provenance-model`, `task-realign-instance`, `task-reconcile-schema`,
`task-reconciliation`, `task-review-ergonomics`, `task-serialization-format`,
`task-trigger-transport`.

The narrower claim — that non-node entity types carry `active` as filler because
they have no status vocabulary — is unaffected, and R2 rests on that narrower
claim. But `nw-state-written-at-birth-not-transitioned` was derived from the
broad version, and the notifier's event set was designed around it. That chain
should be re-checked before it is built on further.

## What closing this requires

1. **Finish the census.** Roughly fifty-six files unread. Explicitly not yet
   covered as of the stop: eight remaining nodes, eleven remaining artifacts,
   the concepts directory, the remaining noteworthy files, and a re-read of
   code_tracer against `SERIALIZATION.md` rather than `schema.ts`.
2. **Produce a conformance report per instance**, with each divergence attributed
   to a named instance rather than to "practice." The attribution is the whole
   point — it is what the first draft got wrong.
3. **Redraft or discard R1–R8 from that report.** Not from this file.

R8 does not have to wait for any of the above, and arguably should not: a
validator run against both instances *is* step 1, executed rather than read.
Whether the conformance tab in `visual/` already does part of this is unverified.
