```yaml
id: wp-provenance-model
kind: decision
timestamp: 2026-06-22T18:00:00Z
review: accepted
provenance:
  sourceRef: 8422d16ea0723131e8877d2fd4708017f74dd17a
  contentHash: 8422d16ea0723131e8877d2fd4708017f74dd17a
  timestamp: 2026-06-22T18:00:00Z
  conversationId: provenance-as-chat-text
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:30:00Z
```
# Waypoint: Provenance anchors on content-addressed source

Decided provenance points at addressable source text (`sourceRef` + a matching
`contentHash`), with the git blob as the store, rather than at host
conversation/message ids. Routes around the host-injection problem instead of
waiting on vendor support. Refines investigation-operating-loop; opened the
`instance/sources/` store.

**marks** investigation-operating-loop.
