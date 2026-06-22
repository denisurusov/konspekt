# konspekt — reconciliation (spec)

How a fresh extraction is merged into an existing instance without duplication
or clobbering. Each extracted atom is classified against the current graph as
**new | duplicate | update | conflict**. This document covers resolving an atom
to an existing entity, the idempotence guarantee that makes a pass safe to
re-run, and how the *update* and *conflict* buckets are handled.

## Resolution ladder (deterministic tier)

Resolve an incoming atom to an existing entity by trying these in order,
stopping at the first hit. Ordered by **exactness**, not by how often each is
encountered.

1. **id** — the atom carries an explicit `type:id`. Exact identity. A **path**
   is a deterministic function of `(type, id)`, so reaching the file by path and
   matching by id are the *same* gate: id is the durable key, path is its
   filesystem projection. The id is never derived from mutable text (e.g. a
   label slug) — otherwise a relabel moves the path and dangles every edge
   pointing at it.
2. **alias** — the atom is only a surface form (a label or phrase). Look it up
   in the `label + alias → id` index. A *unique* hit resolves to the id;
   **multiple hits return a candidate set** (aliases are not guaranteed unique)
   which escalates rather than auto-resolving.
3. **miss** — no deterministic hit. Escalate to the fuzzy / LLM tier, then human
   review. Every accepted merge **appends the new surface form as an alias**, so
   the deterministic tier widens and the fuzzy tier shrinks as the instance
   ages.

Two consequences fall out of the ladder:

- **Edges resolve for free** once their endpoints resolve: edge identity is
  `(kind, from, to)` over already-resolved ids, so it is idempotent by
  construction.
- **Artifacts** use `location` as a near-key within tier 1.

An alias is a *synonym* — an alternate name for the same concept — not a short
label for an entity's contents (that is what `summary` is for). Aliases live on
`Concept`.

## Alias index (derived, never stored)

The `label + alias → id` lookup is a **derived view**, built at reconcile time
by scanning Concept entities — not a stored file. Aliases live on Concept; the
index is a query over them, exactly as the concept inventory is a query over
`mentions` edges. This preserves a single source of truth: no sync step,
nothing to invalidate on create / merge / relabel, nothing to churn the diff.
It also matches the model's rule that derived views are never serialized.

- The index is a **multimap**, not a map: a normalized surface form maps to
  *one or more* ids. A single-id key resolves deterministically; a multi-id key
  returns the candidate set that escalates. This is how non-unique aliases stay
  safe.
- The **normalization function** applied while building (case, whitespace,
  punctuation folding) is the actual deterministic match key — it defines what
  counts as "the same surface form" — and must be specified explicitly.
- Build cost is a trivial in-memory map over a human-scale concept set; the
  performance argument for materialization does not apply. Caching would only
  matter at a scale beyond this project, and even then is a cache, not a commit.
- Scope: this concerns the *deterministic* alias index only. If the fuzzy tier
  later needs an expensive structure (e.g. an embedding index for semantic
  matching), that is a separate caching decision and does not change this one.

## Idempotence (watermark + content hash)

Running the pass twice yields the same instance as running it once —
`f(f(x)) = f(x)`: no duplicated entities, no churned summaries, no second
commit. This is what makes a pass safe to re-run — after a crash, on a timer,
or mid-session.

Idempotence lives at two levels; the first is primary.

- **Skip-level (watermark).** Provenance already records which message every
  entity came from, so the instance *is* the ledger of consumed messages — no
  separate bookkeeping. Keep a watermark per `conversationId`: the last
  `messageId` processed. The next pass extracts only the tail (messages after
  the watermark) and never calls the extractor on consumed messages. The no-op
  comes from *not doing the work*.
- **Match-level (resolution ladder).** If a consumed message is re-extracted
  anyway, each atom should resolve to its existing entity as a duplicate and
  change nothing.

Skip-level is primary because **extraction is non-deterministic**: re-running
the LLM over the same message need not yield identical atoms — a reworded
concept misses the alias index and risks a duplicate. Match-level idempotence
therefore cannot be guaranteed by the extractor; it depends on the reconciler,
which is deterministic only on exact id / alias hits. Skip-level removes the
second extraction entirely and sidesteps the problem. Provenance is what makes
the skip possible — which is why it is recorded at **message** granularity: the
watermark's resolution equals provenance's resolution, enabling precise resume.

Two cases the watermark must respect:

- **Edited / branched messages.** If a message's content changes after
  processing, a naive watermark wrongly skips it. Provenance carries a
  **content hash**; "same `messageId`, changed hash" is detected, and that one
  message falls back to match-level re-processing.
- **Cross-conversation.** Watermarks are per `conversationId`, so independent
  conversations never interfere.

Consequence: once re-runs are no-ops, the pass is safe to trigger **any way** —
end-of-session, scheduled, manual, post-crash — instead of requiring fragile
exactly-once delivery. This is what frees the trigger + transport stream.

> Provenance support: idempotence relies on `provenance.messageId` (the
> watermark key) and `provenance.contentHash` (edit detection), both defined on
> `Provenance` in `../data-model/schema.ts`.

## Status transitions and supersession

After the ladder matches an atom to an existing entity, two cases remain where
the atom is **not** a duplicate. One test separates them: **is a second entity
involved?**

**No second entity → status transition (the *update* bucket).** New prose
changes the *state* of one existing entity: an assumption
`unvalidated → validated`, a node `open → resolved`, a constraint
`active → lifted`. Handle it by flipping that entity's own `status` field —
*never* by adding an edge. A transition has only one endpoint, so an edge would
need a phantom "event" node; and the derived views (`open assumptions`, …) read
`status`, so the field must move regardless. An edge alongside it would be a
second source of truth for one fact. The *evidence* (which message bears the
transition) is recorded as **provenance** on the change. The human path is the
authority verbs (`validate`, `resolve`, `lift`, …); the maintainer may *propose*
a transition, which review confirms.

**A second entity → supersession (the *conflict* bucket).** New prose
contradicts or replaces an existing entity (a later decision overturns an
earlier one). This relates *two* entities, so it is a single `supersedes`
**edge** — `from` the superseding (new) entity, `to` the superseded (old) one.
Both entities stay in the graph; the edge records that one replaced the other.
Neither is deleted, so the reversal itself stays legible.

One edge kind suffices, not two. An unresolved contradiction versus a confirmed
replacement is the *same* edge in two **review** states: a **proposed**
`supersedes` edge is a flagged contradiction awaiting the human; **accepting**
it confirms the replacement. The `review` field already carries this — no
`negates` kind needed. Evidential relations ("supports") are deliberately not
typed: nothing transitions, so they stay out of this family.

Both cases mutate or annotate **accepted** state, so they pass through review
like any proposal and must carry provenance, or the watermark will re-propose
them on the next pass.

Derived view: **current items** = entities with no inbound `supersedes` edge
(the live decision among superseded ones).
