# konspekt serialization — v1

How a konspekt instance is laid out on disk. **Version: v1** (matched to `schema.ts`).

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
- `Provenance` serializes as a nested map (`conversationId`, `messageId?`, `timestamp`, `confidence?`).
- A file may declare a file-level `provenance` / `review` default when every entry shares it (used by the edge table).

## Edges

`edges/edges.md` is a single table — `id | kind | from | to | weight` — where `from` / `to` are `type:id` refs. `provenance` and `review` are declared once at file level. Per-edge files are a valid v1 variant if the table grows unwieldy.

## Versioning

The serialization version is **v1**. Breaking changes to layout or field encoding bump it to v2; additive, backward-compatible changes do not.
