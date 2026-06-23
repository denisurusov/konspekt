```yaml
id: investigation-operating-loop
type: investigation
title: Operating loop — populate and maintain instances
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
# Investigation: Operating loop — populate and maintain instances

The machinery that fills a konspekt instance from conversations and keeps it
true over time. The data model and review governance — propose→accept,
provenance, pinned summaries — are settled in the spec; what's open is how the
loop is *driven*. Decomposes into four streams: ingestion mode, reconciliation,
trigger + transport, and review ergonomics.
