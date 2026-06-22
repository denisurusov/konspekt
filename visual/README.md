# konspekt · visual

A **read-only context explorer** for a konspekt instance. It renders the
`decomposes` DAG — goals at the top, tasks at the bottom — as a collapsible
tree: click any node to expand its children and its satellites (concepts,
noteworthy items, artifacts), and the layout reflows to make room. Click a node
to inspect the prose that lives in its Markdown body.

This is **v1**. Rendering, pan/zoom, fit, hit-testing, and the layered layout
are delegated to [Cytoscape.js](https://js.cytoscape.org/) +
[cytoscape-dagre](https://github.com/cytoscape/cytoscape.js-dagre); the v0
hand-rolled SVG/pan/zoom/layout is gone. What stays deliberately small:

- **Snapshot, not live.** A build step reads `../instance/` once and bakes a
  single `data/snapshot.js`. The explorer loads that file. Re-run the build to
  refresh, then reload the browser.
- **Skeleton = `decomposes`.** The vertical axis is layered topological depth
  (dagre, top-to-bottom). Nothing time-based yet.
- **Collapsible spine + satellites.** It starts collapsed to the root goals.
  Expanding a node reveals its `decomposes` children and its `mentions` /
  `notes` / `produces` targets; a shared satellite is a single node with
  multiple tethers — identity is singular, matching the store. `relates` arcs
  draw between two concepts that are both currently shown.
- **All nodes, all statuses.** Status, review state, supersession, and time are
  *not* encoded as visual channels in v1; any node can be shown regardless.
  Those become filters in a later pass.
- **No writes.** Nothing here mutates the instance.

## Run it

```sh
node build/vendor.mjs         # download cytoscape/dagre into ./vendor (once)
node build/snapshot.mjs       # reads ../instance, writes data/snapshot.js
node build/serve.mjs          # serve over http; then open http://localhost:8777/
```

Modern browsers refuse to load `<script src>` over `file://` ("file: URLs are
treated as unique security origins"), so the explorer **must be served over
http** — opening `index.html` directly no longer works. `build/serve.mjs` is a
zero-dependency static server for exactly this (`node build/serve.mjs [port]`).

The snapshot build has **no dependencies** (Node only). `data/snapshot.js` and
the vendored libraries are both **gitignored** (re-create them with the two
build scripts above); the explorer itself is a single self-contained
`index.html` plus those local assets.

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

## Layout decisions

- **Layering** is dagre's layered (Sugiyama-style) algorithm, `rankDir: TB`, so
  goals sit above the investigations and tasks they decompose into. Multi-parent
  diamonds (e.g. `investigation-operating-loop` under two goals) land at a
  consistent depth and keep both inbound edges.
- **Visibility** is ours, not dagre's: the apex and root goals always show; any
  other spine node shows iff a parent is shown *and* expanded; a satellite shows
  iff an owner is shown *and* expanded. Edges hide automatically when an
  endpoint hides. Dagre then lays out only the visible elements and animates the
  reflow.
- **Determinism of input.** The snapshot's entities and edges are id-sorted, so
  the element set handed to Cytoscape is stable; dagre itself decides geometry.

## Files

```
visual/
  README.md
  build/snapshot.mjs     # instance -> snapshot (zero deps)
  build/vendor.mjs       # download cytoscape/dagre into vendor/ (gitignored)
  build/serve.mjs        # zero-dep static http server
  data/snapshot.js       # generated (gitignored); loaded by the explorer
  vendor/                # cytoscape + dagre bundles (gitignored)
  index.html             # the explorer (served over http)
```

## Not in v1 (next passes)

- Filters: show accepted/current only; by status; by source conversation.
- The time axis (waypoint ribbon, provenance scrubber) — deferred until
  provenance is finer than the current per-conversation stamping.
- Any write-back / human-authority actions.
