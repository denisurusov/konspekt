#!/usr/bin/env node
// konspekt visual — snapshot builder (v0)
//
// Reads a konspekt v1 instance directory and emits a single deterministic
// JSON snapshot that the static explorer (../index.html) loads.
//
// Design commitments (see ../README.md):
//   - Zero dependencies. Node only. A second implementer can read this in
//     one sitting; nothing to `npm install`.
//   - The snapshot is a *pure function of the instance*. No wall-clock
//     timestamps are baked in, so re-running on an unchanged instance
//     produces a byte-identical file and the git diff stays meaningful.
//   - Entities are keyed on their in-file `id`, never on the filename, and
//     the directory decides the EntityType. Filenames now equal ids across
//     every directory, but keying on the id is still the right commitment:
//     the id is the durable identity, so a future layout change cannot
//     silently re-identify entities.
//   - Parsing doubles as a conformance check. Anything malformed or dangling
//     becomes a `problem` baked alongside the data; the build never throws on
//     a broken instance, it reports. A broken instance is exactly when you
//     most want to see it.
//
// Usage:  node build/snapshot.mjs [instanceDir] [outFile]
//   defaults: instanceDir = ../.konspekt/instance (resolved from repo root)
//             outFile     = ./data/snapshot.js

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VISUAL_DIR = resolve(__dirname, "..");
const REPO_ROOT = resolve(VISUAL_DIR, "..");

const instanceDir = resolve(process.argv[2] || join(REPO_ROOT, ".konspekt", "instance"));
const outFile = resolve(process.argv[3] || join(VISUAL_DIR, "data", "snapshot.js"));

const SERIALIZATION_VERSION = "v1";

// Conformance rule for filename<->id. "strict" (default): the filename must
// equal the id exactly, as SERIALIZATION.md requires. "slug-ok": also accepts
// a bare-slug filename that strips the entity-type prefix — the pre-2026-07-19
// convention, kept only for reading instances that have not been migrated.
const FILENAME_RULE = process.env.KONSPEKT_FILENAME_RULE || "strict";

const problems = [];
const problem = (severity, code, message, ref) =>
  problems.push({ severity, code, message, ref: ref || null });

// ---------- a small YAML-subset parser (just enough for konspekt v1) ----------
//
// Supports: `key: scalar`, one level of nested maps (indented keys),
// inline flow arrays `[a, b, c]`, and folded/literal block scalars
// (`>`, `>-`, `|`, `|-`). This is deliberately narrow; if the front-matter
// ever outgrows it, swap in a real YAML lib here and nowhere else.

function coerce(raw) {
  if (raw === "" || raw === undefined) return "";
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null" || v === "~") return null;
  // inline flow array
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    if (inner === "") return [];
    return inner.split(",").map((s) => stripQuotes(s.trim()));
  }
  // number (but not an ISO timestamp or version like v1)
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return stripQuotes(v);
}
function stripQuotes(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}
const indentOf = (line) => line.length - line.replace(/^ +/, "").length;

function parseYamlSubset(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const root = {};
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) { i++; continue; }
    const indent = indentOf(line);
    const m = line.trim().match(/^([A-Za-z0-9_$.-]+):\s*(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1];
    let rest = m[2];

    // block scalar
    if (rest === ">" || rest === ">-" || rest === "|" || rest === "|-") {
      const folded = rest.startsWith(">");
      const collected = [];
      i++;
      while (i < lines.length && (lines[i].trim() === "" || indentOf(lines[i]) > indent)) {
        collected.push(lines[i].slice(indent + 2));
        i++;
      }
      root[key] = folded
        ? collected.join(" ").replace(/\s+/g, " ").trim()
        : collected.join("\n").trimEnd();
      continue;
    }

    // nested map: key has no inline value and following lines are deeper
    if (rest === "" && i + 1 < lines.length && lines[i + 1].trim() !== "" &&
        indentOf(lines[i + 1]) > indent) {
      const sub = {};
      i++;
      while (i < lines.length && (lines[i].trim() === "" || indentOf(lines[i]) > indent)) {
        if (lines[i].trim() === "") { i++; continue; }
        const sm = lines[i].trim().match(/^([A-Za-z0-9_$.-]+):\s*(.*)$/);
        if (sm) sub[sm[1]] = coerce(sm[2]);
        i++;
      }
      root[key] = sub;
      continue;
    }

    root[key] = coerce(rest);
    i++;
  }
  return root;
}

