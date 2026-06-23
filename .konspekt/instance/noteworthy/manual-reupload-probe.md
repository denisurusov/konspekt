```yaml
id: nw-manual-reupload-probe
kind: statement
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
  confidence: 0.6
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Noteworthy: Manual re-upload is the conformance probe

If a human can round-trip the instance by export-and-paste between bindings,
the interface is public and neutral enough; if not, the binding has defected
from the portability goal. Manual re-upload is therefore the test every fancier
binding must pass, not a fallback tier.
