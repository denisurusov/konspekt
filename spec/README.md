# spec

The konspekt standard.

- `SPEC.md` — the conceptual data model: the portable vocabulary a project's state is expressed in. This is the part meant to be *implementable by a stranger*.
- `schema.ts` — a draft (v0.1.0) TypeScript rendering of that model. Field shapes are provisional and need reconciling with the canonical schema developed separately.

The spec deliberately describes *concepts*, not storage. How a `Node` or an `Edge` lands on disk is an implementation choice (see the serialization decision in the root README).
