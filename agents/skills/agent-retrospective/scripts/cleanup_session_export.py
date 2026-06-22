#!/usr/bin/env python3
"""Strip OpenCode markdown session exports down to user prompts and assistant replies.

This script keeps the session preamble plus `## User` / `## Assistant` turns,
removing assistant-side thinking/tool-call material such as `_Thinking:_`,
`**Tool:**`, `**Input:**`, `**Output:**`, malformed raw export tool spans, and
exported `**Error:**` blocks.
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

TURN_HEADER_RE = re.compile(r"^##\s+(User|Assistant)\b.*$")
FENCE_RE = re.compile(r"^```")
THINKING_RE = re.compile(r"^_Thinking:_\s*$")
TOOL_RE = re.compile(r"^\*\*Tool:")
INPUT_RE = re.compile(r"^\*\*Input:\*\*\s*$")
OUTPUT_RE = re.compile(r"^\*\*Output:\*\*\s*$")
ERROR_RE = re.compile(r"^\*\*Error:\*\*\s*$")
H_RULE_RE = re.compile(r"^---\s*$")
BOLD_HEADING_RE = re.compile(r"^\*\*[^*].*\*\*\s*$")
META_PREFIXES = (
    "i ",
    "i'm ",
    "i’m ",
    "i am ",
    "i need ",
    "i think ",
    "i want ",
    "i should ",
    "i could ",
    "i might ",
    "i may ",
    "i can ",
    "i'll ",
    "i’ll ",
    "let's ",
    "let’s ",
    "the user ",
    "it seems ",
    "it looks like ",
    "according to ",
    "since the user ",
    "from the design",
    "i also ",
    "i'm considering",
    "i’m considering",
    "i'm contemplating",
    "i’m contemplating",
    "i need to mention",
    "i need to respond",
    "i need to answer",
    "i need to explain",
    "i need to clarify",
    "i'm thinking",
    "i’m thinking",
)


@dataclass(frozen=True)
class Turn:
    """A top-level conversation turn from the markdown export."""

    header: str
    body: list[str]


@dataclass(frozen=True)
class SectionParse:
    """Parsed export content split into preamble and conversation turns."""

    preamble: list[str]
    turns: list[Turn]


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments."""

    parser = argparse.ArgumentParser(
        description=(
            "Keep only user prompts and assistant prose from an OpenCode session "
            "markdown export."
        )
    )
    parser.add_argument("input", type=Path, help="Path to the exported markdown file")
    parser.add_argument(
        "output",
        type=Path,
        nargs="?",
        help="Optional output path (defaults to <input>.cleaned.md)",
    )
    parser.add_argument(
        "--drop-preamble",
        action="store_true",
        help="Do not copy the title/session metadata block into the output.",
    )
    return parser.parse_args()


def derive_output_path(input_path: Path) -> Path:
    """Return the default cleaned-output path for an input export."""

    suffix = input_path.suffix or ".md"
    if input_path.suffix:
        return input_path.with_name(f"{input_path.stem}.cleaned{input_path.suffix}")
    return input_path.with_name(f"{input_path.name}.cleaned{suffix}")


def next_significant_index(lines: list[str], start_index: int) -> int | None:
    """Return the next non-blank line index at or after `start_index`, if any."""

    index = start_index
    while index < len(lines):
        if lines[index].strip():
            return index
        index += 1
    return None


def find_malformed_tool_terminator(lines: list[str], start_index: int) -> int | None:
    """Find the separator that ends a malformed tool section.

    A malformed tool section ends immediately before a top-level separator whose
    next significant line is another conversation turn header. The separator is
    retained so downstream turn parsing still sees the next header boundary.
    """

    index = start_index
    while index < len(lines):
        if not H_RULE_RE.match(lines[index]):
            index += 1
            continue
        header_index = next_significant_index(lines, index + 1)
        if header_index is not None and TURN_HEADER_RE.match(lines[header_index]):
            return index
        index += 1
    return None


def strip_malformed_tool_sections(source: str) -> str:
    """Remove invalid raw tool spans that are not fenced as proper markdown.

    Some exports contain arbitrary text between `**Input:**` and `**Output:**`
    without valid fences. This pass removes that raw span up to the next kept
    separator/turn header boundary before normal parsing begins.
    """

    lines = source.splitlines(keepends=True)
    cleaned: list[str] = []
    index = 0
    while index < len(lines):
        if not INPUT_RE.match(lines[index]):
            cleaned.append(lines[index])
            index += 1
            continue

        output_index = index + 1
        while output_index < len(lines):
            output_line = lines[output_index]
            if isinstance(output_line, list):
                output_line = "".join(output_line)
            if OUTPUT_RE.match(output_line):
                break
            output_index += 1
        if output_index >= len(lines):
            cleaned.append(lines[index])
            index += 1
            continue

        terminator_index = find_malformed_tool_terminator(lines, output_index + 1)
        if terminator_index is None:
            cleaned.append(lines[index])
            index += 1
            continue

        index = terminator_index

    return "".join(cleaned)


