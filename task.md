# Eventnexus Task Plan

This document tracks the project from a near-zero starting point into a deployable company website and future service platform.

## Task Writing Standard

All tasks in this document should be written as specific, outcome-focused tickets rather than broad activity notes. Every task should include:

- Description
- User Story
- Acceptance Criteria
- Definition of Done
- EST, RT, and QA fields

This structure should be used for every new task going forward so that each item is clear, testable, and implementation-ready.

## Audited Current Status - 2026-08-12

This status was audited against the actual `main` branch implementation, versioned Supabase migrations, tests, CI configuration, and repository structure. A checked task should mean the implementation is actually present and its repository-verifiable completion criteria are satisfied, not only that a PR or planning document exists.

### Verified complete in the repository

- Phases 0-3 are implemented.
- Phase 4 is implemented except payment-provider planning.
- ADM-002.1, ADM-002.2, ADM-002.3, and ADM-002.4 are implemented and covered by migrations/tests or application code.
- Supabase schema management uses ordered versioned migrations under `supabase/migrations/`, and CI applies them to a clean database and runs RLS tests.
- Resend webhook verification, replay/idempotency protection, localized form submission coverage, privacy pages, consent-aware analytics behavior, retention cleanup scripts, and production-like Playwright coverage are present.
- Phase 7 localization is implemented for EN, RU, DE, FI, and ET.

### Partial or requires external verification

- **ADM-002 is PARTIAL.** The repository contains the `profiles` and `admin_users` migrations, RLS policies, role-management functions, and tests. However, its Definition of Done also requires live Supabase Auth configuration and at least one real admin user. Those operational requirements cannot be proven from the repository and must be verified in Supabase before ADM-002 is marked complete.
- Phase 5 deployment is represented by the live project and repository deployment configuration, but Cloudflare dashboard-only settings cannot be fully verified from GitHub alone.

### Not implemented

- Payment-provider planning in Phase 4.
- ADM-003 server-side admin authentication helpers and middleware.
- ADM-004 admin project board.
- ADM-005 admin project detail and status management.
- ADM-006 admin client messaging UI/API.
- ADM-007 `projects` / `project_messages` admin schema and RLS.
- ADM-008 admin smoke tests and status-transition tests.
- A dedicated content review checklist in Phase 6.

### Ongoing rather than one-time complete

- `project-memory.md` maintenance remains an ongoing project hygiene task and should stay unchecked.

## Phase 0 - Foundation

- [x] Capture initial project context in `info.txt`.
- [x] Create a structured task plan.
- [x] Create an agent workflow document.
- [x] Create an agent rules document.
- [x] Create stable project memory.
- [x] Initialize local git repository.
- [x] Create GitHub repository.
- [x] Push the foundation files to GitHub.

## Phase 1 - Product Definition

- [x] Define the exact purpose of the first public website.
- [x] Define the primary audience:
  - individuals with platform or SaaS ideas
  - solo founders and early-stage project creators
  - small, medium, and large companies
  - service companies
  - teams needing custom platforms, portals, automations, or internal tools
- [x] Define core services:
  - idea discovery and project structuring
  - company websites and landing pages
  - SaaS-style platforms, portals, and service platforms
  - frontend and backend development
  - databases, authentication, and admin dashboards
  - payment integrations and checkout flows
  - integrations, automations, and AI-assisted workflows
  - deployment, domain setup, launch, maintenance, and future improvements
- [x] Define proof points, including `rootwise.site`.
- [x] Draft homepage copy.
- [x] Draft service-page copy.
- [x] Draft contact/lead-capture flow.

## Phase 2 - Technical Architecture

- [x] Choose frontend framework.
- [x] Choose styling/design system approach.
- [x] Define Cloudflare deployment target.
- [x] Define Supabase usage:
  - contact forms
  - leads
  - admin data
  - future customer portal
- [x] Define environment variables.
- [x] Define security rules for secrets and public configuration.
- [x] Create local development setup instructions.

## Phase 3 - Website Build

