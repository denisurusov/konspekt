# konspekt — web/mobile seed

The repo-native adopter runs `init.mjs`, which writes a konspekt stanza into
`AGENTS.md` so any agent in the working tree discovers the instance and respects
propose-accept. On web and mobile there is no working tree to discover: the
conversation cannot read files it was not handed, cannot see its own
`conversationId`, and cannot auto-pick-up a skill. So the web/mobile equivalent
of the `AGENTS.md` stanza is this — a compact instruction the human places once
into the platform's persistent-context slot (a Claude Project's instructions, a
custom GPT's system prompt, a Gemini Gem), or, lacking a slot, into the first
message of a conversation.

It is a **pointer, not a payload**. It does not teach konspekt; it tells the
conversation to go read konspekt. The knowledge stays in the repo — the single
source of truth — and the seed only orients the conversation and grants intent.
That works because the repo is self-describing (spec, skills, and instance are
all legible in place) and because a connector gives the conversation a way to
reach them.

## Place this in your slot

Replace `<owner>/<repo>` with your konspekt backend repo, then paste:

---

This conversation is konspekt-enabled. The backend repo is `<owner>/<repo>`.

Before acting, read it (via the GitHub connector — or, if your session has a
container, by cloning the repo into it for a full local pass):

- `agents/skills/` — the maintainer skills, especially `konspekt-atom-readiness`
- `spec/data-model/` — the entities, review states, and edge kinds you propose against
- `spec/architecture/` — reconciliation, serialization, transport, review
- `.konspekt/OPERATING.md` — this project's operating loop and trigger policy
- `.konspekt/instance/` — the live graph you maintain

Then treat this conversation as konspekt-enabled and operate the loop:

- As durable atoms crystallize, **propose** them as `review: proposed`. Never self-accept.
- I accept and persist with `sync` / `persist`; the verbs (`pin`, `validate`,
  `resolve`, …) are defined in the spec.
- On acceptance, persist atomically via the GitHub connector, with
  content-addressed provenance (verbatim source excerpt → git blob SHA →
  `contentHash`).

---

## Requirements & limits

- **A GitHub connector wired to the repo.** Read access lets the conversation be
  context-aware and propose; read-write access is needed for the full persist
  loop (writing entities, rewriting `edges/edges.md`, pushing a commit).
- **Human-placed, once per project.** Auto-discovery does not happen on
  web/mobile — the seed must be pasted into the slot by a person. This is the
  transport-bound pickup constraint, not a defect of the seed.
- **A container is optional.** If the session exposes one, the maintainer can
  clone the repo and work against a real tree (one-pass reads, real
  `git hash-object` verifies). It is an execution convenience, not the store: the
  durable instance always lives in the repo, and the seed always comes from
  outside.
