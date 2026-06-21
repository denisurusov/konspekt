# konspekt — conceptual data model (draft)

This is the portable vocabulary: the small set of concepts that appear to be real across workflows, not just one author's. The discipline is to capture the *concept* and leave the *mechanic* to implementers — a format is only a standard if someone who didn't design it can build a correct importer from this document.

> Status: draft. Concepts are more settled than field-level shapes. The TypeScript in `schema.ts` is provisional and must be reconciled with the canonical schema developed in design discussion.

## Entities

**Project** — the top-level container. Identity, the project's goals, and metadata. Everything else hangs off a project.

**Node** — a unit of project state, typed by a fixed enum: `goal | investigation | experiment | topic | task | note`. (`decision` is deliberately *not* a node type — decisions live as Waypoints or Noteworthy items.) Nodes are the substance of "what is going on" in a project.

**Concept** — a reusable idea or term referenced across nodes. Concepts let the graph express "these nodes are all about X" without repeating X.

**Noteworthy** — a flagged observation or insight worth preserving. This is where the *underlying need* behind a convention gets recorded ("I keep losing which decision is current") as distinct from the mechanic that served it. Noteworthy items are what port to other users.

**Artifact** — a produced output (a document, a code file, a deck) with a pointer to where it lives. The project references artifacts; it does not necessarily contain them.

**Waypoint** — marks **the decision to start a branch in the conversation**: a fork toward a new goal or line of inquiry. A waypoint records *why the graph grew a new branch here* and references the node(s) that branch opened (`branchInto`). Read in sequence, waypoints reconstruct how the project got here as a series of deliberate forks.

**Edge** — a typed, directional relationship between nodes (for example: parent-of, relates-to, refines, supersedes, derived-from). The graph's structure lives in its edges; the goal tree and the associative graph are one edge set, distinguished by kind.

## Cross-cutting

**Provenance** — every element records where it came from: which conversation, platform, and point in the exchange. Provenance is what makes the record trustworthy and a cross-platform move auditable.

**Review state** — human-in-the-loop status for any element a model proposed: e.g. proposed / accepted / superseded. The format assumes machine-suggested content that a human curates.

## Design notes

- The two goals (follow-the-thread and cross-platform portability) converge on this one representation. Features that only serve in-platform sense-making are out of scope for the *standard* even if a reference tool offers them.
- Prefer the lowest-common-denominator. If a concept can't survive a copy-paste between two platforms, it doesn't belong in the portable core.
