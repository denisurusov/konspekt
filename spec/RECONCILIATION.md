# konspekt — reconciliation (spec)

How a fresh extraction is merged into an existing instance without duplication
or clobbering. Each extracted atom is classified against the current graph as
**new | duplicate | update | conflict**. This document covers the first step —
resolving an atom to an existing entity. Status-transition, supersession, and
idempotence rules follow as the thread develops.

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
