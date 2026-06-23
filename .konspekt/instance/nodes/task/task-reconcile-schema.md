```yaml
id: task-reconcile-schema
type: task
title: Reconcile canonical schema into spec/
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T13:00:00Z
review: accepted
provenance:
  conversationId: context-and-model
  timestamp: 2026-06-21T13:00:00Z
createdAt: 2026-06-21T13:00:00Z
updatedAt: 2026-06-21T13:00:00Z
```
# Task: Reconcile canonical schema into spec/ (resolved)

Done. `spec/SPEC.md` and `spec/schema.ts` embody the canonical model:
first-class inventory entities with edge-query views, a single typed edge
table, provenance + review on every entity, the pinned-summary pattern. The
waypoint→branch link became an edge of kind `marks`.
