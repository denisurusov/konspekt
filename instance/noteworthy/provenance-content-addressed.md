```yaml
id: nw-provenance-content-addressed
kind: decision
review: accepted
provenance:
  conversationId: provenance-as-chat-text
  timestamp: 2026-06-22T18:00:00Z
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:00:00Z
```
# Noteworthy: Provenance is content-addressed, not id-addressed

Every entity's provenance points at its source *text* via `sourceRef` (a
content-pinned address) plus `contentHash` (the digest captured at construction
time); an entity verifies iff re-hashing `sourceRef` reproduces `contentHash`.
This sidesteps the host-injection problem (a maintainer cannot read its own
conversation/message id): the text is something every binding has. `sourceRef`
and `contentHash` stay *two* fields because a deep-link binding's addressed text
can drift, so the digest is the integrity gate; the GitHub binding collapses
them (blob SHA = content hash) and the invariant holds structurally.
`conversationId` demotes to optional grouping; `messageId` is retired.
