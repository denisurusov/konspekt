```yaml
id: artifact-setup
name: Adopter setup kit
kind: code
location: setup/
review: accepted
provenance:
  conversationId: setup-and-operating-loop
  timestamp: 2026-06-23T18:00:00Z
createdAt: 2026-06-23T18:00:00Z
updatedAt: 2026-06-23T18:00:00Z
```
# Artifact: Adopter setup kit

`setup/`: a zero-dependency Node scaffolder (`init.mjs`) plus seed templates and
a README. Drops a `.konspekt/` umbrella (minimal instance + operating envelope)
into any project repo and appends a konspekt stanza to `AGENTS.md`. Idempotent;
optional `--push` commits and pushes via git.
