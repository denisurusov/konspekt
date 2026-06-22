---
name: ontology-perspective-discipline
description: >-
  General ontology and perspective discipline for creating, reviewing, and
  rewriting artifact surfaces such as agent definitions, actor definitions,
  specifications, designs, ADRs, READMEs, tickets, and documentation.
---

# ontology perspective discipline

Use this skill when an artifact needs semantic coherence, authority discipline,
or a stable writing perspective. The artifact may be an agent definition, actor
definition, software specification, design, README, ADR, ticket, plan, prompt,
or other documentation surface.

This method is not domain authority. It guards the relationship between a target
surface, the target ontology that belongs inside that surface, the perspective
from which the surface speaks, and the authoritative surfaces that own external
concepts.

## Purpose

Maintain artifacts whose concepts, claims, instructions, and perspective all
belong to the surface being written.

A coherent target surface:

- uses a controlled target ontology;
- distinguishes target-local concepts from externally owned concepts;
- speaks from one stable artifact perspective;
- avoids semantic drift, redundancy, and imported concepts whose authority lives
  elsewhere;
- says only what this artifact may define, require, explain, instruct, cite,
  preserve, reject, record, review, or hand off.

## Core concepts

**Steward** means the agent applying this method. The steward inspects,
classifies, rewrites, reviews, records, and hands off findings. The steward does
not own target-domain facts.

**Target surface** is the artifact being reviewed, authored, or rewritten. It may
be a role definition, specification, design, README, ADR, ticket, prompt, or
documentation file.

**Target ontology** is the set of concepts, objects, actions, relationships,
states, distinctions, and permissible inferences that belong inside the target
surface.

**Target-local** means belonging to the target surface's purpose, ontology, valid
claims, valid verbs, or owned outputs. A term is not target-local merely because
it appears in the artifact.

**Authority surface** is a source named by the user, the target surface, the
active workflow, repository context, law, policy, schema, runtime, or domain
process as owning a concept. Use it to anchor meanings; do not convert it into
target-surface authority.

**Perspective discipline** is the stable stance of the artifact. A surface should
not shift between operational instruction, author rationale, implementation
commentary, maintenance history, normative specification, tutorial explanation,
and review finding unless the surface's artifact type explicitly requires that
shift.

**Semantic leakage** occurs when a surface imports terms from another ontology
without mapping them into the target surface's valid concepts or naming the
authority that owns them.

**Semantic drift** occurs when duplicated or loosely restated concepts gradually
diverge from their authoritative meaning.

**Controlled lexicon** is the target-local vocabulary the surface uses
consistently. It may include externally owned terms only when ownership and the
target-local consequence are clear.

**Dynamic contextual value** is a value supplied by active configuration,
frontmatter, runtime injection, environment, current workflow, current branch, or
the current turn. Treat it as evidence about present context, not reusable
ontology, unless the target surface is explicitly bound to that context.

## Artifact perspectives

Classify the target surface before rewriting it. The same term may be valid in
one surface and leakage in another.

| Surface type              | Valid perspective                                                              | Valid verbs often include                                                | Common leakage                                                                |
|---------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Agent or actor definition | Direct instruction to the target role                                          | observe, decide, write, emit, record, preserve, review, hand off, refuse | runtime-owned route values, peer responsibilities, author rationale           |
| Software specification    | Normative description of required behavior and terms                           | define, require, prohibit, allow, constrain, quantify, name, cite        | implementation plans, examples treated as requirements, historical rationale  |
| Design                    | Explanation of selected approach, tradeoffs, invariants, and consequences      | propose, select, justify, compare, reject, defer, cite                   | pretending to be current runtime truth or an accepted spec when not accepted  |
| README                    | Orientation and entry-point guidance for users or contributors                 | introduce, summarize, link, warn, show, route                            | duplicating specs, ADRs, or indexes as if README were authority               |
| ADR                       | Decision record with status, context, decision, consequences, and supersession | decide, supersede, amend, constrain, explain                             | current config snapshots, unaccepted future design, tutorial sprawl           |
| Ticket or plan            | Scoped work intent, acceptance, sequencing, and evidence obligations           | request, require, accept, reject, track, sequence, verify                | broad product authority, unrelated design doctrine, stale status fiction      |
| Review finding            | Evidence-backed defect or risk report                                          | find, cite, explain, recommend, block, approve                           | rewriting implementation, inventing requirements, burying findings in summary |

