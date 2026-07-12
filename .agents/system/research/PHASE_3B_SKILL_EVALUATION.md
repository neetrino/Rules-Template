# Phase 3B external Skill evaluation

## Purpose

Persist the qualitative architecture and source review performed outside the repository, and record the source verification repeated before Phase 3C Batch 1.

## Evaluation criteria

Practical value, scope clarity, trigger quality, token efficiency, portability, safety, maintenance, license, overlap with existing Rules and Skills, and required adaptation.

## Accepted for Phase 3C Batch 1

- `code-review` — internal.
- `security-review` — internal.
- `react-performance-review` — external-adapted; implementation blocked because the pinned source has no verifiable license text.
- `ui-accessibility-review` — external-adapted; implementation blocked because the required secondary-source license cannot be verified at its pinned commit.

## Deferred to Batch 2

- `web-performance-audit`
- `api-contract-change`
- `safe-dependency-upgrade`

## Optional specialist candidates

- `design-direction`
- `react-component-architecture`
- `mcp-server-builder`

## Deferred pending real need

`browser-ui-validation` overlaps `verify-before-completion`, `figma-to-production`, and `debug-first`; add it only if real projects demonstrate a distinct workflow.

## Plugin-only candidates

Codex Security, Vercel Optimize, Cloudflare platform Skills, and Wrangler depend on platform tools, authentication, MCP/CLI capabilities, scripts, or larger plugin workflows. Do not vendor isolated fragments without their runtime assumptions.

## Rejected candidates

- `generic frontend-app-builder` — excessive scope and overlap.
- strict global TDD — rigid universal behavior that conflicts with risk-based testing.
- full Superpowers methodology — high context cost and excessive workflow control.
- automatic branch-finishing workflow — unnecessary Git control and overlap with user-owned release decisions.

## Evaluation matrix

| Candidate | Value | Scope/trigger | Portability | Safety/overlap | Decision |
| --- | --- | --- | --- | --- | --- |
| code-review | High | Clear review boundary | High | Complements debugging and verification | Internal Batch 1 |
| security-review | High for sensitive work | Explicit audit boundary | High | Must not replace Security Rule | Internal Batch 1 |
| react-performance-review | High for React/Next.js | Must be narrower than source | Medium–high | Requires project-aware adaptation and verified license | Blocked external import |
| ui-accessibility-review | High for UI quality | Separate review from implementation | High | Exclude brand preferences and verify all provenance | Blocked external import |
| web-performance-audit | High | Measurement-focused | Medium | Overlap with React and completion checks | Batch 2 |
| api-contract-change | Medium–high | Clear API evolution workflow | High | Overlap with API Rule | Batch 2 |
| safe-dependency-upgrade | Medium–high | Clear upgrade workflow | High | Needs supply-chain safeguards | Batch 2 |

## Sources reviewed

- OpenAI Plugins and Codex workflow documentation.
- Anthropic Skills materials.
- Vercel Agent Skills: `https://github.com/vercel-labs/agent-skills`.
- Vercel Web Interface Guidelines: `https://github.com/vercel-labs/web-interface-guidelines`.
- Cloudflare platform Skills.
- OpenAI Superpowers workflow discussions.

Repeated Phase 3C verification pinned:

- `vercel-labs/agent-skills@f8a72b9603728bb92a217a879b7e62e43ad76c81` — React source and secondary UI wrapper reviewed; no repository or package LICENSE file exists at this commit, GitHub License API returns no license record, and path-specific commit history contains no `LICENSE` or `LICENSE.md`. README and Skill frontmatter state MIT, but there is no exact license text or copyright notice to preserve.
- `vercel-labs/web-interface-guidelines@4e799d45c17aec1498c269287a83b9dba22b966b` — `command.md`, README, and MIT LICENSE reviewed.

No external scripts or install commands were executed.

## Limitations

Phase 3B was an external qualitative architecture and source review. No controlled benchmark comparing pass rate, token usage, or completion time has been run. Accepted Skills still require real-project evaluation after implementation. The current license blocker prevents a complete Batch 1 import and must not be represented as successful provenance review.

## External candidate disposition

### react-performance-review

Research decision: Accepted conceptually.

Implementation status: Blocked.

Reason: The reviewed pinned `vercel-labs/agent-skills` source declares MIT in metadata and repository documentation, but the exact applicable license text and notice required by the current External Skill Policy could not be verified from the pinned source.

Next action: Replace the source with a fully licensed alternative, obtain authoritative license clarification, or redesign the Skill as an independently authored internal workflow after a clean source-separation review.

### ui-accessibility-review

Research decision: Accepted conceptually.

Implementation status: Deferred to Batch 1B.

Primary source: `vercel-labs/web-interface-guidelines`.

Primary source license: Verified MIT license.

Secondary wrapper: `vercel-labs/agent-skills`.

Secondary wrapper status: Not required for content provenance if no content is copied or adapted from it.

Next action: Re-scope the implementation to use only the fully licensed primary source, and treat the wrapper only as a non-content research reference or remove it from implementation provenance entirely.
