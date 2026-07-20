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
updatedAt: 2026-07-20T18:30:00Z
```
# Artifact: Adopter setup kit

`setup/`: a zero-dependency Node kit that prepares a repo to carry konspekt
project state. Two modes.

**Scaffold** — `init.mjs` drops a `.konspekt/` umbrella (minimal instance plus
operating envelope) into a project repo and appends a konspekt stanza to
`AGENTS.md`. Create-or-refuse: it will not clobber an existing instance, and it
skips the stanza if already present. A freshly scaffolded instance validates
clean, so the kit produces conformant output by construction rather than by
convention.

**Components** — `--add <id>` installs an optional add-on into an instance that
already exists. This mode exists precisely because scaffolding is
create-or-refuse and so can never retrofit anything onto a live instance
(`concept-instance-upgradeability`). `--list` enumerates them, `--force`
regenerates, `--check` reports drift between an installed file and its template.
See `artifact-components` for the component system itself.

Component sources resolve relative to the script and install targets relative to
the working directory, so the kit installs into a *second* repo by running this
repo's copy from that repo's root.

`--push` optionally commits and pushes via git.