If the surface type is unclear, infer it from filename, surrounding directory,
frontmatter, headings, user request, and repository conventions. If evidence
conflicts, report the ambiguity instead of forcing a perspective.

## Lexicon construction

Build a target ontology through a controlled lexicon. Treat the lexicon as the
practical signature of the target surface's operating vocabulary: approved terms,
their meanings, their owners, and the valid verbs that may operate on them.

Extract candidate terms from the target surface and from available authority
surfaces named by the user, target surface, active workflow, or repository
context.

Include:

- named roles, users, systems, tools, APIs, laws, policies, and external entities;
- artifacts, files, messages, schemas, records, reports, outputs, and evidence;
- states, statuses, lifecycle names, verdicts, modes, and exceptional conditions;
- verbs and action phrases such as define, require, write, emit, route, approve,
  preserve, escalate, commit, review, abort, decide, infer, prove, and record;
- limits, policies, gates, invariants, obligations, guarantees, and proof terms;
- repeated adjectives or modifiers that carry domain meaning, such as terminal,
  material, authoritative, blocked, fresh, canonical, normative, accepted,
  configured, default, and current.

Classify each candidate term before deciding whether it belongs in the target
surface. Use the first class that fits.

| Class                    | Test                                                                                                      | Keep?              | Valid treatment                                                                                                    |
|--------------------------|-----------------------------------------------------------------------------------------------------------|--------------------|--------------------------------------------------------------------------------------------------------------------|
| Target-owned             | The target surface may define, require, instruct, decide, preserve, or revise it directly.                | Yes                | Define locally and pair with valid target-surface verbs.                                                           |
| Target-input             | The target surface receives, reads, cites, or depends on it but does not own it.                          | Yes                | Describe how the surface uses it; do not redefine it.                                                              |
| Target-output            | The target surface writes, emits, records, reports, promises, or hands it off.                            | Yes                | Specify contents, destination, completion criteria, and authority boundaries.                                      |
| Adjacent-surface-owned   | A peer role, neighboring document, implementation seam, schema, test, or workflow owns it.                | Sometimes          | State what this surface exposes or consumes; do not import the adjacent surface's job.                             |
| Externally owned         | A runtime, config, spec, policy, law, standard, user process, or other authority defines it.              | Sometimes          | Name the authority when needed and state only the target-local consequence.                                        |
| Dynamic contextual value | Active config, runtime, frontmatter, environment, branch state, current run, or current turn supplies it. | Rarely             | Use as context or route to the owning surface; do not freeze it into durable prose unless explicitly config-bound. |
| Observed-only            | The surface can mention it as observed context but cannot affect, define, or rely on it normatively.      | Rarely             | Use only for decision context; avoid imperative or normative verbs.                                                |
| Undefined                | No available authority or target surface gives it stable meaning.                                         | No, until resolved | Define it, map it to an existing term, or remove it.                                                               |
| Redundant                | It duplicates a defined term without adding a necessary distinction.                                      | Usually no         | Merge into the canonical term.                                                                                     |
| Out of scope             | The target surface cannot observe, affect, define, own, or validly reason over it.                        | No                 | Remove it or move it to the correct surface.                                                                       |
| Authoring residue        | It explains why the surface changed, what the author believed, or how maintainers should think.           | No                 | Move to design notes, comments, tickets, or review findings if still useful.                                       |

A minimal lexicon entry answers:

- term;
- class;
- meaning for the target surface;
- owner or authority;
- valid target-surface verbs;
- invalid verbs or misleading usages;
- required replacement when the term is out of scope.

Prefer a small, explicit lexicon over broad prose. A term may appear in the final
target surface only when its class and valid usage are clear.

## Verb test

Use the verb test to catch leakage. For each material term, list the verbs the
target surface may validly apply to it. If the surface uses a verb outside that
set, replace the verb with a target-local action or remove the instruction.

Examples:

- An agent definition may tell the target role to `record an unresolved issue`;
  it should not tell the role to change a runtime route graph it cannot edit.
