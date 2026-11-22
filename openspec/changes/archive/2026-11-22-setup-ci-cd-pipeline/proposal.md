## Why

The repository currently possesses only baseline lint and unit testing with zero Continuous Delivery (CD) capabilities, automated security scanning, or database migration validation. Establishing an automated pipeline for non-prod (SIT) deployment, static/dynamic application security testing (SAST/DAST), hermetic database validation, and end-to-end (E2E) testing is essential to ensure code quality, compliance, and regression prevention before merging or shipping.

## What Changes

- **End-to-End Testing (Playwright)**: Scaffold Playwright in `apps/web/e2e` for critical user journeys and integrate into the CI test matrix.
- **Database Validation in CI**: Add local containerized Supabase CLI execution in CI to verify that migrations apply cleanly from scratch (`supabase db reset`) and pass security policy analysis (`supabase db lint`).
- **Static Application Security Testing (SAST)**: Add Semgrep, Python security scanning (Bandit & Ruff), and dependency vulnerability auditing (`pnpm audit`, `pip-audit`) to the CI workflow.
- **Dynamic Application Security Testing (DAST)**: Run an OWASP ZAP baseline scan against the locally built Next.js web application shell in CI.
- **Production Build Verification**: Add `pnpm build` verification step to CI to catch bundling and static export errors early.
- **Firebase Hosting Configuration**: Configure `firebase.json` and `apps/web/next.config.mjs` for static client bundle export (`apps/web/out`) with strict security headers.
- **Automated Non-Prod (SIT) Deployment (`deploy-dev.yml`)**: Create a GitHub Actions CD workflow that deploys to non-prod Firebase Hosting (`insurance-agent-e9cbe`), Firebase Cloud Functions, and applies Supabase migrations to SIT (`llhzdoqqdndjdrqdzzuc`) on merge to `develop`.

## Capabilities

### New Capabilities
- `ci-cd-pipeline`: Defines the specification for automated continuous integration (testing, database verification, SAST, DAST) and continuous deployment to the non-prod (SIT) environment.

### Modified Capabilities
None.

## Impact

- **Impacted Layers**:
  - **Shared Types**: Monorepo type-checking enforced before any build or deploy step.
  - **Supabase RLS & DB**: Automated migration tests in CI container; automated migration apply to SIT project `llhzdoqqdndjdrqdzzuc` in CD.
  - **Python Backend**: Dependency audit, security checks (Bandit/Ruff), pytest execution, and deployment to non-prod Firebase Functions.
  - **Frontend UI (`apps/web`)**: Static export build, Playwright test suite, OWASP ZAP baseline check, and deployment to Firebase Hosting (`insurance-agent-e9cbe`).
- **PDPA Compliance Verification**: Confirmed that all CI/CD pipelines, E2E test mock fixtures, and deploy scripts strictly prohibit collecting, storing, or logging Singapore NRIC/FIN numbers.
