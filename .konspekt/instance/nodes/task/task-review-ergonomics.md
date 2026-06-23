```yaml
id: task-review-ergonomics
type: task
title: Review ergonomics
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-22T15:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-21T15:00:00Z
createdAt: 2026-06-21T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Task: Review ergonomics (resolved)

Specced in `spec/architecture/REVIEW.md`. Core invariant: the maintainer only
ever writes `proposed`; acceptance is exclusively human (prose or authority
verbs), with no threshold, kind-scope, or machine path to `accepted` — this is
what un-collapses the propose→accept separation that self-maintenance ingestion
breaks. `provenance.confidence` triages attention only (sorts the review diff
lowest-first), never accepts — robust to a miscalibrated self-reported score.
Review is batched at the persist checkpoint, not per-atom. Review does not block
persist: proposals persist as `proposed` and accumulate until dispositioned, so
readers filter by review state. Upstream constraint: confidence is mandatory on
every proposed atom (an extraction-prompt requirement).
