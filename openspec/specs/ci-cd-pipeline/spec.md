# ci-cd-pipeline Specification

## Purpose
Automates hermetic testing, static and dynamic application security testing (SAST/DAST), database migration verification, and continuous delivery to the non-prod (SIT) environment for the insurance portfolio tracker.

## Requirements

### Requirement: Automated Database Migration and RLS Validation
The continuous integration pipeline SHALL start a containerized Supabase instance, reset and apply all timestamped PostgreSQL migrations from scratch, and execute security linting to verify that all tables enforce Row Level Security without vulnerabilities.

#### Scenario: Successful migration reset and lint in CI
- **WHEN** pull requests or commits are pushed to `develop` or `main`
- **THEN** Supabase CLI starts a local PostgreSQL container, executes `supabase db reset` cleanly without errors, and runs `supabase db lint` confirming zero high-severity policy flaws

### Requirement: Static Application Security Testing (SAST)
The continuous integration pipeline SHALL run static security analysis across frontend TypeScript code, Python Cloud Functions, and package dependencies, failing the build on critical or high vulnerabilities.

#### Scenario: Code security and dependency audit
- **WHEN** CI runs on any pull request or push
- **THEN** Semgrep executes code security analysis, Python security analysis (Bandit/Ruff) runs on `services/functions`, and `pnpm audit` verifies no critical CVEs exist in dependencies

### Requirement: Dynamic Application Security Testing (DAST)
The continuous integration pipeline SHALL execute an automated OWASP ZAP baseline scan against a locally served production preview of the Next.js web application to identify missing security headers and common web vulnerabilities.

#### Scenario: OWASP ZAP baseline check
- **WHEN** CI builds and serves the Next.js application shell locally
- **THEN** OWASP ZAP baseline scanner audits `http://localhost:3000` and reports no missing critical security headers (Content Security Policy, X-Content-Type-Options, Strict-Transport-Security)

### Requirement: End-to-End Testing (Playwright)
The test suite SHALL execute headless browser end-to-end tests covering critical mobile and desktop user flows, running entirely against hermetic local emulator endpoints with zero external cloud calls.

#### Scenario: Critical user journey verification
- **WHEN** E2E testing stage runs in CI
- **THEN** Playwright executes smoke tests verifying home page rendering, responsive navigation targets, and policy summary rendering without contacting live third-party cloud services

### Requirement: Non-Prod (SIT) Continuous Deployment Pipeline
The continuous delivery pipeline SHALL automatically deploy the static Next.js frontend to Firebase Hosting (`insurance-agent-e9cbe`), deploy Python Cloud Functions, and apply database migrations to the SIT Supabase project (`llhzdoqqdndjdrqdzzuc`) whenever commits are merged to the `develop` branch.

#### Scenario: Automated deployment on develop branch merge
- **WHEN** a change is merged to `develop`
- **THEN** GitHub Actions builds the static web bundle with SIT environment configurations, deploys hosting and functions to Firebase project `insurance-agent-e9cbe`, and applies database migrations to Supabase project `llhzdoqqdndjdrqdzzuc`
