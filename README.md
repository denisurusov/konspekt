# konspekt

An open standard — and reference implementation — for a portable, human-readable record of a project's evolving state across generative-AI conversations and platforms.

A *konspekt* (a Slavic/German academic term) is a structured, condensed rendering of a larger body of material: notes that preserve the skeleton of a source so you can grasp and carry its essentials without replaying the whole.

## Why

1. **Follow the thread.** Help people process gen-AI outputs and follow long conversations by externalizing project state — decisions, open questions, artifacts, provenance — instead of holding it all in their head.
2. **Port across platforms.** Provide a platform-neutral representation of a project so it can move between gen-AI tools without losing the connective tissue: instructions, accumulated context, conventions.

The two converge on one thing: a durable, structured, human-readable representation of project state that lives *outside* any single conversation.

## Not a memory layer

konspekt is easy to mistake for AI memory — Mem0, Zep, or the built-in memory of Claude Projects, ChatGPT, and Gemini Gems. It sits at a different layer, and that is the whole point.

Those systems are **machine-authored**: a model decides what is worth keeping, extracts a compressed version, and stores it to feed back to a model later. The reader is the agent. The artifact is a lossy summary you do not see and do not own — and the model can quietly drop, distort, or ignore it, a limitation the memory vendors themselves acknowledge.

konspekt inverts both terms — human-authored, human-read:

- **You curate; the model only proposes.** Nothing lands because an extractor judged it salient. A model may *propose*; only you *accept* (propose→accept). The guarantee is integrity, not completeness: what is in the record is there because you put it there.
- **Verbatim, with provenance.** Each note, decision, and fact is the real wording, linked back to the actual conversation text — not a paraphrase a model might have hallucinated.
- **A public format, not a product.** The data model is an open standard you can read, diff, and carry between platforms. No service to run, nothing to be locked into.

So the user is a **human working on a project**, not an agent needing recall. konspekt is the durable, readable record of the project; platform memory is, at best, a running summary of it.

The layers compose rather than collide: a konspekt instance is a clean, human-validated source you can feed *into* Mem0, Zep, or any RAG pipeline. It is upstream of memory systems, not a competitor to them.

## Stance

- **Open, and impact-primary.** The win is the industry handling project portability well, by whatever hand. A vendor adopting — or copying — this format is the flywheel working, not a competitor winning.
- **Legible over defensible.** Success is measured in *other people implementing against it*.
- **Boring on purpose.** Lowest-common-denominator, human-readable files that survive a copy-paste between any two platforms.

## Layout

- `spec/` — the standard, split into `data-model/` (the portable vocabulary: `SPEC.md`, `schema.ts`) and `architecture/` (how state is kept true and carried: `RECONCILIATION.md`, the **v1** `SERIALIZATION.md`, and `TRANSPORT.md`).
- `setup/` — the adopter kit: a zero-dependency Node scaffolder (`init.mjs`) plus seed templates that drop a `.konspekt/` umbrella into any project repo. See `setup/README.md`.
- `distribution/` — outward-facing release projections, **derived** from root by `build/distribute.mjs` (never hand-copied): the publishable subset (`spec/`, `setup/`, the konspekt skills) baked into a versioned, regenerable projection. The dogfood instance and `visual/` are excluded. Versions get cut once the spec settles.
- `.konspekt/` — the konspekt umbrella. Holds `instance/` (konspekt eating its own dog food: the live state of building konspekt, in konspekt's own format — the first guinea pig) plus this repo's operating envelope (`OPERATING.md`, `NOTES.md`).
- `visual/` — a read-only context explorer that bakes a snapshot of the instance and renders the `decomposes` DAG; parsing doubles as a conformance check.

## Adopt it

`setup/` scaffolds konspekt into your own repo. From your project root (Node 18+):

```
node setup/init.mjs --name "My Project" --goal "what the project is for"
```

That writes a `.konspekt/` umbrella — a seed instance (`project.md`, an empty edge table, the entity directories) plus an operating envelope (`OPERATING.md`, `NOTES.md`) — and adds a konspekt stanza to your `AGENTS.md` so any agent in the repo reads the instance first and respects propose-accept. Review it, then commit — or pass `--push` to commit and push for you. It's idempotent: it won't clobber an existing `.konspekt/instance/`. Full walkthrough in `setup/README.md`.

## Status

Pre–first-external-adopter. Schema and serialization are at **v1**. The format is being refined by dogfooding (see `.konspekt/instance/`); the next milestone is a second, independent implementer. A reference implementation is intended but deliberately not scaffolded yet — the conformance target today is `spec/` plus the dogfooded instance.

## Open decisions

- **License** — not yet chosen. A permissive license (Apache-2.0 or MIT) is the likely fit; Apache-2.0 adds an explicit patent grant. Deferred.
- **Second implementer** — who, and the smallest thing to put in front of them. Deferred, but the central milestone.
