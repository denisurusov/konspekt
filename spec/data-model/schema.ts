// konspekt schema — reconciled from the canonical data-model design.
//
// Principle: store each fact once; every "inventory" is a query over edges,
// not a stored list. Hierarchy and all cross-links live in one Edge table,
// keyed by `kind`. Every entity carries provenance and a review state, so the
// LLM maintainer's proposals stay auditable.

// ---------- Enums ----------

// `decision` is intentionally absent here: a decision is a Noteworthy item,
// and becomes a Waypoint and/or a Node only under the rules in SPEC.md.
export type NodeType =
  | "goal"
  | "investigation"
  | "experiment"
  | "topic"
  | "task"
  | "note";

export type NodeStatus = "open" | "active" | "resolved" | "abandoned";

export type NoteworthyKind =
  | "fact"
  | "statement"
  | "decision"
  | "assumption"
  | "constraint";

// assumption: unvalidated | validated | refuted
// constraint: active | lifted
export type NoteworthyStatus =
  | "unvalidated"
  | "validated"
  | "refuted"
  | "active"
  | "lifted";

export type WaypointKind = "decision" | "milestone" | "pivot";

export type EntityType =
  | "project"
  | "node"
  | "concept"
  | "noteworthy"
  | "artifact"
  | "waypoint";

export type EdgeKind =
  | "decomposes" // node -> node (goal tree)
  | "mentions"   // node -> concept
  | "relates"    // concept -> concept (untyped; optional weight)
  | "produces"   // node -> artifact
  | "notes"      // node -> noteworthy
  | "marks"      // waypoint -> node (the branch it sits on / opened)
  | "supersedes";// entity -> entity (new replaces old; superseded = the `to`).
                 // proposed = flagged contradiction; accepted = confirmed.

// ---------- Cross-cutting ----------

// Where the maintainer extracted this from. Lets you trust, trace, and undo.
export interface Provenance {
  conversationId: string;
  messageId?: string;
  contentHash?: string; // hash of the source message; "same messageId, changed
                        // hash" flags an edited/branched message so the
                        // idempotence watermark re-processes it (../architecture/RECONCILIATION.md)
  timestamp: string;   // ISO 8601
  confidence?: number; // 0..1, from the maintainer LLM
}

// Everything the maintainer extracts is PROPOSED, then a human accepts/rejects.
export type Review = "proposed" | "accepted" | "rejected";

// Summaries are regenerated on change — unless a human pins an edit.
export interface Summary {
  text: string;
  origin: "machine" | "human";
  pinned: boolean;   // if true, the maintainer never overwrites it
  updatedAt: string;
}

interface Base {
  id: string;
  createdAt: string;
  updatedAt: string;
  provenance: Provenance;
  review: Review;
}

// ---------- Entities ----------

export interface Project {
  id: string;
  goal: string;
  summary: Summary;  // composed from node summaries
  createdAt: string;
  updatedAt: string;
}

export interface GraphNode extends Base {
  type: NodeType;
  title: string;
  summary: Summary;
  status: NodeStatus;
}

export interface Concept extends Base {
  label: string;
  definition?: string;
  aliases: string[];   // surface forms, used for dedup / merge
}

export interface Noteworthy extends Base {
  kind: NoteworthyKind;
  text: string;
  status?: NoteworthyStatus;
}

export interface Artifact extends Base {
  name: string;
  kind?: string;       // doc, code, dataset, link, ...
  location?: string;   // path or URL
  version?: string;
}

export interface Waypoint extends Base {
  kind: WaypointKind;
  description: string;
  timestamp: string;   // when it HAPPENED (distinct from createdAt)
}

// ---------- Edges ----------

export interface EntityRef {
  type: EntityType;
  id: string;
}

export interface Edge extends Base {
  kind: EdgeKind;
  from: EntityRef;
  to: EntityRef;
  weight?: number;     // only meaningful for "relates" — link strength
}

// ---------- Derived views (never stored) ----------
//
//   project concept inventory
//     = concepts c where exists edge(kind="mentions", from: any node, to: c)
//   node concept inventory
//     = concepts c where exists edge(kind="mentions", from: thisNode, to: c)
//   goal tree
//     = edges where kind="decomposes"
//   timeline
//     = waypoints ordered by timestamp
//   open assumptions
//     = noteworthy where kind="assumption" and status="unvalidated"
//   current items
//     = entities with no inbound edge(kind="supersedes")

export interface Konspekt {
  project: Project;
  nodes: GraphNode[];
  concepts: Concept[];
  noteworthy: Noteworthy[];
  artifacts: Artifact[];
  waypoints: Waypoint[];
  edges: Edge[];
}
