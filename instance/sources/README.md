# Sources

Push-based provenance store. Each file here is an addressable **source excerpt**
— the text an extraction was drawn from — written at extraction time. Entities
cite it through `provenance.sourceRef` + `provenance.contentHash`
(`spec/data-model/schema.ts`).

Convention:

- A source excerpt is stored at `instance/sources/<contentHash>.md`, where
  `<contentHash>` is its git blob SHA (`git hash-object <file>`).
- An entity's `provenance.sourceRef` is that same hash and `provenance.contentHash`
  repeats it. In the GitHub binding address and digest **coincide** — the blob
  SHA *is* the content hash — so the path `instance/sources/<sourceRef>.md`
  resolves the pointer and the verify invariant holds structurally.
- **Verify probe:** `git hash-object instance/sources/<sourceRef>.md` must equal
  the stored `contentHash`. A mismatch means the excerpt was edited after
  construction.
- Excerpts are **append-only and content-addressed**: editing text yields a new
  hash, hence a new file, never a mutation of an existing one.

This directory is the first operation of the content-addressed provenance
mechanism (`task-provenance-model`). Entities predating it still carry only
`conversationId` + `timestamp`; their backfill is human-assisted — paste the
verbatim export, capture it here.
