```yaml
id: concept-content-addressed-provenance
label: Content-addressed provenance
aliases: [source-ref invariant, sourceRef plus contentHash]
review: accepted
provenance:
  conversationId: provenance-as-chat-text
  timestamp: 2026-06-22T18:00:00Z
  confidence: 0.7
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:00:00Z
```
# Concept: Content-addressed provenance

Anchoring an entity's origin to the *content* of its source text — a pointer
plus a matching digest — rather than to a host-issued identifier. The text is
something every binding can produce; the id is not. Makes edits self-evident
(new content → new hash) and dedup structural.