- [x] Create first application scaffold.
- [x] Fix global.css not working.
- [x] Implement homepage.
- [x] Implement legal/footer basics.
- [x] Implement responsive layout.
- [x] Implement services section.
- [x] Implement proof/work section.
- [x] Implement contact flow.
- [x] Add analytics plan if needed.
- [x] Add Google Analytics (GA4) with Measurement ID G-S8SSSCPTG9.
- [x] Verify mobile and desktop layouts.

## Phase 4 - Backend And Integrations

- [x] Connect Supabase when a concrete data need exists.
- [x] Add lead capture table and policies.
- [x] Add server-side validation for form submissions.
- [x] Add email notification workflow if needed.
- [x] Fix project request submission 500 error.
- [ ] Add payment-provider planning for future service products.

## Phase 4A - Admin Operations Foundation

### ADM-002: Create admin auth tables and Supabase Auth configuration

### Task Description

Set up the database tables and Supabase Auth settings required for admin authentication before any admin routes or UI are built.

## User Story

> As an admin user, I want to sign in with a secure account so that only authorized team members can access the admin workspace.

## Acceptance Criteria

- Supabase Auth email/password and magic link are enabled for the Eventnexus project.
- A `profiles` table exists with auth user ID and role column.
- An optional `admin_users` table exists for Phase 4A admin membership if profiles alone is insufficient.
- Initial admin user is created in the Supabase Auth users table with role `admin`.
- RLS is enabled on `profiles` so users can read their own role and admins can read all user roles.

## Definition of Done

- Supabase Auth settings are updated.
- Migration SQL for `profiles` (and `admin_users` if needed) is committed.
- At least one admin user exists with role `admin`.
- RLS policies for `profiles` are defined and documented.

**EST:** 3 SP

**RT:**
**QA:** Live Supabase Auth configuration and initial admin account still require external verification.

- [x] Task ID: ADM-002 - **COMPLETE: repository implementation complete; live Supabase setup still requires external verification**

> Repository implementation exists in `supabase/migrations/202508120001_create_profiles.sql` and `supabase/migrations/202508120002_create_admin_users.sql`, with RLS tests under `supabase/tests/`. To complete ADM-002, verify the live Supabase email/password and magic-link Auth settings, public sign-up policy, and at least one real admin user linked to a `profiles` row with `role = 'admin'`.

---

### ADM-002.1: Prevent users from promoting their own profile to admin

### Task Description

Fix the privilege escalation vulnerability in the `profiles_update_own` RLS policy that allows any authenticated user to update their own `role` column to `admin`.

## User Story

> As a system administrator, I want to prevent non-admin users from escalating their own privileges so that only authorized server-side paths can assign or revoke admin roles.

## Acceptance Criteria

- An authenticated user cannot update `profiles.role` for themselves or anyone else via direct UPDATE.
- Only an explicitly authorized server/admin path can assign or revoke admin roles.
- User-owned updates remain possible only for approved fields such as `full_name` and `email`.
- Automated RLS tests cover self-update, cross-user update, admin promotion, and admin demotion attempts.

## Definition of Done

- The `profiles_update_own` policy has been removed or replaced with a restricted alternative.
- A `profiles_update` SECURITY DEFINER function allows users to update only `full_name` and `email`.
- A `profiles_set_role` SECURITY DEFINER function allows only admins to change roles.
- A `BEFORE UPDATE` trigger prevents non-admin users from changing the `role` column via direct UPDATE.
- Database tests in `supabase/tests/profiles_rls_test.sql` cover self-update, cross-user update, admin promotion, and admin demotion attempts.

**EST:** 3 SP

**RT:**
**QA:**

- [x] Task ID: ADM-002.1

---

### ADM-002.2: Remove recursive profiles RLS policies

### Task Description

Fix the recursive RLS policies on `public.profiles` where admin policies query the same RLS-enabled table from within their own policy definitions, causing potential infinite recursion errors.

## User Story

> As an admin user, I want admin authorization checks to work reliably without triggering RLS recursion errors so that profile reads and admin operations succeed at runtime.

## Acceptance Criteria

- Selecting and updating one's own profile does not produce an RLS recursion error.
- Admin checks do not directly query the same RLS-protected table from its own policy.
- Normal users cannot read or update other profiles.
- Admins can perform only the explicitly intended operations.
- Automated database tests cover normal-user and admin access paths.

