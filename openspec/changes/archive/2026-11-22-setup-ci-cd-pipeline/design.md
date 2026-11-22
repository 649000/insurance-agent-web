## Context

The repository is a Turborepo monorepo comprising a Next.js 16 (App Router) client application, Python 3.13 Firebase Cloud Functions, and Supabase PostgreSQL. Architectural rules strictly prohibit Next.js server-side mutations or route handlers, enforce zero live cloud in automated tests, and mandate mobile-first design and PDPA compliance.

## Goals / Non-Goals

**Goals:**
- Automate non-prod (SIT) deployment to Firebase Hosting (`insurance-agent-e9cbe`), Firebase Cloud Functions, and Supabase (`llhzdoqqdndjdrqdzzuc`) via GitHub Actions.
- Automate static application security testing (SAST) with Semgrep, Bandit/Ruff, and dependency auditing.
- Automate dynamic application security testing (DAST) via OWASP ZAP baseline scan against a locally served production preview.
- Automate hermetic database migration verification and RLS policy linting using the Supabase CLI in GitHub Actions.
- Scaffold Playwright E2E testing in `apps/web/e2e` verifying both mobile (375px viewport) and desktop responsiveness with zero horizontal scroll.

**Non-Goals:**
- Production onboarding (`deploy-prod.yml`) is deferred to a future phase per user instruction.
- Authoring exhaustive E2E tests for features not yet built (the E2E suite will establish the foundation and smoke verification of existing pages/components).

## Decisions

### 1. Next.js Static Export for Firebase Hosting
- **Choice**: Configure `output: 'export'` in `apps/web/next.config.mjs` outputting to `apps/web/out`.
- **Rationale**: Since `AGENTS.md` forbids `/app/api/*` routes and server actions in Next.js, the application is a pure client-side SPA with BaaS. Static export leverages Firebase Hosting's global CDN with zero server runtime overhead, zero cold starts, and lowest latency.
- **Alternative Considered**: Firebase App Hosting (SSR). Rejected due to unnecessary compute costs and violation of the pure client-side web application directive.

### 2. Hermetic Database & RLS Linting in CI
- **Choice**: Use the Supabase CLI (`supabase start`, `supabase db reset`, `supabase db lint`) in CI.
- **Rationale**: Validates that all migrations apply cleanly from scratch and that all tables enforce Row Level Security for multi-tenant and family dependent isolation (`parent_id = firebase_uid()`) without touching a live cloud database.
- **Alternative Considered**: Running tests directly against cloud staging. Rejected per Rule 5 (Zero live cloud in automated tests).

### 3. Playwright for End-to-End Testing (Mobile-First)
- **Choice**: Playwright test runner configured with `Desktop Chrome` and `Mobile Safari` (iPhone 13 viewport).
- **Rationale**: Provides native mobile emulation, touch target verification, and screenshot testing. Tests run against a local preview server with mocked backend responses or local emulators.

### 4. SAST and DAST Security Scanners
- **Choice**:
  - SAST: Semgrep (OWASP Top 10 ruleset), Python security checks (Bandit and Ruff), and `pnpm audit`.
  - DAST: OWASP ZAP Baseline Scan GitHub Action running passively against `http://localhost:3000`.
- **Rationale**: Provides comprehensive multi-layer security gating before merging.

### 5. Multi-Stage Pipeline Separation (`ci.yml` and `deploy-dev.yml`)
- **Choice**: Keep validation hermetic in `ci.yml` on pull requests. Dedicated `deploy-dev.yml` runs only on pushes to `develop` using GitHub Environment secrets (`FIREBASE_SERVICE_ACCOUNT_DEV`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD_DEV`).

## Risks / Trade-offs

- **[Risk]** DAST scan may report false positives for development localhost URLs.  
  → **Mitigation**: Use ZAP Baseline (passive mode) with custom rules file to target missing production HTTP headers (CSP, HSTS, X-Content-Type-Options).
- **[Risk]** Playwright browser downloads increasing CI runtime.  
  → **Mitigation**: Cache Playwright binaries using GitHub Actions cache keyed by Playwright version.
- **[Risk]** Database schema drift between local and SIT.  
  → **Mitigation**: CD applies migrations using `supabase db push` with strict idempotency.
