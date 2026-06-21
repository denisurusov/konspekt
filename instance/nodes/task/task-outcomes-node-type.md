```yaml
id: task-outcomes-node-type
type: task
title: Consider an "outcome" node type for testable controls
status: open
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-21T13:00:00Z
review: accepted
provenance:
  conversationId: goals-and-motivation
  timestamp: 2026-06-21T13:00:00Z
createdAt: 2026-06-21T13:00:00Z
updatedAt: 2026-06-21T13:00:00Z
```
# Task: Consider an "outcome" node type for testable controls

Explore adding an `outcome` NodeType: a practical, testable control or target
an assumption can be checked against (what would move, by how much, observed
how). OKR-adjacent but deliberately lighter — no reinventing OKR ceremony.

Open design questions:
- Is it a NodeType or its own entity?
- How does it relate to assumptions (a `validates` / `refutes` edge?) and to
  goals (`measures`?).
- What is the minimum that makes an assumption like
  nw-curated-context-accuracy actually testable?
