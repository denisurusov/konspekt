# spec

The konspekt standard, split along the seam between *what state is* and *how state moves and stays true*.

- `data-model/` — the conceptual data model: the portable vocabulary a project's state is expressed in (`SPEC.md`) and its TypeScript rendering (`schema.ts`). This is the part meant to be *implementable by a stranger*; it describes concepts, not storage.
- `architecture/` — the machinery: reconciliation (`RECONCILIATION.md`), the v1 on-disk serialization format (`SERIALIZATION.md`), and the transport contract (to come).

The two specs answer different questions. The data-model spec is stable vocabulary; the architecture spec is machinery. Keeping them apart stops machinery decisions from leaking into the portable contract a second implementer has to honor.

**Not here, on purpose: triggers.** *When* a maintenance pass fires — per-turn, end-of-session, manual — is host policy, not standard. It lives in `reference/`. The spec owns only the invariant that makes firing safe (idempotence), never the firing itself.
