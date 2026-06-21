```yaml
id: task-reconcile-schema
type: task
review: accepted
status: resolved
provenance:
  source: conversation:goals-and-motivation
  capturedAt: 2026-06-21
```
# Task: Reconcile canonical schema into spec/ (resolved)

Done. `spec/SPEC.md` and `spec/schema.ts` now embody the canonical model:
first-class inventory entities with edge-query views, a single typed edge
table, provenance + review on every entity, and the pinned-summary pattern.
The waypoint→branch link became an edge of kind `marks`.
