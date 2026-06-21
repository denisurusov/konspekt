# instance

konspekt, eating its own dog food: the live state of *building konspekt*,
recorded in konspekt's own format. The project is its own first guinea pig.

The point of dogfooding is not proof — the author is a non-representative user
who tolerates friction others won't. It is to generate *hypotheses*: each time
a convention earns its keep, the portable lesson is the underlying need it
served, not the mechanic.

## Structure

Per-entity files and directories mirroring `../spec/`:

- `project.md` — the Project entity and index.
- `nodes/<type>/` — one directory per NodeType (`goal/`, `investigation/`, `task/`, …), one file per node.
- `concepts/` — reusable ideas referenced across nodes.
- `noteworthy/` — insights worth preserving (incl. decisions).
- `artifacts/` — produced outputs, by pointer.
- `waypoints/` — branch-point events; each marks the node its branch opened.
- `edges/edges.md` — the single typed edge table.

## Note on serialization

The spec has been reconciled to the canonical model (first-class inventory
entities with edge-query views, a single typed edge table, per-node
summaries, provenance + review on every entity, the pinned-summary pattern).
The instance entities still use the interim v0.1.0 serialization; re-aligning
them is tracked in `nodes/task/task-realign-instance.md`.
