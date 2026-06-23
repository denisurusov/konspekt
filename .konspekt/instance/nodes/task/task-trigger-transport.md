```yaml
id: task-trigger-transport
type: task
title: Trigger + transport
status: resolved
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-22T21:00:00Z
review: accepted
provenance:
  conversationId: maintain-populate-instances
  timestamp: 2026-06-21T15:00:00Z
createdAt: 2026-06-21T15:00:00Z
updatedAt: 2026-06-22T21:00:00Z
```
# Task: Trigger + transport (resolved)

Two axes, settled separately. **Trigger** (when a pass fires) is host policy,
not standard: once re-runs are no-ops, firing is free, so triggers stay out of
the spec entirely — host discretion, since a durable write is just
propose-accept (the machine proposes, a human decides). The checkpoint verb
family is `sync` / `persist` / `sync_persist`, with `load` (read) as a trivial,
side-effect-free precondition excluded from the family. **Transport** (where the
instance lives) is specced in `spec/architecture/TRANSPORT.md`: a dumb versioned
store offering neutral, public read/write over the markdown instance, with
manual re-upload as the conformance probe. Review lives in the conversation
(human authority carries acceptance), so the store needs no review machinery and
the GitHub reference binding writes to main — no PRs. One contract, three
bindings (GitHub now, vendor-baked, central service). Async review, PRs, and
`accept` / `reject` verbs are deferred to a future asynchronous binding.
