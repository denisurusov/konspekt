```yaml
id: task-provenance-model
type: task
title: Provenance model — content-addressed source
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-22T18:00:00Z
review: accepted
provenance:
  conversationId: provenance-as-chat-text
  timestamp: 2026-06-22T18:00:00Z
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:00:00Z
```
# Task: Provenance model — content-addressed source (resolved)

Reworked provenance so it anchors on the *source text*, not on a host-supplied
conversation/message id the maintainer is blind to. `Provenance` now carries
`sourceRef` (a content-pinned address of the source excerpt) and `contentHash`
(its construction-time digest); `timestamp` is source time; `conversationId`
demotes to optional grouping; `messageId` is retired. The GitHub binding stores
each excerpt as a git blob, so the blob SHA *is* the content hash and the verify
invariant holds structurally. Push-based ingestion inverts idempotence to
match-level dedup on the content-addressed source, demoting the watermark to a
timestamp-ordered optimization and retiring the edited-message special case.
Specced across `spec/data-model/schema.ts`, `spec/data-model/SPEC.md`, and
`spec/architecture/RECONCILIATION.md`.

Spawned open sub-decision: *where source excerpt blobs live* (an
`instance/sources/` convention) and the **backfill** of every existing entity,
none of which yet carries a `sourceRef` — the work a re-hydration pass closes.
