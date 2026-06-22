# spec / data-model

What a project's state *is* — the portable vocabulary, independent of storage or machinery.

- `SPEC.md` — entities, the single typed edge table, and the derived views state is expressed in.
- `schema.ts` — the v1 TypeScript rendering of that model.

Stable by intent: this is the contract a second, independent implementer reads. Concepts only — how a node or edge lands on disk is an architecture concern (`../architecture/SERIALIZATION.md`).
