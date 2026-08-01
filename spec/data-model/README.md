# spec / data-model

What a project's state *is* — the portable vocabulary, independent of storage or machinery.

- `SPEC.md` — entities, the single typed edge table, and the derived views state is expressed in.
- `schema.ts` — the v1 TypeScript rendering of that model.

Stable by intent: this is the contract a second, independent implementer reads. Concepts only — how a node or edge lands on disk is an architecture concern (`../architecture/SERIALIZATION.md`).

The core is **persona-agnostic**. Optional persona layers (`../personas/`) extend it through generic hooks — an entity `subtype`, provenance-ref edge endpoints, and a `personas` activation list on the project — without changing this contract; an instance that activates no layer reads exactly as before.
