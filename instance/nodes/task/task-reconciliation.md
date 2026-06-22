```yaml
id: task-reconciliation
type: task
title: Reconciliation
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T16:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-21T16:00:00Z
createdAt: 2026-06-21T15:00:00Z
updatedAt: 2026-06-21T16:00:00Z
```
# Task: Reconciliation (resolved)

Designed and specced end to end in `spec/RECONCILIATION.md`. An incoming atom is
classified **new | duplicate | update | conflict**. Deterministic resolution
ladder (`id → alias → miss`); the `label + alias → id` index is a derived
multimap (candidate sets for non-unique aliases), never stored. Idempotence via
a per-conversation watermark on `messageId`, with a `contentHash` fallback for
edited messages. Status transitions flip the entity's own `status` field with
evidence in provenance (never an edge); supersession is a single `supersedes`
edge (proposed = flagged contradiction, accepted = confirmed replacement),
separated by the second-entity test. Schema gained `Provenance.contentHash` and
the `supersedes` edge kind.
