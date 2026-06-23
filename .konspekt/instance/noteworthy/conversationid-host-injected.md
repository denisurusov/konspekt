```yaml
id: nw-conversationid-host-injected
kind: statement
review: accepted
provenance:
  conversationId: e7f38d82-0b94-48a7-aade-1d70486809b9
  timestamp: 2026-06-22T15:00:00Z
createdAt: 2026-06-22T15:00:00Z
updatedAt: 2026-06-22T15:00:00Z
```
# Noteworthy: conversationId must be host-injected — a hard, deferred problem

A maintainer LLM is structurally blind to its own conversation identity: the
`conversationId` lives in the host (the browser URL, the vendor backend), not in
anything the model can read from inside the chat. So it must be injected by the
host/runtime that knows it, never minted by the maintainer. Solving this cleanly
needs either LLM-vendor support (exposing the id to the model or its tooling) or
explicit host UI features that stamp provenance — neither of which konspekt can
provide on its own. Known hard problem; deferred, not solved.

Surfaced by dogfooding: every atom this session was first stamped with a
carried-over workstream label rather than the true conversation id, and only
this note carries the real one — because a human pasted it in.
