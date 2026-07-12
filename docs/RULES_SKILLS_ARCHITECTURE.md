# Rules, Skills, and References architecture

## Purpose

The system separates permanent engineering norms from repeatable workflows and optional detail. This keeps everyday context focused without losing the existing standards or supporting material.

## Rules

Rules define how code must always be written or changed, globally or for matching files and tasks. They live in `.cursor/rules/` and apply through `alwaysApply`, `globs`, or task relevance. Technology, architecture, security, testing, and delivery standards remain Rules because they constrain implementation continuously rather than describe a one-time workflow.

## Skills

Skills describe how to complete a particular kind of task from start to finish. Each lives at `.cursor/skills/<skill-name>/SKILL.md` with minimal `name` and `description` frontmatter. Add a Skill when a repeatable process has a clear trigger, ordered phases, and a completion outcome; link to existing Rules instead of copying their standards.

## References

References hold criteria, detailed folder trees, long templates, examples, checklists, and platform-specific instructions that are opened only when needed. Keeping them outside automatically applied Rules reduces permanent context while preserving depth for the workflow that needs it.

## Decision guide

| Question | Type |
| --- | --- |
| “Always do it this way” | Rule |
| “For this task, perform these steps” | Skill |
| “Open this detailed information when needed” | Reference |

## Current structure

```text
.cursor/
├── rules/
│   ├── 00-core.mdc
│   ├── 01-architecture.mdc
│   ├── 03-typescript.mdc … 17-cicd.mdc
│   └── 20-i18n.mdc
└── skills/
    └── project-onboarding/
        ├── SKILL.md
        └── references/
            ├── project-sizing.md
            └── project-sizes/
                ├── size-a-small.md
                ├── size-b-medium.md
                └── size-c-large.md
```
