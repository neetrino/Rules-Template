# Agent system decisions

## D-001 — Separate product documentation and Agent-system governance

Status: accepted

Context: Product documentation and Agent-system governance serve different readers and lifecycles.

Decision: Store product documentation under `docs/` and Agent-system architecture and governance under `.agents/system/`.

Consequences: Product templates remain uncluttered; Agent governance has an isolated validation scope.

## D-002 — Use `.agents/skills/` as the canonical active Skill directory

Status: accepted

Context: Cursor and Codex need one portable source for active workflows.

Decision: Store active Skills in `.agents/skills/`; do not maintain full duplicates in `.cursor/skills/`.

Consequences: Skill behavior has one active source of truth.

## D-003 — Use `.agents/library/` for curated inactive Skill packages

Status: accepted

Context: Curated Skills may be useful without being appropriate for every project.

Decision: Store accepted inactive Skills in `.agents/library/`, outside agent discovery.

Consequences: The directory is created only when a real library Skill exists.

## D-004 — Use JSON as the machine-readable catalog format

Status: accepted

Context: Catalog data must be deterministic and readable by Node.js without dependencies.

Decision: Use `catalog.json`, `profiles.json`, and `sources.lock.json`; do not use Markdown as the machine source of truth.

Consequences: Validation and future installation can use the Node.js standard library.

## D-005 — Keep Skill behavior in SKILL.md and metadata in catalog.json

Status: accepted

Context: Duplicated workflow text would drift and waste context.

Decision: Keep behavior and instructions in `SKILL.md`; keep registry metadata in `catalog.json`.

Consequences: Catalog entries stay compact and machine-oriented.

## D-006 — Require immutable provenance for external Skills

Status: accepted

Context: External instructions and scripts introduce security, maintenance, and licensing risk.

Decision: Record repository, immutable commit, source path, license review, review date, and adaptation status for every accepted external Skill.

Consequences: External Skills cannot enter the curated library without a reviewable source lock.

## D-007 — Use composable Skill profiles

Status: accepted

Context: Repeating complete Skill lists across project types causes drift.

Decision: Compose profiles through `extends` and keep only profile-specific Skills in direct lists.

Consequences: Resolved Skill sets are deduplicated while profile intent remains clear.
