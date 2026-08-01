# spec

The konspekt standard, split along the seam between *what state is* and *how state moves and stays true*.

- `data-model/` — the conceptual data model: the portable vocabulary a project's state is expressed in (`SPEC.md`) and its TypeScript rendering (`schema.ts`). This is the part meant to be *implementable by a stranger*; it describes concepts, not storage.
- `architecture/` — the machinery: reconciliation (`RECONCILIATION.md`), the v1 on-disk serialization format (`SERIALIZATION.md`), the transport contract (`TRANSPORT.md`), and the review gate (`REVIEW.md`).
- `personas/` — optional **extension layers** over the persona-agnostic core (`personas/README.md`). A layer contributes its own vocabulary — subtypes, edge kinds, and content-addressed provenance channels — through generic core hooks, never by mutating core enums. The first is `engineer/` (ASR as a Concept subtype, ADR as a Waypoint subtype, executed-command provenance). An instance opts in with `personas:` in its `project.md`; absent that, the core is unchanged.

The two specs answer different questions. The data-model spec is stable vocabulary; the architecture spec is machinery. Keeping them apart stops machinery decisions from leaking into the portable contract a second implementer has to honor.

**Not here, on purpose: trigger timing.** *When* a maintenance pass fires is unspecifiable host discretion — and there is less to it than it looks. A durable write is either a machine proposal or a human decision; that is the propose-accept invariant the data-model spec already owns, seen from the "what causes a write" angle. There is no separate "triggers" concept to home elsewhere. The spec owns the invariants that make firing safe and meaningful — idempotence, and propose-accept — never the firing itself.
