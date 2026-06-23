# distribution

Outward-facing release projections of konspekt, **derived** from the repo root.

Root is the single source of truth. Nothing here is hand-maintained: a tracking
copy of `spec/` would be the same dual-authority drift that `reference/` was, so
this directory is *generated*, not copied. `build/distribute.mjs` bakes the
publishable subset — the standard (`spec/`), the adopter kit (`setup/`), and the
konspekt maintainer skills — into a projection stamped with the source commit.

## Build

```
node distribution/build/distribute.mjs               # -> distribution/latest/ (tracks main, gitignored)
node distribution/build/distribute.mjs --version v1   # -> distribution/v1/ (a frozen release, committed when cut)
```

`latest/` is a convenience projection of current `main`; it is gitignored and
rebuilt on demand. A **version** (`v1`, …) is a frozen projection cut at a
tagged commit and committed, so adopter pointers can resolve to a pinned spec
that does not move under them.

## Excluded by design

The dogfood `.konspekt/` instance and the `visual/` explorer are internal and do
not ship — only what an adopter conforms to (`spec/`) or runs (`setup/`, skills).

## Status

Machinery only. No version is cut yet — the spec is still settling. When it
stabilizes, cut `v1` and point the `setup/` templates at `distribution/v1/`.
