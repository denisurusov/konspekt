```yaml
id: wp-spec-split
kind: decision
timestamp: 2026-06-22T15:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Waypoint: Split spec into data-model and architecture

Reorganized `spec/` into `data-model/` and `architecture/`, separating the
portable vocabulary from the machinery and exiling triggers to `reference/`.
Refines investigation-repo-structure; forced by the trigger + transport work.