def previous_significant_line(lines: list[str], index: int) -> str | None:
    """Return the most recent non-blank line before `index`, if any."""

    for cursor in range(index - 1, -1, -1):
        stripped = lines[cursor].strip()
        if stripped:
            return stripped
    return None


def split_export(lines: list[str]) -> SectionParse:
    """Split an export into preamble and top-level speaker turns.

    A turn header is only recognized when it appears immediately after a
    top-level horizontal rule, which avoids splitting on nested `##` headings in
    assistant content.
    """

    header_indexes: list[int] = []
    in_fence = False
    for index, line in enumerate(lines):
        if FENCE_RE.match(line):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if not TURN_HEADER_RE.match(line):
            continue
        previous = previous_significant_line(lines, index)
        if previous == "---":
            header_indexes.append(index)

    if not header_indexes:
        return SectionParse(preamble=lines[:], turns=[])

    preamble = lines[: header_indexes[0]]
    turns: list[Turn] = []
    for offset, header_index in enumerate(header_indexes):
        next_header_index = (
            header_indexes[offset + 1] if offset + 1 < len(header_indexes) else len(lines)
        )
        turns.append(
            Turn(
                header=lines[header_index].rstrip("\n"),
                body=lines[header_index + 1: next_header_index],
            )
        )
    return SectionParse(preamble=preamble, turns=turns)


def strip_surrounding_blank_lines(lines: list[str]) -> list[str]:
    """Trim leading and trailing blank lines from a line list."""

    start = 0
    end = len(lines)
    while start < end and not lines[start].strip():
        start += 1
    while end > start and not lines[end - 1].strip():
        end -= 1
    return lines[start:end]


def coerce_text_lines(lines: Any) -> list[str]:
    """Flatten a line container to plain text lines."""

    text_lines: list[str] = []
    if not isinstance(lines, list):
        return text_lines
    for item in lines:
        if isinstance(item, str):
            text_lines.append(item)
            continue
        if isinstance(item, list):
            text_lines.extend(part for part in item if isinstance(part, str))
    return text_lines


def normalize_blank_runs(lines: list[str] | list[list[str]]) -> list[str]:
    """Collapse repeated blank lines to a single blank line."""

    text_lines = coerce_text_lines(lines)
    normalized: list[str] = []
    previous_blank = False
    for line in text_lines:
        if line.strip():
            normalized.append(line)
            previous_blank = False
            continue
        if not previous_blank:
            normalized.append("\n")
        previous_blank = True
    return strip_surrounding_blank_lines(normalized)


def skip_fenced_block(lines: list[str], start_index: int) -> int:
    """Advance past a fenced code block that starts at `start_index`, if present."""

    index = start_index
    if index >= len(lines):
        return index
    opening_line = lines[index]
    if not FENCE_RE.match(opening_line):
        return index

    index += 1
    while index < len(lines):
        current_line = lines[index]
        index += 1
        if FENCE_RE.match(current_line):
            break
    return index


def strip_tool_markup(lines: list[str]) -> list[str]:
    """Remove tool/input/output blocks from an assistant turn."""

    cleaned: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if TOOL_RE.match(line):
            index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue
        if INPUT_RE.match(line) or OUTPUT_RE.match(line):
            index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            index = skip_fenced_block(lines, index)
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue
        if H_RULE_RE.match(line):
            index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue
        cleaned.append(line)
        index += 1
    return cleaned


def strip_error_blocks(lines: list[str]) -> list[str]:
    """Remove exported `**Error:**` records plus their fenced payload."""

    cleaned: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if not ERROR_RE.match(line):
            cleaned.append(line)
            index += 1
            continue

        lookahead = index + 1
        while lookahead < len(lines) and not lines[lookahead].strip():
            lookahead += 1
        if lookahead >= len(lines):
            cleaned.append(line)
            index += 1
            continue
        lookahead_line = lines[lookahead]
        if isinstance(lookahead_line, list):
            lookahead_line = "".join(lookahead_line)
        if not FENCE_RE.match(lookahead_line):
            cleaned.append(line)
            index += 1
            continue

        index = skip_fenced_block(lines, lookahead)
        while index < len(lines) and not lines[index].strip():
            index += 1
    return cleaned


def build_paragraphs(lines: list[str]) -> list[list[str]]:
    """Build paragraph blocks separated by blank lines."""

    paragraphs: list[list[str]] = []
    paragraph: list[str] = []
    for index in range(len(lines)):
        line = lines[index]
        if line.strip():
            paragraph.append(line)
            continue
        if paragraph:
            paragraphs.append(paragraph)
            paragraph = list[str]()
    if paragraph:
        paragraphs.append(paragraph)
    return paragraphs


def is_meta_thinking_paragraph(paragraph: list[str] | list[list[str]]) -> bool:
    """Heuristically identify a paragraph as assistant reasoning, not reply text."""

    significant_lines = [line.strip() for line in coerce_text_lines(paragraph) if line.strip()]
    if not significant_lines:
        return False
    if all(BOLD_HEADING_RE.match(line) for line in significant_lines):
        return True
    lowered = " ".join(significant_lines).lower()
    return any(lowered.startswith(prefix) for prefix in META_PREFIXES)


