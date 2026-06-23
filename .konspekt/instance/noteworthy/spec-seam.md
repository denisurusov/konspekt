```yaml
id: nw-spec-seam
kind: decision
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T21:00:00Z
```
# Noteworthy: The spec is two specs — data model vs architecture

`spec/` splits along the seam between *what state is* (data-model: entities,
edges, derived views) and *how state moves and stays true* (architecture:
reconciliation, serialization, transport). The data-model spec is the stable
contract a second implementer honors; the architecture spec is machinery, kept
apart so machinery decisions cannot leak into the portable contract. Corollary:
**triggers are not a category** — *when* a pass fires is unspecifiable host
discretion, and *what makes a durable write* is just propose-accept (the machine
ventures a proposal, a human command is the write), which the data-model spec
already owns. There is no separate "triggers" home: idempotence makes re-runs
safe, propose-accept says who writes, and the spec owns both. (This replaced the
earlier "lives in `reference/`" framing when `reference/` was deleted; see
`wp-delete-reference`.)
