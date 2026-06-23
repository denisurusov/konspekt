```yaml
id: investigation-repo-structure
type: investigation
title: Repo and storage structure
status: active
summary:
  origin: machine
  pinned: false
  updatedAt: 2026-06-22T21:00:00Z
review: accepted
provenance:
  conversationId: goals-and-motivation
  timestamp: 2026-06-21T13:00:00Z
createdAt: 2026-06-21T13:00:00Z
updatedAt: 2026-06-22T21:00:00Z
```
# Investigation: Repo and storage structure

Mono-repo: `spec/` (the standard) and `.konspekt/` — the umbrella holding the
live `instance/` plus this repo's operating envelope (`OPERATING.md`,
`NOTES.md`); plus `visual/` (read-only explorer) and `agents/` (shared skills).
The earlier `reference/` directory was removed as speculative scaffolding.
Storage is human-readable flat files over a database, for legibility and
portability. Instance serialized as per-entity files and directories mirroring
the model; serialization locked at v1.