RESPONSE_LEADERS = (
    "yes",
    "no",
    "both",
    "agreed",
    "understood",
    "got it",
    "that ",
    "this ",
    "here",
    "strategically",
    "clean framing",
    "concise",
    "important distinction",
    "desired behavior",
    "the canonical",
)


def looks_like_response(paragraph: list[str] | list[list[str]]) -> bool:
    """Return True when a paragraph looks like user-facing assistant output."""

    significant_lines = [line.strip() for line in coerce_text_lines(paragraph) if line.strip()]
    if not significant_lines:
        return False
    if all(BOLD_HEADING_RE.match(line) for line in significant_lines):
        return False
    first = significant_lines[0].lower()
    if any(first.startswith(prefix) for prefix in RESPONSE_LEADERS):
        return True
    return not is_meta_thinking_paragraph(paragraph)


def strip_thinking_paragraphs(lines: list[str]) -> list[str]:
    """Remove `_Thinking:_` blocks while preserving the visible reply.

    The export does not mark the end of the thinking block explicitly, so this
    uses paragraph-level heuristics: drop bold subheadings and meta-reasoning
    paragraphs after `_Thinking:_` until a paragraph looks like user-facing
    output, then keep the remainder of the turn.
    """

    paragraphs = build_paragraphs(lines)
    kept: list[str] = []
    index = 0
    while index < len(paragraphs):
        paragraph: list[str] = paragraphs[index]
        stripped = [line.strip() for line in paragraph if line.strip()]
        if stripped == ["_Thinking:_"]:
            index += 1
            while index < len(paragraphs):
                candidate: list[str] = paragraphs[index]
                candidate_stripped = [line.strip() for line in candidate if line.strip()]
                if candidate_stripped == ["_Thinking:_"]:
                    index += 1
                    continue
                if looks_like_response(candidate):
                    break
                index += 1
            continue
        kept.extend(paragraph)
        kept.append("\n")
        index += 1
    return strip_surrounding_blank_lines(kept)


def clean_turn(turn: Turn) -> Turn | None:
    """Return a cleaned turn, or None if nothing remains worth keeping."""

    if turn.header.startswith("## User"):
        body = normalize_blank_runs(turn.body)
        return Turn(header=turn.header, body=body) if body else None

    assistant_without_tools = strip_tool_markup(turn.body)
    assistant_without_errors = strip_error_blocks(assistant_without_tools)
    assistant_without_thinking = strip_thinking_paragraphs(assistant_without_errors)
    body = normalize_blank_runs(assistant_without_thinking)
    return Turn(header=turn.header, body=body) if body else None


def collapse_duplicate_separators(rendered: str) -> str:
    """Collapse adjacent horizontal-rule separators after all cleanup passes."""

    output_lines: list[str] = []
    last_significant_line: str | None = None
    blank_run_after_separator = False

    for line in rendered.splitlines(keepends=True):
        stripped = line.strip()
        if H_RULE_RE.match(line):
            if last_significant_line == "---":
                blank_run_after_separator = True
                continue
            output_lines.append("---\n")
            last_significant_line = "---"
            blank_run_after_separator = False
            continue
        if not stripped:
            if last_significant_line == "---":
                if blank_run_after_separator:
                    continue
                blank_run_after_separator = True
            output_lines.append(line)
            continue

        output_lines.append(line)
        last_significant_line = stripped
        blank_run_after_separator = False

    return "".join(output_lines)


def render_export(parsed: SectionParse, drop_preamble: bool) -> str:
    """Render the cleaned export back to markdown."""

    cleaned_turns = [turn for turn in (clean_turn(turn) for turn in parsed.turns) if turn]
    rendered: list[str] = []
    preamble_present = False

    if not drop_preamble and parsed.preamble:
        rendered.extend(strip_surrounding_blank_lines(parsed.preamble))
        rendered.append("\n\n")
        preamble_present = True

    for index, turn in enumerate(cleaned_turns):
        if index > 0 or not preamble_present:
            rendered.append("---\n\n")
        rendered.append(f"{turn.header}\n\n")
        rendered.extend(turn.body)
        rendered.append("\n\n")

    output = collapse_duplicate_separators("".join(rendered)).rstrip()
    return output + "\n"


def main() -> None:
    """Run the cleanup CLI."""

    args = parse_args()
    input_path: Path = args.input.expanduser().resolve()
    output_path = (args.output or derive_output_path(input_path)).expanduser().resolve()

    source = input_path.read_text(encoding="utf-8")
    sanitized_source = strip_malformed_tool_sections(source)
    parsed = split_export(sanitized_source.splitlines(keepends=True))
    cleaned = render_export(parsed, drop_preamble=args.drop_preamble)
    output_path.write_text(cleaned, encoding="utf-8")


if __name__ == "__main__":
    main()
