# konspekt — setup

[konspekt](https://github.com/denisurusov/konspekt) is an open standard for a
portable, human-readable record of a project's evolving state across
generative-AI conversations and platforms. The standard is two specs:

- `spec/data-model/` — *what state is*: entities, the single edge table, derived
  views. The part a stranger implements against.
- `spec/architecture/` — *how state moves and stays true*: reconciliation,
  serialization, transport, review.

If that fits how you want to carry project state, this kit prepares your repo to
use it.

## What it sets up

A `.konspekt/` umbrella at the root of your project repo:

    .konspekt/
    ├─ instance/            # the portable konspekt instance (ports across platforms)
    │  ├─ project.md        # root: goal + summary
    │  ├─ nodes/ concepts/ noteworthy/ artifacts/ waypoints/
    │  ├─ edges/edges.md    # the single edge table (starts empty)
    │  └─ sources/          # content-addressed provenance excerpts
    ├─ OPERATING.md         # this project's operating policy (the loop, triggers)
    └─ NOTES.md             # human scratchpad (the `note:` convention)

…plus a **konspekt stanza** added to your `AGENTS.md` (created if absent), so any
agent working in the repo reads the instance first and respects propose-accept.

The split is deliberate: `instance/` is the portable unit — it is what moves
between platforms; `OPERATING.md` / `NOTES.md` are local envelope, not part of
the contract a second tool conforms to.

## Run it

From the root of the repo you want to adopt konspekt (needs Node 18+). Copy this
`setup/` folder into your repo, or clone konspekt and run it from there:

    node setup/init.mjs --name "My Project" --goal "what this project is for"

Review what it wrote, then commit:

    git add .konspekt AGENTS.md && git commit -m "adopt konspekt project state"

Or let the script do it — add `--push`. It is idempotent: it refuses to clobber
an existing `.konspekt/instance/`, and it skips the `AGENTS.md` stanza if already
present.

## Then what

1. Edit `.konspekt/instance/project.md` — set the goal and a one-line summary.
2. Point your AI assistant at the repo. At the start of a session it reads
   `.konspekt/instance/`; as durable atoms crystallize it **proposes** them
   (`review: proposed`); your commands accept and `persist` them.
3. The verbs (`pin`, `validate`, `resolve`, …) and the data model are in the
   konspekt spec. `.konspekt/OPERATING.md` is the policy you just adopted —
   edit it to taste; it is yours, not the standard's.

konspekt is open and impact-primary: adoption, even by copying, is the win.
