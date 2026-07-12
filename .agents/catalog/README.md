# Skill catalog

## Purpose

This directory is the machine-checkable registry for curated Agent Skills, composable project profiles, and immutable provenance for future external Skills. It does not duplicate Skill workflows.

## Directory roles

```text
.agents/skills/
→ active Skills discoverable by supported agents

.agents/library/
→ curated but inactive Skills

.agents/catalog/catalog.json
→ machine-readable Skill registry

.agents/catalog/profiles.json
→ reusable project profiles

.agents/catalog/sources.lock.json
→ immutable external provenance
```

`.agents/library/` is created only when the first real curated inactive Skill is accepted.

## Source of truth

```text
Skill behavior
→ SKILL.md

Skill registry metadata
→ catalog.json

Profile composition
→ profiles.json

External provenance
→ sources.lock.json
```

Do not copy a full Skill description or workflow into the catalog.

## Skill lifecycle

```text
external candidate
→ research and security review
→ accepted
→ library
→ active when installed
→ deprecated when retired
```

`candidate` is not a catalog state. Unreviewed Skills stay outside the curated catalog.

## Activation model

```text
Library Skill
→ not agent-discoverable

Active Skill
→ present under .agents/skills/
```

Phase 3A defines metadata only; no profile installer exists yet.

## Profiles

- `core` provides baseline quality workflows.
- `frontend` extends `core` with design implementation.
- `backend` extends `core` with database migration safety.
- `fullstack` composes `frontend` and `backend`.
- `greenfield` extends `fullstack` with project onboarding.

Inheritance uses `extends`; inherited Skills are not repeated in child lists.

## External Skill rule

Never install an external Skill directly into `.agents/skills/` without source review, security review, and provenance registration according to [`../system/EXTERNAL_SKILL_POLICY.md`](../system/EXTERNAL_SKILL_POLICY.md).

Future external source records use this shape:

```json
{
  "id": "example-security-skill",
  "repository": "https://github.com/example/skills",
  "commit": "full-immutable-commit-sha",
  "sourcePath": "skills/security-audit",
  "license": "MIT",
  "licenseReviewed": true,
  "reviewedAt": "YYYY-MM-DD",
  "importedAs": "security-audit",
  "adaptation": "adapted",
  "notes": "Adjusted triggers and removed unsafe production execution."
}
```

This example is documentation only and is not present in `sources.lock.json`.
