## konspekt project state

This repo carries konspekt-format project state under `.konspekt/`. The data
model and transport are defined by the konspekt standard
(github.com/denisurusov/konspekt — `spec/data-model`, `spec/architecture`).

- Read `.konspekt/instance/` before design or writing work; do not run from
  stale context.
- The maintainer never **originates** an acceptance. What it proposes on its own
  judgment is written `review: proposed` with a `provenance.confidence` score;
  it writes `review: accepted` only when transcribing an acceptance the human
  already gave.
- **Review does not block persist.** Proposals are persisted as `proposed` and
  reviewed in batch later — do not withhold them pending a blessing, and do not
  ask for acceptance in order to write them.
- Operating policy (the loop, triggers) is `.konspekt/OPERATING.md`.
- `note:` / `note "…"` appends to `.konspekt/NOTES.md` (human scratchpad); it is
  not a konspekt capture verb.