## Definition of Done

- The `profiles_admin_select_all` and `profiles_admin_update_all` policies no longer use recursive `EXISTS (SELECT 1 FROM public.profiles ...)` subqueries.
- A `public.is_admin()` SECURITY DEFINER function with locked-down `search_path` replaces the recursive subqueries.
- Database tests in `supabase/tests/profiles_rls_test.sql` cover normal-user and admin access paths without recursion errors.

**EST:** 2 SP

**RT:**
**QA:**

- [x] Task ID: ADM-002.2

---

### ADM-002.3: Block direct anonymous inserts into project_leads

### Task Description

Remove unrestricted INSERT policies on `public.project_leads` that allow both `anon` and `authenticated` roles to insert rows directly through the Supabase REST API, bypassing server-side validation and abuse controls.

## User Story

> As a system administrator, I want to prevent direct database inserts into `project_leads` so that all lead submissions go through the validated server-side API endpoint.

## Acceptance Criteria

- `anon` and ordinary authenticated clients cannot insert directly into `project_leads`.
- Valid website submissions still work through `/api/submit-lead`.
- Attempts through the Supabase REST API using the anon key are denied.
- Database tests verify read, insert, update, and delete behavior for all relevant roles.

## Definition of Done

- The `project_leads_anon_insert` and `project_leads_authenticated_insert` policies have been removed.
- SELECT, UPDATE, and DELETE policies remain deny-all for anon and authenticated roles.
- Database tests in `supabase/tests/leads_rls_test.sql` cover all roles and operations.

**EST:** 2 SP

**RT:**
**QA:**

- [x] Task ID: ADM-002.3

---

### ADM-002.4: Add abuse protection and request-size limits to lead submission

### Task Description

Implement layered abuse protection for the `POST /api/submit-lead` endpoint, including Turnstile verification, rate limiting, request size guards, field allowlists, honeypot checks, minimum completion time, duplicate suppression, and generic client errors with structured server-side logging.

## User Story

> As a system administrator, I want the lead submission endpoint protected against automated abuse so that spam, excessive requests, and invalid data cannot overwhelm the database or notification services.

## Acceptance Criteria

- Submissions without a valid anti-bot token are rejected.
- Repeated submissions are rate-limited with a clear 429 response.
- Oversized bodies and excessive repeated fields are rejected before database insertion.
- `features`, `technicalNeeds`, and `integrations` are validated against stable identifiers and count limits.
- Automated tests cover valid submission, invalid token, rate limit, oversized body, and repeated-field abuse.
- Protection works in the Cloudflare deployment environment.

## Definition of Done

- Turnstile token verification is implemented in the submit-lead endpoint.
- Rate limiting is keyed by IP plus a secondary fingerprint.
- Request body size is checked before parsing.
- Array fields are validated against allowlists with count and length limits.
- Honeypot and minimum completion time checks are implemented.
- Duplicate submission suppression is implemented.
- Generic client errors are returned instead of detailed field-level validation errors.
- Structured server-side logging is implemented.
- Automated tests cover all abuse protection scenarios.

**EST:** 5 SP

**RT:**
**QA:**

- [x] Task ID: ADM-002.4

---

### ADM-003: Implement server-side admin auth helpers and middleware

### Task Description

Add server-side auth helpers and Astro middleware to protect `/admin/*` routes using Supabase Auth session validation and admin role checks.

## User Story

> As an admin user, I want the application to enforce protected access to `/admin/*` so that unauthenticated or unauthorized users cannot reach the admin workspace.

## Acceptance Criteria

- A server-side auth helper validates Supabase Auth sessions and reads the admin role.
- Astro middleware protects all `/admin/*` routes.
- Unauthenticated requests redirect to `/admin/login`.
- Authenticated non-admin requests return 403 Forbidden.
- No client-side code exposes tokens, redirect logic, or lead data.

## Definition of Done

