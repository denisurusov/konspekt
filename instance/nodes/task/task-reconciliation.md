```yaml
id: task-reconciliation
type: task
title: Reconciliation
status: active
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T15:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-21T15:00:00Z
createdAt: 2026-06-21T15:00:00Z
updatedAt: 2026-06-21T15:00:00Z
```
# Task: Reconciliation

The hard part of maintenance: the second pass must dedup concepts against
aliases (merge vs. create), detect status transitions (assumption
unvalidated→validated, constraint active→lifted, node open→resolved), and
handle supersession (rewrite vs. `Waypoint:pivot` + flip the old item). Must be
idempotent — re-processing unchanged input should not churn the graph, which
argues for stable ids and provenance-anchored extraction. The one stream that
cannot be papered over later; it constrains trigger, transport, and review.
