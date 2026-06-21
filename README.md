# konspekt

An open standard — and reference implementation — for a portable, human-readable record of a project's evolving state across generative-AI conversations and platforms.

A *konspekt* (a Slavic/German academic term) is a structured, condensed rendering of a larger body of material: notes that preserve the skeleton of a source so you can grasp and carry its essentials without replaying the whole. That is what this project is for — distilling sprawling AI-assisted work into a structured record you can follow, and move.

## Why

Two goals:

1. **Follow the thread.** Help people process gen-AI outputs and follow long conversations by externalizing project state — decisions, open questions, artifacts, provenance — instead of holding it all in their head.
2. **Port across platforms.** Provide a platform-neutral representation of a "project" so it can move between gen-AI tools without losing the connective tissue: instructions, accumulated context, conventions.

The two converge on a single thing — a durable, structured, human-readable representation of project state that lives *outside* any single conversation. Build that, and following your own thread (goal 1) and carrying a project elsewhere (goal 2) both fall out of it.

## Stance

- **Open, and impact-primary.** The win is the industry handling project portability well, by whatever hand. A vendor adopting — or copying — this format is the flywheel working, not a competitor winning.
- **Legible over defensible.** Success is measured in *other people implementing against it*. The format aims to be readable enough that a stranger can build a correct importer from the spec alone.
- **Boring on purpose.** Lowest-common-denominator, human-readable files that survive a copy-paste between any two platforms.

## Layout

- `spec/` — the standard: the conceptual data model (`SPEC.md`) and the draft schema (`schema.ts`).
- `reference/` — the reference implementation (to come).
- `instance/` — konspekt eating its own dog food: the live state of building konspekt, recorded in konspekt's own format. This project is the first guinea pig.

## Status

Pre–first-external-adopter. The format is being refined by dogfooding (see `instance/`). The next milestone is a second, independent implementer.

## Open decisions

- **License** — not yet chosen. For an adoptable standard a permissive license (Apache-2.0 or MIT) is the likely fit; Apache-2.0 adds an explicit patent grant. Deferred.
- **Serialization format** — leaning toward human-readable flat files (Markdown / JSON / YAML) over a database, for legibility and portability. To be decided concretely.
- **Reconcile schema** — the canonical schema draft developed in a separate design discussion needs to be ported into `spec/`.
