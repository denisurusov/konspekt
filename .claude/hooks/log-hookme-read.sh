#!/usr/bin/env bash
# PreToolUse hook: when Claude reads tmp/hookme.md, dump the full hook input
# JSON payload to tmp/hook_event_json/ for inspection. Never blocks the read.
set -euo pipefail

payload="$(cat)"

# Path the Read tool was asked to read (absolute in practice).
file_path="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)"

# Only fire for tmp/hookme.md — match by suffix so absolute or relative paths both work.
case "$file_path" in
  */tmp/hookme.md|tmp/hookme.md)
    out_dir="${CLAUDE_PROJECT_DIR:-.}/tmp/hook_event_json"
    mkdir -p "$out_dir"
    ts="$(date +%Y%m%dT%H%M%S)-$$"
    out_file="$out_dir/${ts}.json"
    # Pretty-print if it's valid JSON; otherwise write the raw payload verbatim.
    printf '%s' "$payload" | jq '.' > "$out_file" 2>/dev/null \
      || printf '%s\n' "$payload" > "$out_file"
    ;;
esac

exit 0
