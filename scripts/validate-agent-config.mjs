#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillRoot = join(repoRoot, '.agents', 'skills');
const ruleRoot = join(repoRoot, '.cursor', 'rules');
const agentSystemRoot = join(repoRoot, '.agents', 'system');
const errors = [];
const warnings = [];

function report(collection, file, reason) {
  collection.push({ file: relative(repoRoot, file), reason });
}

function filesUnder(root, predicate) {
  if (!existsSync(root)) return [];
  const found = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) found.push(...filesUnder(path, predicate));
    else if (predicate(path)) found.push(path);
  }
  return found;
}

function readSource(file) {
  return readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');
}

function readFrontmatter(file, source) {
  if (!source.startsWith('---\n')) {
    report(errors, file, 'YAML frontmatter is missing.');
    return null;
  }
  const end = source.indexOf('\n---\n', 4);
  if (end < 0) {
    report(errors, file, 'YAML frontmatter is not closed.');
    return null;
  }
  const fields = new Map();
  for (const line of source.slice(4, end).split('\n')) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (match) fields.set(match[1], match[2].trim().replace(/^(['"])(.*)\1$/, '$2'));
  }
  return fields;
}

function validateLocalLinks(file, source) {
  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of source.matchAll(linkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, '').split('#')[0];
    if (!rawTarget || /^(?:https?:|mailto:|tel:)/i.test(rawTarget)) continue;
    let target;
    try {
      target = decodeURIComponent(rawTarget);
    } catch {
      report(errors, file, `Markdown link has invalid encoding: ${rawTarget}`);
      continue;
    }
    if (!existsSync(resolve(dirname(file), target))) {
      report(errors, file, `Local Markdown link does not resolve: ${rawTarget}`);
    }
  }
}

function validateSkills() {
  if (!existsSync(skillRoot)) {
    report(errors, skillRoot, 'Canonical Skill directory is missing.');
    return;
  }
  const skillFiles = filesUnder(skillRoot, (file) => basename(file) === 'SKILL.md');
  const names = new Map();
  for (const file of skillFiles) {
    const source = readSource(file);
    const fields = readFrontmatter(file, source);
    if (!fields) continue;
    const name = fields.get('name') ?? '';
    const description = fields.get('description') ?? '';
    if (!name) report(errors, file, 'Frontmatter field "name" is required.');
    if (!description) report(errors, file, 'Frontmatter field "description" is required.');
    if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      report(errors, file, 'Skill name must be lowercase kebab-case.');
    }
    if (name && basename(dirname(file)) !== name) {
      report(errors, file, 'Skill name must match its direct parent directory.');
    }
    if (name && names.has(name)) {
      report(errors, file, `Duplicate Skill name also used by ${relative(repoRoot, names.get(name))}.`);
    } else if (name) names.set(name, file);
    if (description && (description.length < 40 || /^(?:helps? with development|useful skill|development skill|does things)\.?$/i.test(description))) {
      report(errors, file, 'Description is too generic; include action, trigger, and boundary.');
    } else if (description && !/\buse (?:when|for)\b/i.test(description)) {
      report(warnings, file, 'Description may be vague; state when the Skill should trigger.');
    }
    if (source.split('\n').length > 300) report(warnings, file, 'SKILL.md is excessively long; consider references.');
    if (!/^## Verification\b/m.test(source)) report(warnings, file, 'Skill lacks explicit verification guidance.');
    if (!/^## Output\b/m.test(source)) report(warnings, file, 'Skill lacks explicit output guidance.');
    validateLocalLinks(file, source);
  }
}

function validateRules() {
  if (!existsSync(ruleRoot)) {
    report(errors, ruleRoot, 'Cursor Rule directory is missing.');
    return;
  }
  for (const file of filesUnder(ruleRoot, (path) => path.endsWith('.mdc'))) {
    const source = readSource(file);
    if (!source.trim()) {
      report(errors, file, 'Rule file is empty.');
      continue;
    }
    const fields = readFrontmatter(file, source);
    if (fields) {
      const alwaysApply = fields.get('alwaysApply');
      if (alwaysApply !== undefined && !['true', 'false'].includes(alwaysApply)) {
        report(errors, file, 'alwaysApply must be true or false when present.');
      }
      if (!fields.has('globs')) {
        report(warnings, file, 'Rule has no globs field; verify task-only activation is intentional.');
      } else if (!/^\[.*\]$/.test(fields.get('globs'))) {
        report(errors, file, 'globs must use the repository array form, including [] for task-relevant Rules.');
      }
    }
    validateLocalLinks(file, source);
    if (/\.cursor\/skills|21-project-onboarding|99-project-size/.test(source)) {
      report(errors, file, 'Rule references a removed or migrated Skill path.');
    }
  }
}

function validateDocumentationLinks() {
  const files = [
    join(repoRoot, 'AGENTS.md'),
    join(repoRoot, 'README.md'),
    join(repoRoot, '.agents', 'README.md'),
    ...filesUnder(agentSystemRoot, (file) => file.endsWith('.md')),
  ];
  for (const file of files) {
    if (!existsSync(file)) {
      report(errors, file, 'Required Agent-system entry point or documentation file is missing.');
      continue;
    }
    validateLocalLinks(file, readSource(file));
  }
}

function validateArchitecturalIsolation() {
  const misplacedFiles = [
    'RULES_SKILLS_ARCHITECTURE.md',
    'SKILL_AUTHORING_GUIDE.md',
    'SKILL_TRIGGER_TESTS.md',
  ];
  for (const name of misplacedFiles) {
    const file = join(repoRoot, 'docs', name);
    if (existsSync(file)) {
      report(errors, file, 'Agent-system governance belongs under .agents/system/, not product docs/.');
    }
  }
}

validateSkills();
validateRules();
validateDocumentationLinks();
validateArchitecturalIsolation();

for (const item of errors) console.error(`ERROR\nFILE: ${item.file}\nREASON: ${item.reason}\n`);
for (const item of warnings) console.warn(`WARNING\nFILE: ${item.file}\nREASON: ${item.reason}\n`);

console.log(`Validated ${filesUnder(skillRoot, (file) => basename(file) === 'SKILL.md').length} Skills and ${filesUnder(ruleRoot, (file) => file.endsWith('.mdc')).length} Rules.`);
console.log(`Errors: ${errors.length}; Warnings: ${warnings.length}`);
process.exitCode = errors.length ? 1 : 0;
