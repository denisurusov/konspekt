# konspekt — data model (spec)

The konspekt standard: the entity set, the single edge table, and the derived views a project's state is expressed in. This supersedes the v0.1.0 draft and is reconciled from the canonical data-model design.

> Guiding principle: store each fact **once**, and make every "inventory" a *query over edges* rather than a stored list. Duplication is the enemy; drift follows duplication.

## Principles

1. **Single source of truth.** Concepts, noteworthy items, and artifacts are first-class entities, stored once. "This node's concepts" and "the project's concepts" are *queries over edges*, not stored lists — dedup is structural, the project aggregate is free, cross-linking is automatic.
2. **One graph, not two.** Goal decomposition (hierarchical) and cross-links (associative) share one `Edge` table, distinguished by `kind`. The goal tree is `edges where kind = "decomposes"`; everything else is a filtered view.
3. **Auditable by construction.** Every entity carries `provenance` (which conversation/message it was extracted from, with optional confidence) and a `review` state (`proposed → accepted / rejected`), because an LLM maintainer *proposes* graph updates that a human accepts.
4. **Summaries compose, humans win.** Each node owns its `summary`; the project summary composes the node summaries; a `pinned`, human-origin summary is never overwritten by the maintainer.

## Entities

- **Project** — root: `goal`, a composed `summary`, timestamps. No stored aggregates; they're views.
- **GraphNode** — a unit of work, typed `goal | investigation | experiment | topic | task | note`. Carries its own `summary` and a `status` (`open | active | resolved | abandoned`). Hierarchy lives in edges, so a node can sit under more than one parent.
- **Concept** — `label`, `definition`, `aliases` (surface forms for dedup / merge). Referenced via edges, never copied.
- **Noteworthy** — `kind` (`fact | statement | decision | assumption | constraint`) and `text`, with a `status` that matters for some kinds (an assumption is unvalidated / validated / refuted; a constraint is active / lifted).
- **Artifact** — `name`, `kind`, `location`, `version`.
- **Waypoint** — a timestamped *event*, `kind` (`decision | milestone | pivot`), that points at the node/branch it sits on (edge kind `marks`). Waypoints are the **timeline** axis and are deliberately *not* part of the goal tree.

## The decision rule

One underlying decision, up to three representations, with a single rule for each — not three parallel definitions:

- Always recorded once as a **Noteworthy** item (`kind: decision`) — the atomic, always-true record.
- Additionally a **Waypoint** *if* it's an inflection point worth seeing on the timeline.
- Additionally a **Node** *only if* it opens a branch of work to track.

## Edges

One typed table; `from` / `to` are `EntityRef`s; `weight` is meaningful only for `relates`.

- `decomposes` — node → node (goal tree)
- `mentions` — node → concept
- `relates` — concept → concept (untyped association; optional `weight` for strength)
- `produces` — node → artifact
- `notes` — node → noteworthy
- `marks` — waypoint → node (the branch the waypoint sits on / opened)

## Derived views (never stored)

- project concept inventory = concepts with any inbound `mentions` edge
- node concept inventory = concepts with a `mentions` edge from that node
- goal tree = `edges where kind = "decomposes"`
- timeline = waypoints ordered by `timestamp`
- open assumptions = noteworthy where `kind = "assumption"` and `status = "unvalidated"`

## Note on concept relationships

Concept-to-concept edges exist but are **untyped** (kind `relates`), carrying an optional numeric `weight` instead of a relationship ontology — deliberately avoiding a philosophical rabbit hole.
