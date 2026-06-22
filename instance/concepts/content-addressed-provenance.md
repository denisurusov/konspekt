```yaml
id: concept-content-addressed-provenance
label: Content-addressed provenance
aliases: [source-ref invariant, sourceRef plus contentHash]
review: accepted
provenance:
  sourceRef: 8422d16ea0723131e8877d2fd4708017f74dd17a
  contentHash: 8422d16ea0723131e8877d2fd4708017f74dd17a
  timestamp: 2026-06-22T18:00:00Z
  confidence: 0.7
  conversationId: provenance-as-chat-text
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:30:00Z
```
# Concept: Content-addressed provenance

Anchoring an entity's origin to the *content* of its source text — a pointer
plus a matching digest — rather than to a host-issued identifier. The text is
something every binding can produce; the id is not. Makes edits self-evident
(new content → new hash) and dedup structural.
