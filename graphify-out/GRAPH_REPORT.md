# Graph Report - insurance-agent-web  (2026-11-22)

## Corpus Check
- 57 files · ~28,899 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 396 nodes · 468 edges · 40 communities (20 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fafbfbfe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- policy.ts
- AGENTS.md — Engineering & AI Agent Operating Manual
- calculate_coverage_gap
- page.tsx
- with
- package.json
- compilerOptions
- compilerOptions
- web/package.json
- 20261122000000_init_schema.sql
- tasks
- shared/package.json
- openspec-explore/SKILL.md
- opsx-explore.md
- config/package.json
- 8. Coding Principles & Style Guide
- rules
- firebase.ts
- layout.tsx
- scripts
- next.config.mjs
- web/AGENTS.md
- pnpm-workspace.yaml
- README.md
- insurance-agent-functions

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `AGENTS.md — Engineering & AI Agent Operating Manual` - 17 edges
3. `compilerOptions` - 17 edges
4. `cn()` - 12 edges
5. `calculate_coverage_gap()` - 10 edges
6. `HomePage()` - 9 edges
7. `scripts` - 8 edges
8. `tasks` - 7 edges
9. `8. Coding Principles & Style Guide` - 7 edges
10. `scripts` - 7 edges

## Surprising Connections (you probably didn't know these)
- `8.6 Naming Conventions & Code Style` --references--> `calculate_coverage_gap()`  [INFERRED]
  AGENTS.md → services/functions/src/domain/policy_calculator.py
- `8.6 Naming Conventions & Code Style` --references--> `PolicyCategory`  [INFERRED]
  AGENTS.md → packages/shared/src/constants/categories.ts
- `3.4 Singapore Locale, Language & Formatting Conventions` --references--> `formatSgd()`  [INFERRED]
  AGENTS.md → packages/shared/src/utils/formatters.ts
- `3.4 Singapore Locale, Language & Formatting Conventions` --references--> `formatSgDate()`  [INFERRED]
  AGENTS.md → packages/shared/src/utils/formatters.ts
- `3.4 Singapore Locale, Language & Formatting Conventions` --references--> `formatSgDateLong()`  [INFERRED]
  AGENTS.md → packages/shared/src/utils/formatters.ts

## Import Cycles
- None detected.

## Communities (40 total, 20 thin omitted)

### Community 0 - "policy.ts"
Cohesion: 0.06
Nodes (34): 3.1 Strict NRIC / FIN Prohibition, 3.2 Singapore Insurance Constructs, 3.3 Family & Child Profile Isolation, 3.4 Singapore Locale, Language & Formatting Conventions, 3. Singapore Domain & PDPA Compliance Directives, CATEGORY_DETAILS, CategoryMetadata, DEFAULT_CURRENCY (+26 more)

### Community 1 - "AGENTS.md — Engineering & AI Agent Operating Manual"
Cohesion: 0.07
Nodes (28): 10. Database Migrations & Pipeline Delivery, 11.1 Testing Pyramid, 11.2 Quality Gates, 11. Automated Testing Strategy (Zero Manual Testing), 12.1 Universal Security Directives, 12.2 Static Application Security Testing (SAST), 12.3 Dynamic Application Security Testing (DAST), 12.4 Dependency Auditing (+20 more)

### Community 2 - "calculate_coverage_gap"
Cohesion: 0.11
Nodes (9): get_supabase_db_url(), initialize_firebase(), calculate_coverage_gap(), analyze_coverage_gap(), CoverageGapRequest, CoverageGapResponse, CoverageSummaryItem, test_calculate_coverage_gap_with_active_policies() (+1 more)

### Community 3 - "page.tsx"
Cohesion: 0.20
Nodes (18): class-variance-authority@^0.7.1, react@^19.0.0, HomePage(), Badge(), BadgeProps, badgeVariants, Button, ButtonProps (+10 more)

### Community 4 - "with"
Cohesion: 0.09
Nodes (21): jobs, verify, name, on, pull_request, push, branches, branches (+13 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (20): devDependencies, prettier@^3.4.2, turbo@^2.3.3, typescript@^5.7.2, engines, node, typescript, name (+12 more)

### Community 6 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, declaration, declarationMap, esModuleInterop, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitAny (+11 more)

### Community 8 - "web/package.json"
Cohesion: 0.06
Nodes (45): dependencies, clsx@^2.1.1, @insurance-agent/config@workspace:*, @insurance-agent/shared@workspace:*, lucide-react@^1.77.0, react-dom@^19.0.0, @supabase/supabase-js@^2.47.10, tailwind-merge@^3.7.1 (+37 more)

### Community 9 - "20261122000000_init_schema.sql"
Cohesion: 0.39
Nodes (7): idx_policies_category, idx_policies_profile_id, idx_policies_user_id, idx_profiles_parent_id, idx_profiles_user_id, public.policies, public.profiles

### Community 10 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, dependsOn, $schema, tasks, build (+8 more)

### Community 11 - "shared/package.json"
Cohesion: 0.15
Nodes (14): dependencies, zod@^4.6.7, devDependencies, typescript@^5.7.2, typescript, zod, main, name (+6 more)

### Community 12 - "openspec-explore/SKILL.md"
Cohesion: 0.17
Nodes (11): Check for context, Ending Discovery, Guardrails, Handling Different Entry Points, OpenSpec Awareness, Planning a Change, The Stance, What You Don't Have To Do (+3 more)

### Community 13 - "opsx-explore.md"
Cohesion: 0.18
Nodes (10): Check for context, Ending Discovery, Guardrails, OpenSpec Awareness, Planning a Change, The Stance, What You Don't Have To Do, What You Might Do (+2 more)

### Community 14 - "config/package.json"
Cohesion: 0.22
Nodes (8): exports, ./eslint, ./prettier, ./tailwind, main, name, private, version

### Community 15 - "8. Coding Principles & Style Guide"
Cohesion: 0.25
Nodes (8): 8.1 General, 8.2 TypeScript, 8.3 React, 8.4 Next.js, 8.5 Styling, 8.6 Naming Conventions & Code Style, 8. Coding Principles & Style Guide, PolicyCategory

### Community 16 - "rules"
Cohesion: 0.25
Nodes (7): context, rules, design, proposal, tasks, schema, Must follow execution order

### Community 17 - "firebase.ts"
Cohesion: 0.29
Nodes (6): firebase@^13.4.0, app, auth, firebaseConfig, functions, firebase

### Community 18 - "layout.tsx"
Cohesion: 0.29
Nodes (4): next@^16.4.6, metadata, viewport, next

### Community 19 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, typecheck

## Knowledge Gaps
- **1 isolated node(s):** `insurance-agent-functions`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 222 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `web/package.json` to `policy.ts`, `page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **What connects `insurance-agent-functions` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `policy.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06155632984901278 - nodes in this community are weakly interconnected._
- **Why does `AGENTS.md — Engineering & AI Agent Operating Manual` connect `AGENTS.md — Engineering & AI Agent Operating Manual` to `policy.ts`, `8. Coding Principles & Style Guide`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `AGENTS.md — Engineering & AI Agent Operating Manual` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Why does `8.6 Naming Conventions & Code Style` connect `8. Coding Principles & Style Guide` to `calculate_coverage_gap`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Should `calculate_coverage_gap` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._