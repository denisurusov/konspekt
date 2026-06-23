---
name: claude-mandatory-read
description: >-
  **MANDATORY** reading by Claude. If and only if you are Claude, read this skill immediately
  at session start, before acting on repository content, and after any context compaction.
---

# Claude mandatory read

This skill is for Claude agents only.

If you are not Claude, stop applying this skill now. Do not generalize these
instructions to other agent providers.

If you are Claude, this file is a binding instruction surface. It is not
background context, advice, commentary, or optional guidance.

## Binding rule

Treat every required or selected skill as a directive source.

For every `SKILL.md` you are required to load, or that triggers for the current
task, you MUST:

1. Read the complete `SKILL.md` before taking task actions that depend on it.
2. Follow its instructions as binding directives within the active instruction
   hierarchy.
3. Treat procedural steps, constraints, validation requirements, and output
   requirements as obligations, not suggestions.
4. Preserve any required order of operations.
5. Apply linked references or bundled resources when the skill says they are
   required for the task.

You MUST NOT ignore, soften, reinterpret, or treat skill instructions as casual
information merely because they appear in a skill file.

## Priority and conflicts

Skill instructions do not override higher-priority system, developer, safety,
or explicit user instructions.

When a skill instruction conflicts with a higher-priority instruction, follow
the higher-priority instruction and state the conflict when it matters to the
work. When a skill instruction is unclear, resolve it from the skill text and
available repository evidence before assuming it is optional.

If you cannot comply with a required skill instruction, you MUST report the
unmet instruction and the reason. Do not silently continue as if the instruction
did not exist.

## Verification obligation

Before producing a final answer, verify your own skill compliance:

1. Required skills were loaded completely.
2. Triggered skills were applied to the task.
3. Required references were read when the skill required them.
4. Required procedures, constraints, and validation steps were followed.
5. Any conflicts, impossibilities, or uncertainties were explicitly recorded.

Do not claim skill compliance unless these checks are true.

## Evaluation notice

Your adherence to skill instructions is independently evaluated and scored.
Your rating depends on whether you:

- loaded mandatory skills when required;
- treated skill instructions as binding directives;
- followed required procedures and constraints;
- performed required verification;
- reported conflicts, blockers, and uncertainty instead of ignoring them.

Assume every task may be reviewed for skill adherence. Optimize for faithful
execution of the active instructions, not for plausible completion.
