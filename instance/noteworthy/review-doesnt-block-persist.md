```yaml
id: nw-review-doesnt-block-persist
kind: decision
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
  confidence: 0.85
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Noteworthy: Review does not block persist

Proposals persist as `proposed`; review does not gate the write. Review cadence
decouples from persist cadence — a checkpoint can carry pending proposals, and
readers filter by review state to know what is trusted.
