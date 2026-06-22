---
name: agent-retrospective
description: >-
  Structured skill for collecting and synthesizing post-task retrospective
  feedback, including cleaned OpenCode session exports, as proposal-only process
  reflection or as durable records using the shared retrospective template in
  docs/retrospectives/.
---

# agent retrospective

Use this skill after an orchestrated task when the goal is to preserve what
agents actually encountered, what sped them up, and what changes would make the
next run safer or faster. In the default durable workflow, the output is not a
task summary. It is a reusable operational record that can feed later skill
updates, workflow changes, repo cleanup, and application improvements. When the
user asks only for process reflection or refinement proposals, use the
proposal-only mode below.

## Authoritative locations

1. Template: `docs/retrospectives/TEMPLATE.md`
2. Output directory: `docs/retrospectives/`
3. Skill file: `.opencode/skills/agent-retrospective/SKILL.md`

## When to use

Use this skill when:

1. A task used multiple agent sessions and you want reusable guidance rather
   than just a completion summary.
2. A task involved rework loops, tool friction, path mistakes, proof gaps, or
   other process signal worth preserving.
3. You want feedback grouped by agent type so downstream routing can target the
   right future agent.
4. You want proposal-only process reflection or refinement proposals without
   creating a durable retrospective file.
5. You need to use an exported OpenCode Markdown session as retrospective
   evidence.

Do not use this skill for a one-line “what changed” summary. Use it when you
want structured operational learning.

## Exported OpenCode session cleanup tool

This skill exposes a bundled cleanup tool for raw OpenCode Markdown session
exports:

```sh
python3 scripts/cleanup_session_export.py <export.md> [cleaned-output.md]
```

Run the command from this skill's directory, or use the equivalent repository
path to `scripts/cleanup_session_export.py` when your shell workdir is elsewhere.
If `cleaned-output.md` is omitted, the tool writes a sibling file named
`<export>.cleaned.md`. Add `--drop-preamble` only when the session title and
metadata are not relevant to the retrospective scope.

Use the cleaned output, not the raw export, as the session evidence for
synthesis. Keep the original export path available for traceability when citing
sources. The tool strips assistant-side thinking, tool calls, tool inputs and
outputs, malformed raw tool spans, and exported error blocks while preserving the
session preamble plus visible `## User` and `## Assistant` turns.

Do not reimplement export-cleanup heuristics ad hoc. If cleanup fails or the
cleaned output is empty or malformed, record the cleanup failure as an evidence
gap instead of drawing conclusions from raw export noise.

## Proposal-only retrospective mode

Use this lighter mode when the user asks for process reflection, lessons, or
refinement proposals but does not ask for a durable retrospective artifact.

1. Read relevant agent definitions, skill definitions, handoffs, reviews, or
   other artifacts needed to ground the reflection.
2. Synthesize observed process lessons and distinguish observation from
   inference.
3. Propose concrete refinements to skills, workflow, repo process, or agent
   guidance.
4. Do not create a retrospective file unless the user asks for one.
5. Keep observations anchored to what was observed; do not invent session
   feedback or convert speculation into action items.

The durable-file workflow below remains the default for orchestrated multi-agent
retrospectives and for requests to preserve a reusable retrospective artifact.

The remaining workflow sections apply to durable-file mode unless they
explicitly say otherwise.

## Durable-file workflow core method

1. Read `docs/retrospectives/TEMPLATE.md`.
2. In durable-file mode, create a new retrospective file under
   `docs/retrospectives/`.
   Recommended naming pattern:
   `docs/retrospectives/YYYY-MM-DD-<task>-subagent-feedback.md`
3. Gather the prior session/task IDs, grouped by agent type.
4. Poll the resumable sessions directly when possible.
5. Use one normalized polling prompt for every session in the same
   retrospective.
6. Synthesize responses in two passes:
    - first by agent type
    - then across agent types for shared actions
7. Fill the retrospective template from the synthesized output.
8. Validate the written file with a readback.
9. Stage or commit only if the user asked for that.

## Polling methodology

Do not send the full retrospective template to each prior session. The full
template contains metadata and cross-cutting sections that the polled sessions
are not best positioned to fill directly.

Instead:

1. Send each prior session the same compact extraction schema.
2. Keep the schema focused on observed issues, solutions, earlier insights,
   future tips, and possible workflow/repo/process changes.
3. Ask for one case per issue cluster.
4. Ask the session to report only what it actually observed.
5. Instruct the session to write `None` when a field does not apply.
6. Keep the polling prompt stable across sessions so the outputs are easy to
   compare and merge.

