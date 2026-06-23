```yaml
id: task-realign-instance
type: task
title: Re-serialize the instance to the reconciled spec
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T13:00:00Z
review: accepted
provenance:
  conversationId: goals-and-motivation
  timestamp: 2026-06-21T13:00:00Z
createdAt: 2026-06-21T13:00:00Z
updatedAt: 2026-06-21T13:00:00Z
```
# Task: Re-serialize the instance to the reconciled spec (resolved)

Done. Every instance entity now uses the v1 serialization: canonical
Provenance, per-node Summary and status, NoteworthyKind, and waypoint→branch
links expressed as `marks` edges in the edge table.
