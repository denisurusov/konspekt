# konspekt

An open standard — and reference implementation — for a portable, human-readable record of a project's evolving state across generative-AI conversations and platforms.

A *konspekt* (a Slavic/German academic term) is a structured, condensed rendering of a larger body of material: notes that preserve the skeleton of a source so you can grasp and carry its essentials without replaying the whole.

## Why

1. **Follow the thread.** Help people process gen-AI outputs and follow long conversations by externalizing project state — decisions, open questions, artifacts, provenance — instead of holding it all in their head.
2. **Port across platforms.** Provide a platform-neutral representation of a project so it can move between gen-AI tools without losing the connective tissue: instructions, accumulated context, conventions.

The two converge on one thing: a durable, structured, human-readable representation of project state that lives *outside* any single conversation.

## Stance

- **Open, and impact-primary.** The win is the industry handling project portability well, by whatever hand. A vendor adopting — or copying — this format is the flywheel working, not a competitor winning.
- **Legible over defensible.** Success is measured in *other people implementing against it*.
- **Boring on purpose.** Lowest-common-denominator, human-readable files that survive a copy-paste between any two platforms.

## Layout

- `spec/` — the standard, split into `data-model/` (the portable vocabulary: `SPEC.md`, `schema.ts`) and `architecture/` (how state is kept true and carried: `RECONCILIATION.md`, the **v1** `SERIALIZATION.md`, and `TRANSPORT.md`).
- `.konspekt/` — the konspekt umbrella. Holds `instance/` (konspekt eating its own dog food: the live state of building konspekt, in konspekt's own format — the first guinea pig) plus this repo's operating envelope (`OPERATING.md`, `NOTES.md`).
- `visual/` — a read-only context explorer that bakes a snapshot of the instance and renders the `decomposes` DAG; parsing doubles as a conformance check.

## Status

Pre–first-external-adopter. Schema and serialization are at **v1**. The format is being refined by dogfooding (see `.konspekt/instance/`); the next milestone is a second, independent implementer. A reference implementation is intended but deliberately not scaffolded yet — the conformance target today is `spec/` plus the dogfooded instance.

## Open decisions

- **License** — not yet chosen. A permissive license (Apache-2.0 or MIT) is the likely fit; Apache-2.0 adds an explicit patent grant. Deferred.
- **Second implementer** — who, and the smallest thing to put in front of them. Deferred, but the central milestone.
