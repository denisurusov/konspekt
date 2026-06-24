#!/usr/bin/env bash
# SessionStart hook: inject the bodies of the mandatory-at-start skills directly
# into context, so their directives are active from the first message regardless
# of whether the agent later invokes the Skill tool. See AGENTS.md section 1.
#
# Emits the hook JSON with pure bash so it has no external dependency (notably no
# jq, which is not present on every box this repo runs on).
set -euo pipefail

skills_dir="${CLAUDE_PROJECT_DIR:-.}/.claude/skills"

# Skills mandatory at session start. The first two are Claude-behavior contracts
# (flagged MANDATORY in their own descriptions); the last three are the konspekt
# operating-mandatory set named in AGENTS.md §1.
files=(
  "$skills_dir/claude-mandatory-read/SKILL.md"
  "$skills_dir/claude-precise-engineering-diction/SKILL.md"
  "$skills_dir/empirical-epistemology/SKILL.md"
  "$skills_dir/ontology-perspective-discipline/SKILL.md"
  "$skills_dir/konspekt-atom-readiness/SKILL.md"
)

context=$'The following skills are MANDATORY at session start (AGENTS.md §1) and are\ninjected here verbatim. Treat each as a binding directive surface, not background\ncontext.\n'

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

# Escape a string for embedding as a JSON string value (no jq dependency).
json_escape() {
  local s="$1"
  s="${s//\\/\\\\}"     # backslash -> \\
  s="${s//\"/\\\"}"     # double quote -> \"
  s="${s//$'\r'/}"      # drop carriage returns
  s="${s//$'\t'/\\t}"   # tab -> \t
  s="${s//$'\n'/\\n}"   # newline -> \n
  printf '%s' "$s"
}

printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}\n' \
  "$(json_escape "$context")"
