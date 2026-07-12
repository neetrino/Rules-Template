# Rules, Skills, and References architecture

## Purpose

Separate permanent coding standards from repeatable task workflows and optional detailed knowledge. This keeps everyday context focused while making procedures portable across supported agents.

## Rules

Cursor-specific Rules live in `.cursor/rules/*.mdc`. They define how code must be written or changed globally, for matching files, or when a task makes the Rule relevant. Technology, architecture, security, testing, and delivery constraints remain Rules because they continuously govern implementation.

Empty `globs` can be intentional for task-relevant Rules; it is not automatically a configuration error. Rules should remain project-aware and must not turn template technology recommendations into universal requirements.

## Skills

Portable task workflows live only in `.agents/skills/<skill-name>/SKILL.md`. Both Cursor and Codex can discover this Agent Skills layout. Each Skill has one job, clear trigger and non-trigger boundaries, ordered work, verification, stop conditions where needed, and an output contract.

Add or revise Skills according to [`SKILL_AUTHORING_GUIDE.md`](SKILL_AUTHORING_GUIDE.md). Do not keep a duplicate `.cursor/skills/` tree.

## References

Skill-local `references/` contain detailed knowledge needed only during that workflow. Repository-wide templates, operational checklists, examples, and platform materials remain under `docs/reference/`. References are not automatically applied as permanent Rules.

## Decision guide

| Question | Type |
| --- | --- |
| “Always do it this way” | Rule |
| “For this task, perform these steps” | Skill |
| “Open this detailed information when needed” | Reference |

## Current structure

```text
.cursor/
└── rules/
    └── *.mdc

.agents/
└── skills/
    ├── project-onboarding/
    ├── debug-first/
    ├── verify-before-completion/
    ├── safe-database-migration/
    └── figma-to-production/

docs/
├── RULES_SKILLS_ARCHITECTURE.md
├── SKILL_AUTHORING_GUIDE.md
└── SKILL_TRIGGER_TESTS.md

scripts/
└── validate-agent-config.mjs
```

## Validation

Run the dependency-free structural validator after changing Rules, Skills, or their local links:

```bash
node scripts/validate-agent-config.mjs
```

The validator checks required Skill and Rule metadata, Skill name uniqueness, canonical paths, and local Markdown links. Warnings identify maintainability concerns without failing validation.
