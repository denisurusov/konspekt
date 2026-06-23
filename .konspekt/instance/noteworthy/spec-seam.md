```yaml
id: nw-spec-seam
kind: decision
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Noteworthy: The spec is two specs — data model vs architecture

`spec/` splits along the seam between *what state is* (data-model: entities,
edges, derived views) and *how state moves and stays true* (architecture:
reconciliation, serialization, transport). The data-model spec is the stable
contract a second implementer honors; the architecture spec is machinery, kept
apart so machinery decisions cannot leak into the portable contract. Corollary:
**triggers are implementation, not standard** — once re-runs are no-ops, *when* a
pass fires is host policy and lives in `reference/`, never in the spec.
