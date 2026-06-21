# Edges

Typed, directional relationships between nodes. The goal tree and the
associative graph are one set, distinguished by `kind`. (Provisional
serialization: a single index; per-edge files are an alternative if this
grows large.)

| from | kind | to |
|---|---|---|
| goal-portability | parent-of | investigation-repo-structure |
| goal-follow-thread | relates-to | goal-portability |
| investigation-repo-structure | refines | goal-portability |
| task-reconcile-schema | relates-to | investigation-repo-structure |
| task-second-implementer | relates-to | goal-portability |
