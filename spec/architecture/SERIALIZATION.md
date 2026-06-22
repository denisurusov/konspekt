# konspekt serialization — v1

How a konspekt instance is laid out on disk. **Version: v1** (matched to `../data-model/schema.ts`).

This is the locked, lowest-common-denominator on-disk form: human-readable files that survive a copy-paste between platforms and diff cleanly in git.

## Layout

```
<instance>/
  project.md
  nodes/<type>/<id>.md      # one directory per NodeType
  concepts/<id>.md
  noteworthy/<id>.md
  artifacts/<id>.md
  waypoints/<id>.md
  sources/<contentHash>.md  # content-addressed provenance excerpts (not entities)
  edges/edges.md            # single typed edge table
```

## File format

Each entity is one file: a fenced `yaml` front-matter block holding the structured fields, followed by a Markdown body holding the entity's primary prose field.

| entity     | body holds      |
|------------|-----------------|
| Project    | `summary.text`  |
| GraphNode  | `summary.text`  |
| Concept    | `definition`    |
| Noteworthy | `text`          |
| Waypoint   | `description`   |
| Artifact   | optional note   |

Rules:

- `id` is kebab-case, globally unique, and equals the filename without `.md`.
- `Summary` serializes as `summary: { origin, pinned, updatedAt }`; its `text` lives in the body (no duplication).
- `Provenance` serializes as a nested map (`sourceRef`, `contentHash`, `timestamp`, `confidence?`, `conversationId?`). `sourceRef` + `contentHash` are the content-addressed source pointer; `conversationId` is optional grouping metadata. (`messageId` was retired — see `../data-model/schema.ts`.)
- A file may declare a file-level `provenance` / `review` default when every entry shares it (used by the edge table).

## Edges

`edges/edges.md` is a single table — `id | kind | from | to | weight` — where `from` / `to` are `type:id` refs. `provenance` and `review` are declared once at file level. Per-edge files are a valid v1 variant if the table grows unwieldy.

## Sources

`sources/<contentHash>.md` holds the **source excerpts** an entity's provenance points at — the addressable text an extraction was drawn from, written push-based at extraction time. These are *not* graph entities: plain Markdown, no front-matter, no `id`. The filename **is** the excerpt's git blob SHA, so `provenance.sourceRef` resolves to `sources/<sourceRef>.md`, and the verify probe is `git hash-object` of that file equalling the stored `contentHash` (`RECONCILIATION.md`). The directory is **append-only**: editing an excerpt yields a new hash and a new file, never an in-place rewrite.

**An excerpt is verbatim, and covers every participating turn.** Capture the source text as it was written — human prompts *and* assistant responses — copied, never paraphrased. Curation is permitted only as **selection**: choosing which spans to include and eliding the rest (e.g. with `...`). Rewriting a span — summarizing, condensing, "synthesizing" — is **prohibited**, because it reintroduces interpretation at the one layer whose job is to be the *near-deterministic* anchor: copied text reproduces byte-for-byte and so hashes stably, while a paraphrase does not. A summarized excerpt is an **atom in disguise** — it cannot serve as the stable source the atoms above it are reconciled against, and it silently breaks the guarantee that the stored text *is* what the extraction was drawn from. The specific failure to guard against is **asymmetry**: capturing the human verbatim while compressing the assistant. Both sides are source.

Entities predating the mechanism may carry provenance without `sourceRef` / `contentHash`; their backfill is a separate, human-assisted pass.

## Versioning

The serialization version is **v1**. Breaking changes to layout or field encoding bump it to v2; additive, backward-compatible changes do not.
