```yaml
id: nw-confidence-triages-not-accepts
kind: decision
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-22T15:00:00Z
  confidence: 0.88
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Noteworthy: Confidence triages attention, never accepts

Self-reported confidence orders human attention (sorts the review diff
lowest-first) but never grants acceptance. Robust to miscalibration: the
proposing model's confidence is not correctness, so it may sort but never bless.