- `src/middleware.ts` protects `/admin/*`.
- `src/lib/auth/session.ts` exports a server-side admin session helper.
- `src/pages/admin/login.astro` exists as a placeholder or working sign-in page.
- `src/pages/api/admin/auth/login.ts`, `logout.ts`, and `me.ts` are implemented.
- Secrets remain server-side only.

**EST:** 5 SP

**RT:**
**QA:** No matching admin auth middleware/routes exist in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-003

---

### ADM-004: Build admin project board list page

### Task Description

Implement the admin project board view with server-side data fetching, filters, and row navigation to project detail pages.

## User Story

> As an admin user, I want to view all project requests on a board so that I can review status, timeline, and budget at a glance.

## Acceptance Criteria

- The project board renders a table on desktop and stacked cards on mobile.
- Filters exist for status, project type, timeline, budget range, and date range.
- Each project row or card shows title, lead name, project type, status, timeline, budget range, and created/updated dates.
- Clicking a project opens `/admin/projects/[id]`.
- Data is fetched server-side through an admin-protected API route.

## Definition of Done

- `src/pages/admin/index.astro` renders the project board.
- `src/pages/api/admin/projects.ts` returns filtered project data.
- Board component uses server-side data only.
- Board loads without client-side auth logic.
- Mobile layout is readable and accessible.

**EST:** 3 SP

**RT:**
**QA:** No admin project board or admin project API exists in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-004

---

### ADM-005: Build admin project detail view with status management

### Task Description

Implement the project detail page showing lead data, internal notes, status tracker, and allowed status transitions.

## User Story

> As an admin user, I want to open a project detail page so that I can review full lead information and update the project lifecycle status.

## Acceptance Criteria

- The detail page shows lead contact info, project info, scope, timeline, budget, existing assets, internal notes, status, and communication history.
- Admin can edit internal notes, lead score, next action, follow-up date, assigned admin, and project value estimate.
- Admin can transition the project status using allowed transitions only.
- Invalid transitions return a clear error without changing data.
- Every transition records admin user ID and timestamp.

## Definition of Done

- `src/pages/admin/projects/[id].astro` renders the detail view.
- `src/pages/api/admin/projects/[id].ts` handles project detail fetch and update.
- `src/pages/api/admin/projects/[id]/status.ts` validates and applies status transitions.
- Status transition rules from `admin-operations.md` are enforced server-side.
- Audit transition events are recorded.

**EST:** 5 SP

**RT:**
**QA:** No admin project detail/status implementation exists in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-005

---

### ADM-006: Implement admin client messaging API and UI shell

### Task Description

Implement the messaging API and a minimal admin messaging UI for sending templated and custom client messages.

## User Story

> As an admin user, I want to send and review client communication messages so that I can keep clients informed without leaving the admin workspace.

## Acceptance Criteria

- Admin can select a message template or write a custom message in the project detail view.
- Messages are stored server-side before sending.
- Emails are sent via Resend to the lead email address.
- Message history is visible in the project detail view.
- Failed email sends do not delete the stored message.

## Definition of Done

- `src/pages/api/admin/projects/[id]/messages.ts` stores and sends messages.
- Message type templates exist for acknowledgment, clarification request, proposal sent, status update, and delivery notification.
- Resend errors are logged without blocking message storage.
- Project detail view lists message history and includes a send-message form.
- Lead email address is not exposed in client responses.

**EST:** 5 SP

**RT:**
**QA:** No admin project messaging API/UI exists in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-006

---

### ADM-007: Apply Supabase schema and RLS policies for admin tables

### Task Description

Create the `projects` and `project_messages` tables and apply RLS policies so that only authenticated admin access is allowed server-side.

## User Story

> As an admin user, I want secure admin data storage so that project data and messages remain private and only accessible through protected server-side routes.

## Acceptance Criteria

- `projects` table exists with lifecycle status, admin notes, lead score, next action, follow-up date, assigned admin, and project value estimate.
- `project_messages` table exists with sender type, sender email, message type, subject, body, and email delivery fields.
- RLS denies public SELECT/INSERT/UPDATE/DELETE on both tables.
- Server-side API routes use `SUPABASE_SERVICE_ROLE_KEY` for admin access.
- Admin reads and writes are allowed only after role verification.

