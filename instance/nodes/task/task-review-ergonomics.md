```yaml
id: task-review-ergonomics
type: task
title: Review ergonomics
status: open
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T15:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-21T15:00:00Z
createdAt: 2026-06-21T15:00:00Z
updatedAt: 2026-06-21T15:00:00Z
```
# Task: Review ergonomics

How a human accepts or rejects proposals: inline accept-as-you-go, PR-style
batch diff (a pass = a branch of proposals, acceptance = merge), or
confidence-gated auto-accept with only low-confidence items queued — the
reason `confidence` sits on `Provenance`.
