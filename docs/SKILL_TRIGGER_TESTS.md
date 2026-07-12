# Skill trigger tests

These routing cases review Skill descriptions for clear positive and negative boundaries. They are specification examples, not a substitute for runtime discovery checks.

## project-onboarding

### Positive

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Start a new project from this template and prepare its TECH_CARD.” | `project-onboarding` | New-project initialization and decisions. |
| “Read the completed BRIEF, recommend A/B/C size, and design the initial architecture.” | `project-onboarding` | Sizing and initial architecture workflow. |
| “We are restarting greenfield setup; establish stack, docs, quality checks, and delivery phases.” | `project-onboarding` | Explicit onboarding restart. |

### Negative

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Add a filter to the existing orders page.” | No `project-onboarding` | Ordinary feature implementation. |
| “The current login endpoint returns 500; find the cause.” | `debug-first` | Defect diagnosis, not initialization. |
| “Check whether my completed refactor passes relevant tests.” | `verify-before-completion` | Completion validation. |

## debug-first

### Positive

| Prompt | Expected | Reason |
| --- | --- | --- |
| “The profile endpoint started returning 500 after the latest change. Find the cause and fix it.” | `debug-first` | Requires root-cause diagnosis. |
| “The modal sometimes shows stale data; reproduce the regression and repair it.” | `debug-first` | Unexpected UI state with unknown cause. |
| “This test fails only when the full suite runs. Investigate before changing code.” | `debug-first` | Evidence-driven investigation is required. |

### Negative

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Add a profile avatar field to the account page.” | No `debug-first` | Straightforward feature work. |
| “Change the button label to Continue.” | No `debug-first` | Isolated content change. |
| “Implement this Figma checkout screen.” | `figma-to-production` | Design-driven implementation. |

## verify-before-completion

### Positive

| Prompt | Expected | Reason |
| --- | --- | --- |
| “The API refactor is done. Run the appropriate checks before reporting completion.” | `verify-before-completion` | Meaningful completed code change. |
| “Validate the UI we just implemented, including its rendered states.” | `verify-before-completion` | Requires project-aware final checks. |
| “Before handing off this configuration change, prove the affected build still works.” | `verify-before-completion` | Completion claim needs evidence. |

### Negative

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Explain how Server Components work.” | No `verify-before-completion` | Explanation-only task. |
| “Summarize this document without editing files.” | No `verify-before-completion` | No repository modification. |
| “Why is this request failing with 401?” | `debug-first` | Diagnosis comes before completion checks. |

## safe-database-migration

### Positive

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Make `customer.email` required without losing existing rows.” | `safe-database-migration` | Constraint and backfill planning. |
| “Rename this production column safely across a rolling deployment.” | `safe-database-migration` | Compatibility-sensitive schema change. |
| “Add a unique index to this large table and inspect the generated migration.” | `safe-database-migration` | Index and existing-data risk. |

### Negative

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Optimize this read query without changing the schema.” | No `safe-database-migration` | Ordinary query work. |
| “Explain what a database transaction is.” | No `safe-database-migration` | Explanation-only request. |
| “Run the pending migration in production now.” | `safe-database-migration` (stop before execution) | The workflow must enforce explicit production authorization. |

## figma-to-production

### Positive

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Implement this Figma dashboard using our existing design system.” | `figma-to-production` | Figma-driven screen implementation. |
| “Build this responsive component from the attached design and compare the rendered result.” | `figma-to-production` | Design analysis and visual verification. |
| “Match the checkout page to this screenshot without duplicating our UI primitives.” | `figma-to-production` | Visual parity with reuse constraints. |

### Negative

| Prompt | Expected | Reason |
| --- | --- | --- |
| “Change this heading from Plans to Pricing.” | No `figma-to-production` | Isolated copy edit. |
| “Make the existing divider two pixels thicker.” | No `figma-to-production` | Simple styling change without design analysis. |
| “The mobile layout suddenly overlaps after yesterday’s commit; diagnose it.” | `debug-first` | Regression diagnosis is primary. |
