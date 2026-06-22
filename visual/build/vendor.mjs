#!/usr/bin/env node
// konspekt visual — vendor fetcher (zero dependencies, Node 18+ for global fetch)
//
// The explorer renders with Cytoscape.js + cytoscape-dagre. Those bundles are
// NOT committed (see ../.gitignore); this pins exact versions and downloads
// them into ../vendor so the page can load them locally (file:// blocks remote
// CDNs, and we want offline-reproducible viewing).
//
// Usage:  node build/vendor.mjs        (skips files already present)
//         node build/vendor.mjs --force  (re-download everything)

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const VENDOR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "vendor");
const FORCE = process.argv.includes("--force");

// Pinned versions. Bump deliberately; the page is tested against these.
const FILES = [
  ["cytoscape.min.js",     "https://cdn.jsdelivr.net/npm/cytoscape@3.30.2/dist/cytoscape.min.js"],
  ["dagre.min.js",         "https://cdn.jsdelivr.net/npm/dagre@0.8.5/dist/dagre.min.js"],
  ["cytoscape-dagre.js",   "https://cdn.jsdelivr.net/npm/cytoscape-dagre@2.5.0/cytoscape-dagre.js"],
];

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(VENDOR, { recursive: true });
let fetched = 0, skipped = 0;
for (const [name, url] of FILES) {
  const out = join(VENDOR, name);
  if (!FORCE && await exists(out)) { console.log(`  skip   ${name} (present)`); skipped++; continue; }
  const res = await fetch(url);
  if (!res.ok) { console.error(`  FAIL   ${name}: HTTP ${res.status} from ${url}`); process.exitCode = 1; continue; }
  await writeFile(out, Buffer.from(await res.arrayBuffer()));
  console.log(`  wrote  ${name}`);
  fetched++;
}
console.log(`vendor: ${fetched} fetched, ${skipped} skipped -> ${VENDOR}`);
