```yaml
id: investigation-repo-structure
type: investigation
review: accepted
provenance:
  source: conversation:goals-and-motivation
  capturedAt: 2026-06-21
```
# Investigation: Repo and storage structure

Mono-repo with `spec/`, `reference/`, `instance/`. Storage leans toward
human-readable flat files over a database, for legibility and portability.
Instance serialized as per-entity files and directories mirroring the model.
