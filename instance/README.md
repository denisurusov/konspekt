# instance

konspekt, eating its own dog food: the live state of *building konspekt*,
recorded in konspekt's own (still-forming) format. The project is its own
first guinea pig.

The point of dogfooding here is not proof — the author is a non-representative
user who tolerates friction others won't. It is to generate *hypotheses*:
each time a convention earns its keep, the portable lesson is the underlying
need it served, not the mechanic.

## Structure

State is split into per-entity files and directories mirroring `../spec/SPEC.md`:

- `project.md` — the Project entity and an index.
- `nodes/` — typed units of state (`goal | investigation | experiment | topic | task | note`).
- `concepts/` — reusable ideas referenced across nodes.
- `noteworthy/` — insights worth preserving (incl. decisions).
- `artifacts/` — produced outputs, by pointer.
- `waypoints/` — decisions to branch the conversation toward a new line; each points at the node(s) it opened via `branchInto`.
- `edges/` — typed relationships between nodes.

Serialization is provisional: YAML front-matter for the cross-cutting fields
(id, type, review, provenance) plus a Markdown body.
