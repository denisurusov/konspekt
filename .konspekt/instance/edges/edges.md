```yaml
provenance:
  conversationId: goals-and-motivation
  timestamp: 2026-06-21T13:00:00Z
review: accepted
```
# Edges

Single typed edge table (konspekt serialization v1). `from` / `to` are
`type:id`. `provenance` and `review` are the file-level defaults above.
`weight` is meaningful only for `relates`.

| id | kind | from | to | weight |
|----|------|------|----|--------|
| e-dec-port-repo | decomposes | node:goal-portability | node:investigation-repo-structure | |
| e-dec-port-comp | decomposes | node:goal-portability | node:investigation-competition | |
| e-dec-port-naming | decomposes | node:goal-portability | node:investigation-naming | |
| e-dec-port-second | decomposes | node:goal-portability | node:task-second-implementer | |
| e-dec-port-license | decomposes | node:goal-portability | node:task-license | |
| e-dec-port-adoption | decomposes | node:goal-portability | node:task-adoption-path | |
| e-dec-follow-valid | decomposes | node:goal-follow-thread | node:investigation-validation | |
| e-dec-curated-valid | decomposes | node:goal-curated-context | node:investigation-validation | |
| e-dec-repo-reconcile | decomposes | node:investigation-repo-structure | node:task-reconcile-schema | |
| e-dec-repo-serial | decomposes | node:investigation-repo-structure | node:task-serialization-format | |
| e-dec-repo-realign | decomposes | node:investigation-repo-structure | node:task-realign-instance | |
| e-dec-repo-outcomes | decomposes | node:investigation-repo-structure | node:task-outcomes-node-type | |
| e-dec-curated-oploop | decomposes | node:goal-curated-context | node:investigation-operating-loop | |
| e-dec-follow-oploop | decomposes | node:goal-follow-thread | node:investigation-operating-loop | |
| e-dec-oploop-ingestion | decomposes | node:investigation-operating-loop | node:task-ingestion-mode | |
| e-dec-oploop-reconcile | decomposes | node:investigation-operating-loop | node:task-reconciliation | |
| e-dec-oploop-trigger | decomposes | node:investigation-operating-loop | node:task-trigger-transport | |
| e-dec-oploop-review | decomposes | node:investigation-operating-loop | node:task-review-ergonomics | |
| e-dec-oploop-provenance | decomposes | node:investigation-operating-loop | node:task-provenance-model | |
| e-dec-oploop-central | decomposes | node:investigation-operating-loop | node:task-central-service-binding | |
| e-men-follow-extstate | mentions | node:goal-follow-thread | concept:concept-externalized-state | |
| e-men-follow-conv | mentions | node:goal-follow-thread | concept:concept-goals-convergence | |
| e-men-port-conn | mentions | node:goal-portability | concept:concept-connective-tissue | |
| e-men-port-conv | mentions | node:goal-portability | concept:concept-goals-convergence | |
| e-men-port-legible | mentions | node:goal-portability | concept:concept-legible-over-defensible | |
| e-men-port-contract | mentions | node:goal-portability | concept:concept-transport-contract | |
| e-men-curated-conv | mentions | node:goal-curated-context | concept:concept-goals-convergence | |
| e-men-valid-need | mentions | node:investigation-validation | concept:concept-need-not-mechanic | |
| e-men-valid-gap | mentions | node:investigation-validation | concept:concept-second-implementer-gap | |
| e-men-comp-legible | mentions | node:investigation-competition | concept:concept-legible-over-defensible | |
| e-men-second-gap | mentions | node:task-second-implementer | concept:concept-second-implementer-gap | |
| e-men-trigger-contract | mentions | node:task-trigger-transport | concept:concept-transport-contract | |
| e-men-central-contract | mentions | node:task-central-service-binding | concept:concept-transport-contract | |
| e-men-review-sep | mentions | node:task-review-ergonomics | concept:concept-propose-accept-separation | |
| e-men-ingestion-sep | mentions | node:task-ingestion-mode | concept:concept-propose-accept-separation | |
| e-men-reconcile-sep | mentions | node:task-reconciliation | concept:concept-propose-accept-separation | |
| e-men-provenance-caprov | mentions | node:task-provenance-model | concept:concept-content-addressed-provenance | |
| e-not-valid-hyp | notes | node:investigation-validation | noteworthy:nw-hypotheses-not-proof | |
| e-not-valid-vocab | notes | node:investigation-validation | noteworthy:nw-validation-is-vocabulary | |
| e-not-valid-curated | notes | node:investigation-validation | noteworthy:nw-curated-context-accuracy | |
| e-not-curated-assump | notes | node:goal-curated-context | noteworthy:nw-curated-context-accuracy | |
| e-not-outcomes-assump | notes | node:task-outcomes-node-type | noteworthy:nw-curated-context-accuracy | |
| e-not-comp-copy | notes | node:investigation-competition | noteworthy:nw-copying-is-the-win | |
| e-not-comp-absorb | notes | node:investigation-competition | noteworthy:nw-platforms-absorb | |
| e-not-repo-seam | notes | node:investigation-repo-structure | noteworthy:nw-spec-seam | |
| e-not-oploop-seam | notes | node:investigation-operating-loop | noteworthy:nw-spec-seam | |
| e-not-trigger-probe | notes | node:task-trigger-transport | noteworthy:nw-manual-reupload-probe | |
| e-not-review-noblock | notes | node:task-review-ergonomics | noteworthy:nw-review-doesnt-block-persist | |
| e-not-review-triage | notes | node:task-review-ergonomics | noteworthy:nw-confidence-triages-not-accepts | |
| e-not-ingestion-convid | notes | node:task-ingestion-mode | noteworthy:nw-conversationid-host-injected | |
| e-not-provenance-decision | notes | node:task-provenance-model | noteworthy:nw-provenance-content-addressed | |
| e-not-provenance-pushbased | notes | node:task-provenance-model | noteworthy:nw-push-based-idempotence | |
| e-not-provenance-timestamp | notes | node:task-provenance-model | noteworthy:nw-timestamp-source-time | |
| e-not-oploop-triggers | notes | node:investigation-operating-loop | noteworthy:nw-triggers-event-not-cadence | |
| e-not-trigger-triggers | notes | node:task-trigger-transport | noteworthy:nw-triggers-event-not-cadence | |
| e-not-central-neutral | notes | node:task-central-service-binding | noteworthy:nw-mcp-binding-needs-neutral-read | |
| e-not-review-forced | notes | node:task-review-ergonomics | noteworthy:nw-venturing-must-be-forced | |
| e-not-repo-derive | notes | node:investigation-repo-structure | noteworthy:nw-derive-not-copy | |
| e-not-trigger-skillpickup | notes | node:task-trigger-transport | noteworthy:nw-skill-pickup-transport-bound | |
| e-not-review-skillpickup | notes | node:task-review-ergonomics | noteworthy:nw-skill-pickup-transport-bound | |
| e-prod-repo-repo | produces | node:investigation-repo-structure | artifact:artifact-repo | |
| e-prod-reconcile-spec | produces | node:task-reconcile-schema | artifact:artifact-spec | |
| e-prod-reconcile-schema | produces | node:task-reconcile-schema | artifact:artifact-schema | |
| e-prod-serial-serialization | produces | node:task-serialization-format | artifact:artifact-serialization | |
| e-prod-ingestion-spec | produces | node:task-ingestion-mode | artifact:artifact-spec | |
| e-prod-reconciliation-doc | produces | node:task-reconciliation | artifact:artifact-reconciliation | |
| e-prod-trigger-transport | produces | node:task-trigger-transport | artifact:artifact-transport | |
| e-prod-review-ergonomics | produces | node:task-review-ergonomics | artifact:artifact-review | |
| e-prod-provenance-schema | produces | node:task-provenance-model | artifact:artifact-schema | |
| e-prod-provenance-spec | produces | node:task-provenance-model | artifact:artifact-spec | |
| e-prod-provenance-reconciliation | produces | node:task-provenance-model | artifact:artifact-reconciliation | |
| e-prod-adoption-setup | produces | node:task-adoption-path | artifact:artifact-setup | |
| e-prod-adoption-distribution | produces | node:task-adoption-path | artifact:artifact-distribution | |
| e-prod-review-skill | produces | node:task-review-ergonomics | artifact:artifact-atom-readiness-skill | |
| e-mark-frame-follow | marks | waypoint:wp-frame-goals | node:goal-follow-thread | |
| e-mark-frame-port | marks | waypoint:wp-frame-goals | node:goal-portability | |
| e-mark-curated | marks | waypoint:wp-curated-goal | node:goal-curated-context | |
| e-mark-valid | marks | waypoint:wp-validation | node:investigation-validation | |
| e-mark-open | marks | waypoint:wp-openness | node:investigation-competition | |
| e-mark-naming | marks | waypoint:wp-naming | node:investigation-naming | |
| e-mark-repo | marks | waypoint:wp-repo-structure | node:investigation-repo-structure | |
| e-mark-spec-split | marks | waypoint:wp-spec-split | node:investigation-repo-structure | |
| e-mark-provenance | marks | waypoint:wp-provenance-model | node:investigation-operating-loop | |
| e-mark-triggers | marks | waypoint:wp-triggers | node:investigation-operating-loop | |
| e-mark-delref-repo | marks | waypoint:wp-delete-reference | node:investigation-repo-structure | |
| e-mark-delref-oploop | marks | waypoint:wp-delete-reference | node:investigation-operating-loop | |
| e-mark-setupkit | marks | waypoint:wp-setup-kit | node:task-adoption-path | |
| e-rel-conv-extstate | relates | concept:concept-goals-convergence | concept:concept-externalized-state | 0.6 |
| e-rel-conv-conn | relates | concept:concept-goals-convergence | concept:concept-connective-tissue | 0.6 |
| e-rel-legible-gap | relates | concept:concept-legible-over-defensible | concept:concept-second-implementer-gap | 0.5 |
| e-rel-contract-legible | relates | concept:concept-transport-contract | concept:concept-legible-over-defensible | 0.5 |
| e-rel-caprov-contract | relates | concept:concept-content-addressed-provenance | concept:concept-transport-contract | 0.5 |
