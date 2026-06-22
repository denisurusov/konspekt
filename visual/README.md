# konspekt · visual

A **read-only, static context explorer** for a konspekt instance. It renders
the `decomposes` DAG — goals at the top, tasks at the bottom — and lets you
click any node to expand its satellites (concepts, noteworthy items, artifacts)
and inspect the prose that lives in each entity's Markdown body.

This is **v0**. It is deliberately small:

- **Snapshot, not live.** A build step reads `../instance/` once and bakes a
  single `data/snapshot.js`. The explorer loads that file. Re-run the build to
  refresh.
- **Skeleton = `decomposes`.** The vertical axis is pure topological depth
  (longest path from a root goal). Nothing time-based yet.
- **Spine + click-to-expand satellites.** The goal DAG is the backbone;
  `mentions` / `notes` / `produces` targets appear only when you expand their
  owner. A shared satellite is a single node with multiple tethers — identity is
  singular, matching the store.
- **All nodes, all statuses.** Status, review state, supersession, and time are
  *not* encoded as visual channels in v0; every node shows regardless. Those
  become filters in a later pass.
- **No writes.** Nothing here mutates the instance.

## Run it

```sh
node build/snapshot.mjs       # reads ../instance, writes data/snapshot.js
open index.html               # or just double-click it — no server needed
```

The build has **no dependencies** (Node only) and the explorer is a single
self-contained HTML file. `data/snapshot.js` works from `file://` (it assigns a
global, so there is no `fetch`/CORS problem).

`node build/snapshot.mjs [instanceDir] [outFile]` overrides the defaults
(`../instance` and `./data/snapshot.js`).

## What it does for free: a conformance check

Parsing the instance doubles as validation. The build never throws on a broken
instance — it bakes a `problems[]` list into the snapshot, shown in the
**Problems** tab. It catches dangling edge endpoints, `type:id` mismatches,
duplicate ids, orphan entities, missing fields, and filename/id divergence.

### Determinism

`data/snapshot.js` is a **pure function of the instance**. No wall-clock
timestamp is baked in; a `meta.contentHash` digests the content instead. Re-run
on an unchanged instance and the file is byte-identical, so its git diff is
always meaningful. Entities, edges, and problems are all id-sorted.

## A note on the filename/id rule

The serialization spec says `id` equals the filename without `.md`. In practice
the instance keeps **bare-slug filenames** for concepts, noteworthy, and
artifacts (`connective-tissue.md` holds `concept-connective-tissue`), while
nodes and waypoints match exactly. So the build **keys on the in-file `id`,
never the path**, and the directory decides the entity type.

The conformance check treats bare-slug filenames as an accepted convention and
flags only genuine divergence (e.g. `platforms-absorb-capabilities.md` holding
`nw-platforms-absorb`, where the slug isn't even a prefix-strip of the id). To
enforce strict `filename == id` instead:

```sh
KONSPEKT_FILENAME_RULE=strict node build/snapshot.mjs
```

## Layout decisions (so a second implementer can reproduce it)

- **Rank** = longest path from a root goal (a root is a node with no inbound
  `decomposes`). Longest-path keeps shared/multi-parent nodes — the diamonds,
  like `investigation-operating-loop` under two goals — at their deepest
  legitimate row, so "tasks at the bottom" stays honest.
- **Sibling order** within a rank is `id`-sorted. There is no `order` field in
  the schema and none is added; sort is derived, which is what makes the layout
  reproducible.
- **Satellite placement**: the first expanded owner (lowest id) fixes a shared
  satellite's position; later owners only add a tether. `relates` arcs draw only
  between two concepts that are both currently shown.
- Expanding satellites never reflows the spine.

## Files

```
visual/
  README.md
  build/snapshot.mjs     # instance -> snapshot (zero deps)
  data/snapshot.js       # generated; loaded by the explorer
  index.html             # the explorer (open directly)
```

## Not in v0 (next passes)

- Filters: show accepted/current only; by status; by source conversation.
- The time axis (waypoint ribbon, provenance scrubber) — deferred until
  provenance is finer than the current per-conversation stamping.
- Any write-back / human-authority actions.
