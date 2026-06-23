# Sources

Push-based provenance store. Each file is an addressable **source excerpt** —
verbatim text from both sides of the exchange an extraction was drawn from,
written at extraction time. Stored at `sources/<contentHash>.md`, where
`<contentHash>` is the file's git blob SHA (`git hash-object <file>`). Entities
cite it via `provenance.sourceRef` + `provenance.contentHash`; in git the blob
SHA *is* the content hash, so the pointer resolves and verifies structurally.

- **Verbatim, both sides** — copy the source text; never paraphrase (a rewrite
  reintroduces the non-determinism content-addressing exists to remove).
- **Append-only** — editing text yields a new hash, hence a new file.
- **Verify:** `git hash-object sources/<sourceRef>.md` must equal the stored
  `contentHash`.

See the konspekt standard (`spec/architecture/SERIALIZATION.md`).
