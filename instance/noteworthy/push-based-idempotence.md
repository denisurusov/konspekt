```yaml
id: nw-push-based-idempotence
kind: statement
review: accepted
provenance:
  conversationId: provenance-as-chat-text
  timestamp: 2026-06-22T18:00:00Z
createdAt: 2026-06-22T18:00:00Z
updatedAt: 2026-06-22T18:00:00Z
```
# Noteworthy: Push-based ingestion makes match-level dedup primary

Bringing source excerpts into the store at extraction time (push-based) inverts
the idempotence design: identity is the content-addressed source blob, so a
re-run reproduces the same blob and dedups for free. Match-level dedup becomes
primary; the skip-level watermark demotes to a timestamp-ordered *optimization*,
no longer required for correctness. This works because the source excerpt is
near-deterministic even though atom extraction is not — the stable key sits
underneath the unstable layer. Worst case, UI manual curation fixes atoms; it
never has to re-establish identity.
