#!/usr/bin/env bash
# SessionStart hook: inject the bodies of the mandatory-at-start skills directly
# into context, so their directives are active from the first message regardless
# of whether the agent later invokes the Skill tool. See CLAUDE.md section 1.
set -euo pipefail

skills_dir="${CLAUDE_PROJECT_DIR:-.}/agents/skills"

# Skills CLAUDE.md requires loading immediately at session start.
files=(
  "$skills_dir/claude-mandatory-read/SKILL.md"
  "$skills_dir/claude-precise-engineering-diction/SKILL.md"
  "$skills_dir/empirical-epistemology/SKILL.md"
)

context=$'The following skills are MANDATORY at session start (CLAUDE.md §1) and are\ninjected here verbatim. Treat each as a binding directive surface, not background\ncontext.\n'

missing=()
for f in "${files[@]}"; do
  if [[ -f "$f" ]]; then
    context+=$'\n\n===== BEGIN MANDATORY SKILL: '"$f"$' =====\n\n'
    context+="$(cat "$f")"
    context+=$'\n\n===== END MANDATORY SKILL: '"$f"$' =====\n'
  else
    missing+=("$f")
  fi
done

if (( ${#missing[@]} > 0 )); then
  context+=$'\n\nWARNING: expected mandatory skill files were not found:\n'
  for m in "${missing[@]}"; do
    context+="  - $m"$'\n'
  done
fi

jq -n --arg ctx "$context" '{
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: $ctx
  }
}'