- A specification may `require a validation result to be persisted`; it should
  not `prefer the current implementation helper` unless implementation shape is
  part of the spec.
- A design may `select an approach` and `explain rejected alternatives`; it
  should not assert that an unimplemented approach is current behavior.
- A README may `link to the authority` and `summarize setup`; it should not copy
  the authority in enough detail to become a competing source of truth.
- An ADR may `decide` and `supersede`; it should not silently absorb active
  configuration values as permanent doctrine.

## Dynamic contextual values

Dynamic contextual values include route names, recipient names, role rosters,
model/provider choices, tool permissions, emission counts, instance scopes, loop
limits, depth limits, traversal/rejection caps, feature flags, local paths,
branch names, run IDs, and values supplied by active config, frontmatter,
runtime injection, environment variables, or the current turn.

Treat these values as evidence about ownership and available action, not as
durable ontology. A static surface should not freeze observed current/default
values into operational prose unless the artifact is explicitly context-bound and
the user requested that binding.

Prefer wording such as:

- `use the current runtime-exposed legal route` instead of `send route_type="plan"`;
- `send to the configured review recipient` instead of naming today's recipient;
- `follow the authority named by AUTHORITY.md` instead of copying the current
  companion document's wording;
- `inspect the active config for current values` instead of writing those values
  into a general guide.

## Control-surface fit for runtime designs

When reviewing, designing, or documenting runtime behavior, classify each
material mechanism by the surface that can own the relevant semantics before
assigning target-surface verbs:

- runtime control-plane: runtime code or configuration that can observe state,
  decide gates, mutate execution, or enforce policy;
- agent-authored observability: messages, artifacts, or reports an agent can
  emit for readers or downstream actors without controlling runtime policy;
- substrate/backend capability: backend-native affordances or limits the runtime
  may consume but should normalize before making backend-agnostic claims;
- persistence/audit evidence: durable records that preserve or report what
  happened; if persisted state participates in runtime decisions, classify and
  name that control-state contract explicitly rather than treating audit evidence
  itself as policy;
- validation/proof surface: tests, theorem maps, checks, or acceptance evidence
  that prove a behavior or invariant;
- documentation/authority surface: specifications, ADRs, tickets, or docs that
  define terms, decisions, and update obligations.

Review questions:

- Which surface can observe, decide, mutate, preserve, or prove this mechanism?
- Is the target surface placing semantics on the smallest owner that can carry
  them?
- Would a narrower channel, gate, token, schema, or protocol surface suffice?
- Is backend-native detail being promoted into backend-agnostic semantics without
  an explicit normalization boundary?
- Is audit evidence being mistaken for runtime policy?
- Are documentation or authority-surface updates required, or should the target
  surface only cite the existing owner?

## Working method

When reviewing, rewriting, or authoring a target surface:

1. Identify the target surface type and its valid perspective.
2. Identify the user request, task boundary, and whether the artifact is general,
   context-bound, draft, accepted, normative, tutorial, operational, or review.
3. Extract operational and conceptual terms.
4. Build or update the controlled lexicon using the classifier above.
5. For externally owned terms, identify the authority surface or remove the term.
6. For undefined terms, define them locally only if the target surface may own
   them; otherwise map them to an existing term or report the gap.
7. For out-of-scope terms, omit them unless they can be mapped into a valid
   target-local claim or action.
8. Check every material instruction, claim, and requirement with the verb test.
9. Rewrite the surface so it says only what the target artifact may define,
   require, explain, instruct, cite, preserve, reject, record, review, or hand
   off.
10. Remove author-facing rationale, maintenance explanations, historical
    justifications, and implementation-world commentary unless the target surface
    needs that material to perform its function.
11. Prefer narrow, target-local wording over broad system language.

## Imported concept discipline

Do not duplicate authoritative definitions when a concept is owned elsewhere.

For every externally owned concept that remains in the target surface:

- name the owning authority when it is known;
- if ownership is unknown, mark it unresolved or remove the concept;
- summarize only the target-local consequence;
- avoid restating the full external contract;
- do not invent compatibility rules, loop limits, state machines, route policies,
  control semantics, lifecycle semantics, legal interpretations, schema rules, or
  proof obligations.

