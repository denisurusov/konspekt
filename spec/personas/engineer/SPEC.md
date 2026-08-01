# konspekt — engineer persona (spec)

An extension layer over the persona-agnostic core (`../README.md`) for app-building work. It contributes two decision-record subtypes (ASR, ADR), one content-addressed provenance channel (executed commands), and two edge kinds (`drives`, `executed`). It adds nothing to core enums; all values below are registered in `registry.mjs` and merged by the conformance checker only when an instance activates `engineer`.

## ASR — Architecturally Significant Requirement

An ASR is a durable, load-bearing constraint or force that shapes decisions. It is a **Concept** carrying `subtype: asr`.

- Prose (the `definition` body) states the requirement.
- Its architectural significance is not a stored flag; it is the existence of a `drives` edge from the ASR to one or more ADRs. "The ASRs behind this decision" and "the decisions this requirement drove" are queries over `drives` edges, consistent with inventories-as-queries.
- Supersession, refutation, and merge reuse the core Concept machinery unchanged (`supersedes`, aliases).

## ADR — Architecture Decision Record

An ADR is a recorded decision with its context and consequences. It is a **Waypoint** of `kind: decision` carrying `subtype: adr`, so it already sits on the timeline where a decision belongs.

- The decision statement is the Waypoint `description` body. The ADR introduces **no new prose field** — context, decision, and consequences are expressed structurally rather than duplicated into fields:
  - **context / forces** = inbound `drives` edges from ASRs.
  - **consequences** = outbound core edges to the artifacts and nodes the decision touches (`produces`, `marks`, `decomposes`, …).
  - **status** (proposed / accepted / superseded) = the core `review` state plus a `supersedes` edge. An ADR that replaces an earlier one is the `from` of a `supersedes` edge; the superseded ADR stays in the graph, append over rewrite, so the reversal stays legible. No ADR-specific status enum is introduced.
- Constraint: `subtype: adr` requires `kind: decision`. A milestone or pivot is not an ADR.

## Executed commands — a provenance channel

Commands the maintainer runs while building are captured as content-addressed provenance, parallel to `sources/`:

- `commands/<contentHash>.md` holds one command's **verbatim text**, no front-matter, no `id`. The filename is the git blob SHA of the file, so the verify probe is `git hash-object` of that file equalling the referenced hash — the identical probe `sources/` uses.
- The directory is **append-only**. Identical command text hashes to one file; two runs of it are one file.
- Only the command text is stored. Output (stdout/stderr/exit) is deliberately excluded — the record answers *what was run*, and capturing results would balloon the channel past its purpose.

### Scope of capture

Capture is **all bash commands** the maintainer executes in service of building, with one exemption: **konspekt-maintenance commands** — the `git`/hash operations and pushes that persist konspekt's own atoms and edges — are not captured, so "all" does not regress infinitely onto the act of recording. The target is the engineering/app-building work, and MCP tool calls are out of scope for this channel.

### `executed` — binding a command to the graph

A command file is provenance, so it is addressed, not entified. Each execution is an `executed` edge whose `to` is a `command:<contentHash>` provenance-ref endpoint and whose `from` is the entity the command served:

- `from` an **ADR** when the command carried out that decision;
- `from` the active **task node** otherwise.

The edge carries the execution `timestamp` (source time the command ran, ISO 8601 — the same binding-independent clock all provenance uses). A command run twice is one file and two `executed` edges with distinct timestamps: the text is stored once, and each occurrence is a distinct edge-fact.

The **execution timeline** is therefore `edges where kind = "executed"` ordered by `timestamp` — a derived view, no stored list. Where two commands share a timestamp to the second, the tie breaks on edge `id` lexical order, which the checker already sorts deterministically; an explicit ordinal is introduced only if that proves insufficient.

## Edges this layer adds

| kind | from | to | meaning |
|------|------|----|---------|
| `drives` | concept (`subtype: asr`) | waypoint (`subtype: adr`) | the ASR is an architecturally significant force behind the ADR |
| `executed` | waypoint (`subtype: adr`) or node | `command:<hash>` | the entity enacted this command at the edge's `timestamp` |

`drives` originates only from an ASR in v1. An architectural force already recorded as a `constraint` Noteworthy reaches an ADR through existing core edges rather than widening `drives`.

## Conformance additions

When `engineer` is active, the checker (via `registry.mjs`) additionally:

- accepts `subtype: asr` on a concept and `subtype: adr` on a waypoint, and warns on an ADR whose `kind` is not `decision`;
- accepts `drives` and `executed` as edge kinds with the domain/range above (an out-of-range end is a warning, matching core edge domain/range);
- resolves a `command:<hash>` endpoint against `commands/<hash>.md` — missing file is `dangling-provenance-ref` (error), and a hash that does not match the file is `provenance-ref-hash-mismatch` (warning);
- leaves every core rule untouched, so an instance without `engineer` sees none of the above.
