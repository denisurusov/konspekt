```yaml
id: nw-notify-config-precedes-consumer
kind: decision
review: proposed
provenance:
  sourceRef: 5234c7ba18c1c14c71aaf05c56d9475adfb96da0
  contentHash: 5234c7ba18c1c14c71aaf05c56d9475adfb96da0
  timestamp: 2026-07-19T21:10:00Z
  confidence: 0.55
createdAt: 2026-07-19T21:10:00Z
updatedAt: 2026-07-19T21:10:00Z
```
# Noteworthy: the notification config was written before any consumer of it

`.konspekt/notify.yml` was created with no watcher implementing it. The claim is
that this is the right order: the file is the contract a watcher will be written
against, and the reasoning behind its three constraints — subscriptions are
config not graph, events are creation and supersedes, payloads are
reference-only — is captured in its comments while it is freshest, rather than
left for a future author to reconstruct from the graph.

**Why the confidence is low.** The opposite case is real and this instance has
already recorded it. A specification nothing executes drifts from whatever
eventually executes it, which is the dual-authority failure `nw-derive-not-copy`
warns about, and the same shape as the finding that `REVIEW.md` specified a
review queue that had never run. An unread config file is exactly that pattern:
carefully reasoned, unexercised, and therefore unfalsified. Writing it may have
bought clarity now at the cost of a document that looks authoritative while
never having been tested against a consumer.

The counter-argument is that a config file is cheap to change and carries no
behaviour, so the drift risk is bounded — unlike a spec that implementers
conform to. Whether that distinction holds is the part this atom is least sure
of.

Proposed, not accepted: the ordering claim is a judgment about process that has
not been validated by an actual watcher being written.
