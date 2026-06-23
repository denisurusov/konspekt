## konspekt project state

This repo carries konspekt-format project state under `.konspekt/`. The data
model and transport are defined by the konspekt standard
(github.com/denisurusov/konspekt — `spec/data-model`, `spec/architecture`).

- Read `.konspekt/instance/` before design or writing work; do not run from
  stale context.
- The maintainer only ever **proposes** (`review: proposed`); a human command
  carries acceptance (`review: accepted`). `persist` writes to this repo.
- Operating policy (the loop, triggers) is `.konspekt/OPERATING.md`.
- `note:` / `note "…"` appends to `.konspekt/NOTES.md` (human scratchpad); it is
  not a konspekt capture verb.
