---
title: konspekt operating policy (this instance)
status: Seed
scope: How THIS repository's konspekt instance is operated. Host policy, not standard.
updated: 2026-06-22
---

# Operating policy — konspekt dogfood instance

This file is the **operating envelope** for the konspekt instance under
`.konspekt/instance/`. It is deliberately *not* part of the portable standard:
the spec (`/spec`) defines the data model and the transport contract; *when* and
*how this particular project* runs a maintenance pass is host policy and lives
here. A second platform that adopts this instance carries `.konspekt/instance/`
and re-establishes its own envelope — it does not inherit this file's choices.

## The portable unit vs. the envelope

- `.konspekt/instance/` — the portable konspekt instance. Self-contained,
  `sources/` included. This is what transport reads/writes and what ports across
  platforms.
- `.konspekt/OPERATING.md`, `.konspekt/NOTES.md` — repo-local envelope. Not part
  of the contract a second implementer conforms to.

## Operating loop

This instance runs the **synchronous-review** posture defined in
`/spec/architecture/TRANSPORT.md`:

- **load** at session start — read `.konspekt/instance/` before any design or
  writing work, so the session never runs from stale context.
- the maintainer **proposes** extractions into the working copy (`sync`); it
  never accepts on its own (everything it adds is `review: proposed`).
- a human-issued verb **carries its own acceptance** (`review: accepted`);
  acceptance happens in the conversation, before persist.
- **persist** writes the working copy back to the store (GitHub `main`
  directly — writing accepted state to main is contract-legal, not a shortcut:
  the review gate already happened, carried by human authority, not a branch).

The store only ever sees `read` and `write`. `load` / `sync` / `persist` /
`sync_persist` are orchestration above the store, identical on every binding.

## Human vocabulary

Not duplicated here — single source of truth:

- Authority verbs (`pin`, `validate`, `refute`, `resolve`, `abandon`, `lift`):
  `/spec/data-model/SPEC.md` § Human vocabulary (v1).
- Checkpoint verbs (`load`, `sync`, `persist`, `sync_persist`):
  `/spec/architecture/TRANSPORT.md` § The checkpoint verbs map onto read/write.
- `note:` / `note "…"` is **not** a konspekt capture verb — it appends to
  `.konspekt/NOTES.md` (human scratchpad), never reconciled into the graph.

## Triggers — how the loop fires

Settled: the loop fires on **two events**, not on a cadence (no clock, turn, or
session rhythm — "session" has no portable meaning across LLM vendors, and
per-turn firing is pure noise).

1. **Atom-ready (LLM-ventured).** The maintainer watches the thread and, when it
   judges that a durable atom has crystallized — a decision landed, a concept got
   named, a task changed status — it *ventures* the extraction as a proposal
   (`sync` into the working copy, always `review: proposed`). It never accepts
   its own ventures. Readiness is judged against the node types
   (`goal | investigation | experiment | topic | task | note`, plus concepts,
   noteworthy, artifacts); workable but explicitly imperfect.
2. **Human manual command.** `sync` / `persist` / `sync_persist` and the
   authority verbs (`pin`, `validate`, `refute`, `resolve`, `abandon`, `lift`).
   The deterministic, authoritative side — it accepts and it writes durably.
   Human authority carries acceptance.

The two events map onto the propose/persist split: the LLM drives **proposing**
on judgment; the human drives **accepting and persisting** on command. The
propose-accept separation stays intact — ventures are candidates; the command is
what makes anything durable.

**Readiness bar.** "Venture when an atom is ready" must bias toward *holding*
until something has settled, not narrating every exchange — otherwise it decays
back into the per-turn noise excluded above. Hold by default; venture on
crystallization.

Recorded in the instance as `wp-triggers` / `nw-triggers-event-not-cadence`.