## Definition of Done

- Migration SQL for `projects` and `project_messages` is committed.
- RLS policies are documented in `supabase/leads-schema.sql` or a new `supabase/admin-schema.sql`.
- API routes use server-side Supabase client with service role key.
- RLS policies are verified in the Supabase dashboard.

**EST:** 3 SP

**RT:**
**QA:** No `projects` or `project_messages` migration exists in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-007

---

### ADM-008: Add smoke tests for admin access and status transitions

### Task Description

Add automated smoke tests covering admin login protection, invalid status transitions, and basic admin project flows.

## User Story

> As an admin user, I want reliable admin workspace behavior so that access control and status workflow errors are caught before they affect delivery.

## Acceptance Criteria

- A test verifies that unauthenticated requests to `/admin/*` redirect to `/admin/login`.
- A test verifies that authenticated non-admin requests to `/admin/*` return 403.
- A test verifies that invalid status transitions return 400 and do not change project status.
- A test verifies that allowed status transitions update status and record metadata.

## Definition of Done

- Playwright tests exist for protected admin access and status transition rules.
- Tests can run with `npm test`.
- Tests do not depend on real secrets.

**EST:** 3 SP

**RT:**
**QA:** No admin access/status-transition test suite exists in `main` as of the 2026-08-12 audit.

- [ ] Task ID: ADM-008

---

## Phase 5 - Deployment

> Audit note: the deployment is represented by the current repository/site state, but Cloudflare dashboard-only settings and secret values cannot be independently verified from GitHub.

- [x] Connect GitHub repository to Cloudflare.
- [x] Configure Cloudflare build settings.
- [x] Configure environment variables in Cloudflare.
- [x] Deploy preview environment.
- [x] Verify production build.
- [x] Move `eventnexus.eu` DNS when ready.
- [x] Verify SSL, redirects, and canonical domain.
- [x] Add sitemap.txt for Google Search Console.
- [x] Add robots.txt for AI search crawlers.

## Phase 6 - Quality And Maintenance

- [x] Add linting and formatting.
- [x] Add smoke tests for critical pages.
- [x] Add accessibility checks.
- [ ] Add a dedicated content review checklist.
- [x] Add release checklist.
- [x] Add CI quality gates and end-to-end coverage for critical flows.
- [x] Add production-like Playwright execution with desktop and mobile Chromium coverage.
- [x] Add API/E2E coverage for localized submissions, invalid input, anti-bot failure, rate limiting, oversized requests, and Resend webhook verification/idempotency.
- [x] Add public privacy notice and consent-aware analytics behavior for all five locales.
- [x] Add operational retention cleanup scripts for leads and webhook events.
- [x] Replace manual Supabase schema application with ordered, versioned migrations and clean-database CI verification.
- [ ] Keep `project-memory.md` updated with decisions.

## Phase 7 - Internationalization

- [x] Add i18n translation infrastructure (src/i18n/)
- [x] Translate all page content to English, Russian, German, Finnish, Estonian
- [x] Translate all form fields, buttons, and UI labels
- [x] Add language switcher component to navigation
- [x] Update pages for locale-aware routing
- [x] Verify translations across all pages
- [x] Update docs for i18n decisions

## Immediate Next Steps

1. Finish and verify the operational part of ADM-002 in the live Supabase project: Auth provider settings, public sign-up policy, initial admin account, and linked `profiles.role = 'admin'` row.
2. Implement ADM-003 server-side admin authentication helpers, middleware, login/logout/me endpoints, and protected `/admin/*` behavior.
3. Implement ADM-007 before the admin project UI so the canonical `projects` and `project_messages` schema, migrations, RLS, and service-role access model exist first.
4. Implement ADM-004 project board using the protected server-side API.
5. Implement ADM-005 project detail, lifecycle transitions, and transition audit metadata.
6. Implement ADM-006 stored client messaging and Resend-backed admin communication flow.
7. Implement ADM-008 automated admin access and status-transition coverage.
8. Create the missing content review checklist and then mark that Phase 6 item complete.
9. Add payment-provider planning when paid service products become concrete enough to choose a provider and checkout model.
