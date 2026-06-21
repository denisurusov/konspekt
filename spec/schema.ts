// konspekt schema — DRAFT v0.1.0
//
// Provisional. Field shapes here are a sketch, not the canonical model, and
// must be reconciled with the schema developed in design discussion before
// this is treated as authoritative. Concepts are described in SPEC.md.

// Fixed node-type enum. `decision` is intentionally absent: decisions are
// captured as Waypoints or Noteworthy items.
export type NodeType =
  | "goal"
  | "investigation"
  | "experiment"
  | "topic"
  | "task"
  | "note";

export type ReviewState = "proposed" | "accepted" | "superseded";

export interface Provenance {
  source: string; // e.g. conversation id / platform
  capturedAt: string; // ISO 8601
  note?: string;
}

export interface Reviewable {
  review: ReviewState;
  provenance: Provenance;
}

export interface Project extends Reviewable {
  id: string;
  name: string;
  goals: string[];
  createdAt: string; // ISO 8601
}

export interface Node extends Reviewable {
  id: string;
  type: NodeType;
  title: string;
  body?: string;
  conceptIds?: string[];
}

export interface Concept extends Reviewable {
  id: string;
  term: string;
  description?: string;
}

export interface Noteworthy extends Reviewable {
  id: string;
  /** The underlying need or insight, stated portably. */
  insight: string;
  relatedNodeIds?: string[];
}

export interface Artifact extends Reviewable {
  id: string;
  name: string;
  pointer: string; // path, url, or other locator
  kind?: string; // e.g. document, code, deck, repo
}

// A Waypoint marks the decision to start a branch in the conversation.
export interface Waypoint extends Reviewable {
  id: string;
  at: string; // ISO 8601
  summary: string;
  /** Node id(s) the branch opened. */
  branchInto?: string[];
}

export type EdgeKind =
  | "parent-of"
  | "relates-to"
  | "refines"
  | "supersedes"
  | "derived-from";

export interface Edge extends Reviewable {
  id: string;
  kind: EdgeKind;
  from: string; // node id
  to: string; // node id
}

export interface Konspekt {
  project: Project;
  nodes: Node[];
  concepts: Concept[];
  noteworthy: Noteworthy[];
  artifacts: Artifact[];
  waypoints: Waypoint[];
  edges: Edge[];
}
