```yaml
id: wp-provenance-model
kind: decision
timestamp: 2026-06-22T18:00:00Z
review: accepted
provenance:
  conversationId: provenance-as-chat-text
  timestamp: 2026-06-22T18:00:00Z
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:00:00Z
```
# Waypoint: Provenance anchors on content-addressed source

Decided provenance points at addressable source text (`sourceRef` + a matching
`contentHash`), with the git blob as the store, rather than at host
conversation/message ids. Routes around the host-injection problem instead of
waiting on vendor support. Refines investigation-operating-loop; sets up the
re-hydration / instance backfill.

**marks** investigation-operating-loop.
