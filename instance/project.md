# Project: konspekt (instance)

> This file is konspekt's own state, expressed in konspekt's vocabulary. Provisional serialization (Markdown mirroring `spec/SPEC.md`).

## Project

- **Name:** konspekt
- **Goals:**
  1. Help people process gen-AI outputs and follow long conversations by externalizing project state.
  2. Port projects across gen-AI platforms via a platform-neutral representation.
- **Motivation:** Impact-primary over profit. The win is the industry handling project portability well, by whatever hand — being adopted or copied is success, not a threat. Will be open-sourced.

## Waypoints (how we got here)

- Defined the two goals and identified that they **converge on one artifact**: a durable, structured, human-readable record of project state living outside any single conversation. This convergence is the core design insight.
- Chose **dogfooding as the validation path**, with the caveat that own-use generates *hypotheses, not proof* (the author is a non-representative user).
- Committed to **open source + impact-primary**. This dissolves the platform-absorption worry: absorption is the flywheel, not a competitor winning.
- Reframed the validation target: not "a product people will buy" but the **minimal shared vocabulary of a project** — the concepts real across everyone's workflow.
- Storage: **leaning toward human-readable flat files** (Markdown / JSON / YAML) over a database, for legibility and portability.
- Repo: **mono-repo** with `spec/`, `reference/`, and `instance/`.
- Name: **konspekt**, chosen after weighing `context-manifest`, `project-graph`, `cairn` (rejected — namespace already taken by an existing coding agent), and `conspectus` (good fit but longer, and overlaps a library-science methodology). konspekt won on meaning (a structured condensed rendering), namespace cleanliness, and distinctiveness as an ownable token.

## Open questions

- **Second implementer / early adopter:** who is the second, independent party to implement against the format, and what is the smallest thing to put in front of them that makes it obviously worth their time? (Deliberately deferred, but the central milestone.)
- **Is the pain acute enough** that people will adopt a *new convention* to solve it? Dogfooding cannot answer this; it needs strangers. Most people lose threads in AI conversations and simply tolerate it.
- **License:** Apache-2.0 vs MIT. Deferred.
- **Serialization format:** decide concretely.
- **Reconcile schema:** port the canonical schema draft from the separate design discussion into `spec/`.

## Concepts

- **Connective tissue** — the instructions, accumulated context, and conventions that don't move cleanly between platforms; the hard part of portability.
- **Externalized state** — moving project bookkeeping out of the head (and out of a single conversation) so the thread is followable.
- **Legible over defensible** — for an open standard, copyability is the design brief, not a risk.
- **Need, not mechanic** — the portable lesson from any convention is the underlying need it served.
- **Second-implementer gap** — the distance from "works for its author" to "a second independent party found it worth implementing"; where most of what matters is learned.

## Artifacts

- `spec/SPEC.md` — conceptual data model.
- `spec/schema.ts` — draft schema (v0.1.0).