// Split a konspekt entity file into { front, body }.
function splitEntityFile(text) {
  const t = text.replace(/\r\n/g, "\n");
  const fence = t.match(/^```ya?ml\n([\s\S]*?)\n```\s*\n?/);
  if (!fence) return { front: {}, body: t.trim(), _noFrontmatter: true };
  const front = parseYamlSubset(fence[1]);
  const body = t.slice(fence[0].length).trim();
  return { front, body };
}

// ---------- load entities ----------

const ENTITY_DIRS = [
  { type: "concept", dir: "concepts", prefix: "concept-", label: "concept" },
  { type: "noteworthy", dir: "noteworthy", prefix: "nw-", label: "noteworthy" },
  { type: "artifact", dir: "artifacts", prefix: "artifact-", label: "artifact" },
  { type: "waypoint", dir: "waypoints", prefix: "wp-", label: "waypoint" },
];

const byId = new Map(); // id -> { entityType, ...front, body, _file }
const collections = {
  project: null,
  nodes: [],
  concepts: [],
  noteworthy: [],
  artifacts: [],
  waypoints: [],
};

function register(entity, relFile) {
  if (!entity.id) {
    problem("error", "missing-id", `Entity in ${relFile} has no id`, relFile);
    return;
  }
  if (byId.has(entity.id)) {
    problem("error", "duplicate-id",
      `id "${entity.id}" appears in both ${byId.get(entity.id)._file} and ${relFile}`,
      entity.id);
    return;
  }
  byId.set(entity.id, entity);
}

function checkFilename(entityType, prefix, id, file) {
  const base = basename(file).replace(/\.md$/, "");
  const stripped = id.startsWith(prefix) ? id.slice(prefix.length) : id;
  const allowed = FILENAME_RULE === "strict" ? [id] : [id, stripped];
  if (!allowed.includes(base)) {
    problem("warning", "filename-id-divergence",
      `file "${file}" holds id "${id}" (filename does not match` +
      (FILENAME_RULE === "strict" ? "" : " id or its bare slug") + ")", id);
  }
}

// project.md
const projectPath = join(instanceDir, "project.md");
if (existsSync(projectPath)) {
  const { front, body } = splitEntityFile(readFileSync(projectPath, "utf8"));
  collections.project = { entityType: "project", ...front, body, _file: "project.md" };
  if (front.id) byId.set(front.id, collections.project);
} else {
  problem("error", "missing-project", "instance has no project.md", null);
}

// nodes/<type>/*.md
const NODES_DIR = join(instanceDir, "nodes");
if (existsSync(NODES_DIR)) {
  for (const typeDir of readdirSync(NODES_DIR).sort()) {
    const full = join(NODES_DIR, typeDir);
    if (!statSync(full).isDirectory()) continue;
    for (const f of readdirSync(full).sort()) {
      if (!f.endsWith(".md")) continue;
      const rel = `nodes/${typeDir}/${f}`;
      const { front, body } = splitEntityFile(readFileSync(join(full, f), "utf8"));
      const e = { entityType: "node", ...front, body, _file: rel };
      register(e, rel);
      if (e.id) {
        collections.nodes.push(e);
        // nodes: filename must equal id exactly (no prefix convention)
        const base = f.replace(/\.md$/, "");
        if (base !== e.id) {
          problem("warning", "filename-id-divergence",
            `file "${rel}" holds id "${e.id}" (node filenames should equal the id)`, e.id);
        }
        if (e.type && typeDir !== e.type) {
          problem("warning", "node-dir-mismatch",
            `node "${e.id}" has type "${e.type}" but lives under nodes/${typeDir}/`, e.id);
        }
        if (!e.title) problem("warning", "missing-field", `node "${e.id}" has no title`, e.id);
      }
    }
  }
}

// flat entity dirs
for (const { type, dir, prefix } of ENTITY_DIRS) {
  const full = join(instanceDir, dir);
  if (!existsSync(full)) continue;
  for (const f of readdirSync(full).sort()) {
    if (!f.endsWith(".md")) continue;
    const rel = `${dir}/${f}`;
    const { front, body } = splitEntityFile(readFileSync(join(full, f), "utf8"));
    const e = { entityType: type, ...front, body, _file: rel };
    register(e, rel);
    if (e.id) {
      collections[type === "concept" ? "concepts" : type === "noteworthy" ? "noteworthy"
        : type === "artifact" ? "artifacts" : "waypoints"].push(e);
      checkFilename(type, prefix, e.id, rel);
      if (type === "concept" && !e.label)
        problem("warning", "missing-field", `concept "${e.id}" has no label`, e.id);
    }
  }
}

