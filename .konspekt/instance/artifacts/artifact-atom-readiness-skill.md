```yaml
id: artifact-atom-readiness-skill
name: konspekt-atom-readiness skill
kind: doc
location: .claude/skills/konspekt-atom-readiness/SKILL.md
review: accepted
provenance:
  conversationId: setup-and-operating-loop
  timestamp: 2026-06-23T18:00:00Z
createdAt: 2026-06-23T18:00:00Z
updatedAt: 2026-06-23T18:00:00Z
```
# Artifact: konspekt-atom-readiness skill

Mandatory maintainer skill forcing the propose half of the operating loop:
detect when a durable atom has crystallized, venture a specific sync proposal
(named entities + wiring), and hold propose-accept (always `review: proposed`;
the human accepts and persists). Operationalizes the atom-ready trigger; cites
the spec and `OPERATING.md` as authority rather than redefining them.
