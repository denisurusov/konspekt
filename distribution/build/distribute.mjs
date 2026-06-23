#!/usr/bin/env node
/**
 * konspekt distribution build — DERIVE the outward-facing subset.
 *
 * Root is the single source of truth. This bakes a regenerable projection of
 * the publishable subset into distribution/<version>/. It never hand-copies;
 * re-run it instead of editing the output — a tracking copy of spec/ would be
 * the same dual-authority drift that reference/ was.
 *
 *   node distribution/build/distribute.mjs [--version LABEL]
 *
 * --version defaults to "latest" (tracks main, gitignored). Pass a tag like
 * `v1` to freeze a release projection at the current commit (committed when a
 * version is cut). Zero dependencies. Node 18+.
 *
 * Included: the standard (spec/), the adopter kit (setup/), and the konspekt
 * maintainer skills. Excluded by design: the dogfood .konspekt/ instance and
 * the visual/ explorer — internal, not part of what an adopter conforms to.
 */
import { cpSync, rmSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");
const args = process.argv.slice(2);
const opt = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const version = opt("--version", "latest");

// The publishable subset: repo-relative source -> path inside the projection.
const INCLUDE = [
  ["spec", "spec"],
  ["setup", "setup"],
  ["agents/skills/konspekt-atom-readiness", "agents/skills/konspekt-atom-readiness"],
  ["agents/skills/empirical-epistemology", "agents/skills/empirical-epistemology"],
  ["agents/skills/ontology-perspective-discipline", "agents/skills/ontology-perspective-discipline"],
];

let commit = "unknown";
try {
  commit = execSync("git rev-parse HEAD", { cwd: REPO }).toString().trim();
} catch {}
const builtAt = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const outRoot = join(REPO, "distribution", version);
rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

const copied = [];
for (const [src, dst] of INCLUDE) {
  const from = join(REPO, src);
  if (!existsSync(from)) {
    console.warn("  ! missing, skipped:", src);
    continue;
  }
  cpSync(from, join(outRoot, dst), { recursive: true });
  copied.push(dst);
  console.log("  +", dst);
}

const manifest = {
  konspekt_distribution: version,
  sourceCommit: commit,
  builtAt,
  generated: true,
  note: "Generated projection. Do not edit. Source of truth is the konspekt repo root; regenerate with `node distribution/build/distribute.mjs`.",
  includes: copied,
};
writeFileSync(join(outRoot, "MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n");

const rel = version === "latest" ? "" : ` --version ${version}`;
writeFileSync(
  join(outRoot, "README.md"),
  `# konspekt distribution — ${version}\n\n` +
    `**Generated. Do not edit.** A regenerable projection of the outward-facing\n` +
    `subset of konspekt, baked from the repo root. The source of truth is the\n` +
    `repository root; edits here are overwritten on the next build. Regenerate:\n\n` +
    `    node distribution/build/distribute.mjs${rel}\n\n` +
    `- Source commit: \`${commit}\`\n- Built: ${builtAt}\n\n` +
    `## Contents\n\n` +
    `- \`spec/\` — the standard a second implementer conforms to.\n` +
    `- \`setup/\` — the adopter kit (scaffolder + templates).\n` +
    `- \`agents/skills/\` — the maintainer skills an adopter's agent loads.\n\n` +
    `The dogfood \`.konspekt/\` instance and the \`visual/\` explorer are excluded\n` +
    `by design — internal, not part of what an adopter conforms to or runs.\n`
);

console.log(`\nBuilt distribution/${version} from ${commit.slice(0, 7)} (${copied.length} trees).`);
