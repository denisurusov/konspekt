// konspekt engineer persona — vocabulary registry.
//
// Loaded by the conformance checker ONLY when an instance activates this
// persona (project.md front-matter: `personas: [engineer]`) and the caller
// supplies this module via opts.personas. Core stays persona-agnostic: every
// value the engineer layer contributes lives here, never in the core checker.
//
// Zero dependencies, pure, no I/O — same commitments as lib/conformance.mjs,
// so the neutral checker can import it with no new machinery.
//
// Normative prose: ./SPEC.md

export const persona = "engineer";

// Subtypes this layer defines. `entityType` is the core entity the subtype
// refines; `constrainKind` (optional) pins the entity's core `kind`; `requires`
// lists any extra non-empty fields (none here — an ADR's decision is its body).
export const subtypes = {
  asr: { entityType: "concept", requires: [] },
  adr: { entityType: "waypoint", constrainKind: "decision", requires: [] },
};

// Edge kinds this layer adds, with domain/range in the same shape as core
// EDGE_DOMAIN_RANGE. A `to` of "command" is a provenance-ref endpoint (below),
// not an entity type.
export const edges = {
  drives:   { from: ["concept"], to: ["waypoint"] },        // ASR -> ADR
  executed: { from: ["waypoint", "node"], to: ["command"] }, // enacting entity -> command
};

// Content-addressed provenance channels this layer adds, parallel to sources/.
// An edge endpoint `command:<hash>` resolves to `<dir>/<hash><ext>` and verifies
// by git-blob-SHA the same way sources/ does.
export const provenanceRefs = {
  command: { dir: "commands", ext: ".md" },
};

export default { persona, subtypes, edges, provenanceRefs };
