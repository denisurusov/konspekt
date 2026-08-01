// konspekt persona-registry loader — caller-side glue.
//
// This is the boundary the pure checker deliberately does NOT cross.
// lib/conformance.mjs stays pure and path-agnostic: it validates against
// whatever persona registries it is handed (opts.personas) and assumes nothing
// about where a layer lives on disk. This module is the counterpart that DOES
// the I/O — it reads project.personas and resolves each layer's registry.mjs
// under the spec — so lib/validate.mjs and the snapshot build share one copy of
// that logic rather than each growing its own (nw-derive-not-copy).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { splitEntityFile } from "./conformance.mjs";

// The persona names an instance activates (project.md front-matter `personas`).
// A scalar is tolerated and normalized to a single-element list.
export function activatedPersonas(instanceDir) {
  const projectPath = join(instanceDir, "project.md");
  if (!existsSync(projectPath)) return [];
  const { front } = splitEntityFile(readFileSync(projectPath, "utf8"));
  const p = front.personas;
  if (Array.isArray(p)) return p;
  return p ? [p] : [];
}

// Resolve and import the registry module for each activated persona. A named
// layer whose registry is absent under specPersonasDir is skipped with a
// warning, so the instance degrades to core checking instead of failing the
// build — the checker also records a `persona-not-loaded` info for it.
//
// specPersonasDir is the caller's known spec root (…/spec/personas), which
// ships with the checker: for an adopter reusing konspekt's checker that is
// still konspekt's spec, so the standard's layer definitions resolve.
export async function loadActivePersonas(instanceDir, specPersonasDir, opts = {}) {
  const warn = opts.warn || (() => {});
  const registries = [];
  for (const name of activatedPersonas(instanceDir)) {
    const regPath = join(specPersonasDir, name, "registry.mjs");
    if (!existsSync(regPath)) {
      warn(`persona "${name}" is activated but no registry was found at ${regPath}; ` +
           `checking core rules only for it`);
      continue;
    }
    try {
      const mod = await import(pathToFileURL(regPath).href);
      registries.push(mod.default ?? mod);
    } catch (err) {
      warn(`persona "${name}" registry at ${regPath} failed to load (${err.message}); ` +
           `checking core rules only for it`);
    }
  }
  return registries;
}
