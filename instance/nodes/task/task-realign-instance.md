```yaml
id: task-realign-instance
type: task
review: proposed
status: open
provenance:
  source: conversation:goals-and-motivation
  capturedAt: 2026-06-21
```
# Task: Re-serialize the instance to the reconciled spec

The instance entities (concepts, noteworthy, artifacts, waypoints, and node
front-matter) still use the interim v0.1.0 serialization. Re-align them to the
canonical schema: per-node `Summary`, node `status`, `NoteworthyKind`,
canonical `Provenance` (conversationId / messageId / timestamp / confidence),
and move waypoint→branch links into the edge table as kind `marks`.
