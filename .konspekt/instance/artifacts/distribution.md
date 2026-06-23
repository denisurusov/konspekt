```yaml
id: artifact-distribution
name: Distribution build
kind: code
location: distribution/build/distribute.mjs
review: accepted
provenance:
  conversationId: setup-and-operating-loop
  timestamp: 2026-06-23T19:00:00Z
createdAt: 2026-06-23T19:00:00Z
updatedAt: 2026-06-23T19:00:00Z
```
# Artifact: Distribution build

`distribution/build/distribute.mjs`: a zero-dependency Node build that derives
the outward-facing subset (`spec/`, `setup/`, konspekt skills) into
`distribution/<version>/`, stamped with the source commit. `latest/` tracks main
(gitignored); `--version v1` freezes a committed release projection. The dogfood
instance and `visual/` are excluded by design.
