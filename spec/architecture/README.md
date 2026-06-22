# spec / architecture

How state *moves and stays true* — the machinery around the data model.

- `RECONCILIATION.md` — merging a fresh extraction into an existing instance: resolution ladder, derived alias index, idempotence, status transitions, supersession.
- `SERIALIZATION.md` — the v1 human-readable on-disk form.
- transport contract — *to come*: the interface a durable store must satisfy. The checkpoint verb family is settled — `sync` (reconcile incoming atoms into the working copy), `persist` (flush the working copy to the durable store), `sync_persist` (both, atomically). Read is excluded from the family as a trivial, side-effect-free precondition.

**Out of scope by design: triggers.** *When* a pass fires (per-turn, end-of-session, manual) is host policy, not standard — it lives in `reference/`. The spec owns only the invariant that makes firing safe (idempotence), never the firing itself. The trigger is just a binding from an event to one of the verbs above, and that binding moves with the ingestion mode — which is exactly why it can't be spec.
