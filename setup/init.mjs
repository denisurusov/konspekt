#!/usr/bin/env node
/**
 * konspekt setup — scaffold konspekt project state into the current repo.
 *
 * Run from the root of the repo you want to adopt konspekt (Node 18+):
 *   node setup/init.mjs [--name "Project Name"] [--goal "one-line goal"] [--push]
 *
 * Creates a `.konspekt/` umbrella — a minimal konspekt instance plus an
 * operating envelope — and adds a konspekt stanza to AGENTS.md. Idempotent:
 * refuses to clobber an existing `.konspekt/instance/`. With `--push`, commits
 * and pushes the scaffold via git.
 *
 * Zero dependencies. The konspekt standard:
 * https://github.com/denisurusov/konspekt (spec/data-model, spec/architecture).
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const TPL = join(HERE, "templates");
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const opt = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

if (has("--help") || has("-h")) {
  console.log(
    [
      "konspekt setup",
      "",
      "  node setup/init.mjs [--name NAME] [--goal GOAL] [--push]",
      "",
      "Scaffolds .konspekt/ into the current repo. --push commits and pushes via git.",
    ].join("\n")
  );
  process.exit(0);
}

const root = process.cwd();
const name = opt("--name", basename(root));
const slug =
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "project";
const goal = opt("--goal", "ONE-LINE GOAL \u2014 replace with what this project is trying to achieve.");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

if (existsSync(join(root, ".konspekt", "instance"))) {
  console.error("Refusing to overwrite existing .konspekt/instance/. Remove it or edit by hand.");
  process.exit(1);
}

const fill = (s) =>
  s.replaceAll("{{NAME}}", name).replaceAll("{{SLUG}}", slug).replaceAll("{{GOAL}}", goal).replaceAll("{{TS}}", ts);
const tpl = (f) => fill(readFileSync(join(TPL, f), "utf8"));
const put = (rel, content) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("  +", rel);
};

console.log(`Scaffolding konspekt into ${root}\n`);

put(".konspekt/instance/project.md", tpl("project.md"));
put(".konspekt/instance/edges/edges.md", tpl("edges.md"));
put(".konspekt/instance/sources/README.md", tpl("sources-README.md"));
for (const d of ["nodes", "concepts", "noteworthy", "artifacts", "waypoints"]) {
  put(`.konspekt/instance/${d}/.gitkeep`, "");
}
put(".konspekt/OPERATING.md", tpl("OPERATING.md"));
put(".konspekt/NOTES.md", tpl("NOTES.md"));

// AGENTS.md: append the konspekt stanza, or create the file with it.
const stanza = tpl("AGENTS-stanza.md");
const agentsPath = join(root, "AGENTS.md");
if (existsSync(agentsPath)) {
  const cur = readFileSync(agentsPath, "utf8");
  if (cur.includes("## konspekt project state")) {
    console.log("  = AGENTS.md already has a konspekt stanza (skipped)");
  } else {
    writeFileSync(agentsPath, cur.replace(/\s*$/, "") + "\n\n" + stanza);
    console.log("  ~ AGENTS.md (appended konspekt stanza)");
  }
} else {
  put("AGENTS.md", stanza);
}

console.log("\nDone. Next:");
console.log("  1. Edit .konspekt/instance/project.md \u2014 set the goal and summary.");
console.log("  2. Review .konspekt/OPERATING.md \u2014 the operating policy you just adopted.");
console.log("  3. Commit:  git add .konspekt AGENTS.md && git commit -m 'adopt konspekt'");

if (has("--push")) {
  console.log("\nPushing...");
  try {
    execSync("git add .konspekt AGENTS.md", { cwd: root, stdio: "inherit" });
    execSync('git commit -m "adopt konspekt project state"', { cwd: root, stdio: "inherit" });
    execSync("git push", { cwd: root, stdio: "inherit" });
    console.log("Pushed.");
  } catch {
    console.error("git step failed \u2014 the scaffold is on disk; commit manually.");
    process.exit(1);
  }
}