If authority is missing, ambiguous, or conflicting, report that directly instead
of manufacturing a synthesis.

## Perspective rules

Write from the surface's valid perspective, not from the author's private
rationale.

Use perspective-compatible wording:

- Agent definition: `You receive...`, `You write...`, `Record...`, `Do not...`
- Specification: `The system MUST...`, `A valid request includes...`, `The
  implementation rejects...`
- Design: `This design chooses...`, `The tradeoff is...`, `Rejected alternative:`
- README: `Use this path to...`, `For the normative contract, see...`
- ADR: `Status: Accepted`, `Decision:`, `Consequences:`
- Review: `Finding:`, `Evidence:`, `Risk:`, `Suggested change:`

Avoid perspective shifts that smuggle author rationale into the artifact:

- `This was added because...`
- `The workflow actually...`
- `Unlike the old coordinator...`
- `The author intended...`
- `This section exists to fix...`
- `The implementation happens to...` when the surface is not implementation docs.

Author rationale belongs in design notes, comments, tickets, review findings, or
handoff notes. It does not belong in the target surface unless the surface's
purpose requires it.

## Review questions

For every material concept in a target surface, ask:

- What type of artifact is this, and what perspective may it use?
- Is this term target-local, externally owned, dynamic context, or authoring
  residue?
- Which authority owns the concept if the target surface does not?
- Does the target surface need this concept to perform its function?
- Can the target surface define, require, instruct, cite, preserve, record,
  review, or hand off this concept?
- Does the verb used on this term match the surface's valid verbs?
- Would this instruction or claim remain valid under another valid config,
  runtime prompt, branch, route graph, provider, or environment?
- Is this duplicating a definition that should be referenced instead?
- Could this wording cause a reader or agent to believe this surface owns a
  concept it only receives, references, reports, or summarizes?
- Is the surface mixing normative rule, observation, example, rationale, history,
  and speculation without labels?

## Rewrite patterns

If the target surface cannot validly perform an action, do not tell it to perform
that action.

General patterns:

- replace copied external contracts with a reference plus the target-local
  consequence;
- replace a dynamic current value with a reference to the owning config, runtime,
  environment, or authority surface;
- replace a forbidden handoff with recording the unresolved issue;
- replace an unavailable user interaction with recording the required upstream
  decision;
- replace peer-owned responsibility with the target surface's responsibility to
  expose enough information for the peer-owned step;
- replace implementation details with the observable obligation the surface must
  preserve;
- replace author rationale with design notes or review findings;
- replace broad synonyms with one canonical controlled-lexicon term.

Use external terms only when they are necessary and authority-backed. If a term
is necessary but externally owned, explain the target-local consequence rather
than importing the whole external ontology.

## Output modes

When asked to review, produce findings first:

- severity;
- location;
- problematic term, claim, or instruction;
- why it violates target ontology, authority ownership, or perspective
  discipline;
- suggested rewrite, relocation, or deletion.

When asked to rewrite, produce the smallest correct edit:

- preserve valid operational content;
- remove or remap leaked concepts;
- avoid expanding the target ontology unnecessarily;
- do not add new abstractions unless they clarify repeated target-local concepts.

When asked to author, produce only the sections that fit the target surface:

- artifact identity and purpose;
- target ontology;
- inputs and authority surfaces;
- outputs or promises;
- valid verbs and invalid verbs;
- perspective rules;
- authority references;
- dynamic-context policy;
- anti-patterns.

## Boundaries

Do not evaluate whether the domain workflow, runtime, implementation, policy, or
law is correct unless explicitly asked.

Do not invent missing authority.

Do not broaden the target surface to make a problematic concept valid.

Do not preserve prose merely because it sounds useful. Every material claim must
belong to the target ontology or map cleanly to an owned action, claim, or
reference.

Do not treat repeated wording as evidence of authority. Repetition may be drift.

## Success standard

A successful target surface lets its reader or target actor act without
inheriting concepts from the author, runtime, another role, obsolete design
layer, stale configuration, or unrelated authority.

The surface is narrow, internally consistent, perspective-stable, operational for
its purpose, and traceable to the authorities that own any external concepts it
references.
