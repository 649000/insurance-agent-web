# AGENTS.md — Engineering & AI Agent Operating Manual

> **Project**: `insurance-agent-web`  
> **Target Audience**: AI Agents (and human engineers) developing, maintaining, or auditing this repository.  
> **Mission**: A secure, modern insurance portfolio tracker for individuals and families in Singapore to manage, aggregate, and identify gaps in their insurance coverage (including children's policies).

---

## 1. Core Architectural Principles & Strict Boundaries

Every agent working on this codebase must adhere to the following architectural rules:

1. **NO Next.js Backend Code**:
   - The Next.js application is strictly a client-facing web application.
   - **FORBIDDEN**: Creating `/app/api/*` routes, Route Handlers (`route.ts`), or using Next.js for server-side business logic or mutations.
   - All data reading is done via the **Supabase JavaScript Client** secured by **Row Level Security (RLS)**.
   - All complex business logic, transactions, policy processing, and mutations are handled by **Python Firebase Functions**.
2. **Mobile-First Interaction**:
   - Every interface must be designed, styled, and tested mobile-first.
   - Ensure clean responsive layouts, touch-friendly hit targets, and zero horizontal scrolling on mobile viewports.
3. **Do Not Over-Engineer**:
   - Prefer the simplest implementation that satisfies the requirement.
   - Do not introduce abstractions, services, libraries, or infrastructure without a clear, measurable benefit.
   - Use existing `shadcn/ui` components rather than creating custom equivalents when a suitable component exists.
   - Prefer composition of small, focused components over large monolithic components.
4. **Strict Separation of Dev & Prod Environments**:
   - Distinct Firebase projects (`insurance-agent-dev`, `insurance-agent-prod`).
   - Distinct Supabase instances (`dev`, `prod`).
   - Configuration is injected via GitHub Actions Environments and environment variables. Never commit secrets or hardcode project IDs.
5. **Zero Live Cloud in Automated Tests**:
   - Automated tests must run 100% hermetically offline using the **Firebase Local Emulator Suite** and the local **Supabase CLI / Docker PostgreSQL** stack.

---

## 2. Tech Stack & Versioning Policy

Always use the **LTS (Long-Term Support)** or stable production release of all libraries and tools:

| Tier | Technology | Notes / Constraints |
| :--- | :--- | :--- |
| **Monorepo Manager** | Turborepo + `pnpm` (Node.js 20+ LTS) | Manages dependencies, build caching, and pipelines |
| **Python Environment**| `uv` (Python 3.11 / 3.12 LTS) | Ultra-fast virtualenv and lockfile management |
| **Frontend** | Next.js (LTS, App Router), React LTS | Static / Client-Side Rendering with BaaS |
| **Styling & UI** | Tailwind CSS + `shadcn/ui` + Lucide Icons | Accessible, headless, composable design system |
| **Authentication** | Firebase Auth (Client SDK) | Email/Password, Google Sign-In, Mandatory 2FA |
| **Object Storage** | Firebase Storage (GCS) | Secure policy document uploads (governed by OpenSpec) |
| **Primary Database** | Supabase PostgreSQL 15+ | Accessed via Supabase Client + Postgres RLS |
| **Serverless Backend**| Firebase Cloud Functions (Python runtime) | Firebase Callable Functions (`on_call`) |
| **Schema Validation** | `zod` (TypeScript), `pydantic` v2 (Python) | Runtime validation at all system boundaries |
| **Testing** | Vitest + React Testing Library + Playwright + Pytest | Offline, zero-cloud dependency |
| **CI/CD & Security** | GitHub Actions + CodeQL + Semgrep + OWASP ZAP | Automated testing, SAST, DAST, & DB migrations |

---

## 3. Singapore Domain & PDPA Compliance Directives

This application operates in the Singapore financial and insurance domain. Agents must enforce these data protection guidelines:

### 3.1 Strict NRIC / FIN Prohibition
* Under the Singapore **Personal Data Protection Act (PDPA)**, collecting and storing full NRIC/FIN numbers is restricted.
* **ABSOLUTE RULE**: Never create database columns, state fields, or form inputs for NRIC or FIN numbers.
* Primary keys and foreign relationships must exclusively use UUIDs.
* Document upload pipelines must provide client-side redaction tools. Any backend OCR/LLM pipeline that detects an NRIC pattern (`^[S|T|F|G|M]\d{7}[A-Z]$`) must immediately sanitize, mask (e.g., `S****123A`), or discard it.

### 3.2 Singapore Insurance Constructs
Agents must use standard enums reflecting the Singapore market:
* **Common Insurers**: AIA, Great Eastern, Prudential, Singlife, Income Insurance, Manulife, HSBC Life, FWD, Tokio Marine, Raffles Health, etc.
* **Core Policy Categories**:
  - `LIFE` (Term Life, Whole Life)
  - `HEALTH` (MediShield Life, Integrated Shield Plans [IP] & Riders)
  - `CRITICAL_ILLNESS` (Early Stage, Multi-Pay, Severe)
  - `DISABILITY` (CareShield Life, ElderShield, Supplements)
  - `PERSONAL_ACCIDENT`
  - `SAVINGS_ENDOWMENT`
  - `INVESTMENT_LINKED` (ILP)
* **Currency**: Singapore Dollars (`SGD`). Date format standard: `YYYY-MM-DD` (display: `DD/MM/YYYY`).

### 3.3 Family & Child Profile Isolation
* Users can create sub-profiles for their children.
* Child profile records are strictly owned by the parent account: `parent_id = auth.jwt() ->> 'sub'`.
* Supabase Row Level Security (RLS) must guarantee that no user can read or write policies or profiles belonging to another family.

---

## 4. Repository Structure

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Lint, Typecheck, Test, SAST, DAST
│       ├── deploy-dev.yml         # Dev deployment & migration apply
│       └── deploy-prod.yml        # Prod deployment (environment gated)
├── apps/
│   └── web/                       # Next.js LTS + shadcn/ui + Tailwind CSS
│       ├── src/
│       │   ├── app/               # App Router pages (NO api/ routes!)
│       │   ├── components/ui/     # shadcn/ui reusable primitives
│       │   ├── features/          # Feature slices (policies, family, analytics)
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   └── services/      # Supabase & Firebase function client calls
│       │   ├── lib/               # Supabase client, Firebase client init
│       │   └── types/             # Frontend-specific types
│       ├── tests/                 # Unit & integration tests (Vitest)
│       ├── e2e/                   # End-to-end tests (Playwright)
│       ├── package.json
│       └── tsconfig.json
├── services/
│   └── functions/                 # Python Firebase Cloud Functions
│       ├── src/
│       │   ├── main.py            # Function entry points (on_call)
│       │   ├── core/              # Config, Firebase Admin init, DB pool
│       │   ├── domain/            # Business logic, policy calculation, gap analysis
│       │   └── schemas/           # Pydantic v2 schemas
│       ├── tests/                 # pytest test suite
│       ├── pyproject.toml         # Managed via uv
│       └── requirements.txt       # Frozen for deployment
├── packages/
│   ├── shared/                    # Shared TypeScript interfaces & enums
│   │   └── src/
│   └── config/                    # Shared ESLint, Prettier, Tailwind presets
├── supabase/
│   ├── migrations/                # Supabase SQL migrations (timestamped)
│   ├── seed.sql                   # Local development seed data
│   └── config.toml                # Supabase local environment config
├── openspec/                      # Requirements and feature specifications
├── turbo.json                     # Turborepo task pipeline configuration
├── pnpm-workspace.yaml            # Monorepo workspace configuration
├── package.json
└── README.md
```

---

## 5. Authentication & Supabase RLS Integration

### 5.1 Authentication Flow
1. Users authenticate via Firebase Auth on the client (Email/Password or Google OAuth).
2. **Multi-Factor Authentication (2FA)** is enforced using Firebase MFA (TOTP or SMS).
3. The frontend retrieves the Firebase Auth ID Token (`await user.getIdToken()`).
4. The frontend initializes the Supabase client passing the Firebase JWT in the `Authorization` header:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   export const getSupabaseClient = (firebaseToken: string) => {
     return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
       global: {
         headers: {
           Authorization: `Bearer ${firebaseToken}`,
         },
       },
     });
   };
   ```

### 5.2 Row Level Security (RLS) Pattern
Every table in Supabase PostgreSQL must enable RLS:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

-- Helper to extract Firebase UID from JWT
CREATE OR REPLACE FUNCTION auth.firebase_uid()
RETURNS text AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$ LANGUAGE sql STABLE;

-- Example policy for policies table
CREATE POLICY "Users can only read own and dependent policies"
ON policies FOR SELECT
USING (
  user_id = auth.firebase_uid() OR
  profile_id IN (
    SELECT id FROM profiles WHERE parent_id = auth.firebase_uid()
  )
);
```

---

## 6. API Principles & Data Access

1. **Data Access Mechanism**:
   - Data access uses **Supabase PostgREST**; first-party internal client calls are not required to be REST/OpenAPI.
   - Public or external APIs (if any are introduced) must be RESTful, predictable, and documented with OpenAPI.
2. **Boundary Validation**:
   - Validate all external inputs at the boundary (via `zod` in TypeScript and `pydantic` v2 in Python).
3. **Never Trust Client-Provided Ownership**:
   - Never trust client-provided ownership or user IDs.
   - Authorization must be enforced by **Supabase RLS**, never by the frontend.
   - A user must never be able to access another user's resources simply by changing an ID in a request:
     ```text
     Example: Reading /policies/{policyId}
     The database RLS policy must verify that the authenticated user (or their dependent) owns the policy.
     Do not rely on the frontend to filter or enforce ownership.
     ```

---

## 7. OpenSpec Spec-Driven Development

All non-trivial work goes through OpenSpec. The specification is the single source of truth.

1. **Change-First Rule**:
   - Create or update an OpenSpec change before implementing any feature or behaviour change.
2. **Use the CLI**:
   - Use the CLI (`openspec new change "<name>"`); **never create change directories by hand**.
3. **Keep Artifacts Coherent**:
   - Keep the change's proposal, specs, design, and tasks coherent with the actual implementation.
   - Do not implement functionality that has not been specified in `/openspec`.
4. **No Silent Divergence**:
   - When implementation reveals a design or architecture issue, update the OpenSpec artifacts rather than diverging silently.
5. **Archive Upon Completion**:
   - Archive a change once its work is fully complete, tested, and verified.

---

## 8. Coding Principles & Style Guide

### 8.1 General
* Prefer readable, boring code over clever code.
* Keep functions and components small.
* Use descriptive names.
* Avoid premature abstractions.
* Avoid duplicated business logic.
* Do not silently change existing behaviour while implementing unrelated requirements.

### 8.2 TypeScript
* Use strict TypeScript (`"strict": true`).
* **Avoid `any`**. Use `unknown` with runtime parsing (`zod`) when handling dynamic data.
* Define explicit types for domain objects and API responses.
* Do not duplicate domain types unnecessarily; export from `packages/shared`.
* Prefer type-safe API and function contracts.

### 8.3 React
* Prefer functional components.
* Keep components focused on a single responsibility.
* Avoid excessive prop drilling (use context or component composition).
* Use composition where appropriate.
* Do not put business logic directly into presentation components when it can reasonably be separated.

### 8.4 Next.js
* Follow current Next.js LTS conventions (App Router).
* Prefer server-side components (RSC) for layout, structural shell, and static rendering where appropriate.
* **Do not add client-side state or `"use client"` unnecessarily**.
* **Strict Reminder**: Never create `/app/api/*` routes or server action mutations. Use Supabase client with RLS for reads and Python Firebase Functions for mutations.

### 8.5 Styling
* Use **Tailwind CSS**.
* Use **`shadcn/ui`** for standard UI primitives where appropriate.
* Avoid introducing another CSS framework or utility library.
* Avoid arbitrary custom CSS unless Tailwind/shadcn cannot reasonably achieve the requirement.
* Maintain consistent spacing, typography, and responsive behaviour (mobile-first).

### 8.6 Naming Conventions & Code Style
* **Files & Directories**: `kebab-case` (e.g., `policy-card.tsx`, `use-policy-list.ts`, `gap-analysis.service.ts`).
* **React Components & TS Types/Interfaces**: `PascalCase` (e.g., `PolicyCard`, `CoverageSummary`, `PolicyCategory`).
* **TypeScript Functions, Hooks & Variables**: `camelCase` (e.g., `usePolicyList`, `calculateCoverageGap`, `isPolicyActive`).
* **Constants & Global Enums**: `UPPER_SNAKE_CASE` (e.g., `INSURER_NAMES`, `DEFAULT_CURRENCY = 'SGD'`).
* **Python Modules & Functions**: `snake_case` (PEP 8 standard: e.g., `policy_calculator.py`, `calculate_coverage_gap()`).
* **Python Classes & Pydantic Models**: `PascalCase` (e.g., `PolicyIn`, `PolicyOut`, `CoverageCalculator`).
* **Database Tables & Columns**: `snake_case` (e.g., `policy_records`, `profile_id`, `sum_assured`).

---

## 9. Dependency Management Policy

Before adding any dependency:
1. **Check existing stack**: Check whether the existing stack already provides the required functionality.
2. **Check simplicity**: Check whether the functionality can be implemented simply without a dependency.
3. **Quality & Maintenance**: Prefer established, actively maintained libraries with wide adoption.
4. **No Trivial Dependencies**: Avoid adding dependencies for trivial utility functions (e.g., left-pad, simple date math).
5. **No Popularity Bias**: Do not add a library merely because it is popular or trendy.

---

## 10. Database Migrations & Pipeline Delivery

1. **Local Authoring**:
   - Migrations are authored using the Supabase CLI:
     `pnpm supabase migration new <name_of_migration>`
   - All migrations must be idempotent and backwards-compatible.
2. **CI Pipeline Validation**:
   - In GitHub Actions PR checks:
     - Spin up local Supabase container: `npx supabase start`
     - Run `npx supabase db reset` to verify that all migrations apply clean from scratch.
     - Run `npx supabase db lint` to check for security and RLS vulnerabilities.
3. **Deployment**:
   - `develop` branch merges trigger `supabase db push` to the Development DB.
   - `main` branch merges trigger an approval gate before running `supabase db push` to the Production DB.

---

## 11. Automated Testing Strategy (Zero Manual Testing)

The test suite must provide comprehensive coverage so that manual verification is unnecessary.

### 11.1 Testing Pyramid
1. **Frontend Unit & Component Tests** (`Vitest` + `React Testing Library`):
   - Test all utility functions, formatters, policy gap calculations, and UI components.
   - Run hermetically with mocked Supabase/Firebase client hooks.
2. **Backend Serverless Tests** (`pytest` + `pytest-mock`):
   - Test all business logic, policy analyzers, and calculation engines in `services/functions`.
   - Test Firebase Callable handlers with simulated auth contexts.
3. **Integration Tests** (Local Emulators):
   - Run tests against the **Firebase Local Emulator Suite** (Auth, Functions) and **Supabase Local Docker**.
   - Verify that RLS policies prevent unauthorized reads and writes across different user UIDs.
4. **End-to-End (E2E) Tests** (`Playwright`):
   - Critical user journeys tested headlessly in CI:
     1. User Sign Up + 2FA setup.
     2. Profile creation (Self + Child profile).
     3. Manual policy creation with coverage breakdown.
     4. Gap analysis dashboard verification on both mobile and desktop viewports.

### 11.2 Quality Gates
- **Branch Coverage**: Minimum **80%** on core business logic (coverage gap calculations, policy validation).
- Tests run on every pull request and push to `develop` and `main`.

---

## 12. Security & Privacy Baselines

Security is a non-negotiable, first-class requirement across this repository.

### 12.1 Universal Security Directives
1. **Never commit secrets**: No `.env` files with real keys, API keys, service account JSON files, or certificates in git history.
2. **Never hard-code credentials**: Inject all credentials via GitHub Actions Secrets or environment variables.
3. **Never expose server-side secrets to the browser**:
   - `NEXT_PUBLIC_*` must **only** contain public client keys (Firebase Client API Key, Supabase Anon Key).
   - The Supabase `service_role` key and Firebase Admin credentials must **never** touch frontend code or client bundles.
4. **Validate all external input**:
   - Runtime validation with `zod` for all frontend forms and client payloads.
   - Runtime validation with `pydantic` v2 for all Python Firebase Functions inputs.
5. **Enforce authentication and authorisation server-side**:
   - Never rely on client-side permission checks alone.
   - All authorization must terminate in Supabase RLS policies or verified Firebase Callable `context.auth` checks.
6. **Use parameterised database queries**:
   - Never concatenate or string-interpolate raw SQL queries. Use parameterized SQL or the Supabase query builder.
7. **Do not log sensitive data**:
   - Never log access tokens, JWTs, passwords, session IDs, or personal identifiable information (PII) to stdout or cloud logging.
8. **Follow least-privilege principles**:
   - Limit Firebase Admin, Google Cloud IAM roles, and Supabase service keys to the minimum required permissions.

### 12.2 Static Application Security Testing (SAST)
* **CodeQL**: Automated code analysis on every PR.
* **Semgrep**: Scans for insecure patterns, secret leaks, and insecure database access.
* **Bandit & Ruff**: Static analysis and linting for Python serverless functions.
* **ESLint Security Plugin**: Scans TypeScript/JavaScript for common web vulnerabilities.

### 12.3 Dynamic Application Security Testing (DAST)
* **OWASP ZAP**:
  - In CI, the Next.js app is built and previewed locally against the Firebase Emulator and Supabase test instance.
  - OWASP ZAP Baseline Scan runs against the local server (`http://localhost:3000`) to check for:
    - Missing security headers (CSP, HSTS, X-Content-Type-Options, etc.).
    - Insecure cookies, cross-site scripting (XSS), and CORS misconfigurations.

### 12.4 Dependency Auditing
* Automated dependency scanning via `pnpm audit` and `pip-audit` to fail builds on critical/high CVEs.

---

## 13. Server Cost & Resource Controls

To ensure minimal overhead and zero unnecessary cloud expenditure:
* **Firebase Functions (Python)**:
  - Set `min_instances = 0` across all functions (no idle compute costs).
  - Web callable functions capped at `memory = 256MB` and `timeout = 60s`.
  - Batch/document processing functions capped at `memory = 1024MB` and `timeout = 300s`.
* **Database Connections**:
  - Connect Python functions to Supabase via the **Supavisor connection pooler** (`port 6543`) with transaction mode to prevent connection exhaustion.

---

## 14. Implementation Rules for Agents

### 14.1 Before Making Changes
1. **Understand existing implementation**: Read relevant components, schemas, and specs before writing code.
2. **Identify smallest change**: Identify the smallest possible change that satisfies the requirement.
3. **Follow conventions**: Adhere strictly to existing project conventions and patterns.
4. **Check dependencies**: Check related components, APIs, and domain models before touching them.
5. **Do not modify unrelated files**: Keep changes tightly scoped to the immediate task.

### 14.2 When Implementing a Feature
Follow this exact order of execution:
1. Update the **domain model** (in `packages/shared` or Supabase schema) if required.
2. Update the **API contract** (Pydantic / Zod schemas) if required.
3. Implement **backend behaviour** (Python Firebase Functions / Supabase RLS).
4. Implement **frontend behaviour** (Next.js components, hooks, services).
5. Add or update **automated tests** (unit, integration, and E2E).
6. Verify **responsive behaviour** on mobile and desktop viewports.
7. Verify **error and empty states** (never assume only happy paths exist).

> **Crucial Rule**: Do not consider a feature complete merely because the happy path works.

### 14.3 Non-Negotiable Agent Prohibitions
1. **No Next.js API Routes**: Never create `app/api/*`, `pages/api/*`, or custom backend server handlers in Next.js.
2. **No NRIC/FIN Collection**: Never introduce database columns, form fields, or variables for NRIC or FIN.
3. **No `@ts-ignore` or `any`**: TypeScript must pass with strict checking. Use `unknown` with `zod` parsing if a type is dynamic.
4. **No Un-tested Code**: Never complete a feature or bug fix without adding or updating corresponding unit/integration tests.
5. **No TODOs / Mock Placeholders**: Never commit incomplete code with `// TODO: implement later` or placeholder responses.
6. **Spec First**: Always inspect `/openspec` before creating new modules or changing schemas. Keep specs synchronized with code.

---

## 15. Git Hygiene & Definition of Done

### 15.1 Git Hygiene
* Keep changes focused and small.
* Prefer small, logically coherent commits.
* Commit messages must follow the **Conventional Commits** specification:
  - `feat(web): ...`
  - `feat(functions): ...`
  - `fix(supabase): ...`
  - `test(e2e): ...`
  - `chore(ci): ...`
* **Do NOT**:
  - Commit generated files unnecessarily (`dist`, `.turbo`, `.next`).
  - Commit secrets, `.env` files, or local configuration.
  - Reformat unrelated files or change indentation arbitrarily.
  - Mix unrelated refactoring with feature work.

### 15.2 Definition of Done
A task or change is considered complete **only** when all of the following criteria are met:
1. The requested behaviour works as specified.
2. Existing functionality still works (no regressions).
3. The implementation follows the project's architecture, boundaries, and conventions.
4. Appropriate runtime validation exists (`zod` / `pydantic`).
5. Authentication and authorisation are correctly enforced (Supabase RLS & Firebase Auth).
6. Tests have been added or updated (unit, integration, and E2E where applicable).
7. The UI works responsively on both mobile and desktop viewports.
8. No unnecessary dependencies or architectural complexity have been introduced.

---

## 16. Local Development & Verification Commands

Agents must use these standardized commands to build, run, and verify the codebase locally:

| Command | Purpose | Scope / Tool |
| :--- | :--- | :--- |
| `pnpm dev` | Start Next.js local development server | Frontend (`apps/web`) |
| `pnpm build` | Typecheck and build all workspaces | Turborepo pipeline |
| `pnpm lint` | Run ESLint (TypeScript) and Ruff (Python) | Turborepo pipeline |
| `pnpm typecheck` | Run TypeScript compiler type-checking | Monorepo (`tsc --noEmit`) |
| `pnpm test` | Run hermetic unit & component tests | Vitest + Pytest |
| `pnpm test:e2e` | Run headless end-to-end user tests | Playwright |
| `npx supabase start` | Spin up local Postgres + PostgREST + Studio | Local Supabase Docker |
| `npx supabase db reset` | Re-apply all SQL migrations from scratch | Migration verification |
| `pnpm supabase migration new <name>` | Generate a new timestamped migration | DB schema changes |
| `firebase emulators:start` | Start Auth, Functions, and Storage emulators | Firebase CLI |
| `openspec new change "<name>"` | Create a new specification change folder | OpenSpec CLI |

