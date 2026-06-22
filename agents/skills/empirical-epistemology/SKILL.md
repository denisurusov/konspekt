---
name: empirical-epistemology
description: >-
  Portable observation-first epistemology skill. Defines what counts as
  evidence for a claim, distinguishes observation from inference from
  assumption, requires explicit uncertainty labels, and prevents treating
  model memory as reliable ground. Uses ICL-style contrastive examples.
---

# empirical epistemology

Use this skill when you need to ground claims in observed evidence rather than
model memory, configuration intent, or plausible but unverified background
knowledge. This method is portable and repository-agnostic; it does not depend
on any specific runtime, framework, or toolchain.

## Core doctrine

1. **Direct observation is the reliable ground.** Observed files, command
   outputs, system behavior, cited external sources, and user-provided context
   are evidence. Configuration, documentation, and prompts declare intent;
   observed behavior confirms or denies that intent.

2. **Model memory is hypothesis, not evidence.** Background knowledge from
   training may suggest hypotheses, analogies, or search directions. It does
   not establish facts about the current environment, the current codebase, the
   current user's intent, or current external state.

3. **Absence of evidence is not evidence of absence — until the search boundary
   is stated.** If you did not look somewhere, you cannot claim nothing is
   there. If you looked exhaustively within a stated boundary and found
   nothing, you may report the negative finding with the boundary explicit.

4. **Trace causes, do not stop at symptoms.** A surface observation often has
   an underlying condition that made it possible. Follow the evidence chain as
   far as the query requires rather than stopping at the first plausible
   proximate cause.

5. **Label what you do not know.** When evidence is missing, ambiguous, or
   contradictory, state that explicitly rather than filling the gap with
   inference presented as fact.

## Claim classification

Every material claim in your response must fall into one of these categories,
labeled explicitly:

| Category    | Definition                                                       | Required support                                      |
|-------------|------------------------------------------------------------------|-------------------------------------------------------|
| Observation | Something directly seen in files, command output, or user input. | Cite the specific file path, line range, or output.   |
| Inference   | A conclusion drawn from observations using stated reasoning.     | State the observations and the reasoning step.        |
| Assumption  | Something taken as true without direct evidence.                 | Label it as assumption; explain why it is reasonable. |
| Uncertainty | A known gap where evidence is missing or contradictory.          | State what is unknown and what would resolve it.      |
| Hypothesis  | A speculative explanation from model memory or analogy.          | Label it as hypothesis; distinguish from observation. |

Do not present inferences, assumptions, or hypotheses as observations.

## Contrastive examples

### Example 1: Version claims

**Bad:**

> The project uses Python 3.12 because `pyproject.toml` specifies
> `requires-python = ">=3.12"`.

This treats configuration intent as an observed runtime fact. The installed
version may differ.

**Good:**

> `pyproject.toml` declares `requires-python = ">=3.12"` (line 5). The
> installed Python version was not directly observed in this session; it is
> assumed to satisfy the declared constraint.

### Example 2: Path existence

**Bad:**

> The config file at `src/config.yaml` defines the database connection.

This asserts the file exists and contains specific content based on a reference
or memory, not on reading the file.

**Good:**

> The application reads configuration from `src/config.yaml` according to
> `src/app.py` lines 14-18. The file was not read in this session, so its
> current contents are unverified.

### Example 3: External facts from memory

**Bad:**

> Redis does not support multi-key transactions across slots in cluster mode.

This is background knowledge from training data, stated as a current fact
without a cited source.

**Good:**

> Based on Redis documentation (not fetched in this session), Redis Cluster
> does not support multi-key operations across hash slots. This is a model
> memory hypothesis; the current Redis documentation should be consulted for
> authoritative confirmation.

### Example 4: Stopping at a proximate cause

**Bad:**

> The test fails because `get_user()` returns `None`. The fix is to add a
> null check.

This stops at the symptom without asking why `get_user()` returned `None`.

**Good:**

> The test fails because `get_user()` returns `None` at `tests/test_user.py`
> line 42. The proximate cause is the null return, but the underlying cause
> has not been traced: `get_user()` queries the database with an ID that may
> not exist in the test fixture. Observing the test fixture setup at
> `tests/conftest.py` lines 20-25 and the query at `src/db.py` line 87 would
> confirm whether the ID is populated before the query runs.

## Response structure

When applying this skill, structure your response to make claim classification
visible:

1. **Observations:** List what was directly observed, with file paths, line
   numbers, or command output.
2. **Claims:** State conclusions, each tagged as inference, assumption, or
   hypothesis.
3. **Uncertainty:** List known gaps and what would resolve them.
4. **Answer:** Present the supported answer, noting which parts rest on
   observations versus assumptions or hypotheses.

## Boundaries

- Do not treat configuration intent as runtime fact.
- Do not assert current external facts from model memory without labeling them
  as unverified.
- Do not treat the absence of observed evidence as proof of absence without
  stating the search boundary.
- Do not stop at the first plausible proximate cause when the query requires
  root-cause understanding.
- Do not omit uncertainty labels when evidence is missing or ambiguous.
