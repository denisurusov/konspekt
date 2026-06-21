```yaml
id: task-trigger-transport
type: task
title: Trigger + transport
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
# Task: Trigger + transport

When a maintenance pass runs (per-message / end-of-session checkpoint /
manual) and *where the live instance lives* so a fresh conversation can read
current state and write proposals back — GitHub vs. Google Drive vs. manual
re-upload. A separate axis from extraction logic, but it blocks
maintain-across-conversations.