// ---------- load edges ----------

const edges = [];
const edgesPath = join(instanceDir, "edges", "edges.md");
if (existsSync(edgesPath)) {
  const text = readFileSync(edgesPath, "utf8");
  const { front } = splitEntityFile(text); // file-level provenance/review defaults
  const defReview = front.review || "accepted";
  const defConv = front.provenance && front.provenance.conversationId;
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length < 4) continue;
    if (cells[0] === "id" || /^-+$/.test(cells[0])) continue; // header / divider
    const [id, kind, from, to, weight] = cells;
    const ref = (s) => {
      const ix = s.indexOf(":");
      return ix === -1 ? { type: null, id: s } : { type: s.slice(0, ix), id: s.slice(ix + 1) };
    };
    const edge = {
      id, kind, from: ref(from), to: ref(to),
      review: defReview, conversationId: defConv,
    };
    if (weight !== undefined && weight !== "") edge.weight = Number(weight);
    edges.push(edge);
  }
} else {
  problem("error", "missing-edges", "instance has no edges/edges.md", null);
}

// ---------- conformance over the assembled graph ----------

const referenced = new Set();
for (const e of edges) {
  for (const end of [e.from, e.to]) {
    referenced.add(end.id);
    const target = byId.get(end.id);
    if (!target) {
      problem("error", "dangling-edge",
        `edge "${e.id}" (${e.kind}) points at "${end.id}", which has no entity file`, e.id);
    } else if (end.type && target.entityType !== end.type) {
      problem("error", "type-mismatch",
        `edge "${e.id}" refers to "${end.id}" as ${end.type}, but it is a ${target.entityType}`,
        e.id);
    }
  }
}

// orphans: entities (excluding project) with no edge referencing them
for (const e of byId.values()) {
  if (e.entityType === "project") continue;
  if (!referenced.has(e.id)) {
    problem("warning", "orphan",
      `${e.entityType} "${e.id}" is referenced by no edge`, e.id);
  }
}

// ---------- assemble + emit (deterministic) ----------

const sortById = (arr) => arr.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
const sevRank = { error: 0, warning: 1, info: 2 };

const snapshot = {
  meta: {
    tool: "konspekt-visual/build/snapshot.mjs",
    serializationVersion: SERIALIZATION_VERSION,
    filenameRule: FILENAME_RULE,
    counts: {
      nodes: collections.nodes.length,
      concepts: collections.concepts.length,
      noteworthy: collections.noteworthy.length,
      artifacts: collections.artifacts.length,
      waypoints: collections.waypoints.length,
      edges: edges.length,
      problems: problems.length,
    },
    // content digest, not a clock — keeps the file a pure function of input
    contentHash: "",
  },
  project: collections.project,
  nodes: sortById(collections.nodes),
  concepts: sortById(collections.concepts),
  noteworthy: sortById(collections.noteworthy),
  artifacts: sortById(collections.artifacts),
  waypoints: sortById(collections.waypoints),
  edges: sortById(edges),
  problems: problems.slice().sort((a, b) =>
    (sevRank[a.severity] - sevRank[b.severity]) ||
    (a.code < b.code ? -1 : a.code > b.code ? 1 : 0) ||
    String(a.ref).localeCompare(String(b.ref))),
};

const digestInput = JSON.stringify({ ...snapshot, meta: undefined });
snapshot.meta.contentHash = "sha256:" + createHash("sha256").update(digestInput).digest("hex").slice(0, 16);

const banner =
  "// AUTOGENERATED by konspekt-visual/build/snapshot.mjs — do not edit by hand.\n" +
  "// Regenerate with:  node build/snapshot.mjs\n" +
  "// This file is a pure function of the instance/ tree (no timestamps baked in).\n";
const out = banner + "window.__KONSPEKT__ = " + JSON.stringify(snapshot, null, 2) + ";\n";
writeFileSync(outFile, out);

const errs = problems.filter((p) => p.severity === "error").length;
const warns = problems.filter((p) => p.severity === "warning").length;
console.log(`wrote ${outFile}`);
console.log(`  entities: ${byId.size}  edges: ${edges.length}`);
console.log(`  problems: ${errs} error(s), ${warns} warning(s)`);
console.log(`  contentHash: ${snapshot.meta.contentHash}`);
for (const p of snapshot.problems) console.log(`  [${p.severity}] ${p.code}: ${p.message}`);
