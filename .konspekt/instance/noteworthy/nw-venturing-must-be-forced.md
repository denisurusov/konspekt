```yaml
id: nw-venturing-must-be-forced
kind: decision
review: accepted
provenance:
  sourceRef: 01058aa22fe0d2e11568e5facb13f14656830f7c
  contentHash: 01058aa22fe0d2e11568e5facb13f14656830f7c
  timestamp: 2026-06-23T18:00:00Z
  conversationId: setup-and-operating-loop
createdAt: 2026-06-23T18:00:00Z
updatedAt: 2026-06-23T18:00:00Z
```
# Noteworthy: The atom-ready venture must be a forcing skill

The propose half of the loop cannot rely on the maintainer spontaneously
remembering to capture — self-maintenance is the least reliable ingestion mode,
and in practice it drops atoms (the setup kit went uncaptured until flagged). So
the atom-ready trigger is operationalized as a mandatory skill
(`konspekt-atom-readiness`): after each substantive exchange, detect crystallized
atoms and venture a specific sync proposal, always `review: proposed`, never
self-accepted. A forcing function, not emergent behavior.
