## 1. Hosting & Build Configuration

- [x] 1.1 Configure `apps/web/next.config.mjs` for static export (`output: 'export'`) and verify `pnpm --filter @insurance-agent/web build` produces static output in `apps/web/out`.
- [x] 1.2 Update `firebase.json` with the `hosting` target pointing to `apps/web/out` with SPA rewrites and verify configuration.

## 2. End-to-End Testing (Playwright)

- [x] 2.1 Install `@playwright/test` in `apps/web` and create `apps/web/playwright.config.ts` configured for desktop and mobile viewports.
- [x] 2.2 Author initial mobile-first smoke tests in `apps/web/e2e/smoke.spec.ts` verifying layout, touch targets, and zero horizontal scroll.
- [x] 2.3 Add `test:e2e` script to root `package.json` and `apps/web/package.json`, and verify local test execution.

## 3. Advanced CI Security & Validation (`ci.yml`)

- [x] 3.1 Add containerized Supabase CLI database validation (`supabase start`, `supabase db reset`, `supabase db lint`) to `.github/workflows/ci.yml`.
- [x] 3.2 Add Static Application Security Testing (SAST) job to `ci.yml` covering Semgrep, Bandit/Ruff, and dependency auditing (`pnpm audit`).
- [x] 3.3 Add Dynamic Application Security Testing (DAST) job to `ci.yml` with OWASP ZAP baseline scanning against the local preview server.
- [x] 3.4 Add Playwright E2E execution job to `ci.yml` with browser caching.

## 4. Continuous Deployment to Non-Prod / SIT (`deploy-dev.yml`)

- [x] 4.1 Create `.github/workflows/deploy-dev.yml` triggered on merge to `develop` that injects SIT build environment variables and builds the web bundle.
- [x] 4.2 Add Firebase deployment step in `deploy-dev.yml` deploying hosting, storage rules, and functions to `insurance-agent-e9cbe`.
- [x] 4.3 Add Supabase migration push step in `deploy-dev.yml` to apply migrations cleanly to SIT project `llhzdoqqdndjdrqdzzuc`.