If a prior session cannot be resumed:

1. Do not invent its feedback.
2. Note the gap explicitly in the retrospective scope or open questions.
3. If needed, fall back to the written handoff or review artifact, and say that
   the feedback was reconstructed rather than directly polled.

## Verbatim polling prompt

Use this prompt body exactly, replacing only `<task-reference>`:

```md
Retrospective poll for <task-reference>. Focus only on the work you performed in this exact session.

Respond in concise markdown using exactly this structure:

## Cases
### Case 1 — <short label>
- Issue / problem: <1-3 sentences or None>
- How it was overcome: <1-3 sentences or None>
- Earlier insight that would have accelerated the task: <1-3 sentences or None>
- Tip for future agents: <1-3 sentences or None>
- Potential workflow / repo / process change: <1-3 sentences or None>

### Case 2 — <short label>
- Issue / problem: <1-3 sentences or None>
- How it was overcome: <1-3 sentences or None>
- Earlier insight that would have accelerated the task: <1-3 sentences or None>
- Tip for future agents: <1-3 sentences or None>
- Potential workflow / repo / process change: <1-3 sentences or None>

## Aggregated Guidance
- Repeated issues / patterns:
- Reusable heuristics / skills:
- Knowledge-base / skill updates to consider:
- Workflow / process changes to consider:
- Application / repo / environment changes to consider:

Rules:
- Only report things you actually observed in this session.
- Keep issue/problem and overcome fields short.
- If you only had one real case, set Case 2 to None.
- Do not re-summarize the milestone deliverable except where needed for the feedback.
```

## Synthesis method

After polling, synthesize in this order:

1. Create one scratch bucket per agent type.
2. Keep the raw responses intact until the final draft is complete.
3. Extract concrete cases first.
4. Merge cases only when multiple sessions are clearly describing the same
   underlying issue cluster.
5. Preserve the strongest concrete phrasing when a response contains a specific
   mechanism, failure mode, or recovery step.
6. Move repeated themes into `Aggregated Guidance` instead of repeating them in
   every case.
7. Write `Cross-Cutting Actions` only when at least one concrete case or a
   repeated pattern supports them.
8. Separate these layers cleanly:
    - session-scoped observations -> `Cases`
    - repeated patterns within one agent type -> `Aggregated Guidance`
    - actions worth considering across the whole run -> `Cross-Cutting Actions`
9. If one agent type has many sessions, consolidate repeated cases rather than
   listing every session separately.
10. If a useful observation appeared in only one session, keep it if it is
    concrete and actionable.

## What to record in the durable-file final retrospective

For each agent type section in the template, fill:

1. `Scope`
    - task IDs / session IDs
    - work covered
    - number of sessions polled
    - relevant files or artifacts
2. `Cases`
    - short labels
    - concise issue narratives
    - concise recovery narratives
    - earlier insights
    - future-agent tips
    - possible workflow/repo/process changes
3. `Aggregated Guidance`
    - repeated issues
    - reusable heuristics
    - possible skill or knowledge-base updates
    - possible workflow/process changes
    - possible application/repo/environment changes

Then fill `Cross-Cutting Actions` from the common themes that survived across
agent types.

## Practical rules

1. Keep `Issue / problem` and `How it was overcome` to 1-3 sentences each.
2. Prefer repo paths, task IDs, and artifact names over vague references.
3. Use one case per issue cluster.
4. Write `None` when a field does not apply.
5. Do not overwrite `docs/retrospectives/TEMPLATE.md` with task-specific
   content.
6. Do not silently smooth away disagreement between sessions. If two sessions
   experienced the same area differently, preserve the distinction.
7. Do not promote speculation into action items. Anchor actions to observed
   cases.

## Durable-file workflow recommended execution pattern

1. Read the template.
2. In durable-file mode, create the new retrospective file.
3. Poll all resumable sessions of the same agent type using the verbatim prompt.
4. Repeat for the next agent type.
5. Synthesize by agent type.
6. Synthesize cross-cutting actions.
7. Read the final file back for completeness.
8. Stage or commit only if requested.

## Durable-file workflow expected output

In durable-file mode, the final artifact should be a completed file under
`docs/retrospectives/` that:

1. Is grouped by agent type.
2. Preserves concrete operational feedback.
3. Separates observed cases from synthesized guidance.
4. Is ready to feed later knowledge-base, workflow, repo, or application work.
